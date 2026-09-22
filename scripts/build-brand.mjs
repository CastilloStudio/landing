#!/usr/bin/env node
/**
 * Generador del pack de marca de Castillo Studio.
 *
 * Fuente única de verdad: geometría del isotipo + tipografía Montserrat
 * convertida a curvas. De aquí salen todos los SVG, PNG, favicons y la
 * imagen de Open Graph. No se editan los assets a mano: se edita este
 * fichero y se ejecuta `npm run brand`.
 */

import { mkdirSync, writeFileSync, existsSync, readFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'brand');
const PUBLIC = join(ROOT, 'public');
const FONT_CACHE = join(ROOT, '.cache', 'fonts');

/* ------------------------------------------------------------------ *
 * Paleta
 * ------------------------------------------------------------------ */

const COLOR = {
  navy: '#0F172A', // azul profundo
  blue: '#3B82F6', // azul acento
  grey: '#CBD5E1', // gris claro
  white: '#F8FAFC', // blanco de marca
  pureWhite: '#FFFFFF',
};

/** ink = trazo principal, accent = punto azul, bg = fondo (null = transparente) */
const VARIANTS = {
  color: { ink: COLOR.navy, accent: COLOR.blue, bg: null },
  'sobre-blanco': { ink: COLOR.navy, accent: COLOR.blue, bg: COLOR.pureWhite },
  'sobre-claro': { ink: COLOR.navy, accent: COLOR.blue, bg: COLOR.white },
  negativo: { ink: COLOR.white, accent: COLOR.blue, bg: COLOR.navy },
  blanco: { ink: COLOR.white, accent: COLOR.white, bg: null },
  tinta: { ink: COLOR.navy, accent: COLOR.navy, bg: null },
};

/* ------------------------------------------------------------------ *
 * Tipografía
 * ------------------------------------------------------------------ */

const FONTS = {
  300: 'Montserrat-Light',
  400: 'Montserrat-Regular',
  500: 'Montserrat-Medium',
};

async function fetchFont(weight) {
  const file = join(FONT_CACHE, `${FONTS[weight]}.ttf`);
  if (existsSync(file)) return file;
  mkdirSync(FONT_CACHE, { recursive: true });
  // La API v1 de Google Fonts sirve TTF (la v2 solo WOFF2/EOT), que es lo
  // que opentype.js sabe leer para convertir los glifos a curvas.
  const css = await fetch(`https://fonts.googleapis.com/css?family=Montserrat:${weight}`).then((r) =>
    r.text(),
  );
  const url = css.match(/https:\/\/[^)]+\.ttf/)?.[0];
  if (!url) throw new Error(`No se pudo resolver la URL de Montserrat ${weight}`);
  const buf = Buffer.from(await fetch(url).then((r) => r.arrayBuffer()));
  writeFileSync(file, buf);
  return file;
}

const loaded = new Map();
function font(weight) {
  return loaded.get(weight);
}

/* ------------------------------------------------------------------ *
 * Isotipo: A geométrica abierta (polígono relleno) + punto azul
 *
 * Coordenadas locales: ancho 1150, alto 1000, ápice arriba en el centro.
 * Se dibuja como relleno y no como trazo para que el ápice y los pies
 * sean exactos a cualquier escala y no dependan de stroke-linejoin.
 * ------------------------------------------------------------------ */

const MARK = {
  halfBase: 575, // media anchura en la base
  height: 1000,
  weight: 195, // grosor perpendicular de la pata (versión isotipo)
  dotY: 720,
  dotR: 110,
};

/**
 * @param {number} [weight] grosor perpendicular en unidades locales. La A que
 *   sustituye a la letra dentro de "CASTILLO" usa el grosor del asta de la
 *   tipografía, no el del isotipo suelto, para que la palabra pese uniforme.
 */
function markGeometry(weight = MARK.weight) {
  const { halfBase: B, height: H, dotY, dotR } = MARK;
  const w = weight;
  const L = Math.hypot(B, H);
  const t = (w * L) / H; // grosor horizontal medido en la base
  const innerApexY = (w * L) / B; // caída del vértice interior
  const d = [
    `M ${-B} ${H}`,
    `L 0 0`,
    `L ${B} ${H}`,
    `L ${(B - t).toFixed(3)} ${H}`,
    `L 0 ${innerApexY.toFixed(3)}`,
    `L ${(-B + t).toFixed(3)} ${H}`,
    'Z',
  ].join(' ');
  return { d, width: 2 * B, height: H, dot: { cx: 0, cy: dotY, r: dotR } };
}

/**
 * Isotipo colocado: altura `height`, esquina superior izquierda en (x, y).
 * Devuelve elementos en coordenadas absolutas.
 */
function mark({ x, y, height, weight, dotScale = 1 }) {
  const g = markGeometry(weight);
  const s = height / g.height;
  const cx = x + (g.width / 2) * s;
  return {
    width: g.width * s,
    height,
    elements: [
      {
        kind: 'path',
        d: g.d,
        role: 'ink',
        transform: `translate(${round(cx)} ${round(y)}) scale(${round(s, 6)})`,
        bbox: { x1: x, y1: y, x2: x + g.width * s, y2: y + height },
      },
      {
        kind: 'circle',
        cx: cx + g.dot.cx * s,
        cy: y + g.dot.cy * s,
        r: g.dot.r * s * dotScale,
        role: 'accent',
      },
    ],
  };
}

/* ------------------------------------------------------------------ *
 * Composición de texto (glifos a curvas, tracking manual)
 * ------------------------------------------------------------------ */

function capHeightOf(weight, fontSize) {
  const f = font(weight);
  const cap = f.tables.os2.sCapHeight || 700;
  return (cap / f.unitsPerEm) * fontSize;
}

/** Grosor del asta vertical de la tipografía: ancho real de la "I". */
function stemWidth(weight, fontSize) {
  const bb = font(weight).charToGlyph('I').getPath(0, 0, fontSize).getBoundingBox();
  return bb.x2 - bb.x1;
}

/**
 * Compone texto en mayúsculas con tracking uniforme. La letra "A" puede
 * sustituirse por el isotipo (el rasgo distintivo de la marca).
 * El texto se compone con la línea base en y = 0 y comienzo en x = 0;
 * el llamante lo reposiciona.
 */
function setText(text, { weight, fontSize, tracking, swapA = false }) {
  const f = font(weight);
  const scale = fontSize / f.unitsPerEm;
  const cap = capHeightOf(weight, fontSize);
  const elements = [];
  let x = 0;

  for (const ch of text) {
    if (swapA && ch === 'A') {
      const side = 0.03 * fontSize;
      const stem = stemWidth(weight, fontSize);
      const m = mark({
        x: x + side,
        y: -cap,
        height: cap,
        weight: (stem * MARK.height) / cap, // mismo grosor óptico que las astas
        dotScale: 0.62,
      });
      elements.push(...m.elements);
      x += m.width + 2 * side + tracking;
      continue;
    }
    const glyph = f.charToGlyph(ch);
    if (ch !== ' ') {
      const path = glyph.getPath(x, 0, fontSize);
      const bb = path.getBoundingBox();
      elements.push({
        kind: 'path',
        d: path.toPathData(3),
        role: 'ink',
        bbox: { x1: bb.x1, y1: bb.y1, x2: bb.x2, y2: bb.y2 },
      });
    }
    x += glyph.advanceWidth * scale + tracking;
  }

  const width = x - tracking; // el último tracking no cuenta
  return { elements, width, capHeight: cap, fontSize };
}

/** Tracking necesario para que `text` mida exactamente `target` de ancho. */
function trackingToFit(text, { weight, fontSize }, target) {
  const base = setText(text, { weight, fontSize, tracking: 0 });
  const gaps = [...text].length - 1;
  return (target - base.width) / gaps;
}

/* ------------------------------------------------------------------ *
 * Utilidades de composición
 * ------------------------------------------------------------------ */

const round = (n, d = 3) => Number(n.toFixed(d));

function translate(elements, dx, dy) {
  return elements.map((el) => {
    if (el.kind === 'circle') return { ...el, cx: el.cx + dx, cy: el.cy + dy };
    return {
      ...el,
      transform: el.transform
        ? `translate(${round(dx)} ${round(dy)}) ${el.transform}`
        : `translate(${round(dx)} ${round(dy)})`,
      bbox: {
        x1: el.bbox.x1 + dx,
        y1: el.bbox.y1 + dy,
        x2: el.bbox.x2 + dx,
        y2: el.bbox.y2 + dy,
      },
    };
  });
}

function bboxOf(elements) {
  const box = { x1: Infinity, y1: Infinity, x2: -Infinity, y2: -Infinity };
  for (const el of elements) {
    const b =
      el.kind === 'circle'
        ? { x1: el.cx - el.r, y1: el.cy - el.r, x2: el.cx + el.r, y2: el.cy + el.r }
        : el.bbox;
    box.x1 = Math.min(box.x1, b.x1);
    box.y1 = Math.min(box.y1, b.y1);
    box.x2 = Math.max(box.x2, b.x2);
    box.y2 = Math.max(box.y2, b.y2);
  }
  return box;
}

/**
 * Serializa a SVG. El viewBox se calcula desde la caja real del contenido
 * más el área de respeto, así que width/height y viewBox siempre concuerdan
 * y no hay recortes ni márgenes muertos.
 */
function toSvg(elements, { pad, variant, square = false, radius = 0, title }) {
  const v = VARIANTS[variant];
  const b = bboxOf(elements);
  let w = b.x2 - b.x1 + 2 * pad;
  let h = b.y2 - b.y1 + 2 * pad;
  let ox = pad - b.x1;
  let oy = pad - b.y1;
  if (square) {
    const side = Math.max(w, h);
    ox += (side - w) / 2;
    oy += (side - h) / 2;
    w = side;
    h = side;
  }

  const body = translate(elements, ox, oy)
    .map((el) => {
      const fill = el.role === 'accent' ? v.accent : v.ink;
      if (el.kind === 'circle')
        return `  <circle cx="${round(el.cx)}" cy="${round(el.cy)}" r="${round(el.r)}" fill="${fill}"/>`;
      const tr = el.transform ? ` transform="${el.transform}"` : '';
      return `  <path d="${el.d}" fill="${fill}"${tr}/>`;
    })
    .join('\n');

  const bg = v.bg
    ? `  <rect width="${round(w)}" height="${round(h)}"${radius ? ` rx="${round(radius)}"` : ''} fill="${v.bg}"/>\n`
    : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${round(w)}" height="${round(h)}" viewBox="0 0 ${round(w)} ${round(h)}" role="img" aria-label="${title}">
${bg}${body}
</svg>
`;
}

/* ------------------------------------------------------------------ *
 * Lockups
 * ------------------------------------------------------------------ */

const F = 150; // tamaño de referencia de "CASTILLO"
const TAGLINE = 'TECNOLOGÍA PARA UN MUNDO REAL';

function pieces() {
  const castillo = setText('CASTILLO', {
    weight: 300,
    fontSize: F,
    tracking: 0.18 * F,
    swapA: true,
  });
  const cap = castillo.capHeight;

  const studioSize = 0.4 * F;
  const studioTracking = trackingToFit('STUDIO', { weight: 300, fontSize: studioSize }, 0.55 * castillo.width);
  const studio = setText('STUDIO', { weight: 300, fontSize: studioSize, tracking: studioTracking });

  const tagSize = 0.2 * F;
  const tagTracking = trackingToFit(TAGLINE, { weight: 400, fontSize: tagSize }, castillo.width);
  const tagline = setText(TAGLINE, { weight: 400, fontSize: tagSize, tracking: tagTracking });

  return { castillo, studio, tagline, cap };
}

/** Bloque tipográfico centrado: CASTILLO / STUDIO / (tagline). Línea base de CASTILLO en y = 0. */
function textBlock({ withTagline }) {
  const { castillo, studio, tagline, cap } = pieces();
  const els = [...translate(castillo.elements, -castillo.width / 2, 0)];

  const studioBaseline = 0.26 * cap + studio.capHeight;
  els.push(...translate(studio.elements, -studio.width / 2, studioBaseline));

  let bottom = studioBaseline;
  if (withTagline) {
    const taglineBaseline = studioBaseline + 0.72 * cap + tagline.capHeight;
    els.push(...translate(tagline.elements, -tagline.width / 2, taglineBaseline));
    bottom = taglineBaseline;
  }
  return { elements: els, width: castillo.width, cap, bottom };
}

function lockupIsotipo() {
  return mark({ x: 0, y: 0, height: 1000 }).elements;
}

function lockupPrincipal({ withTagline }) {
  const block = textBlock({ withTagline });
  const markHeight = 1.75 * block.cap;
  const m = mark({ x: -0, y: 0, height: markHeight });
  const gap = 0.55 * block.cap;
  // El isotipo se centra sobre el bloque; el texto baja por debajo de él.
  const markEls = translate(m.elements, -m.width / 2, 0);
  const textEls = translate(block.elements, 0, markHeight + gap + block.cap);
  return [...markEls, ...textEls];
}

function lockupWordmark({ withTagline }) {
  return textBlock({ withTagline }).elements;
}

function lockupHorizontal() {
  const { castillo, studio, cap } = pieces();
  const markHeight = 2.05 * cap;
  const m = mark({ x: 0, y: 0, height: markHeight });
  const gap = 0.62 * cap;

  // Línea base de CASTILLO tal que el bloque de texto quede óptico-centrado
  // respecto al isotipo.
  const studioBaseline = 0.26 * cap + studio.capHeight;
  const textHeight = cap + studioBaseline;
  const top = (markHeight - textHeight) / 2;
  const x = m.width + gap;

  return [
    ...m.elements,
    ...translate(castillo.elements, x, top + cap),
    ...translate(studio.elements, x, top + cap + studioBaseline),
  ];
}

/* ------------------------------------------------------------------ *
 * Salida
 * ------------------------------------------------------------------ */

const LOCKUPS = [
  { name: 'principal', build: () => lockupPrincipal({ withTagline: true }), pad: () => 0.7 * F },
  { name: 'principal-sin-tagline', build: () => lockupPrincipal({ withTagline: false }), pad: () => 0.7 * F },
  { name: 'wordmark', build: () => lockupWordmark({ withTagline: false }), pad: () => 0.5 * F },
  { name: 'wordmark-tagline', build: () => lockupWordmark({ withTagline: true }), pad: () => 0.5 * F },
  { name: 'horizontal', build: () => lockupHorizontal(), pad: () => 0.45 * F },
  { name: 'isotipo', build: () => lockupIsotipo(), pad: () => 120, square: true },
];

const PNG_WIDTH = { isotipo: 1024, default: 3000 };

/* ------------------------------------------------------------------ *
 * Hoja de contactos: índice visual de todo el pack
 * ------------------------------------------------------------------ */

function serialize(elements, color) {
  return elements
    .map((el) => {
      if (el.kind === 'circle')
        return `<circle cx="${round(el.cx)}" cy="${round(el.cy)}" r="${round(el.r)}" fill="${color}"/>`;
      const tr = el.transform ? ` transform="${el.transform}"` : '';
      return `<path d="${el.d}" fill="${color}"${tr}/>`;
    })
    .join('');
}

/** Etiqueta en mayúsculas, anclada arriba-izquierda en (x, y). */
function label(text, { x, y, size = 24, color = COLOR.navy, weight = 400 }) {
  const t = setText(text, { weight, fontSize: size, tracking: 0.12 * size });
  return serialize(translate(t.elements, x, y + t.capHeight), color);
}

function contactSheet(tiles) {
  const COLS = 4;
  const TW = 660;
  const TH = 400;
  const GAP = 36;
  const LABEL = 54;
  const PAD = 56;
  const rows = Math.ceil(tiles.length / COLS);
  const W = PAD * 2 + COLS * TW + (COLS - 1) * GAP;
  const H = PAD * 2 + 150 + rows * (TH + LABEL + GAP);

  let body = `<rect width="${W}" height="${H}" fill="${COLOR.white}"/>`;
  body += label('CASTILLO STUDIO · PACK DE MARCA', { x: PAD, y: PAD, size: 34, weight: 500 });
  body += label('generado con npm run brand · no editar los assets a mano', {
    x: PAD,
    y: PAD + 56,
    size: 20,
    color: '#64748B',
    weight: 400,
  });

  tiles.forEach((tile, i) => {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const x = PAD + col * (TW + GAP);
    const y = PAD + 150 + row * (TH + LABEL + GAP);
    const v = VARIANTS[tile.variant];
    // Los lockups transparentes se muestran sobre un gris neutro para que se vean.
    const tileBg = v.bg ?? (v.ink === COLOR.white ? '#334155' : '#E2E8F0');
    body += `<rect x="${x}" y="${y}" width="${TW}" height="${TH}" fill="${tileBg}" stroke="${COLOR.grey}" stroke-width="1"/>`;

    const inner = tile.svg
      .replace(/^<svg[^>]*width="([\d.]+)" height="([\d.]+)"[^>]*>/, '')
      .replace(/<\/svg>\s*$/, '')
      .replace(/<rect[^>]*fill="[^"]*"\/>/, ''); // el fondo ya lo pinta la baldosa
    const m = tile.svg.match(/width="([\d.]+)" height="([\d.]+)"/);
    const [sw, sh] = [Number(m[1]), Number(m[2])];
    const scale = Math.min((TW * 0.86) / sw, (TH * 0.86) / sh);
    const dx = x + (TW - sw * scale) / 2;
    const dy = y + (TH - sh * scale) / 2;
    body += `<g transform="translate(${round(dx)} ${round(dy)}) scale(${round(scale, 6)})">${inner}</g>`;
    body += label(tile.name, { x, y: y + TH + 16, size: 20, color: '#475569' });
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${body}</svg>`;
}

async function main() {
  for (const w of Object.keys(FONTS)) {
    const file = await fetchFont(w);
    loaded.set(Number(w), opentype.loadSync(file));
  }

  for (const dir of ['svg', 'png', 'favicon', 'social']) {
    rmSync(join(OUT, dir), { recursive: true, force: true });
    mkdirSync(join(OUT, dir), { recursive: true });
  }

  const written = [];
  const tiles = [];

  for (const lockup of LOCKUPS) {
    const elements = lockup.build();
    for (const variant of Object.keys(VARIANTS)) {
      const name = `castillo-studio-${lockup.name}-${variant}`;
      const svg = toSvg(elements, {
        pad: lockup.pad(),
        variant,
        square: lockup.square,
        title: `Castillo Studio — ${lockup.name} (${variant})`,
      });
      writeFileSync(join(OUT, 'svg', `${name}.svg`), svg);
      tiles.push({ name: `${lockup.name} · ${variant}`, variant, svg });
      const width = PNG_WIDTH[lockup.name] ?? PNG_WIDTH.default;
      await sharp(Buffer.from(svg)).resize({ width }).png({ compressionLevel: 9 }).toFile(join(OUT, 'png', `${name}.png`));
      written.push(name);
    }
  }

  /* ---- favicon e iconos de aplicación ---- */

  const faviconSvg = toSvg(lockupIsotipo(), {
    pad: 120,
    variant: 'color',
    square: true,
    title: 'Castillo Studio',
  });
  writeFileSync(join(OUT, 'favicon', 'favicon.svg'), faviconSvg);

  // Icono de app: isotipo blanco sobre cuadrado navy redondeado.
  const appSvg = toSvg(lockupIsotipo(), {
    pad: 260,
    variant: 'negativo',
    square: true,
    radius: 260,
    title: 'Castillo Studio',
  });
  writeFileSync(join(OUT, 'favicon', 'app-icon.svg'), appSvg);

  // Solo los tamaños que un navegador pide de verdad: un .ico con 128 y 256
  // dentro pesa más de 300 KB y no aporta nada frente al favicon.svg.
  const icoSizes = [16, 32, 48];
  const icoBuffers = [];
  for (const size of icoSizes) {
    const buf = await sharp(Buffer.from(faviconSvg)).resize(size, size).png().toBuffer();
    icoBuffers.push(buf);
    if ([32, 48].includes(size)) writeFileSync(join(OUT, 'favicon', `favicon-${size}.png`), buf);
  }
  writeFileSync(join(OUT, 'favicon', 'favicon.ico'), await pngToIco(icoBuffers));

  for (const size of [180, 192, 512, 1024]) {
    await sharp(Buffer.from(appSvg))
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toFile(join(OUT, 'favicon', `app-icon-${size}.png`));
  }

  /* ---- imagen social (Open Graph / Twitter) ---- */

  const ogW = 1200;
  const ogH = 630;
  const logo = toSvg(lockupPrincipal({ withTagline: true }), {
    pad: 0,
    variant: 'negativo', // conserva el punto azul sobre el fondo navy
    title: 'Castillo Studio',
  });
  const logoPng = await sharp(Buffer.from(logo)).resize({ width: 620 }).png().toBuffer();
  const meta = await sharp(logoPng).metadata();
  await sharp({
    create: { width: ogW, height: ogH, channels: 4, background: COLOR.navy },
  })
    .composite([
      {
        input: logoPng,
        left: Math.round((ogW - meta.width) / 2),
        top: Math.round((ogH - meta.height) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toFile(join(OUT, 'social', 'og-image.png'));

  /* ---- copia a public/ lo que sirve la web ---- */

  mkdirSync(PUBLIC, { recursive: true });
  const toPublic = [
    ['favicon/favicon.ico', 'favicon.ico'],
    ['favicon/favicon.svg', 'favicon.svg'],
    ['favicon/app-icon-180.png', 'apple-touch-icon.png'],
    ['favicon/app-icon-192.png', 'icon-192.png'],
    ['favicon/app-icon-512.png', 'icon-512.png'],
    ['social/og-image.png', 'og-image.png'],
  ];
  for (const [from, to] of toPublic) {
    writeFileSync(join(PUBLIC, to), readFileSync(join(OUT, from)));
  }

  const sheet = contactSheet(tiles);
  writeFileSync(join(OUT, 'contact-sheet.svg'), sheet);
  await sharp(Buffer.from(sheet)).resize({ width: 2400 }).png({ compressionLevel: 9 }).toFile(join(OUT, 'contact-sheet.png'));

  console.log(`✔ ${written.length} lockups generados en brand/svg y brand/png`);
  console.log('✔ favicon.ico, iconos de app y og-image.png');
  console.log('✔ brand/contact-sheet.png');
  console.log(`✔ ${toPublic.length} archivos copiados a public/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

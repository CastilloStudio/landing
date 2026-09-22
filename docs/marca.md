# Castillo Studio — Guía de marca

> Todos los archivos de `brand/` los genera `npm run brand` a partir de
> [`scripts/build-brand.mjs`](../scripts/build-brand.mjs). **No se editan a mano**: se
> cambia el script y se regenera. La referencia visual original está en
> [`brand/referencias/brand-board.jpeg`](../brand/referencias/brand-board.jpeg).

## Concepto

Identidad minimalista y técnica. El isotipo es una **A geométrica abierta** —dos
astas y ningún travesaño— con un **punto azul** ocupando el lugar del travesaño. No
es un castillo literal: transmite precisión, tecnología y modernidad.

El rasgo distintivo de la marca es que **esa misma A sustituye a la letra A de
"CASTILLO"**. El logotipo y el icono son la misma pieza a dos escalas.

**Tagline:** Tecnología para un mundo real.

## Lockups

| Lockup | Cuándo usarlo |
|---|---|
| `principal` | Isotipo + CASTILLO + STUDIO + tagline. Portadas, primera impresión, presentaciones. |
| `principal-sin-tagline` | Igual sin tagline, cuando el claim ya aparece cerca. |
| `horizontal` | Cabeceras web, documentos, firmas. Es el de uso diario. |
| `wordmark` | Solo texto, donde el isotipo ya está presente (p. ej. junto al favicon). |
| `wordmark-tagline` | Solo texto con claim. Pie de documentos, cierre de presentación. |
| `isotipo` | Espacios reducidos: avatar, favicon, app, sello, serigrafía. |

## Variantes de color

| Sufijo | Tinta | Punto | Fondo | Uso |
|---|---|---|---|---|
| `color` | `#0F172A` | `#3B82F6` | transparente | Por defecto sobre fondos claros. |
| `sobre-blanco` | `#0F172A` | `#3B82F6` | `#FFFFFF` | Cuando hace falta fondo blanco opaco (PDF, Word, marketplaces). |
| `sobre-claro` | `#0F172A` | `#3B82F6` | `#F8FAFC` | Fondo claro de marca. |
| `negativo` | `#F8FAFC` | `#3B82F6` | `#0F172A` | Fondo azul profundo. |
| `blanco` | `#F8FAFC` | `#F8FAFC` | transparente | Monocromo sobre foto o color saturado. |
| `tinta` | `#0F172A` | `#0F172A` | transparente | Monocromo: grabado, serigrafía a una tinta, fax legal. |

Ruta: `brand/svg/castillo-studio-<lockup>-<variante>.svg` y el PNG equivalente en
`brand/png/` (3000 px de ancho; el isotipo, 1024 px).

## Paleta

| Color | Hex | Uso |
|---|---|---|
| Azul profundo | `#0F172A` | Tinta principal, fondos oscuros. Confianza, estabilidad. |
| Azul acento | `#3B82F6` | El punto del isotipo y las superficies grandes. Tecnología, dinamismo. |
| Azul de texto | `#1D4ED8` | Texto pequeño y botones sobre fondo claro. |
| Gris claro | `#CBD5E1` | Bordes, separadores, texto secundario sobre oscuro. |
| Blanco | `#F8FAFC` | Fondos claros y tinta sobre oscuro. |

El azul acento no debe usarse como fondo de grandes superficies ni para texto largo.

**Por qué hay dos azules.** `#3B82F6` sobre blanco da una relación de contraste de
3,1:1, y el texto pequeño necesita 4,5:1 para cumplir WCAG AA. Para texto y botones
sobre fondo claro se usa `#1D4ED8`, que es el mismo azul oscurecido y llega a 6,3:1.
El acento de marca sigue siendo `#3B82F6`: el punto del isotipo no es texto y no le
aplica el criterio.

## Tipografía

- **Montserrat** — logotipo, titulares y destacados. Pesos Light (300) y Regular (400).
- **Inter** — texto corrido e interfaz.
- Estilo de marca: mayúsculas con tracking amplio (el logotipo usa 0,18 em en
  "CASTILLO"). Nunca condensar ni forzar la escala horizontal.

Proporciones del logotipo, por si hay que reconstruirlo en otro medio: si la altura
de mayúscula de "CASTILLO" es `x`, entonces "STUDIO" mide el 55 % del ancho de
"CASTILLO", la tagline mide exactamente el 100 % de ese ancho, y el isotipo del
lockup principal mide `1,75x` de alto.

## Área de respeto

Margen libre mínimo alrededor del logotipo = altura de mayúscula de "STUDIO". Los
SVG ya incorporan ese margen en su `viewBox`, así que se pueden colocar a hueso.

## Tamaños mínimos

- Logotipo completo: 180 px de ancho en digital, 35 mm impreso.
- Horizontal: 140 px de ancho.
- Isotipo: 24 px en digital, 8 mm impreso.

Por debajo de 32 px, el punto azul deja de leerse: usar `favicon-32.png` o el SVG,
que están ajustados para ese tamaño.

## Qué evitar

- Cambiar proporciones, rotar o inclinar.
- Sombras, degradados, contornos o efectos.
- Recolorear fuera de la paleta.
- Sustituir el punto azul por otra forma, o quitarlo.
- Reconstruir el logotipo escribiendo "CASTILLO" con la A de la tipografía: la A es
  siempre el isotipo.
- Colocar la versión `color` sobre fondos oscuros o fotos con poco contraste; para
  eso está `blanco`.

## Iconos y social

- `brand/favicon/favicon.svg` + `favicon.ico` (16→256 px) + `favicon-32/48.png`.
- `brand/favicon/app-icon.svg` y PNG 180/192/512/1024 — isotipo blanco sobre cuadrado
  azul profundo redondeado (`apple-touch-icon`, PWA, avatares).
- `brand/social/og-image.png` — 1200 × 630, para Open Graph y Twitter Card.

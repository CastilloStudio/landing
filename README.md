# Castillo Studio — landing

Web pública de Castillo Studio: presentación del estudio y casos de éxito.

*Tecnología para un mundo real.*

## Estado

Web publicada en castillostudio.es con presentación, servicios, productos, casos,
forma de trabajo y contacto. Vuelvo by CastilloStudio tiene una entrada propia en
«En desarrollo», diferenciada de los casos que ya están en uso. Se presenta el
proyecto y su demostración, sin anunciar disponibilidad comercial.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
npm run preview
```

## Ramas y despliegue

- `develop` — rama de trabajo. Es la rama por defecto del repositorio.
- `main` — lo que está publicado. Se actualiza por pull request desde `develop`.

Cada push a `main` despliega a GitHub Pages con
[.github/workflows/deploy.yml](.github/workflows/deploy.yml). Los pull request y los
push a `develop` solo compilan y pasan `astro check`
([ci.yml](.github/workflows/ci.yml)).

El sitio se publica en **https://castillostudio.es** (dominio propio sobre
GitHub Pages). El dominio se mantiene con `public/CNAME`, y la URL base la inyecta el
workflow con `SITE_URL` y `BASE_PATH`. Los registros DNS están documentados en el
repositorio interno.

## Estructura

```
src/
  pages/          Páginas (index.astro)
  components/     Secciones de la landing
  content/casos/  Casos de éxito en Markdown
  layouts/        Layout base con SEO y Open Graph
  styles/         Tokens de marca sobre Tailwind
  pages/robots.txt.ts, manifest.json.ts — generados para seguir al dominio
public/           Favicons y og-image — GENERADOS por npm run brand
brand/            Pack de marca — GENERADO, no editar a mano
  svg/            Logotipos vectoriales (6 lockups x 6 variantes)
  png/            Los mismos en PNG (3000 px; isotipo 1024 px)
  favicon/        favicon.ico, favicon.svg e iconos de aplicación
  social/         Imagen de Open Graph (1200x630)
  referencias/    Brand board original y el primer pack, como referencia histórica
docs/
  marca.md        Guía de marca: lockups, paleta, tipografía, usos
  vuelvo.md       Presentación, imágenes y criterio editorial de Vuelvo
scripts/
  build-brand.mjs Generador del pack de marca
```

## Regenerar la marca

```bash
npm install
npm run brand
```

El script dibuja el isotipo por geometría y convierte Montserrat a curvas, así que
los SVG no dependen de que la tipografía esté instalada en el equipo que los abra.
Las fuentes se descargan a `.cache/fonts/` la primera vez (no se versionan).

Cualquier cambio en el logotipo se hace en `scripts/build-brand.mjs` y se regenera
todo el pack de una vez.

## SEO y tarjetas de enlace

La página sale con 100 en accesibilidad, buenas prácticas y SEO en Lighthouse. Lleva
canonical, `robots`, sitemap (`@astrojs/sitemap`), `robots.txt`, manifiesto web,
datos estructurados (`ProfessionalService` + `WebSite`, y en cada caso y en el
manual su página y su miga de pan), `llms.txt` para asistentes y las etiquetas Open Graph y
Twitter completas, con la imagen de 1200x630 y sus dimensiones declaradas para que
WhatsApp y Telegram pinten la tarjeta grande.

La imagen de la tarjeta se regenera con `npm run brand`
(`brand/social/og-image.png`).

Vuelvo tiene página propia en `/casos/vuelvo/`, imagen social específica y presencia
en `llms.txt` bajo «Productos en desarrollo». El campo `estado` de la colección
separa su sección de los casos en uso; los contenidos previstos no se presentan
como funciones terminadas. Mantenimiento y comprobaciones en
[docs/vuelvo.md](docs/vuelvo.md). El contacto conserva el canal existente del estudio.

## Marca

Guía completa en [docs/marca.md](docs/marca.md). Lo mínimo:

- Azul profundo `#0F172A`, azul acento `#3B82F6`, gris `#CBD5E1`, blanco `#F8FAFC`.
- Montserrat para titulares, Inter para texto.
- La A de "CASTILLO" es siempre el isotipo, nunca la A de la tipografía.

La entrada de Vuelvo se comprobó en escritorio y móvil (320, 390 y 1440 px), con
build correcto y Lighthouse local 100 en accesibilidad y SEO en portada y detalle.
El [registro de validación](docs/vuelvo.md#resultado-del-17102026) describe los límites
y las incidencias previas de herramientas/dependencias registradas por separado.

Publicación de la presentación autorizada por Alejandro el 17/10/2026 mediante
[PR #16](https://github.com/CastilloStudio/landing/pull/16), conservando el flujo
`develop` → `main` → GitHub Pages. La autorización afecta a la presentación,
no al lanzamiento de la aplicación.

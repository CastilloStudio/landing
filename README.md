# Castillo Studio — landing

Web pública de Castillo Studio: presentación del estudio y casos de éxito.

*Tecnología para un mundo real.*

## Estado

Primera versión de la web montada con Astro + Tailwind: hero, qué hacemos, casos de
éxito, cómo trabajamos y contacto. Pendiente de dominio, buzón de correo y de
confirmar con los clientes qué se puede contar de cada caso.

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
workflow con `SITE_URL` y `BASE_PATH`.

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
  landing.md      Plan de la web: secciones, casos de éxito, decisiones pendientes
  dominio.md      DNS del dominio propio y pasos para activar HTTPS
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
datos estructurados (`ProfessionalService` + `WebSite`) y las etiquetas Open Graph y
Twitter completas, con la imagen de 1200x630 y sus dimensiones declaradas para que
WhatsApp y Telegram pinten la tarjeta grande.

La imagen de la tarjeta se regenera con `npm run brand`
(`brand/social/og-image.png`).

## Marca

Guía completa en [docs/marca.md](docs/marca.md). Lo mínimo:

- Azul profundo `#0F172A`, azul acento `#3B82F6`, gris `#CBD5E1`, blanco `#F8FAFC`.
- Montserrat para titulares, Inter para texto.
- La A de "CASTILLO" es siempre el isotipo, nunca la A de la tipografía.

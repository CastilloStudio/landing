# Castillo Studio — landing

Web pública del estudio: presentación y casos de éxito. Astro + Tailwind 4,
estática, desplegada en GitHub Pages sobre dominio propio.

**En producción: https://castillostudio.es**

## Comandos

```bash
npm run dev      # servidor de desarrollo en :4321
npm run build    # genera dist/
npm run preview  # sirve dist/
npm run brand    # regenera TODO el pack de marca y los assets de public/
npx astro check  # tipos; lo mismo que corre CI
```

## Ramas

- `develop` — rama por defecto y de trabajo. Aquí van todos los commits.
- `main` — lo publicado. Solo entra por pull request desde `develop`.

Cada push a `main` despliega. **Emilio mezcla los PR**, no los mezcles tú.

## Reglas que no son negociables

### La marca se genera, no se edita

Todo lo que hay en `brand/` y los iconos de `public/` salen de
`scripts/build-brand.mjs`. Editar un SVG a mano es trabajo que el siguiente
`npm run brand` borra. Para cambiar el logotipo se toca el script.

El script dibuja el isotipo por geometría y convierte Montserrat a curvas
(descargándola a `.cache/fonts/`), así que los SVG no dependen de que la
tipografía esté instalada.

**La A de "CASTILLO" es siempre el isotipo**, nunca la A de la tipografía. Es el
rasgo que identifica la marca. Referencia visual original en
`brand/referencias/brand-board.jpeg`.

### Hay dos azules y no son intercambiables

- `#3B82F6` (`blue`) — el punto del isotipo y superficies grandes.
- `#1D4ED8` (`blue-ink`) — **todo el texto pequeño y los botones sobre fondo
  claro**. El azul de marca sobre blanco da 3,1:1 y WCAG AA pide 4,5:1.

La página está en 100 de accesibilidad en Lighthouse. No la bajes.

### El dominio vive en tres sitios a la vez

Si cambia el dominio, hay que tocar los tres o se pelean:

1. `public/CNAME` — **manda sobre los ajustes de la interfaz de GitHub**. Viaja
   dentro del artefacto y reconfigura el dominio propio en cada despliegue. Si
   dice algo distinto de lo que hay en Settings → Pages, gana el archivo y tira
   abajo el certificado. Ya pasó una vez.
2. `SITE_URL` en `.github/workflows/deploy.yml` — de ahí salen el canonical, el
   Open Graph y el sitemap.
3. Los registros DNS en DonDominio (ver `docs/dominio.md`).

## Estructura

```
src/
  pages/index.astro          la única página
  pages/404.astro
  pages/robots.txt.ts        endpoints: se generan para seguir al dominio
  pages/manifest.json.ts
  components/                una sección por componente
  content/casos/*.md         los casos, con esquema tipado en content.config.ts
  layouts/Base.astro         SEO, Open Graph, datos estructurados
  styles/global.css          tokens de marca sobre Tailwind 4 (@theme)
  config.ts                  nombre, claim, correo, navegación
brand/                       GENERADO
scripts/build-brand.mjs      el generador
docs/marca.md                guía de marca
docs/landing.md              plan de contenido y decisiones pendientes
docs/dominio.md              DNS y correo
```

Añadir un caso de éxito es crear un `.md` en `src/content/casos/` con el
frontmatter del esquema. No hace falta tocar código.

## Contexto del negocio

Castillo Studio es un estudio de desarrollo de software **y hardware**. El
argumento de venta es que cubre el recorrido completo —placa, firmware, cloud,
producto, instalador y soporte— y hay prueba de ello en la propia organización:

- **AquaCore** (`CastilloStudio/aquacore`, privado) — ecosistema IoT, ESP32 +
  MQTT/TLS + PostgreSQL + Next.js, hardware en KiCad. Vivo en aquacorelabs.es.
- **Bitácora** (`CastilloStudio/bitacora`, privado) — app .NET de escritorio para
  una consulta de psicología. Descargas en bitacora.castillostudio.es
  (repo `CastilloStudio/bitacora-descargas`, público).

Al escribir copy, la prueba de trabajo entregado manda sobre el discurso de
agencia.

## Pendientes conocidos

Están en `docs/landing.md` y `docs/dominio.md`. Los que más pesan:

- No hay aviso legal ni política de privacidad, y en España son obligatorios
  para una web de empresa.
- El contacto es un `mailto:` a un Gmail personal. No hay buzón en el dominio.
- Falta confirmar con los clientes qué se puede contar de cada caso.

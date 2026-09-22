# Castillo Studio — landing

Web pública de Castillo Studio: presentación del estudio y casos de éxito.

*Tecnología para un mundo real.*

## Estado

En preparación. Ahora mismo el repositorio contiene la identidad de marca y el plan
de la web; el sitio todavía no está montado (el stack está por decidir, ver
[docs/landing.md](docs/landing.md)).

## Estructura

```
brand/            Pack de marca — GENERADO, no editar a mano
  svg/            Logotipos vectoriales (6 lockups x 6 variantes)
  png/            Los mismos en PNG (3000 px; isotipo 1024 px)
  favicon/        favicon.ico, favicon.svg e iconos de aplicación
  social/         Imagen de Open Graph (1200x630)
  referencias/    Brand board original y el primer pack, como referencia histórica
docs/
  marca.md        Guía de marca: lockups, paleta, tipografía, usos
  landing.md      Plan de la web: secciones, casos de éxito, decisiones pendientes
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

## Marca

Guía completa en [docs/marca.md](docs/marca.md). Lo mínimo:

- Azul profundo `#0F172A`, azul acento `#3B82F6`, gris `#CBD5E1`, blanco `#F8FAFC`.
- Montserrat para titulares, Inter para texto.
- La A de "CASTILLO" es siempre el isotipo, nunca la A de la tipografía.

# Presentación de Vuelvo

Vuelvo by CastilloStudio se presenta como **producto propio en desarrollo**. Su
contenido está en `src/content/casos/vuelvo.md`; no es un caso de cliente ni un
servicio que ya pueda contratarse.

## Dónde aparece

- Portada: sección `#en-desarrollo`, después de servicios y antes de los casos en uso.
- Navegación: «Proyectos» lleva al inicio de ese recorrido.
- Página propia: `/casos/vuelvo/`, con estado visible y contacto con el estudio.
- Buscadores: descripción, canonical y sitemap generados por la página.
- Tarjetas de enlace: imagen propia de 1200 × 630, marcada «En desarrollo».
- `llms.txt`: bloque separado de productos en desarrollo, derivado de la misma colección.

El esquema de casos incluye `estado`: `en-uso` por defecto y `en-desarrollo` para
Vuelvo. `Casos.astro` muestra solo los primeros; `EnDesarrollo.astro` muestra los
segundos. La página de detalle adapta sus títulos, miga de pan y CTA al estado.
Así el texto «Cosas que ya están funcionando» no se aplica a una demostración.

## Criterio editorial

Hablar de la relación entre comercio y cliente, tarjetas en el móvil, marca propia
y recompensa. Explicar las funciones futuras como trabajo en preparación. No
anunciar disponibilidad, fechas, precios, comercios piloto, premios reales o
integraciones verificadas si todavía no existen. No enlazar repositorios privados,
direcciones locales ni un alta que aún no está disponible.

El contacto usa el canal existente del estudio. No se ha creado una lista de espera,
formulario, campaña de correo o recogida de datos nueva.

## Imágenes y mantenimiento

`src/assets/casos/vuelvo/tarjeta.png` e `inicio.png` son capturas de la demostración
del 17/10/2026, con Café Lumbre y Estudio Brisa como negocios ficticios. Los pies
indican que son ejemplos; no presentan esas marcas como clientes.

`vuelvo.svg` es un icono del proyecto, independiente del generador de la marca del
estudio. `vuelvo/compartir.svg` es la fuente de la ilustración social; su PNG se
regenera desde la raíz con:

```bash
node --input-type=module -e "import sharp from 'sharp'; await sharp('src/assets/casos/vuelvo/compartir.svg').png().toFile('src/assets/casos/vuelvo/compartir.png');"
```

No editar `brand/` ni los logotipos del estudio para mantener estos assets. Las
capturas se sustituyen cuando cambie la demostración y se revisan sus pies; no se
usan números, sesiones o información de personas reales.

## Comprobaciones de la entrada

Ejecutar `npx astro check` y `npm run build`. Revisar portada, detalle, enlace de
contacto, visualización móvil, canonical/OG, sitemap y `llms.txt`. La publicación
sigue el flujo habitual `develop` → PR a `main`; la mezcla corresponde a Emilio.

### Resultado del 17/10/2026

Build correcto con el lockfile del repositorio. Comprobación real de Astro:
0 errores, 0 warnings y 28 hints de deprecación del esquema existente. El checker
y TypeScript se instalaron temporalmente fuera del proyecto: la ausencia de estas
herramientas en CI queda registrada en [#15](https://github.com/CastilloStudio/landing/issues/15).
No se ha cambiado el manifiesto ni el lockfile.

Portada, Vuelvo y un caso existente verificados en Chromium a 320, 390 y 1440 px:
respuestas 200, sin desbordamientos, imágenes cargadas y sin errores de JavaScript.
Los CTA recorren portada → Vuelvo → contacto. Canonical, imagen OG, sitemap y
separación en `llms.txt` revisados. Lighthouse móvil: accesibilidad 100 y SEO 100
para portada y Vuelvo; son comprobaciones automáticas locales, no una certificación.

Los avisos previos de dependencias quedan en [#14](https://github.com/CastilloStudio/landing/issues/14).

## Autorización de esta publicación · 17/10/2026

Alejandro autoriza expresamente fusionar y publicar esta entrega en la
[PR #16](https://github.com/CastilloStudio/landing/pull/16). Esta autorización se
aplica a la presentación de Vuelvo; el flujo habitual de ramas se conserva.
La página de destino es https://castillostudio.es/casos/vuelvo/. El resultado de
la publicación se comprueba en el despliegue de GitHub Pages asociado a la PR.
Publicar esta página no abre el servicio Vuelvo.

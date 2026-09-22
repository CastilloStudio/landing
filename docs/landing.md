# Landing de Castillo Studio — plan

Documento de trabajo: qué cuenta la web, en qué orden y con qué material. Se
actualiza según se vaya construyendo.

## Posicionamiento

Castillo Studio es un estudio de desarrollo de software **y hardware**. La promesa,
tomada del brand board, son tres ideas:

- **Soluciones** — software y hardware, no solo webs.
- **Para personas** — particulares y empresas pequeñas, no solo corporaciones.
- **Con impacto** — simple, cercano, real.

Claim: *Tecnología para un mundo real*. Frase larga de apoyo: *Hacemos que la
tecnología funcione para ti*.

El diferencial real, y hay pruebas de ello en la propia organización, es que el
estudio cubre el recorrido completo: firmware y placa, backend y datos, panel web,
instalador y el soporte del día después.

## Estructura de la página

1. **Hero** — isotipo + claim + una línea de qué hacemos + CTA a contacto. Fondo
   `#0F172A`, logo en `negativo`.
2. **Qué hacemos** — las tres tarjetas de la marca (Soluciones / Para personas / Con
   impacto). Iconografía de línea, coherente con el trazo del isotipo.
3. **Casos de éxito** — el corazón de la landing. Ver abajo.
4. **Cómo trabajamos** — tres o cuatro pasos: entender el problema → prototipo →
   producción → mantenimiento. Corto.
5. **Capacidades / stack** — chips discretos: .NET, Next.js, PostgreSQL, ESP32,
   MQTT, KiCad, CI/CD. Da credibilidad sin marear.
6. **Contacto** — formulario mínimo (nombre, email, mensaje) + correo directo.
   Sin teléfono hasta que haya uno de empresa.
7. **Pie** — logo `horizontal-blanco`, aviso legal, privacidad.

## Casos de éxito

Material real de la organización. Cada caso: problema → qué se construyó → resultado.

### AquaCore — IoT de punta a punta

Ecosistema para monitorizar y automatizar acuarios: controladores ESP32 conectados
por MQTT/TLS a una plataforma cloud propia, telemetría en PostgreSQL, control de
actuadores (calentadores, enfriadores, bombas, enchufes), aprovisionamiento por BLE y
actualización de firmware por OTA. Incluye hardware propio (KiCad), landing pública
y panel privado.

- Repositorio: `CastilloStudio/aquacore` · web: aquacorelabs.es
- Titular para la web: **Del sensor al panel, sin intermediarios.**
- Qué demuestra: hardware + firmware + cloud + producto, con CI/CD y releases de
  firmware.

### Bitácora — software de gestión para una consulta

Aplicación de escritorio para una consulta de psicología: pacientes, casos
individuales y de pareja, agenda con semáforo de cobro y enlaces de Meet,
sincronización con Google Calendar, historia clínica e informes, facturación con
exención de IVA, copias diarias cifradas en Drive, instalador para Windows con
actualización automática.

- Repositorio: `CastilloStudio/bitacora`
- Titular para la web: **Una consulta entera, en una sola aplicación.**
- Qué demuestra: producto terminado y en uso real, con la parte aburrida resuelta
  (copias, facturación, instalación, actualizaciones).

> Antes de publicar: confirmar con los clientes qué se puede contar y con qué nombre,
> y conseguir una captura presentable de cada uno. Ambos repos son privados, así que
> en la web no se enlaza al código.

## Decisiones pendientes

- **Aviso legal y privacidad**: no aplican todavía porque no hay actividad
  económica. Los textos están preparados; ver `docs/legal.md`.
- **Foto** para la sección "quién está detrás", y revisar ese texto, que es un
  borrador escrito desde fuera.
- **Analítica**: Cloudflare Web Analytics, gratis y sin cookies. Hace falta crear el
  sitio en el panel de Cloudflare y meter el token.
- **Formulario** en lugar del `mailto:`: Formspree o Web3Forms tienen plan gratuito.
  Si se añade, hay que ampliar la política de privacidad.
- **Correo del dominio** (ver `docs/dominio.md`).
- **Permiso de los clientes** para contar cada caso.
- **Idioma**: español primero; la estructura admite inglés si hace falta.

## Stack elegido

**Astro + Tailwind**, contenido en Markdown/MDX y despliegue estático.

Razones: la landing es contenido, no aplicación — Astro manda cero JavaScript por
defecto, así que puntúa alto en Lighthouse sin esfuerzo; los casos de éxito son
ficheros Markdown, cómodos de editar; y si algún día hace falta una isla interactiva
(formulario, calculadora, demo), se añade sin cambiar de herramienta.

Alternativa si se prefiere un único stack con AquaCore: **Next.js estático**, a costa
de más peso para lo que aquí es una página informativa.

## Despliegue

GitHub Pages, desde `main`, con el workflow `.github/workflows/deploy.yml`.

- `develop` es la rama de trabajo y la rama por defecto del repositorio.
- `main` es lo publicado; se actualiza por pull request desde `develop`.

**Requisito**: GitHub Pages solo funciona en repositorios públicos mientras la
organización esté en plan gratuito. Alternativas si se quiere mantener privado:
Cloudflare Pages o Vercel (ambos con plan gratuito y despliegue desde repo privado),
o subir la organización a plan Team.

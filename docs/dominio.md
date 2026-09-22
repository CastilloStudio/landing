# Dominio y DNS

El sitio se sirve desde GitHub Pages en **https://castillostudio.es** (sin `www`).
El dominio está en DonDominio.

## Estado: hecho

| Nombre | Tipo | Valor | Estado |
|---|---|---|---|
| `castillostudio.es` (raíz) | A | las cuatro IP de GitHub | ✅ resolviendo |
| `www` | CNAME | `castillostudio.github.io.` | ✅ resolviendo, redirige a la raíz |

El dominio propio de Pages es la raíz, así que **`public/CNAME` contiene
`castillostudio.es`**. Ese archivo manda: si dijera `www`, cada despliegue cambiaría
el dominio configurado y tiraría abajo el certificado de la raíz.

Registros A de la raíz, para referencia (son los de GitHub Pages, fijos):

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Opcionalmente, los mismos en IPv6 (AAAA):

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

## Pendiente

- Marcar **Enforce HTTPS** en Settings → Pages.

## Subdominios de proyectos

`bitacora.castillostudio.es` es el sitio de descargas de Bitácora
(repositorio público `CastilloStudio/bitacora-descargas`, servido por GitHub Pages).

**Funciona, pero de prestado**: el CNAME sigue apuntando a `emiliocastilo.github.io`
y responde solo porque GitHub mantiene la redirección de la cuenta personal desde que
se transfirió `bitacora-descargas` a la organización. Esa redirección no es un
contrato: conviene apuntarlo bien.

| Nombre | Tipo | Ahora | Ponlo en |
|---|---|---|---|
| `bitacora` | CNAME | `emiliocastilo.github.io.` | `castillostudio.github.io.` |

`descargas.castillostudio.es` no existe: solo resuelve porque el comodín lo manda al
parking. Si se quiere usar ese nombre en vez de `bitacora`, hay que crear su CNAME y
cambiar el dominio propio en los ajustes de Pages de `bitacora-descargas`.

## Qué hacer con el resto

| Registro | Qué hacer | Por qué |
|---|---|---|
| `*` CNAME → parking | **Borrar** | El comodín manda cualquier subdominio no definido al parking de DonDominio. Los subdominios que se usan de verdad (`www`, `bitacora`) tienen su propio registro, así que no dependen de él. |
| `ftp`, `bbdd` CNAME | Borrar | Solo sirven con el hosting de DonDominio, que no se usa. |
| `mail`, `smtp`, `imap`, `pop`, `pop3`, `webmail` CNAME | Dejar | No estorban a Pages. Harán falta el día que se active el correo del dominio. |
| `TXT v=spf1 include:spf.dondominio.com` | Dejar | Es el SPF del correo de DonDominio. Si al final el correo va por otro sitio (Google, Zoho, Fastmail), se sustituye por el SPF de ese proveedor. |

Ningún registro de correo interfiere con GitHub Pages: Pages solo mira la raíz y `www`.

## Si algún día se cambia el dominio

Hay que tocarlo en tres sitios a la vez, o se pelean entre ellos:

1. `public/CNAME` — es quien fija el dominio propio en cada despliegue.
2. `SITE_URL` en `.github/workflows/deploy.yml` — de ahí salen el canonical, las
   etiquetas Open Graph y el sitemap.
3. Los registros DNS en DonDominio.

## Correo

De momento la web publica una dirección de Gmail personal, definida en
[`src/config.ts`](../src/config.ts). Funciona desde el primer día y no cuesta nada,
pero conviene sustituirla por una del dominio en cuanto haya buzón.

Opciones estudiadas para `hola@castillostudio.es`, todas de coste cero o casi:

- **Cloudflare Email Routing + relay SMTP** — reenvío gratis e ilimitado a la bandeja
  de siempre; para *enviar* como `hola@` hace falta además un servidor SMTP en el
  "Enviar como" de Gmail (Brevo, 300/día, o SMTP2GO, 1.000/mes). Exige mover los
  nameservers a Cloudflare.
- **Zoho Mail (plan gratuito)** — buzón real para 5 usuarios y 5 GB sin mover el DNS,
  pero sin IMAP ni POP: solo webmail y app.
- **Buzón de pago** — alrededor de 1 €/mes en Mailbox.org, Migadu o el propio
  DonDominio, con IMAP y sin montaje.

DonDominio **no** incluye redirecciones de correo en el plan gratuito de Redirección
y Parking, así que la opción de reenviar desde el mismo panel del dominio no existe.

Cuando se elija proveedor hay que sustituir el `TXT v=spf1 include:spf.dondominio.com`
por el SPF de ese proveedor, o el correo saliente acabará en spam.

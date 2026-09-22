# Dominio y DNS

El sitio se sirve desde GitHub Pages en **https://www.castillostudio.es**. El dominio
está en DonDominio, que lo entrega con la zona apuntando a su servidor de parking.

## Qué hay que cambiar

Solo dos registros importan para que la web funcione:

| Nombre | Tipo | Valor actual (parking) | Valor correcto |
|---|---|---|---|
| `www` | CNAME | `parkingsrv0.dondominio.com.` | `castillostudio.github.io.` |
| `castillostudio.es` (raíz) | ANAME / A | `parkingsrv0.dondominio.com` | los cuatro registros A de abajo |

Registros A de la raíz (son los de GitHub Pages, fijos y documentados):

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

Si el panel de DonDominio no deja poner registros A en la raíz porque ya hay un
ANAME, vale con cambiar ese ANAME a `castillostudio.github.io`.

## Subdominios de proyectos

`bitacora.castillostudio.es` es el sitio de descargas de Bitácora
(repositorio público `CastilloStudio/bitacora-descargas`, servido por GitHub Pages).

**Está roto**: el CNAME apunta a `emiliocastilo.github.io`, pero el repositorio se
transfirió a la organización, así que ahora lo sirve `castillostudio.github.io`. De
ahí el 503.

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

## Después de cambiar el DNS

1. Esperar a que propague (`dig +short www.castillostudio.es` debe devolver las IP
   de GitHub, no `31.214.178.55`).
2. En **Settings → Pages** del repositorio, comprobar que el dominio propio sigue
   siendo `www.castillostudio.es` y que aparece el check verde de verificación.
3. Marcar **Enforce HTTPS** en cuanto GitHub emita el certificado (tarda entre unos
   minutos y una hora desde que el DNS es correcto).

## Correo

Todavía no hay buzón. La web anuncia `hola@castillostudio.es` en
[`src/config.ts`](../src/config.ts): **hay que crear ese buzón o cambiar la dirección
antes de publicar**, o el formulario de contacto de la landing apunta a un correo que
no existe.

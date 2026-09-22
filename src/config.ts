/**
 * Datos del sitio en un único punto.
 * El correo es provisional: cuando exista un buzón en el dominio propio, se
 * cambia aquí y se propaga a la cabecera, contacto, pie y datos estructurados
 * (ver docs/dominio.md).
 */
export const SITE = {
  nombre: 'Castillo Studio',
  claim: 'Tecnología para un mundo real',
  frase: 'Hacemos que la tecnología funcione para ti',
  email: 'emiliocastillogonzalez@gmail.com',
  github: 'https://github.com/CastilloStudio',
  nav: [
    { texto: 'Qué hacemos', href: '#que-hacemos' },
    { texto: 'Casos', href: '#casos' },
    { texto: 'Cómo trabajamos', href: '#proceso' },
    { texto: 'Contacto', href: '#contacto' },
  ],
} as const;

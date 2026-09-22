/**
 * Datos del sitio en un único punto.
 * PENDIENTE: confirmar dominio y buzón antes de publicar (ver docs/landing.md).
 */
export const SITE = {
  nombre: 'Castillo Studio',
  claim: 'Tecnología para un mundo real',
  frase: 'Hacemos que la tecnología funcione para ti',
  email: 'hola@castillostudio.es',
  github: 'https://github.com/CastilloStudio',
  nav: [
    { texto: 'Qué hacemos', href: '#que-hacemos' },
    { texto: 'Casos', href: '#casos' },
    { texto: 'Cómo trabajamos', href: '#proceso' },
    { texto: 'Contacto', href: '#contacto' },
  ],
} as const;

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
  // BORRADOR: revisar antes de publicar. Falta el perfil de Alejandro y las fotos.
  quien: {
    fundadores: [
      { nombre: 'Emilio Castillo', rol: 'Fundador · Desarrollo y producto' },
      { nombre: 'Alejandro Castillo', rol: 'Fundador' },
    ],
    parrafos: [
      'Castillo Studio es un estudio pequeño, y lo es a propósito. Quien coge el teléfono es quien escribe el código, diseña la placa y hace el despliegue. No hay comercial que prometa una cosa y un equipo que entregue otra.',
      'Somos dos: suficientes para repartirnos el trabajo, y los bastante pocos para que nadie se esconda detrás de un proceso. Cada proyecto lo lleva una persona con nombre, de principio a fin.',
    ],
  },
  nav: [
    { texto: 'Qué hacemos', href: '#que-hacemos' },
    { texto: 'Casos', href: '#casos' },
    { texto: 'Cómo trabajamos', href: '#proceso' },
    { texto: 'Quiénes somos', href: '#quien' },
    { texto: 'Contacto', href: '#contacto' },
  ],
} as const;

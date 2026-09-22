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
  quien: {
    // Los dos hacen lo mismo, así que la disciplina es compartida y no va por
    // persona.
    disciplina: 'Desarrollo, hardware y producto. Los dos.',
    fundadores: ['Emilio Castillo', 'Alejandro Castillo'],
    parrafos: [
      'Castillo Studio es un estudio pequeño, y lo es a propósito. Quien coge el teléfono es quien escribe el código, diseña la placa y hace el despliegue. No hay comercial que prometa una cosa y un equipo que entregue otra.',
      'Somos dos, y los dos hacemos lo mismo. No hay especialista de guardia al que haya que esperar ni traspaso de un compañero a otro a mitad de proyecto: cualquiera de los dos puede llevar el tuyo de principio a fin.',
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

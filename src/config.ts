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
  /**
   * Datos del titular para el aviso legal (los exige el art. 10 de la LSSI-CE).
   * Los «marcadores» los detecta CI y hacen fallar la compilación: la web no
   * puede publicarse con un aviso legal a medio rellenar.
   */
  legal: {
    titular: '«NOMBRE Y APELLIDOS O RAZÓN SOCIAL»',
    nif: '«NIF»',
    domicilio: '«DOMICILIO A EFECTOS DE NOTIFICACIONES»',
    actividad: 'Desarrollo de software y hardware a medida',
  },
  // BORRADOR: revisar y personalizar antes de publicar.
  quien: {
    nombre: 'Emilio Castillo',
    rol: 'Fundador y desarrollador',
    parrafos: [
      'Castillo Studio es un estudio pequeño, y lo es a propósito. Quien coge el teléfono es quien escribe el código, diseña la placa y hace el despliegue. No hay comercial que prometa una cosa y un equipo que entregue otra.',
      'Vengo del desarrollo de software y me metí en el hardware por necesidad: había proyectos que no se podían terminar sin bajar al sensor. Eso es lo que hoy distingue al estudio — pocos sitios te cubren desde el firmware hasta la factura del cliente.',
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

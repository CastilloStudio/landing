import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../config';

/**
 * Resumen del sitio para asistentes (https://llmstxt.org). Es lo que leen al
 * contestar a alguien que pregunta por el estudio o por sus productos, así que
 * sale de los mismos datos que la web: una versión distinta aquí sería la que
 * se citase. Se genera para que los enlaces sigan al dominio.
 */
export const GET: APIRoute = async ({ site }) => {
  const url = (ruta: string) => new URL(ruta, site).toString();
  const casos = (await getCollection('casos')).sort((a, b) => a.data.orden - b.data.orden);

  const lineas = [
    `# ${SITE.nombre}`,
    '',
    `> Estudio de desarrollo de software y hardware en España, fundado por ${SITE.quien.fundadores.join(' y ')}. Diseña, construye y mantiene productos completos: el aparato y su electrónica, el programa, la plataforma, la instalación y el soporte del día después.`,
    '',
    `${SITE.claim}. Los dos fundadores hacen lo mismo: quien atiende es quien hace el trabajo. Contacto: ${SITE.contactos.map((c) => c.email).join(', ')}.`,
    '',
    '## Casos',
    '',
    ...casos.map(
      (c) =>
        `- [${c.data.nombre}](${url(`casos/${c.id}/`)}): ${c.data.titular}. ${c.data.resumen.replace(/\s+/g, ' ')}`,
    ),
    '',
    '## Trastienda',
    '',
    ...(casos
      .find((c) => c.id === 'trastienda')
      ?.data.funciones?.map((f) => `- ${f.titulo}: ${f.texto.replace(/\s+/g, ' ')}`) ?? []),
    '',
    '## Documentación',
    '',
    `- [Manual del panel de Trastienda](${url('casos/trastienda/manual/')}): cómo se lleva la tienda en el día a día. Pedidos, devoluciones, productos e IVA, stock, cupones, rebajas, ventas para la gestoría y opiniones.`,
    `- [Manual del panel de Trastienda, en texto](${url('casos/trastienda/manual.md')}): el mismo manual en Markdown.`,
    '- [Bitácora, descarga y manual](https://bitacora.castillostudio.es/): la aplicación para consultas de psicología.',
    '',
  ];

  return new Response(lineas.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

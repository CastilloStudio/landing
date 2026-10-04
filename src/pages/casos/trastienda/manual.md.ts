import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';

/**
 * El manual en Markdown, para asistentes y para quien lo quiera en texto. Las
 * capturas se quitan: sus rutas solo existen dentro del repositorio de origen,
 * y su texto alternativo ya dice lo que se ve.
 */
export const GET: APIRoute = async () => {
  const manual = await getEntry('manuales', 'trastienda/manual');
  if (!manual?.body) throw new Error('Falta el manual: npm run manual:trastienda');
  const texto = manual.body.replace(/!\[([^\]]*)\]\([^)]+\)/g, '*(Captura: $1.)*');
  return new Response(texto, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};

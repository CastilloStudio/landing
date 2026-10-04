import type { APIRoute } from 'astro';

// Se genera en vez de dejarlo estático para que la URL del sitemap siga al
// dominio que inyecta el workflow de despliegue.
//
// Entra todo el mundo, buscadores y rastreadores de asistentes por igual. Es
// deliberado: que un asistente pueda leer los casos y el manual es lo que hace
// que conteste bien cuando alguien le pregunta por un estudio así. Aquí no hay
// nada privado. Si algún día hubiera que cerrar la puerta a alguno, se nombra
// aquí (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…), sin quitar el
// Allow general.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).toString();

  return new Response(
    `User-agent: *
Allow: /

Sitemap: ${sitemap}
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
};

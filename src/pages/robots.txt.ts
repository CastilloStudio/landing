import type { APIRoute } from 'astro';

// Se genera en vez de dejarlo estático para que la URL del sitemap siga al
// dominio que inyecta el workflow de despliegue.
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

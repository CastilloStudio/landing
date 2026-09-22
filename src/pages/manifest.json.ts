import type { APIRoute } from 'astro';
import { SITE } from '../config';

const asset = (ruta: string) => `${import.meta.env.BASE_URL}/${ruta}`.replace(/\/{2,}/g, '/');

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: SITE.nombre,
      short_name: SITE.nombre,
      description: SITE.claim,
      lang: 'es',
      start_url: import.meta.env.BASE_URL,
      scope: import.meta.env.BASE_URL,
      display: 'standalone',
      background_color: '#0F172A',
      theme_color: '#0F172A',
      icons: [
        { src: asset('icon-192.png'), sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: asset('icon-512.png'), sizes: '512x512', type: 'image/png', purpose: 'any' },
        { src: asset('favicon.svg'), sizes: 'any', type: 'image/svg+xml' },
      ],
    }),
    { headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' } },
  );

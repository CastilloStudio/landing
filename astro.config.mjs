// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// El workflow de despliegue inyecta estas dos variables; en local valen los
// defaults. public/CNAME mantiene el dominio propio en cada despliegue.
const site = process.env.SITE_URL ?? 'https://www.castillostudio.es';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});

// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// En GitHub Pages el sitio cuelga de /landing hasta que haya dominio propio;
// el workflow inyecta estas dos variables. En local valen los defaults.
const site = process.env.SITE_URL ?? 'https://castillostudio.github.io';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});

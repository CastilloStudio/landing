import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const casos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/casos' }),
  schema: ({ image }) => z.object({
    orden: z.number(),
    nombre: z.string(),
    /** Icono del proyecto, cuadrado, en src/assets/casos/. */
    icono: image(),
    titular: z.string(),
    resumen: z.string(),
    sector: z.string(),
    /** Qué demuestra el caso, en una línea. */
    aprendizaje: z.string(),
    hitos: z.array(z.object({ dato: z.string(), pie: z.string() })),
    web: z.string().optional(),
    webTexto: z.string().default('Ver el proyecto'),
  }),
});

export const collections = { casos };

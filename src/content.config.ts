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
    /**
     * La descripción para buscadores y tarjetas de enlace. El resumen suele
     * pasar de los 160 caracteres que enseña Google; sin esto, se usa él.
     */
    descripcion: z.string().max(160).optional(),
    sector: z.string(),
    /** Qué demuestra el caso, en una línea. */
    aprendizaje: z.string(),
    hitos: z.array(z.object({ dato: z.string(), pie: z.string() })),
    web: z.string().optional(),
    webTexto: z.string().default('Ver el proyecto'),
    /** Lo que trae, en tarjetas. Solo los casos que se enseñan a fondo. */
    funciones: z.array(z.object({ titulo: z.string(), texto: z.string() })).optional(),
    /** Capturas, en src/assets/casos/<caso>/. `movil` las pinta estrechas. */
    capturas: z
      .array(
        z.object({
          imagen: image(),
          alt: z.string(),
          pie: z.string(),
          movil: z.boolean().default(false),
        }),
      )
      .optional(),
    /** Un manual publicado aquí, con su enlace. */
    manual: z.object({ href: z.string(), texto: z.string() }).optional(),
    /** Imagen de 1200x630 para la tarjeta del enlace. Sin ella, la del estudio. */
    compartir: image().optional(),
  }),
});

/**
 * Manuales de producto. No se escriben aquí: se traen del repositorio de cada
 * producto (scripts/traer-manual-trastienda.sh). Sin cabecera: el título es
 * el primer «# ».
 */
const manuales = defineCollection({
  loader: glob({ pattern: '**/manual.md', base: './src/content/manuales' }),
});

export const collections = { casos, manuales };

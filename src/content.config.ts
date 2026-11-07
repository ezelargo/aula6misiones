import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Hitos de la historia del aula: un archivo .md por etapa en src/content/historia/
const historia = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/historia' }),
  schema: z.object({
    titulo: z.string(),
    periodo: z.string(), // texto visible, ej. "2022 – 2024"
    orden: z.number(), // orden en la línea de tiempo
    galeria: z.string().optional(), // carpeta dentro de src/assets/fotos/
    videos: z
      .array(z.object({ id: z.string(), titulo: z.string() }))
      .default([]),
  }),
});

// Textos sueltos del sitio (introducción, la maestra, cómo ayudar, etc.)
const textos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/textos' }),
  schema: z.object({
    titulo: z.string(),
  }),
});

export const collections = { historia, textos };

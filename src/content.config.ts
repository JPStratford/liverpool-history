console.log('content config loading...');
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const eras = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/eras' }),
  schema: ({ image }) => z.object({
    name: z.string(),
    dateRange: z.string(),
    slug: z.string(),
    description: z.string(),
    summary: z.string(),
    heroImage: z.object({
      src: image(),
      alt: z.string(),
    }).optional(),
    order: z.number(),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    standfirst: z.string(),
    eras: z.array(z.string()),
    topics: z.array(z.string()),
    places: z.array(z.string()),
    heroImage: z.object({
      src: image(),
      alt: z.string(),
      position: z.string().optional(),
    }).optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(true),
  }),
});

export const collections = { eras, articles };
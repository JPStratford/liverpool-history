console.log('content config loading...');
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const eras = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/eras' }),
  schema: z.object({
    name: z.string(),
    dateRange: z.string(),
    slug: z.string(),
    description: z.string(),
    summary: z.string(),
    heroImage: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    order: z.number(),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    standfirst: z.string(),
    eras: z.array(z.string()),
    topics: z.array(z.string()),
    places: z.array(z.string()),
    heroImage: z.object({
      url: z.string(),
      alt: z.string(),
    }).optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(true),
  }),
});

export const collections = { eras, articles };
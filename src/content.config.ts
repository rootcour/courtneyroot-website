import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    pillar: z.enum(['securing-ai', 'ai-for-defenders', 'security-leadership', 'post-quantum', 'general']),
    draft: z.boolean().default(false),
    // Older posts: shown on /writing/ with a note, kept off the homepage "Latest" list.
    archived: z.boolean().default(false),
    archiveNote: z.string().optional(),
  }),
});

export const collections = { posts };

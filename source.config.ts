import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { defineCollections, defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { z } from 'zod';

// You can customize Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: 'content/portfolio',
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// Blog posts. Every .mdx file dropped into `content/blog` is picked up
// automatically
export const blogPosts = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: pageSchema.extend({
    date: z.string().date().or(z.date()),
  }),
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});

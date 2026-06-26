import { docs } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { openapiPlugin, openapiSource } from 'fumadocs-openapi/server';

import { openapi } from '@/lib/openapi';
import { docsContentRoute, docsImageRoute, docsRoute } from '@/lib/shared';

// ─── Source ──────────────────────────────────────────────────────────────────

const docsSource = docs.toFumadocsSource();
const openapiFiles = await openapiSource(openapi, {
  baseDir: 'api',
});

export const source = loader({
  baseUrl: docsRoute,
  source: {
    files: [...docsSource.files, ...openapiFiles.files],
  },
  plugins: [lucideIconsPlugin(), openapiPlugin()],
});

// ─── Page helpers ───────────────────────────────────────────────────────────

/** Image-route segments for OG card generation. */
export function getPageImage(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `${docsImageRoute}/${segments.join('/')}`,
  };
}

/** Markdown-route segments for the `llms.mdx` endpoint. */
export function getPageMarkdownUrl(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'content.md'];

  return {
    segments,
    url: `${docsContentRoute}/${segments.join('/')}`,
  };
}

// ─── LLM text export ────────────────────────────────────────────────────────

/**
 * Render a single page as plain Markdown for LLM/agent consumption.
 * Falls back to a heading-only stub for non-doc pages (e.g. OpenAPI).
 */
export async function getLLMText(page: (typeof source)['$inferPage']) {
  type WithGetText = { getText?: (mode: 'processed') => Promise<string> };

  const data = page.data as { title: string } & WithGetText;

  if (!data.getText) {
    return `# ${data.title} (${page.url})`;
  }

  const processed = await data.getText('processed');

  return `# ${data.title} (${page.url})

${processed}`;
}

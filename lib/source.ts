import { docs } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { openapiPlugin, openapiSource } from 'fumadocs-openapi/server';

import { AGENT_DIRECTIVE_MD } from '@/lib/llms-txt';
import { openapi } from '@/lib/openapi';
import { docsContentRoute, docsImageRoute, docsRoute } from '@/lib/shared';

const docsSource = docs.toFumadocsSource();
const openapiFiles = await openapiSource(openapi, {
  baseDir: 'api',
});

/** Combined Fumadocs source: portfolio MDX + OpenAPI operation pages. */
export const source = loader({
  baseUrl: docsRoute,
  source: {
    files: [...docsSource.files, ...openapiFiles.files],
  },
  plugins: [lucideIconsPlugin(), openapiPlugin()],
});

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

/**
 * Renders a page as plain Markdown. Prepends the agent directive and
 * falls back to a heading-only stub if no `getText` is available.
 */
export async function getLLMText(page: (typeof source)['$inferPage']) {
  type WithGetText = { getText?: (mode: 'processed') => Promise<string> };

  const data = page.data as { title: string } & WithGetText;

  if (!data.getText) {
    return `${AGENT_DIRECTIVE_MD}\n\n# ${data.title} (${page.url})`;
  }

  const processed = await data.getText('processed');
  return `${AGENT_DIRECTIVE_MD}\n\n# ${data.title} (${page.url})\n\n${processed}`;
}

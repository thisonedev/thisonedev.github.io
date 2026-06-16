import { docs } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { docsContentRoute, docsImageRoute, docsRoute } from './shared';
import { openapiPlugin, openapiSource } from 'fumadocs-openapi/server';
import { openapi } from '@/lib/openapi';

const docsSource = docs.toFumadocsSource();
const openapiFiles = await openapiSource(openapi, {
  baseDir: 'api',
});

console.log('OpenAPI file count:', openapiFiles.files.length); // add this temporarily

export const source = loader({
  baseUrl: docsRoute,
  source: {
    files: [
      ...docsSource.files,
      ...openapiFiles.files,
    ],
  },
  plugins: [lucideIconsPlugin(), openapiPlugin()],
});

export function getPageImage(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `${docsImageRoute}/${segments.join('/')}`,
  };
}

export function getPageMarkdownUrl(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'content.md'];

  return {
    segments,
    url: `${docsContentRoute}/${segments.join('/')}`,
  };
}

export async function getLLMText(page: (typeof source)['$inferPage']) {
  if (!(page.data as any).getText) {
    return `# ${page.data.title} (${page.url})`;
  }
  
  const processed = await (page.data as any).getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}
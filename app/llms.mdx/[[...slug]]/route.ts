import { notFound } from 'next/navigation';

import { blog } from '@/lib/blog';
import { AGENT_DIRECTIVE_MD } from '@/lib/llms-txt';
import { getSpecPath, getSpecTitle, SPECS } from '@/lib/openapi';
import { renderOpenApiAsMarkdown } from '@/lib/openapi-md';
import { getLLMText, source } from '@/lib/source';

/**
 * Routes `/llms.mdx/<path>/content[.md]` as Markdown. Dispatches to
 * spec groups, blog posts, or Fumadocs source pages by URL shape.
 */

const SPEC_SLUGS = new Set(Object.keys(SPECS));

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/llms.mdx/[[...slug]]'>) {
  const { slug } = await params;
  const segments = slug?.slice(0, -1) ?? [];

  if (segments[0] === 'api' && segments.length === 2 && SPEC_SLUGS.has(segments[1])) {
    return renderSpecGroupMarkdown(segments[1]);
  }

  if (segments[0] === 'blog' && segments.length === 2) {
    return renderBlogMarkdown(segments[1]);
  }

  const page = source.getPage(segments);
  if (!page) notFound();
  return new Response(await getLLMText(page), {
    headers: { 'Content-Type': 'text/markdown' },
  });
}

async function renderSpecGroupMarkdown(specSlug: string) {
  const specPath = getSpecPath(specSlug);
  const title = getSpecTitle(specSlug);
  if (!specPath || !title) notFound();

  const md = await renderOpenApiAsMarkdown(specPath, title, specSlug);
  return new Response(md, { headers: { 'Content-Type': 'text/markdown' } });
}

async function renderBlogMarkdown(postSlug: string) {
  const page = blog.getPage([postSlug]);
  if (!page) notFound();

  type WithGetText = { getText?: (mode: 'processed') => Promise<string> };
  const data = page.data as { title: string } & WithGetText;

  const body = data.getText ? await data.getText('processed') : `*(${page.url})*`;
  return new Response(`${AGENT_DIRECTIVE_MD}\n\n# ${data.title} (${page.url})\n\n${body}`, {
    headers: { 'Content-Type': 'text/markdown' },
  });
}

/**
 * Emits both `.md` and `.md`-stripped URL forms so AFDocs hits the
 * same handler after `toHtmlUrl` strips `.md` from the pathname.
 */
export function generateStaticParams() {
  const sourceParams = source.getPages().flatMap((page) => [
    { lang: page.locale, slug: [...page.slugs, 'content.md'] },
    { lang: page.locale, slug: [...page.slugs, 'content'] },
  ]);

  const specGroupParams = Object.keys(SPECS).flatMap((slug) => [
    { slug: ['api', slug, 'content.md'] },
    { slug: ['api', slug, 'content'] },
  ]);

  const blogParams = blog
    .getPages()
    .flatMap((page) => [
      { slug: ['blog', page.slugs[0] ?? '', 'content.md'] },
      { slug: ['blog', page.slugs[0] ?? '', 'content'] },
    ]);

  return [...sourceParams, ...specGroupParams, ...blogParams];
}

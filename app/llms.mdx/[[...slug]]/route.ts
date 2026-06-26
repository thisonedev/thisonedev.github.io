import { notFound } from 'next/navigation';

import { getLLMText, getPageMarkdownUrl, source } from '@/lib/source';

export const revalidate = false;

// ─── Route ──────────────────────────────────────────────────────────────────

export async function GET(_req: Request, { params }: RouteContext<'/llms.mdx/[[...slug]]'>) {
  const { slug } = await params;
  const page = source.getPage(slug?.slice(0, -1));
  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: {
      'Content-Type': 'text/markdown',
    },
  });
}

// ─── Static params ──────────────────────────────────────────────────────────

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageMarkdownUrl(page).segments,
  }));
}

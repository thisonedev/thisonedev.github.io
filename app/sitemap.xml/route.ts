import { SPECS } from '@/lib/openapi';
import { source } from '@/lib/source';

export const revalidate = false;

const SITE_URL = 'https://thisonedev.github.io';
const SPEC_SLUGS = new Set(Object.keys(SPECS));

/**
 * True when the page has a standalone URL. Operations render inline
 * on their spec group page, so they don't. Drops `/` because the
 * React homepage has no MD counterpart.
 */
function isIncludedPage(page: { url: string }): boolean {
  if (page.url === '/' || page.url === '') return false;
  const m = page.url.match(/^\/api\/([^/]+)/);
  return !(m && !SPEC_SLUGS.has(m[1]));
}

/** XML-escapes a string for safe inclusion in a sitemap. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

type SitemapEntry = { loc: string; lastmod?: string };

/**
 * Returns the MD export URL. Lets sitemap and llms.txt match verbatim
 * for coverage checks.
 */
function mdUrlForPage(page: { url: string }): string {
  const slug = page.url.replace(/^\//, '').replace(/\/$/, '');
  return slug ? `${SITE_URL}/llms.mdx/${slug}/content.md` : `${SITE_URL}/llms.mdx/content.md`;
}

function buildEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  const today = new Date().toISOString().slice(0, 10);

  /** Portfolio + MDX pages. */
  for (const page of source.getPages()) {
    if (!isIncludedPage(page)) continue;
    entries.push({ loc: mdUrlForPage(page), lastmod: today });
  }

  /** OpenAPI spec group pages. */
  for (const slug of Object.keys(SPECS)) {
    entries.push({
      loc: `${SITE_URL}/llms.mdx/api/${slug}/content.md`,
      lastmod: today,
    });
  }

  return entries;
}

/** Generates `/sitemap.xml` at build time. Static export produces `out/sitemap.xml`. */
export function GET() {
  const entries = buildEntries();

  const body = entries
    .map((entry) => {
      const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : '';
      return `  <url>
    <loc>${escapeXml(entry.loc)}</loc>${lastmod}
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}

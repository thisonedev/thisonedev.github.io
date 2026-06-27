import { SPECS } from '@/lib/openapi';
import { source } from '@/lib/source';

/** Site identity + shared llms.txt constants. */
export const SITE = {
  title: 'Portfolio',
  baseUrl: 'https://thisonedev.github.io',
  description:
    'Technical writing portfolio: API references, SDK guides, tutorials, and case studies across web3, fintech, and AI tooling. Written for developers and AI agents alike.',
} as const;

/** Builds the MD export URL for a page. Matches the `/llms.mdx/<path>/content.md` route so sitemap and llms.txt line up for coverage checks. */
function mdUrl(page: { url: string }): string {
  const slug = page.url.replace(/^\//, '').replace(/\/$/, '');
  return slug
    ? `${SITE.baseUrl}/llms.mdx/${slug}/content.md`
    : `${SITE.baseUrl}/llms.mdx/content.md`;
}

const SPEC_SLUGS = new Set(Object.keys(SPECS));

/**
 * True when the page has a standalone URL. Operations render inline
 * on their spec group page, so they don't.
 */
function isStandalonePage(page: { url: string }): boolean {
  const m = page.url.match(/^\/api\/([^/]+)/);
  return !(m && !SPEC_SLUGS.has(m[1]));
}

const COMMON_QUERIES: { title: string; page: { url: string } }[] = [
  { title: 'OMG Network Case Study', page: { url: '/case-studies/omg-network' } },
  { title: 'Chainlink Case Study', page: { url: '/case-studies/chainlink' } },
  { title: 'Myria Case Study', page: { url: '/case-studies/myria' } },
  { title: 'Paytomat Case Study', page: { url: '/case-studies/paytomat' } },
];

/** Drops the marketing homepage `/` from llms.txt + sitemap coverage. The React component on `/` has no MD counterpart, so including it tanks MD/HTML parity for crawlers. */
function isDocPage(page: { url: string }): boolean {
  if (page.url === '/' || page.url === '') return false;
  return isStandalonePage(page);
}

export function buildLlmsTxt(): string {
  const pages = source.getPages();

  const common = COMMON_QUERIES.map(({ title, page }) => `- [${title}](${mdUrl(page)})`).join('\n');

  const docs = pages
    .filter(isDocPage)
    .map((page) => {
      const title = page.data.title;
      const description = (page.data as { description?: string }).description;
      return `- [${title}](${mdUrl(page)})${description ? `: ${description}` : ''}`;
    })
    .join('\n');

  const apis = Object.entries(SPECS)
    .map(([slug, spec]) => `- [${spec.title}](${SITE.baseUrl}/llms.mdx/api/${slug}/content.md)`)
    .join('\n');

  return [
    `# ${SITE.title}`,
    '',
    `> ${SITE.description}`,
    '',
    '> For the complete documentation index, see [llms.txt](/llms.txt). ' +
      'A full-text snapshot is also available at [llms-full.txt](/llms-full.txt). ' +
      'A skill manifest is available at [skill.md](/skill.md).',
    '',
    '## Common Queries',
    '',
    common,
    '',
    '## Docs',
    '',
    docs,
    '',
    '## APIs',
    '',
    apis,
    '',
  ].join('\n');
}

/**
 * Prepends to every MD export, the HTML directive blockquote, and
 * llms.txt. Must stay in sync across all three.
 */
export const AGENT_DIRECTIVE =
  'For the complete documentation index, see [llms.txt](/llms.txt). ' +
  'A full-text snapshot is also available at [llms-full.txt](/llms-full.txt).';

export const AGENT_DIRECTIVE_MD = `> ${AGENT_DIRECTIVE}`;

/** Response headers for llms.txt routes. */
export function llmsHeaders(): HeadersInit {
  return {
    'Content-Type': 'text/markdown; charset=utf-8',
  };
}

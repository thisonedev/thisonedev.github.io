import { getLLMText, source } from '@/lib/source';

export const revalidate = false;

const HEADER = [
  '# Portfolio',
  '',
  '> Technical writing portfolio: API references, SDK guides, tutorials, and case studies across web3, fintech, and AI tooling. Written for developers and AI agents alike.',
  '',
  '> For the complete documentation index, see [llms.txt](/llms.txt).',
  '',
  '---',
  '',
].join('\n');

/** Mirror of `/llms-full.txt` at the IETF `.well-known` path. */
export async function GET() {
  const pages = source.getPages();
  const scanned = await Promise.all(pages.map(getLLMText));

  return new Response(HEADER + scanned.join('\n\n---\n\n'), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}

import { buildLlmsTxt, llmsHeaders } from '@/lib/llms-txt';

export const revalidate = false;

/** Mirror of `/llms.txt` at the IETF `.well-known` path. */
export function GET() {
  return new Response(buildLlmsTxt(), { headers: llmsHeaders() });
}

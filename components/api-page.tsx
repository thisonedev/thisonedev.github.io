import { createAPIPage } from 'fumadocs-openapi/ui';

import { openapi } from '@/lib/openapi';

/** Pre-bound `<APIPage>` for rendering fumadocs-openapi operation pages. */
export const APIPage = createAPIPage(openapi, {});

import { createAPIPage } from 'fumadocs-openapi/ui';

import { openapi } from '@/lib/openapi';

const renderPageLayout = (slots: {
  operations?: { children: React.ReactNode }[];
  webhooks?: { children: React.ReactNode }[];
}) => (
  <div className="flex flex-col gap-4 text-sm">
    {slots.operations?.map((op) => op.children)}
    {slots.webhooks?.map((op) => op.children)}
  </div>
);

/**
 * Drops the flex gap because slots already have vertical margins.
 * Default `gap-y-4` would double the spacing.
 */
const renderOperationLayout = (slots: {
  header: React.ReactNode;
  description: React.ReactNode;
  authSchemes: React.ReactNode;
  parameters: React.ReactNode;
  body: React.ReactNode;
  responses: React.ReactNode;
  callbacks: React.ReactNode;
  apiPlayground: React.ReactNode;
  apiExample: React.ReactNode;
}) => (
  <div className="xl:flex xl:flex-row xl:items-start xl:gap-6">
    <div className="min-w-0 flex-1">
      {slots.header}
      {slots.apiPlayground}
      {slots.description}
      {slots.authSchemes}
      {slots.parameters}
      {slots.body}
      {slots.responses}
      {slots.callbacks}
    </div>
    <div className="xl:sticky xl:top-[calc(var(--fd-docs-row-1,2rem)+1rem)] xl:w-[480px] xl:shrink-0">
      {slots.apiExample}
    </div>
  </div>
);

export const APIPage = createAPIPage(openapi, {
  content: { renderPageLayout, renderOperationLayout },
});

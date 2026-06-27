import type { OperationItem, WebhookItem } from 'fumadocs-openapi/ui';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/notebook/page';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { APIPage } from '@/components/api-page';
import { getMDXComponents } from '@/components/mdx';
import { getSpecPath, getSpecTitle, openapi, SPECS } from '@/lib/openapi';
import { gitConfig } from '@/lib/shared';
import { getPageMarkdownUrl, source } from '@/lib/source';

/**
 * `/portfolio/[[...slug]]` dispatches three render modes:
 * OpenAPI spec group page, individual OpenAPI operation,
 * or regular MDX entry.
 */

export default async function Page(props: PageProps<'/portfolio/[[...slug]]'>) {
  const params = await props.params;
  const slug = params.slug ?? [];

  if (slug[0] === 'api' && slug.length === 2) {
    return renderSpecGroup(slug[1]);
  }

  const page = source.getPage(slug);
  if (!page) notFound();

  if (page.type === 'openapi') {
    return renderOpenApiOperation(page);
  }

  return renderMdxPage(page);
}

const HTTP_METHODS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'] as const;

async function renderSpecGroup(specSlug: string) {
  const specPath = getSpecPath(specSlug);
  const title = getSpecTitle(specSlug);
  if (!specPath || !title) notFound();

  const { dereferenced } = await openapi.getSchema(specPath);

  const operations: OperationItem[] = [];
  for (const [path, pathItem] of Object.entries(dereferenced.paths ?? {})) {
    if (!pathItem) continue;
    for (const method of HTTP_METHODS) {
      if ((pathItem as Record<string, unknown>)[method]) {
        operations.push({ path, method });
      }
    }
  }

  const webhooks: WebhookItem[] = [];
  for (const [name, pathItem] of Object.entries(
    (dereferenced as { webhooks?: Record<string, Record<string, unknown>> }).webhooks ?? {},
  )) {
    if (!pathItem) continue;
    for (const method of HTTP_METHODS) {
      if (pathItem[method]) {
        webhooks.push({ name, method });
      }
    }
  }

  return (
    <DocsPage full>
      <DocsTitle>{title}</DocsTitle>
      <DocsBody>
        <APIPage
          document={specPath}
          operations={operations}
          webhooks={webhooks}
          showTitle
          showDescription
        />
      </DocsBody>
    </DocsPage>
  );
}

function renderOpenApiOperation(page: ReturnType<typeof source.getPage>) {
  if (!page) notFound();
  const data = page.data as unknown as {
    title: string;
    getAPIPageProps: () => React.ComponentProps<typeof APIPage>;
  };

  return (
    <DocsPage>
      <DocsTitle>{data.title}</DocsTitle>
      <DocsBody>
        <APIPage {...data.getAPIPageProps()} />
      </DocsBody>
    </DocsPage>
  );
}

function renderMdxPage(page: NonNullable<ReturnType<typeof source.getPage>>) {
  const data = page.data as unknown as {
    body: React.ComponentType<{ components?: Record<string, unknown> }>;
    toc?: React.ComponentProps<typeof DocsPage>['toc'];
    full?: boolean;
    description?: string;
  };
  const MDX = data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;

  return (
    <DocsPage toc={data.toc} full={data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{data.description}</DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

/**
 * Drops per-operation pages that 404 at runtime but would otherwise
 * pollute the static export as empty HTML shells.
 */
export async function generateStaticParams() {
  const SPEC_KEYS = new Set(Object.keys(SPECS));
  const sourceParams = source
    .generateParams()
    .filter((p) => !(p.slug[0] === 'api' && !SPEC_KEYS.has(p.slug[1])));
  const specGroupParams = Object.keys(SPECS).map((slug) => ({ slug: ['api', slug] }));

  return [{ slug: [] }, ...specGroupParams, ...sourceParams];
}

export async function generateMetadata(
  props: PageProps<'/portfolio/[[...slug]]'>,
): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug ?? [];

  if (slug[0] === 'api' && slug.length === 2) {
    const title = getSpecTitle(slug[1]);
    return title ? { title } : {};
  }

  const page = source.getPage(slug);
  if (!page) return {};

  return {
    title: page.data.title,
    description: (page.data as unknown as { description?: string }).description,
  };
}

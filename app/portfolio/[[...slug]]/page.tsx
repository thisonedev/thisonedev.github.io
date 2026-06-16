import { getPageMarkdownUrl, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/notebook/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { gitConfig } from '@/lib/shared';
import { APIPage } from '@/components/api-page';
import { openapi, SPEC_PATHS, SPEC_TITLES } from '@/lib/openapi';

export default async function Page(props: PageProps<'/portfolio/[[...slug]]'>) {
  const params = await props.params;
  const slug = params.slug ?? [];

  // ── OpenAPI group pages: /openapi/<spec-name> ──────────────────────────────
  // Renders ALL operations for a spec on one page by building props directly
  // from the dereferenced schema, avoiding internal fumadocs-openapi imports.
  if (slug[0] === 'api' && slug.length === 2) {
    const specPath = SPEC_PATHS[slug[1]];
    const title = SPEC_TITLES[slug[1]];
    if (!specPath || !title) notFound();

    const schema = await openapi.getSchema(specPath);
    const { dereferenced } = schema;
    const methodKeys = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'] as const;

    const operations: any[] = [];
    for (const [path, pathItem] of Object.entries(dereferenced.paths ?? {})) {
      if (!pathItem) continue;
      for (const method of methodKeys) {
        const operation = (pathItem as any)[method];
        if (!operation) continue;
        operations.push({
          method,
          path,
          pathItem,
          operation,
          displayName: operation.summary || (pathItem as any).summary || operation.operationId || path,
        });
      }
    }

    const webhooks: any[] = [];
    for (const [name, pathItem] of Object.entries((dereferenced as any).webhooks ?? {})) {
      if (!pathItem) continue;
      for (const method of methodKeys) {
        const operation = (pathItem as any)[method];
        if (!operation) continue;
        webhooks.push({
          method,
          name,
          pathItem,
          operation,
          displayName: operation.summary || (pathItem as any).summary || name,
        });
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

  // ── Individual OpenAPI operation pages: /openapi/<operationId> ─────────────
  const page = source.getPage(slug);
  if (!page) notFound();

  if (page.type === 'openapi') {
      const openapiData = page.data as any;
      return (
        <DocsPage>
          <DocsTitle>{page.data.title}</DocsTitle>
          <DocsBody>
            <APIPage {...openapiData.getAPIPageProps()} />
          </DocsBody>
        </DocsPage>
      );
    }

  // ── Regular MDX pages ──────────────────────────────────────────────────────
  const mdxData = page.data as any;
  const MDX = mdxData.body;
  const markdownUrl = getPageMarkdownUrl(page).url;

  return (
    <DocsPage toc={mdxData.toc} full={mdxData.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{mdxData.description}</DocsDescription>
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

export async function generateStaticParams() {
  const params = source.generateParams();

  const openapiGroupSlugs = Object.keys(SPEC_PATHS).map((key) => ({
    slug: ['api', key],
  }));

  return [
    { slug: [] },
    ...openapiGroupSlugs,
    ...params,
  ];
}

export async function generateMetadata(
  props: PageProps<'/portfolio/[[...slug]]'>,
): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug ?? [];

  if (slug[0] === 'openapi' && slug.length === 2) {
    const title = SPEC_TITLES[slug[1]];
    if (!title) return {};
    return { title };
  }

  const page = source.getPage(slug);
  if (!page) return {};

  return {
    title: page.data.title,
    description: (page.data as any).description,
  };
}
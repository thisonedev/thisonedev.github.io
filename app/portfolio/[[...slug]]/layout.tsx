import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import type { ReactNode } from 'react';

import { ArticleLayout } from '@/app/portfolio/[[...slug]]/article-layout';
import { customTree } from '@/lib/custom-tree';
import { baseOptions } from '@/lib/layout.shared';

/** DocsLayout wrapper. Reorders DOM via ArticleLayout so `<article>` precedes the sidebar. */
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...baseOptions()}
      tree={{ name: 'docs', $id: 'latest', children: customTree }}
      slots={{ container: ArticleLayout }}
    >
      {children}
    </DocsLayout>
  );
}

import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { baseOptions } from '@/lib/layout.shared';
import type { ReactNode } from 'react';
import { customTree } from '@/lib/custom-tree';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...baseOptions()}
      tree={{ name: 'docs', $id: 'latest', children: customTree }}
    >
      {children}
    </DocsLayout>
  );
}
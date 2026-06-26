import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import type { ReactNode } from 'react';

import { customTree } from '@/lib/custom-tree';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout {...baseOptions()} tree={{ name: 'docs', $id: 'latest', children: customTree }}>
      {children}
    </DocsLayout>
  );
}

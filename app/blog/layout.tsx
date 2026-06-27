import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';

import { HomeContainer } from '@/app/blog/home-container';
import { baseOptions } from '@/lib/layout.shared';

/** HomeLayout wrapper. Reorders DOM via HomeContainer so `<article>` precedes the header. */
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout {...baseOptions()} slots={{ container: HomeContainer }}>
      {children}
    </HomeLayout>
  );
}

import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Mail } from 'lucide-react';

import { appName, gitConfig } from '@/lib/shared';

/**
 * Shared layout options for every DocsLayout / HomeLayout in the app.
 * Customize the nav, links, and GitHub URL here once.
 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // JSX supported
      title: appName,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      {
        text: 'Portfolio',
        url: '/portfolio',
        secondary: true,
      },
      {
        text: 'Blog',
        url: '/blog',
        secondary: true,
      },
      {
        type: 'icon',
        icon: <Mail />,
        text: 'Mail',
        url: 'mailto:thisonedev.md@gmail.com',
      },
    ],
  };
}

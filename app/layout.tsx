import 'fumadocs-openapi/css/preset.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './global.css';

const inter = Inter({
  subsets: ['latin'],
});

const SITE_URL = 'https://thisonedev.github.io';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Dmytro — Portfolio & Docs',
    template: '%s · Dmytro',
  },
  description:
    'Senior technical writer. APIs, docs-as-code, blockchain ecosystems, and AI workflows. Case studies, API references, and agent-readable content.',
  applicationName: 'Dmytro Portfolio',
  authors: [{ name: 'Dmytro', url: SITE_URL }],
  creator: 'Dmytro',
  publisher: 'Dmytro',
  alternates: {
    canonical: '/',
    types: {
      'text/markdown': [
        { url: '/llms.txt', title: 'LLM Index' },
        { url: '/llms-full.txt', title: 'LLM Full Content' },
        { url: '/skill.md', title: 'Agent Skill' },
      ],
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Dmytro Portfolio',
    title: 'Dmytro — Portfolio & Docs',
    description:
      'Senior technical writer. APIs, docs-as-code, blockchain ecosystems, and AI workflows.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dmytro — Portfolio & Docs',
    description:
      'Senior technical writer. APIs, docs-as-code, blockchain ecosystems, and AI workflows.',
  },
};

/**
 * Root layout. Adds `<link rel="alternate">`, sr-only directive, and
 * WebSite JSON-LD so crawlers find llms.txt / llms-full.txt / skill.md.
 */
export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static JSON
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <a
          href="#content-area"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:p-2 focus:text-sm focus:bg-fd-background focus:text-fd-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-fd-ring"
        >
          Skip to main content
        </a>
        <blockquote className="sr-only" data-agent-docs-index="true">
          For the complete documentation index, see <a href="/llms.txt">llms.txt</a>. A
          full-text snapshot is also available at <a href="/llms-full.txt">llms-full.txt</a>.
        </blockquote>

        <RootProvider theme={{ defaultTheme: 'dark' }} search={{ enabled: false }}>
          <div id="content-area">{children}</div>
        </RootProvider>
      </body>
    </html>
  );
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Dmytro Portfolio',
  alternateName: 'Dmytro — Portfolio & Docs',
  url: SITE_URL,
  description:
    'Senior technical writer. APIs, docs-as-code, blockchain ecosystems, and AI workflows.',
  inLanguage: 'en-US',
  author: {
    '@type': 'Person',
    name: 'Dmytro',
    url: SITE_URL,
  },
  publisher: {
    '@type': 'Person',
    name: 'Dmytro',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/portfolio?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
} as const;

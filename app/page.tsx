import Link from 'next/link';
import type { Metadata } from 'next';
import { HomeLayout } from 'fumadocs-ui/layouts/home';

export const metadata: Metadata = {
  title: 'Dmytro',
  description: 'Creative technical writer documenting web3 services and products.',
};

export default function HomePage() {
  return (
    <HomeLayout>
      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
        <img
          src="/avatar.jpeg"
          alt="Dmytro"
          className="size-24 rounded-full border border-fd-border object-cover"
        />

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Hi, I'm Dmytro
        </h1>

        <p className="max-w-md text-fd-muted-foreground">
          A senior technical writer with strong knowledge of APIs, docs-as-code tools, blockchain ecosystems, and AI workflows.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/portfolio"
            className="rounded-md bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground transition hover:opacity-90"
          >
            View my portfolio
          </Link>
          <Link
            href="/blog"
            className="rounded-md border border-fd-border px-4 py-2 text-sm font-medium transition hover:bg-fd-accent"
          >
            Read my blog
          </Link>
        </div>

        <div className="flex gap-4 text-sm text-fd-muted-foreground">
          <a href="mailto:thisonedev.md@gmail.com" className="hover:text-fd-foreground">
            Email
          </a>
          <a href="https://github.com/thisonedev" className="hover:text-fd-foreground">
            GitHub
          </a>
        </div>
      </main>
    </HomeLayout>
  );
}
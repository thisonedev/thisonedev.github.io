import type { Metadata } from 'next';
import Link from 'next/link';

import { formatPostDate, getSortedPosts, groupPostsByYear } from '@/lib/blog';

// ─── Metadata ───────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Posts and notes.',
};

// ─── Page ───────────────────────────────────────────────────────────────────

export default function BlogIndexPage() {
  const groups = groupPostsByYear(getSortedPosts());

  return (
    <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-16 sm:py-24">
      <h1 className="text-3xl font-semibold tracking-tight mb-12">Blog</h1>

      {groups.length === 0 ? (
        <p className="text-fd-muted-foreground">
          No posts yet — drop an .mdx file into <code>content/blog</code> to get started.
        </p>
      ) : (
        <div className="flex flex-col gap-10">
          {groups.map(([year, posts]) => (
            <section key={year}>
              <h2 className="text-xl font-semibold text-fd-muted-foreground mb-3">{year}</h2>
              <ul className="flex flex-col">
                {posts.map((post) => (
                  <li key={post.url} className="border-b border-fd-border last:border-none">
                    <Link
                      href={post.url}
                      className="flex items-baseline gap-4 py-3 transition hover:text-fd-primary"
                    >
                      <span className="w-14 shrink-0 text-sm tabular-nums text-fd-muted-foreground">
                        {formatPostDate((post.data as BlogPostData).date)}
                      </span>
                      <span className="font-medium">{post.data.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}

// ─── Local types ────────────────────────────────────────────────────────────

type BlogPostData = {
  date: string | Date;
  description?: string;
};

import { blogPosts } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';

export const blog = loader({
  baseUrl: '/blog',
  source: toFumadocsSource(blogPosts, []),
});

type BlogPost = ReturnType<typeof blog.getPages>[number];

// ─── Date helpers ───────────────────────────────────────────────────────────

/**
 * Front matter `date` can come back as either a string ("2026-04-15") or an
 * already-parsed Date, depending on how the YAML scalar is written. Anchor
 * it to UTC midnight so formatting never shifts by a day depending on the
 * server/browser timezone.
 */
function toUTCDate(value: string | Date): Date {
  return value instanceof Date ? value : new Date(`${value}T00:00:00Z`);
}

// ─── Sorting & grouping ─────────────────────────────────────────────────────

/** Posts in newest-first order. */
export function getSortedPosts(): BlogPost[] {
  return [...blog.getPages()].sort((a, b) => {
    const aDate = toUTCDate((a.data as PostData).date);
    const bDate = toUTCDate((b.data as PostData).date);
    return bDate.getTime() - aDate.getTime();
  });
}

/**
 * Groups posts by year. Since the input is expected to already be sorted
 * newest-first (see `getSortedPosts`), years come out in descending order
 * for free, matching a Jekyll-style archive.
 */
export function groupPostsByYear(posts: BlogPost[]): [number, BlogPost[]][] {
  const groups = new Map<number, BlogPost[]>();

  for (const post of posts) {
    const year = toUTCDate((post.data as PostData).date).getUTCFullYear();
    const existing = groups.get(year);
    if (existing) existing.push(post);
    else groups.set(year, [post]);
  }

  return [...groups.entries()];
}

// ─── Formatting ─────────────────────────────────────────────────────────────

/** "Apr 15" — used in the archive list. */
export function formatPostDate(value: string | Date): string {
  return toUTCDate(value).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    timeZone: 'UTC',
  });
}

/** "April 15, 2026" — used on the post page itself. */
export function formatFullPostDate(value: string | Date): string {
  return toUTCDate(value).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

// ─── Local types ────────────────────────────────────────────────────────────

type PostData = {
  date: string | Date;
  description?: string;
};

import { blogPosts } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';

export const blog = loader({
  baseUrl: '/blog',
  source: toFumadocsSource(blogPosts, []),
});

type BlogPost = ReturnType<typeof blog.getPages>[number];
type PostData = {
  date: string | Date;
  description?: string;
};

function toUTCDate(value: string | Date): Date {
  return value instanceof Date ? value : new Date(`${value}T00:00:00Z`);
}

export function getSortedPosts(): BlogPost[] {
  return [...blog.getPages()].sort((a, b) => {
    const aDate = toUTCDate((a.data as PostData).date);
    const bDate = toUTCDate((b.data as PostData).date);
    return bDate.getTime() - aDate.getTime();
  });
}

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

export function formatPostDate(value: string | Date): string {
  return toUTCDate(value).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    timeZone: 'UTC',
  });
}

export function formatFullPostDate(value: string | Date): string {
  return toUTCDate(value).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

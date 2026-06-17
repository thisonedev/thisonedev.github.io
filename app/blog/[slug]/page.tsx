import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getMDXComponents } from '@/components/mdx';
import { blog, formatFullPostDate } from '@/lib/blog';

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const page = blog.getPage([slug]);
  if (!page) notFound();

  const data = page.data as any;
  const MDX = data.body;

  return (
    <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-16 sm:py-24">
      <Link href="/blog" className="text-sm text-fd-muted-foreground hover:text-fd-foreground">
        ← All posts
      </Link>

      <h1 className="mt-6 mb-2 text-3xl font-semibold tracking-tight">{page.data.title}</h1>
      <p className="mb-10 text-sm text-fd-muted-foreground">{formatFullPostDate(data.date)}</p>

      <div className="prose min-w-0">
        <MDX components={getMDXComponents()} />
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return blog.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await props.params;
  const page = blog.getPage([slug]);
  if (!page) return {};

  return {
    title: page.data.title,
    description: (page.data as any).description,
  };
}
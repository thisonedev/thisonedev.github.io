'use client';

import type { ReactNode } from 'react';
import { Children } from 'react';

import { cn } from '@/lib/cn';

/**
 * Reorders `[Header, Article]` → `[Article, Header]` so `<article>` appears
 * early in the rendered HTML. CSS grid keeps the visual layout unchanged.
 */
export function HomeContainer(props: { children?: ReactNode; className?: string }) {
  const { children, className, ...rest } = props;
  const arr = Children.toArray(children);
  const headerEl = arr[0];
  const articleEl = arr[1];

  return (
    <main
      id="nd-home-layout"
      {...rest}
      className={cn(
        'flex flex-1 flex-col [--fd-layout-width:1400px]',
        'grid grid-rows-[auto_1fr]',
        className,
      )}
      style={{
        gridTemplateAreas: '"header" "article"',
        ...(rest as { style?: React.CSSProperties }).style,
      }}
    >
      <div style={{ gridArea: 'article' }}>{articleEl}</div>
      <div style={{ gridArea: 'header' }}>{headerEl}</div>
    </main>
  );
}

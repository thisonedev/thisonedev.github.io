'use client';

import type { ReactElement, ReactNode } from 'react';
import { Children, cloneElement, isValidElement } from 'react';

/**
 * Reorders `[Header, Sidebar, DocsPageTree]` → `[Header, DocsPageTree, Sidebar]`
 * so `<article>` appears early in the rendered HTML. Each element keeps
 * its `grid-area`.
 */
export function ArticleLayout(props: {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { children, className, style, ...rest } = props;
  const arr = Children.toArray(children);
  const headerEl = arr[0];
  const sidebarEl = arr[1];
  const docsPageTree = arr[2];

  const gridTemplateAreas =
    '"sidebar sidebar header header ." "sidebar sidebar toc-popover toc-popover ." "sidebar sidebar main toc ."';
  const gridTemplateRows = 'auto auto 1fr';

  return (
    <div
      id="nd-notebook-layout"
      {...rest}
      className={[
        'grid overflow-x-clip min-h-(--fd-docs-height) auto-cols-auto auto-rows-auto',
        '[--fd-docs-height:100dvh] [--fd-header-height:0px]',
        '[--fd-toc-popover-height:0px]',
        '[--fd-toc-width:0px]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        gridTemplateAreas,
        gridTemplateRows,
        ...({
          '--fd-docs-row-1': 'var(--fd-banner-height, 0px)',
          '--fd-docs-row-2': 'calc(var(--fd-docs-row-1) + var(--fd-header-height))',
          '--fd-docs-row-3': 'calc(var(--fd-docs-row-2) + var(--fd-toc-popover-height))',
          '--fd-sidebar-col': 'var(--fd-sidebar-width)',
        } as React.CSSProperties),
        ...style,
      }}
    >
      {isValidElement(headerEl)
        ? cloneElement(headerEl as ReactElement<{ style?: React.CSSProperties }>, {
            style: {
              gridArea: 'header',
              ...(headerEl.props as { style?: React.CSSProperties }).style,
            },
          })
        : headerEl}

      {docsPageTree}

      {isValidElement(sidebarEl)
        ? cloneElement(sidebarEl as ReactElement<{ style?: React.CSSProperties }>, {
            style: {
              gridArea: 'sidebar',
              ...(sidebarEl.props as { style?: React.CSSProperties }).style,
            },
          })
        : sidebarEl}
    </div>
  );
}

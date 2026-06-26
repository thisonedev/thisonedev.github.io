import { icons } from 'lucide-react';
import { createElement } from 'react';

/**
 * Resolve a lucide icon by name. Returns `undefined` for unknown names so
 * callers can render a fallback or skip the icon entirely.
 */
export function resolveIcon(icon?: string) {
  if (!icon) return undefined;
  if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
  return undefined;
}

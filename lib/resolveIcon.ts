import { icons } from 'lucide-react';
import { createElement } from 'react';

export function resolveIcon(icon?: string) {
  if (!icon) return undefined;
  if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
  return undefined;
}

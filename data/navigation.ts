import { profile } from '@/data/profile';
import type { Copy, NavigationItem } from '@/types/content';
export function navigation(copy: Copy): NavigationItem[] {
  return [
    { label: copy.work, href: '#projects' },
    { label: copy.approach, href: '#approach' },
    { label: copy.about, href: '#about' },
    { label: copy.contact, href: '#contact' },
    { label: copy.resume, href: profile.resume },
  ];
}

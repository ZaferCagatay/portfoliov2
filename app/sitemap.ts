import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/metadata';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/tr'].map((path) => ({
    url: new URL(path, siteUrl).href,
    alternates: {
      languages: {
        en: new URL('/', siteUrl).href,
        tr: new URL('/tr', siteUrl).href,
      },
    },
  }));
}

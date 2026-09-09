import type { Metadata } from 'next';
import type { Locale } from '@/types/content';
// Resume domain is provisional until deployment is verified. Set SITE_URL at launch.
export const siteUrl = new URL(
  process.env.SITE_URL || 'https://zafercagatayumut.com',
);
export function portfolioMetadata(locale: Locale): Metadata {
  const title =
    locale === 'en'
      ? 'Zafer Çağatay Umut — Full-Stack Software Engineer'
      : 'Zafer Çağatay Umut — Full-Stack Yazılım Mühendisi';
  const description =
    locale === 'en'
      ? 'Production SaaS, AI-enabled applications, and mobile products. Selected work and engineering experience of Zafer Çağatay Umut.'
      : 'Canlı SaaS ürünleri, yapay zekâ destekli uygulamalar ve mobil ürünler. Zafer Çağatay Umut’un seçili çalışmaları ve mühendislik deneyimi.';
  const path = locale === 'en' ? '/' : '/tr';
  return {
    metadataBase: siteUrl,
    title,
    description,
    alternates: {
      canonical: path,
      languages: { en: '/', tr: '/tr', 'x-default': '/' },
    },
    openGraph: {
      title,
      description,
      url: path,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'tr_TR',
      alternateLocale: locale === 'en' ? 'tr_TR' : 'en_US',
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: 'Zafer Çağatay Umut — Full-Stack Software Engineer',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/opengraph-image'],
    },
  };
}

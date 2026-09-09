import { siteUrl } from '@/lib/metadata';
import type { Metadata } from 'next';
import { manrope, mono } from '@/lib/fonts';
import '@/app/globals.css';
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: 'Zafer Çağatay Umut — Full-Stack Yazılım Mühendisi',
  description:
    'Canlı SaaS ürünleri, yapay zekâ destekli uygulamalar ve mobil ürünler geliştiren full-stack yazılım mühendisi.',
};
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${manrope.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

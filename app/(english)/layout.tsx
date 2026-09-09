import { siteUrl } from '@/lib/metadata';
import type { Metadata } from 'next';
import { manrope, mono } from '@/lib/fonts';
import '@/app/globals.css';
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: 'Zafer Çağatay Umut — Full-Stack Software Engineer',
  description:
    'Full-stack software engineer building production SaaS, AI-enabled applications, and mobile products.',
};
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

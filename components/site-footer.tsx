import { ArrowUp } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { profile } from '@/data/profile';
import { sections } from '@/data/copy/sections';
import type { Locale } from '@/types/content';
export function SiteFooter({ locale }: { locale: Locale }) {
  const c = sections[locale];
  return (
    <footer className="site-footer">
      <Container>
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <nav aria-label={locale === 'en' ? 'Footer' : 'Alt menü'}>
          <a href={profile.github} target="_blank">
            GitHub
          </a>
          <a href={profile.resume} target="_blank">
            {c.resume}
          </a>
          <a
            href={locale === 'en' ? '/tr' : '/'}
            lang={locale === 'en' ? 'tr' : 'en'}
          >
            {locale === 'en' ? 'Türkçe' : 'English'}
          </a>
          <a href="#top">
            {c.top}
            <ArrowUp size={14} aria-hidden="true" />
          </a>
        </nav>
      </Container>
    </footer>
  );
}

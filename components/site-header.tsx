import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { MobileNavigation } from '@/components/mobile-navigation';
import { navigation } from '@/data/navigation';
import { profile } from '@/data/profile';
import type { Copy, Locale } from '@/types/content';
export function SiteHeader({ copy, locale }: { copy: Copy; locale: Locale }) {
  const items = navigation(copy);
  return (
    <header className="site-header">
      <Container className="header-inner">
        <a
          className="wordmark"
          href={locale === 'en' ? '/' : '/tr'}
          aria-label={profile.name}
        >
          z<span aria-hidden="true">.</span>
        </a>
        <nav className="desktop-navigation" aria-label={copy.navigation}>
          {items.map((item, i) => (
            <a key={item.href} href={item.href}>
              {item.label}
              {i === 2 && <ArrowUpRight size={15} aria-hidden="true" />}
            </a>
          ))}
        </nav>
        <div className="header-controls">
          <a
            className="language-link"
            href={locale === 'en' ? '/tr' : '/'}
            hrefLang={locale === 'en' ? 'tr' : 'en'}
            lang={locale === 'en' ? 'tr' : 'en'}
            aria-label={copy.language}
          >
            <span className={locale === 'en' ? 'current-language' : ''}>
              EN
            </span>
            <span className="language-slash" aria-hidden="true">
              /
            </span>
            <span className={locale === 'tr' ? 'current-language' : ''}>
              TR
            </span>
          </a>
          <MobileNavigation
            items={items}
            label={copy.menu}
            closeLabel={copy.closeMenu}
            navigationLabel={copy.navigation}
          />
        </div>
      </Container>
    </header>
  );
}

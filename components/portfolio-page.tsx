import { SelectedWork } from '@/components/sections/selected-work';
import { ProductionEngineering } from '@/components/sections/production-engineering';
import { TechnicalToolkit } from '@/components/sections/technical-toolkit';
import { ExperienceAbout } from '@/components/sections/experience-about';
import { Contact } from '@/components/sections/contact';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Hero } from '@/components/sections/hero';
import { en } from '@/data/copy/en';
import { tr } from '@/data/copy/tr';
import type { Locale } from '@/types/content';
export function PortfolioPage({ locale }: { locale: Locale }) {
  const copy = locale === 'en' ? en : tr;
  return (
    <>
      <div id="top" />
      <a href="#main" className="skip-link">
        {copy.skip}
      </a>
      <SiteHeader copy={copy} locale={locale} />
      <main id="main" tabIndex={-1}>
        <Hero copy={copy} />
        <SelectedWork locale={locale} />
        <ProductionEngineering locale={locale} />
        <TechnicalToolkit locale={locale} />
        <ExperienceAbout locale={locale} />
        <Contact locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}

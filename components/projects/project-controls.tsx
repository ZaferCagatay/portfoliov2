'use client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Locale } from '@/types/content';
import styles from './project-carousel.module.css';
export function ProjectControls({
  names,
  selected,
  previous,
  next,
  navigate,
  locale,
}: {
  names: string[];
  selected: number;
  previous: boolean;
  next: boolean;
  navigate: (target: number | 'previous' | 'next') => void;
  locale: Locale;
}) {
  return (
    <div className={styles.controls} data-carousel-controls>
      <div
        className={styles.selectors}
        role="group"
        aria-label={locale === 'en' ? 'Choose a project' : 'Proje seçin'}
      >
        {names.map((name, index) => (
          <button
            type="button"
            key={name}
            aria-label={
              locale === 'en'
                ? ` ${String(index + 1).padStart(2, '0')} — Show ${name}`.trim()
                : `${String(index + 1).padStart(2, '0')} — ${name} projesini göster`
            }
            aria-current={selected === index ? 'true' : undefined}
            onClick={() => navigate(index)}
          >
            <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          </button>
        ))}
      </div>
      <div className={styles.navigation}>
        <span className={styles.count}>
          {String(selected + 1).padStart(2, '0')} /{' '}
          {String(names.length).padStart(2, '0')}
        </span>
        <button
          type="button"
          aria-label={locale === 'en' ? 'Previous project' : 'Önceki proje'}
          disabled={!previous}
          onClick={() => navigate('previous')}
        >
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label={locale === 'en' ? 'Next project' : 'Sonraki proje'}
          disabled={!next}
          onClick={() => navigate('next')}
        >
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

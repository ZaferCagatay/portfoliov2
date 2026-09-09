'use client';
import { useContext, useEffect, useRef, type ReactNode } from 'react';
import { HeroMotionContext } from '@/components/hero/hero-motion-context';
import styles from './engineering.module.css';

export function EngineeringMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { paused } = useContext(HeroMotionContext);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const animations: Animation[] = [];
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (preference.matches || paused) continue;
        if (entry.target.matches('[data-engineering-path]')) {
          animations.push(entry.target.animate(
            [{ strokeDasharray: '1', strokeDashoffset: '1' }, { strokeDasharray: '1', strokeDashoffset: '0' }],
            { duration: 850, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
          ));
        } else {
          animations.push(entry.target.animate(
            [{ opacity: 0.65, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }],
            { duration: 600, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
          ));
        }
      }
    }, { threshold: 0.3 });
    root.querySelectorAll('[data-engineering-path], [data-engineering-reveal]').forEach(el => observer.observe(el));
    const stop = () => { if (preference.matches) animations.forEach(animation => animation.cancel()); };
    preference.addEventListener('change', stop);
    return () => { observer.disconnect(); animations.forEach(animation => animation.cancel()); preference.removeEventListener('change', stop); };
  }, [paused]);
  return <div ref={ref} className={styles.motion} data-paused={paused}>{children}</div>;
}

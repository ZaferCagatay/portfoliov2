'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { animate, inView } from 'motion';
// Enhancement starts only after intersection; server HTML is always readable.
export function SectionMotion({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const animations: ReturnType<typeof animate>[] = [];
    const stop = inView(
      root,
      () => {
        if (preference.matches) return;
        root
          .querySelectorAll<HTMLElement>('[data-reveal]')
          .forEach((el, i) =>
            animations.push(
              animate(
                el,
                { clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'] },
                {
                  duration: 0.6,
                  delay: Math.min(i * 0.07, 0.28),
                  ease: [0.22, 1, 0.36, 1],
                },
              ),
            ),
          );
        root
          .querySelectorAll<HTMLElement>('[data-rule]')
          .forEach((el) =>
            animations.push(
              animate(
                el,
                { scaleX: [0, 1] },
                { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              ),
            ),
          );
      },
      { amount: 0.15 },
    );
    const finish = () => {
      if (preference.matches) animations.forEach((a) => a.complete());
    };
    preference.addEventListener('change', finish);
    return () => {
      stop();
      animations.forEach((a) => a.stop());
      preference.removeEventListener('change', finish);
    };
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

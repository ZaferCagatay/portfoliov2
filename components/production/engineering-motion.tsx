'use client';
import { createContext, useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import styles from './engineering.module.css';

type ScrollRange = {
  pinned: boolean;
  start: number;
  end: number;
  segment: number;
  boundaries: number[];
};

export const EngineeringContext = createContext<{
  active: number;
  select: (index: number) => void;
  reduced: boolean;
  engaged: boolean;
}>({ active: 0, select: () => {}, reduced: false, engaged: false });

export function EngineeringMotion({ children, stepCount }: { children: ReactNode; stepCount: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const activeRef = useRef(0);
  const range = useRef<ScrollRange | null>(null);
  const synchronize = useRef<() => void>(() => {});
  const reduced = useReducedMotion();

  const select = useCallback((index: number) => {
    const measured = range.current;
    if (!measured) return;
    const next = Math.max(0, Math.min(stepCount - 1, index));
    // Arrows move the single source of truth: document scroll position. Both the
    // source and destination are inside the sticky interval, so nothing on the
    // screen moves except the internal stage presentation.
    const destination = measured.pinned
      ? measured.start + (next + .5) * measured.segment
      : measured.boundaries[next] + 24;
    window.scrollTo({ top: destination, behavior: 'instant' });
    synchronize.current();
  }, [stepCount]);

  useEffect(() => {
    const root = ref.current;
    const viewport = root?.querySelector<HTMLElement>('[data-engineering-viewport]');
    const steps = root?.querySelectorAll<HTMLElement>('[data-engineering-step]');
    if (!root || !viewport || !steps?.length) return;
    let scrollFrame = 0;
    let measureFrame = 0;
    let disposed = false;
    let isEngaged = false;
    const tolerance = 10;
    const desktop = matchMedia('(min-width: 1001px) and (min-height: 700px)');

    const update = () => {
      scrollFrame = 0;
      const measured = range.current;
      if (!measured) return;
      const position = window.scrollY;
      const nowEngaged = measured.pinned && position >= measured.start - 1 && position <= measured.end + 1;
      if (nowEngaged !== isEngaged) {
        isEngaged = nowEngaged;
        setEngaged(nowEngaged);
      }
      // Equal desktop segments; cached, deliberately measured content ranges on
      // mobile. A small dead band prevents boundary jitter in either direction.
      const current = activeRef.current;
      const lower = measured.boundaries[current];
      const upper = measured.boundaries[current + 1] ?? Infinity;
      if (position >= lower - tolerance && position < upper + tolerance) return;
      const adjusted = position > upper ? position - tolerance : position + tolerance;
      let next = 0;
      for (let i = 1; i < stepCount; i++) {
        if (adjusted >= measured.boundaries[i]) next = i;
        else break;
      }
      if (next !== current) {
        activeRef.current = next;
        setActive(next);
      }
    };
    synchronize.current = update;
    const onScroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(update);
    };

    const measure = () => {
      measureFrame = 0;
      if (disposed) return;
      root.dataset.enhanced = 'true';
      root.dataset.pinned = String(desktop.matches);
      // Reads happen only on setup, resize, fonts, or document size changes.
      // A compact layout must actually fit before it can become sticky.
      let pinned = desktop.matches;
      let viewportHeight = viewport.offsetHeight;
      if (pinned && viewport.scrollHeight > viewportHeight + 2) {
        pinned = false;
        root.dataset.pinned = 'false';
        viewportHeight = viewport.offsetHeight;
      }
      const segment = Math.round(Math.max(360, Math.min(620, viewportHeight * .62)));
      const distance = segment * stepCount;
      const nextHeight = pinned ? `${viewportHeight + distance}px` : '';
      if (root.style.height !== nextHeight) root.style.height = nextHeight;
      const start = root.getBoundingClientRect().top + window.scrollY;
      const boundaries = pinned
        ? Array.from({ length: stepCount }, (_, i) => start + i * segment)
        : Array.from(steps, step => step.getBoundingClientRect().top + window.scrollY - innerHeight * .55);
      range.current = { pinned, start, end: start + distance, segment, boundaries };
      // Useful diagnostics share the actual measured source, not a second model.
      root.dataset.scrollStart = String(start);
      root.dataset.scrollSegment = String(segment);
      root.dataset.scrollEnd = String(start + distance);
      update();
    };
    const scheduleMeasure = () => {
      if (!measureFrame) measureFrame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', scheduleMeasure);
    const resize = new ResizeObserver(scheduleMeasure);
    resize.observe(document.body);
    resize.observe(viewport);
    document.fonts.ready.then(scheduleMeasure);

    return () => {
      disposed = true;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', scheduleMeasure);
      resize.disconnect();
      cancelAnimationFrame(scrollFrame);
      cancelAnimationFrame(measureFrame);
      synchronize.current = () => {};
    };
  }, [stepCount]);

  return (
    <EngineeringContext.Provider value={{ active, select, reduced, engaged }}>
      <div ref={ref} className={styles.motion} data-phase={active} data-reduced={reduced} style={{ '--active-step': active } as CSSProperties}>
        <div className={styles.viewport} data-engineering-viewport>{children}</div>
      </div>
    </EngineeringContext.Provider>
  );
}

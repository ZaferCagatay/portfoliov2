'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { animate, inView } from 'motion';
export function EngineeringMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const animations: ReturnType<typeof animate>[] = [];
    const stops = Array.from(root.querySelectorAll('[data-capability]')).map(
      (row, i) =>
        inView(
          row,
          () => {
            if (mq.matches) return;
            root
              .querySelectorAll<HTMLElement>(
                `[data-node="${i}"] > span:first-child, [data-node="${i + 1}"] > span:first-child`,
              )
              .forEach((node) =>
                animations.push(
                  animate(
                    node,
                    { borderColor: ['#333333', '#ededed', '#333333'] },
                    { duration: 1 },
                  ),
                ),
              );
          },
          { amount: 0.6 },
        ),
    );
    const finish = () => {
      if (mq.matches) animations.forEach((a) => a.complete());
    };
    mq.addEventListener('change', finish);
    return () => {
      stops.forEach((stop) => stop());
      animations.forEach((a) => a.stop());
      mq.removeEventListener('change', finish);
    };
  }, []);
  return <div ref={ref}>{children}</div>;
}

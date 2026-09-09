'use client';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { NavigationItem } from '@/types/content';
export function MobileNavigation({
  items,
  label,
  closeLabel,
  navigationLabel,
}: {
  items: NavigationItem[];
  label: string;
  closeLabel: string;
  navigationLabel: string;
}) {
  const [open, setOpen] = useState<boolean | undefined>(undefined);
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    setOpen(ref.current?.open ?? false);
    const query = matchMedia('(min-width: 768px)');
    const close = () => {
      if (query.matches && ref.current) ref.current.open = false;
    };
    query.addEventListener('change', close);
    return () => query.removeEventListener('change', close);
  }, []);
  // Native details/summary remains a working disclosure before hydration and without JS.
  return (
    <details
      ref={ref}
      className="mobile-navigation"
      onToggle={(e) => setOpen(e.currentTarget.open)}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && ref.current?.open) {
          ref.current.open = false;
          ref.current.querySelector('summary')?.focus();
        }
      }}
    >
      <summary
        role="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? closeLabel : label}
      >
        {open ? (
          <X size={20} aria-hidden="true" />
        ) : (
          <Menu size={20} aria-hidden="true" />
        )}
        <span>{label}</span>
      </summary>
      <nav id="mobile-menu" aria-label={navigationLabel}>
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => {
              if (ref.current) ref.current.open = false;
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </details>
  );
}

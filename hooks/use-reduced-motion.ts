'use client';
import { useSyncExternalStore } from 'react';
const query = '(prefers-reduced-motion: reduce)';
function subscribe(update: () => void) {
  const media = matchMedia(query);
  media.addEventListener('change', update);
  return () => media.removeEventListener('change', update);
}
// Match server HTML during hydration, then subscribe to live preference changes.
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => matchMedia(query).matches,
    () => false,
  );
}

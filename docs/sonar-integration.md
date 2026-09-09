# Supplied SonarGrid integration

The user supplied the complete React canvas component and its centered demo as pasted text. Exact originals are retained in `docs/sources/`. No license declaration was included in the supplied text; no upstream license or authorship is invented here.

The existing app already has TypeScript, Tailwind 4, `components/ui`, `@/lib/utils`, React, Lucide and Motion. No additional dependency or shadcn initialization was needed.

`components/ui/sonar-grid.tsx` preserves the supplied props and two-pass rendering algorithm: batched resting dots, individual hot dots, smoothstep wave energy, radius growth and fade. Portfolio additions are `paused`, `maxDpr`, and `interactionTarget`. The last attaches a passive listener to the hero ancestor; no canvas layer captures pointer input over links.

Hardening: cached dot coordinates; at most two ambient waves and four total portfolio waves; DPR cap 2 on desktop/1.5 on mobile; dedicated DPR media-query listener; manual and system motion stops; synchronous RAF/timer cancellation on hidden/offscreen events; clamped simulation steps with time frozen while suspended; observer/listener/ring cleanup under Strict Mode. Theme color is read on mount/config/theme change, not per frame or tap.

The original demo establishes centered copy, centered primary/secondary actions and a full sonar background with a quiet area behind text. Portfolio facts replace demo beta/infrastructure claims and fake actions. Real Karta/Pavlov previews stay below the centered introduction within the same hero. The native full name remains in copy; only the header mark changes to `z.`.

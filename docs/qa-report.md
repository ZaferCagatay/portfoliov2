# Phase 3 QA — 2026-09-09

## Implementation boundary

Replaced `ProjectReservation` inside the existing `#projects` section. The four prepared projects and their factual content are unchanged. Added server-rendered slide content, Embla enhancement, responsive product framing, controls, settled background transitions, keyboard/focus handling, and native overflow fallback. The existing neutral palette wins over the original plan’s mint proposal.

One integration correction touches the hero: its reduced-motion subscription now uses a stable server snapshot. This fixes the pause/play icon hydration mismatch exposed by final QA without changing the hero design or user controls. No legacy `portfolio/`, original resume, portrait source, runtime dependencies, deployment, or external project data were changed.

## Checks

- ESLint and strict TypeScript pass.
- Production build passes with `npm run build -- --webpack`. Default Turbopack hits this environment’s existing CSS-worker port restriction. The webpack build required an approved execution outside the filesystem sandbox to launch compiler workers.
- The pre-existing generated-metadata `metadataBase` build warning remains; locale canonical and alternate URL checks pass. Deployment origin still needs launch verification through `SITE_URL`.
- All **69 Playwright tests pass** against the production build. After the final nonvisual selector-name correction, the **five targeted carousel accessibility tests also pass**, including the additional label-in-name rule.
- Browser automation runs against the production build using installed Chromium 1234. Tests exercise all four projects, repeated cycling both directions, selectors, resizing, centered initial selection, loop-boundary spacing, drag, real link activation after drag, native vertical wheel scrolling, and emulated touch swipe/vertical gestures through Chromium’s input protocol.
- Keyboard tests cover scoped arrows, Home/End, normal Tab order, active selectors, inert offscreen slides, focused link visibility, live status, system reduced motion before hydration and during use, and the manual pause switch. Axe checks cover both locales on desktop/mobile.
- Fallback tests disable JavaScript, fail images, and inject a synchronous carousel initialization failure. The native track retains all content and live links. One/two-project tests exercise Embla’s bounded physics with the same geometry/options; these are engine-level fixtures, not alternate production routes.
- Earlier hero, navigation, contact, resume, canvas, and full-page responsive tests remain in the regression suite.

## Visual evidence

`.impeccable/review/phase3/` contains all four selected projects at 1536, 1440, 1280, 1024, 768, 430, 390, and 360px in English and Turkish (64 captures). Long descriptions remain visible and slides share content-driven height. Controls retain 44px targets; overflow stays within the track. Short landscape and the effective CSS viewport of 200% desktop zoom are also covered by browser tests.

An independent finish reviewer inspected all 64 initial captures and requested two fixes: trailing space at the loop seam, and the hydration errors recorded in the runtime metrics. The fixes add measured trailing slide space and a hydration-safe hero preference subscription. The reviewer scored both findings resolved and returned **ship within the two-fix review scope**. Final results accompany the refreshed captures in `finish-review.md`.

The mechanical design scan reported advisory type-scale/radius values, with no blocking findings. The new 14px phone radius was aligned to the existing 18px value. Its temporary raw output was not retained across the resumed session.

## Performance and limits

`scripts/review-phase3.mjs` records local buffered LCP, CLS, resource/JavaScript transfer, document overflow, and runtime errors in `metrics.json`. These unthrottled localhost samples use optimized local images and are diagnostics, not field Web Vitals. The earlier phase 1 report measured roughly 296–310 KB initial total transfer; comparisons vary with browser lazy-loading thresholds and viewport size. All carousel images use lazy loading and explicit dimensions, background requests are constrained to 320px, and no persistent `will-change`, autoplay, wheel plugin, or per-frame React state was added.

The mobile Lighthouse sample scored **Performance 97 / Accessibility 100**, with LCP **2.4s**, CLS **0**, and total blocking time **80ms**. Results are saved as `lighthouse.json`. Its unscored label-in-name advisory exposed numbered carousel selectors, corrected to include the visible index in each accessible name and covered by a dedicated axe rule check. Two pre-existing advisory targets remain in the header language switch and hero image link, outside the requested carousel scope.

The refreshed 16 local viewport samples measured LCP **104–216ms**, CLS **0**, initial total resource transfer **340–374KB**, and initial JavaScript **214KB** (decimal units). Runtime errors and document overflow were **zero** across both languages. Relative to the recorded phase 1 initial total transfer, the increase is approximately **30–78KB**, depending on viewport; no phase 1 JavaScript-only baseline was available. These samples were collected independently of Lighthouse’s simulated mobile conditions. Field INP and real-device GPU/canvas behavior require deployed traffic/device testing. Firefox, Safari, iOS Safari, Android Chrome on physical hardware, actual browser-toolbar zoom, and human screen-reader checks were not available in this environment; Chromium emulation and axe are not substitutes for those checks. Internal platform diagrams retain their prepared English node labels with Turkish alternative text and captions on `/tr`.

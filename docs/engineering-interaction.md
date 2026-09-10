# Production engineering lifecycle

The section presents a general product-engineering process. Project and resume data support the capabilities internally; the visible narrative is the lifecycle, not a Karta or Pavlov case study. No numerical business or performance claims were added.

## Scroll and navigation

`EngineeringMotion` owns one cached scroll range and the active stage. On a sufficiently large viewport, the header, process track, architecture, and arrow controls share one sticky viewport from the first stage through the end of the last stage.

- Each stage gets `clamp(360px, viewport height × 0.62, 620px)` of document scroll distance. The outer height is the sticky viewport height plus eight stage intervals.
- The stage is derived from document scroll position. A 10px tolerance at either side of a boundary prevents flicker. Intentional large jumps settle at the destination without queuing intermediate animations.
- Previous/next move the document to the center of the target interval using an instant native scroll. The entire composition remains pinned, so the controls stay under the cursor. Subsequent wheel input starts from that same interval.
- Previous is disabled on the first stage; next is disabled on the last. Both are inactive outside the pinned storytelling range.
- The left process track translates with the existing easing over 420ms. Right-side layers keep their physical positions as they activate.
- No wheel/touch interception, body scroll lock, or step IntersectionObservers. One passive scroll listener schedules arithmetic in requestAnimationFrame. React updates only on a changed stage or pinned-range engagement.
- Measurements are cached on setup, viewport/document resize, and font readiness. ResizeObserver callbacks are batched into one measurement frame.

Pinning is eligible at widths of at least 1001px and heights of at least 700px, and only if the measured composition fits. Compact spacing supports common 720px and 768px laptop heights. The sticky viewport uses `100svh`.

On narrower or insufficient-height screens, the same eight stages remain in natural document flow, with the existing inline process diagrams. Activation uses cached per-stage scroll ranges. No miniature desktop diagram or hidden-page scroll distance is imposed on phones.

Reduced motion retains the same ranges, sticky composition, controls, and active stage while disabling transitions and path animations. Before JavaScript, all stage content remains readable in normal flow. Keyboard buttons announce the current stage through a polite status region.

## Verification — 2026-09-10

Passed:

- `npm run lint`
- `npm run build -- --webpack` (includes TypeScript validation)
- 29 Playwright tests across `engineering.spec.ts`, `accessibility.spec.ts`, and `responsive.spec.ts`
- Pinned interaction at 1440×1000, 1440×900 (Turkish), 1366×768, 1024×768 (Turkish), and 1280×720 with reduced motion
- Forward/reverse progression, repeated clicks at identical coordinates, keyboard navigation, mixed wheel/arrow input, hysteresis, fast jumps, entry/exit, live preference changes, resizing to mobile, and readable no-JavaScript content
- Section screenshots and axe checks at desktop, laptop, tablet, 390px English mobile, and 320px Turkish mobile: no section overflow, browser errors, or WCAG A/AA violations

Captures and the machine-readable report are in `.impeccable/review/engineering-pinned/`. `scripts/review-engineering.mjs` reproduces the captures against a production preview; `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` selects the browser when needed.

Environment limitation: the default Turbopack build failed because its CSS worker could not bind a port. The Webpack production build passed. The existing `metadataBase` build warning is unrelated to this section.

Existing out-of-scope issue: without JavaScript, the carousel creates 1px of document overflow at 320px. The engineering section has no overflow in that condition; the carousel was not changed.

# Zafer Çağatay Umut — portfolio

The new application and deployment root is **`site/`**. The legacy `../portfolio/` application, original `../resume/` document, and `../me/` portraits are preserved.

## Run

Use Node 24 LTS (`nvm use`), then:

```sh
npm ci
npm run dev
```

English: http://localhost:3000 · Turkish: http://localhost:3000/tr

```sh
npm run lint
npm run typecheck
npm run build
npm run start
npx playwright install chromium
npm run test:e2e
```

Playwright runs against the **production build**, which must exist first. An existing Chromium can be used by setting `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. To test an already-running server, set `PLAYWRIGHT_BASE_URL` to its allowed origin (for example `http://localhost:3000` for development). No environment variables or backend services are needed by the portfolio itself.

## Phase 1 scope

The foundation and hero are implemented, including the original SonarGrid subsequently supplied by the user. The latest direction replaces the initial 7/5 headline layout with the centered composition from the supplied demo, and the header mark is `z.`. English/Turkish portfolio facts and real Karta/Pavlov previews remain.

The canvas retains the supplied two-pass dot/wave algorithm and adds manual pause, cached coordinates, frozen/clamped simulation time, immediate offscreen/hidden cancellation, bounded ambient waves, mobile DPR budget, DPR-change observation, and passive ancestor pointer handling. Links and vertical touch gestures remain native. A CSS fallback renders before hydration and when canvas is unavailable. System reduced motion renders a static grid; the existing motion toggle also stops the canvas.

Phase 2 is implemented: selected-work reservation, production engineering, toolkit, experience/about, contact and footer. Phase 3 replaces the reservation with the bilingual project carousel.

## Decisions

- Next.js 16.3.4, React 19.2.8, Node 24 LTS; exact dependency versions in `package-lock.json`. Next requires Node >=20.9 according to its installation guide and installed package metadata. Node 24 is the selected project runtime.
- ESLint 9 remains necessary for the installed React plugin's supported peer range; npm marks it deprecated. Upgrade when the Next/React lint plugin stack supports ESLint 10 together.
- Standard Next.js deployment, statically prerendered `/` and `/tr`, with built-in image optimization. No static export, database, authentication, API, contact form, or page-wide language context.
- Independent route-group root layouts supply `lang="en"` and `lang="tr"`; switching languages makes a full document navigation. Shared page composition and content stay on the server.
- Manrope and IBM Plex Mono load through `next/font/google` with Latin and Latin Extended subsets. Production builds need access to Google Fonts; visitors receive the built, self-hosted font files.
- The plan supplies the product facts; the supplied demo fixes the centered hero layout. The latest palette revision uses neutral charcoal, gray and near-white instead of mint. `DESIGN.md` records the implementation. `PRODUCT.md` records factual scope. The about passage uses an optimized copy of `../me/me1.png`; originals remain untouched.
- The mobile menu uses native `details`/`summary` with button semantics, explicit expanded state after hydration, Escape focus return, close on navigation, and close when switching to desktop.
- Sticky travel is enabled only at >=1024px, >=850px height, **and when the entire inner hero fits the viewport**. It adds 25svh of travel, uses Motion values, and never intercepts native scrolling. Short screens, zoomed layouts, and reduced motion use normal flow. The selected-work section follows in normal flow.
- Hero work links target `#projects`. Final navigation includes approach, about, contact and resume. Contact retains native mail links and adds copy feedback with a selectable-address fallback.

## Evidence and verification

See `docs/asset-manifest.md` for screenshot provenance and `docs/verification.md` for completed checks and their limits. The validation matrix includes 1536, 1440, 1280, 1024, 768, 430, 390 and 360px, both languages, short landscape and the effective CSS viewport of 200% desktop zoom.

Official references: [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [Tailwind Next.js integration](https://tailwindcss.com/docs/installation/framework-guides/nextjs).

## Phase 3 carousel

The selected-work stage now server-renders the four prepared projects through `ProjectSlide` and enhances them with `ProjectCarousel` and the installed Embla React integration. The existing section heading, `#projects`, content sources, and surrounding page remain intact.

- Centered snapping, drag/swipe, previous/next, named project selectors, and looping for the four-project dataset. No autoplay or wheel interception. One/two-project tracks use bounded navigation.
- Embla owns track movement; inner-image emphasis and a small optimized decorative background supply restrained depth. The background switches after settling and is omitted visually on mobile. All project images load lazily, retain intrinsic dimensions, and use the prepared real screenshots or labeled system overviews.
- Arrow keys are scoped to the carousel; Home/End work in its controls. Inactive slides become inert only after enhancement; selectors expose each project. Live status announces settled changes, and focus remains visible.
- System reduced motion and the existing hero pause switch disable animated selection and background transitions. The hero preference subscription was made hydration-safe after QA exposed its server/client icon mismatch; its layout is unchanged.
- Before JavaScript, or if initialization throws, native horizontal scrolling and scroll snapping preserve the content and real links. There are no fake repository/live buttons for internal projects.

Production QA, screenshot paths, performance observations, and device-testing limits: `docs/qa-report.md`. Run `scripts/review-phase3.mjs` with `PLAYWRIGHT_BASE_URL` and the installed Chromium path to repeat the capture matrix.

Set `SITE_URL` to the verified production origin at launch; the default is the resume’s domain. Metadata, EN/TR alternates, robots, sitemap and a generated social image are included.

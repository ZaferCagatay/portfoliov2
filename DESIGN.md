---
name: Zafer Çağatay Umut Portfolio
description: Neutral charcoal and near-white with editorial typography and real product evidence.
colors:
  background: "#0a0a0a"
  background-alt: "#111111"
  surface: "#171717"
  surface-elevated: "#222222"
  foreground: "#fafafa"
  secondary: "#b3b3b3"
  muted: "#939393"
  primary: "#ededed"
  primary-hover: "#ffffff"
  primary-foreground: "#0a0a0a"
  border: "#333333"
  control-border: "#757575"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(64px, 6vw, 88px)"
    fontWeight: 500
    lineHeight: 1.06
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    lineHeight: 1.6
  description:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    lineHeight: 1.75
  identity:
    fontFamily: "Manrope, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    letterSpacing: "-0.025em"
  label:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "10px"
  project-title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(26px, 2.4vw, 34px)"
    fontWeight: 550
    lineHeight: 1.18
    letterSpacing: "-0.02em"
  project-control:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "12px"
  button:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 650
rounded:
  control: "6px"
  product-frame: "12px"
  phone: "24px"
  phone-mobile: "18px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  xxl: "32px"
  wide: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
  button-secondary-hover:
    backgroundColor: "{colors.surface-elevated}"
  project-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.product-frame}"
  project-control:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.control}"
  project-selector:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    typography: "{typography.project-control}"
    rounded: "{rounded.control}"
  project-selector-current:
    textColor: "{colors.foreground}"
---

# Design System: Zafer Çağatay Umut Portfolio

## Overview

**Creative direction: Neutral charcoal and near-white.** The user’s revised neutral palette, applied to the phase 1 direction in `../plan.md`, combines editorial typography with real Karta and Pavlov product evidence. This document records the implemented phases 1–3: foundation, navigation, the approved centered bilingual hero, the selected-work carousel, engineering, toolkit, experience/about, contact, and footer. The phase 1 hero remains the visual authority; phases 2 and 3 extend its monochrome editorial language. The carousel inherits this neutral palette; the original mint direction is superseded. Experience mode is context, not a separate brand claim.

**Key characteristics:** dark tonal surfaces, a restrained near-white accent, generous headline scale, sparse mono annotations, and readable product imagery. The user-supplied SonarGrid and centered demo are now integrated; exact originals are retained in `docs/sources/`. The source gate is resolved. The revised hero received a ship review with no material findings.

## Colors

The normative frontmatter records the user’s revised neutral palette. `primary` is near-white for the main action, wordmark punctuation, product markers, link hover, selection, and keyboard focus; `primary-hover` brightens the main action, with `primary-foreground` as its dark text.

The neutral hierarchy uses `background` for the page, `surface` for the mobile menu, and `surface-elevated` for the phone shell and secondary-button hover. `background-alt` gives the engineering and contact sections a restrained tonal change. `foreground`, `secondary`, and `muted` distinguish primary content, supporting copy, and metadata. `border` separates editorial regions and product frames; `control-border` provides stronger interactive edges. The Karta screenshot shell has a product-specific dark fill (`#101015`), not a new brand palette role.

## Typography

Manrope supplies display and body text; IBM Plex Mono supplies sparse technical labels. Both are loaded through `next/font` with Turkish coverage. English and Turkish share the same hierarchy.

The centered desktop headline uses the display token, balanced wrapping, and a maximum width of 980px. Supporting copy is limited to 610px, with 28px of top separation. Below 1024px the copy container caps at 760px. Below 768px the headline uses `clamp(40px, 10.7vw, 64px)` with 1.1 line height; copy becomes 15px/1.7 with 24px top separation, and identity becomes 17px. Navigation is 13px on desktop and 15px inside the mobile menu. Mono labels remain subordinate to reading text. Section headings use `clamp(36px, 5vw, 64px)` with 1.1 line height and −0.035em tracking. Engineering headings use `clamp(38px, 4.6vw, 64px)` in natural flow and `clamp(36px, 3.6vw, 52px)` when pinned; compact pinned viewports at most 880px tall use `clamp(34px, 3vw, 44px)`, then 36px at most 740px tall. At widths at most 700px the natural-flow heading uses `clamp(36px, 8.6vw, 54px)`. The closing contact heading uses `clamp(40px, 5.5vw, 76px)`. Later-section subheadings use 24px/1.35 at weight 550, becoming 22px on mobile. Toolkit technology text is 21px/1.6, becoming 19px on mobile; supporting contexts remain 14px or smaller.

Project titles use the project-title token with balanced wrapping and become 26px below 768px. Descriptions use 15px text with 16px top spacing. Category and role labels are 11px; roles, contributions, engineering facts, and actions are 13px, with contributions and facts at 1.7 line height. Project ordinals and technology lists use 11px mono; selectors and the tabular count use 12px mono. Mobile count text is 10px. Technologies wrap with 6px row and 14px column gaps.

## Layout

The container caps at 1280px with 48px side gutters. Gutters become 32px below 1024px, 24px below 768px, 20px at 400px and below, and 16px below 375px. Repeated spacing follows a 4px base, with optical offsets for the product composition.

The hero centers identity, headline, supporting copy, and primary/secondary actions above real product evidence. Desktop top padding is `clamp(48px, 7vw, 96px)`; identity has 28px bottom spacing, and copy-to-evidence spacing is 56px. Actions wrap and center with a 14px gap and 30px top margin. The product band caps at 780px and has a 350px minimum height; Karta takes 76% width, while the 140px Pavlov phone sits at the right with a 50px top offset. Copy and screenshots do not overlap. Contact and resume also remain in the lower editorial row.

Below 1024px the product band minimum height is 345px. Below 768px hero top padding is 44px, identity bottom spacing 26px, and copy-to-evidence spacing 40px. Actions use 12px gaps and 24px top margin, with 16px horizontal button padding. Karta takes 94% width and the phone becomes 112px wide at the band's bottom right; bottom padding reserves 100px, increasing to 114px at 400px and below. The editorial row stacks and the scroll cue disappears. Below 375px both hero actions fill their rows. Header height is at least 88px on desktop and 76px on mobile.

Later sections retain the same container and gutters, with 112px vertical padding on desktop, 80px below 1024px, and 64px below 768px. Selected work retains its two-column introduction, stacking below 768px, above a centered four-project carousel in normal document flow. The carousel keeps minimum heights of 680px on desktop, 620px below 1024px, and 560px below 768px, allowing localized content and zoom to grow naturally. Top padding is 32px, becoming 24px below 768px; the viewport has 16px vertical padding. Slides stretch to the track height, with these widths and gaps:

| Viewport | Slide width | Gap | Card layout |
| --- | --- | --- | --- |
| ≥1440px | `min(880px, 78%)` | 32px | Image/copy, 1.15:1 |
| 1200–1439px | `min(880px, 78%)` | 28px | Image/copy, 1.15:1 |
| 1024–1199px | 84% | 24px | Image/copy, 1.15:1 |
| 768–1023px | 90% | 20px | Image above copy |
| 375–767px | `calc(100% - 16px)` | 16px | Image above copy |
| ≤374px | `calc(100% - 16px)` | 12px | Image above copy |

Widths are relative to the carousel viewport inside the shared container. The final slide retains a trailing gap for loop continuity. Image panels have 24px padding, becoming 16px below 768px. Copy padding is 32px 28px, 28px 24px below 1200px, 28px below 1024px, and 24px 20px below 768px. Desktop image compositions reserve at least 330px; desktop screenshot compositions add 110px bottom space for an inset detail image. Detail images use 38% width and are hidden below 1024px. Tablet image compositions are 320px tall; system diagrams keep their natural height and cap at 320px wide. Mobile compositions grow naturally with a 180px minimum; phone compositions use 300px height. Desktop phone images cap at `min(65%, 220px)` and diagrams at 360px.

Controls sit 20px below the stage with selectors left and count/arrows right. Group gaps are 8px, becoming 2px below 768px; the outer gap changes from 16px to 8px. The count has 16px right spacing, reduced to 6px on mobile. Below 375px controls may wrap and the redundant count is hidden; numbered selectors remain visible.

Engineering places an editorial introduction above an eight-stage process track and a system map in a 0.78:1.22 grid. On eligible viewports, the full introduction, track, map, and controls share one sticky `100svh` viewport at the top edge from the first stage through the last. Pinning requires at least 1001px width and 700px height and a measured composition that fits; reduced motion retains this layout. The pinned composition uses a 64px column gap, reduced to 32px below 1200px, and compact spacing at heights of 880px and 740px supports common laptop screens. One outer document range provides eight equal stage intervals, each `clamp(360px, viewport height × 0.62, 620px)`; the outer height adds those intervals to the viewport height. Only the internal process track and system state advance. Narrow or insufficient-height screens retain natural document flow, with inline stage diagrams on mobile and no extra pinned scroll distance.

The toolkit uses a 2:5:3 matrix for area, technologies, and context. Below 1024px context moves under technologies; below 768px each row becomes one column. Experience and portrait use a 7:3 split with a 100px gap (48px below 1200px). Chronology entries pair a 135px date column with content; dates stack on mobile. Below 1024px the portrait/context moves below chronology in a 240px-image two-column row, then stacks below 768px with a 360px image maximum.

Contact uses a 1.2:1 split with a 64px gap, stacking below 1024px. Email text can wrap anywhere, and mobile actions stack. The footer is a horizontal copyright/navigation row that stacks below 768px; its links retain 44px targets.

## Elevation & Depth

Most surfaces are flat, separated by tone and one-pixel rules. The phone alone uses a soft grounding shadow (`0 18px 40px #00000066`). The full-hero SonarGrid canvas is decorative, pointer-transparent, and hidden from assistive technology. Its outer mask fades after 75% of hero height. A radial copy mask uses an ellipse of 34% × 24% at 50% 26%, widening to 42% on mobile, so waves remain quiet behind text. A static CSS dot field remains visible until canvas readiness or when canvas is unavailable.

Enhanced pointer depth is bounded to ±6px on desktop mouse input. Scroll exit is available only at a viewport of at least 1024×850px when the composition fits the viewport: a 125svh shell contains the sticky hero. Headline travel ends at −24px with 0.7 opacity; product and phone travel end at −12px and −20px. Field scale ends at 0.97 and opacity at 0.45. These are bounded enhancements to visible server content.

The carousel uses a decorative image of the settled project behind its stage at 0.16 opacity with a `#0a0a0a66` overlay. It is hidden from assistive technology, clipped to 12px corners, and hidden visually below 768px. Its opacity crossfade lasts 300ms. Only inner image compositions scale, from 0.97 on inactive slides to their natural size when selected, over 300ms using the shared ease; track movement remains exclusively owned by Embla. Mobile images keep their natural scale. The stage adds no shadow or blur.

## Shapes

Controls use a 6px radius; the Karta frame uses 12px. The phone shell uses 24px on desktop and 18px on mobile, with inset image radii of 19px and 14px. Circular product markers and workspace dots are small annotations. The portrait uses the same 12px rounding as the product frame. Engineering uses circular numbered stage markers, fine connectors, and a 12px rounded dotted system canvas. Its planning boundary is square, while system blocks use restrained 4–8px corners and dashed-to-solid borders to distinguish construction state. Toolkit and chronology rows use rules without enclosing cards. Carousel projects use enclosed 12px cards with a one-pixel border, surface fill, and background-alt image panels; phone screenshots have 18px rounding and desktop inset details 6px rounding. The provisional 20px stage radius is not implemented and is not a current token.

## Components

Buttons use a 50px minimum height, 12px 22px padding, and a 24px icon gap. Primary buttons use near-white; secondary buttons use a transparent fill with `control-border`, then `surface-elevated` on hover. Disabled buttons use 0.55 opacity. Text links have a 44px minimum target, 14px type, and near-white hover; the first editorial text link is underlined.

Navigation pairs the user-approved `z.` wordmark (with near-white punctuation) with desktop links and an EN/TR locale link. Below 768px a native disclosure menu replaces desktop links, preserving navigation without JavaScript. The menu uses the surface background, 16px 24px padding, and links at least 48px tall. Locale links retain visible current-language contrast.

Product labels pair small circular markers with linked real product names. Workspace and phone imagery remain evidence, with a stronger frame border on workspace hover. Selected work presents four ordered projects in the implemented carousel. Each server-rendered article pairs real screenshots or an explicitly labeled system overview with its ordinal, localized category, title, description, role, contribution, engineering fact, and up to four technology names. Images retain intrinsic dimensions, contain their content, and load lazily. Actions sit below a top rule at the bottom of the copy panel, with underlined 44px targets. Only supplied live/repository links render; internal projects show localized availability text.

The enhanced carousel offers centered snapping, drag/swipe, previous/next arrows, and numbered selectors with project names and visible indices in their localized accessible names. Controls are at least 44×44px with 6px corners; arrows use control-border, selectors have transparent borders until the current selector receives a primary border and foreground text. Hover adds surface-elevated, disabled arrows use 0.4 opacity, and the shared visible focus ring applies. Four projects loop; one/two-project tracks use bounded navigation. There is no autoplay, wheel interception, or carousel sticky behavior. Vertical touch scrolling and pinch zoom remain native.

Arrow keys act only within the carousel; Home/End select endpoints within the controls. Modified shortcuts and editable fields are excluded. Inactive slides become inert only after enhancement; the region receives focus if selection would hide a focused slide link. A polite status region announces the settled project after deliberate interaction. Before JavaScript, or if enhancement throws, all slides and real links remain available through native horizontal scrolling with centered mandatory scroll snapping; enhanced-only controls are absent.

The system reduced-motion preference and existing hero manual pause control both jump button/keyboard selection to its destination, settle ongoing track motion, remove image emphasis, and switch backgrounds without animation. Drag remains user-driven. Reduced motion also removes control transitions; the manual pause retains ordinary control hover transitions. Motion preference hydration starts conservatively stopped.

Engineering presents a semantic ordered list of eight general product-lifecycle stages: understand, plan, build the interface, build the core, integrate, test, ship, and improve. Each stage has explanatory copy and a compact process diagram; the accompanying system map preserves layer positions as the active stage changes. Project and resume evidence supports the capabilities internally; the visible section contains no project case-study narrative. Stationary 44px previous/next buttons move the document instantly to the target segment center, keeping wheel and button navigation synchronized. Buttons disable at the endpoints and outside the pinned range. A 10px boundary tolerance prevents stage flicker, and large scroll jumps settle directly at the destination. The current-stage count and title use a polite, atomic status region. All stage content is present in readable server HTML before enhancement; controls appear only after enhancement. Reduced motion retains the same sticky range, active stages, and controls with transitions and path animations disabled. No wheel/touch interception or body scroll lock is used. Interaction details and verified desktop, laptop, mobile, keyboard, and no-JavaScript behavior are recorded in `docs/engineering-interaction.md`; captures and the report are in `.impeccable/review/engineering-pinned/`. The toolkit is a description list: each row groups one area term with technologies and context descriptions; decorative rules stay inside the term so description-list semantics remain valid. Hover strengthens only the row rule.

Experience combines dated roles, education, languages, and a native resume link with the supplied portrait and biography. Content and asset provenance are recorded in `docs/content-sources.md` and `docs/asset-manifest.md`; preserve source-backed facts and localized descriptions.

Contact provides a selectable, underlined email address and native mail action, a secondary copy action, and GitHub/resume links. The copy action is disabled before hydration and reports localized success or failure through a polite live status region with reserved height. The visible address remains the fallback when clipboard access fails. Footer links include GitHub, resume, the alternate locale, and a native back-to-top anchor. No form fields or chips are implemented.

Keyboard focus uses a 2px near-white outline offset by 6px. A focus-revealed skip link leads to main content. Interaction transitions last 180ms. Enhanced hero entrances use 680ms and `cubic-bezier(0.22, 1, 0.36, 1)`, with explicit delays from 80–540ms; header entrance uses 320ms and mobile menu reveal 180ms. The policy also defines 400ms small reveals and a 70ms stagger; the hero uses explicit delays. Phase 2 section enhancement reveals selected text with a 600ms horizontal clip and 70ms stagger capped at 280ms, while rules grow over 700ms. These play once on 15% intersection. Server content has no hidden initial state; JavaScript adds the effect only on intersection. A reduced-motion preference skips these effects and completes active animations if changed during playback. Engineering instead uses a 420ms internal-track transition, 360ms block color/border transitions, 440ms block assembly, and 700ms path tracing with the shared easing; all stop under reduced motion.

SonarGrid preserves the supplied two-pass resting/hot-dot algorithm, smoothstep wave energy, radius growth, and fade. Portfolio settings are 30px dot spacing above 767px and 38px below, 1.2px dot radius, 0.2 resting opacity, near-white color, a 5-second ambient interval, 230px/s speed, 100px wavefront width, and 1.8 growth amplitude. Ambient origins occupy `[0.12, 0.15, 0.88, 0.75]` of the field. At most two ambient and four total rings are retained; a seed ring starts mid-expansion. DPR caps at 2 on desktop/tablet and 1.5 on mobile. The declared 32px tablet spacing is not consumed by the current integration. Passive hero taps generate rings while interactive controls remain excluded. Hidden/offscreen states cancel animation and timers and freeze simulation time.

The hero’s manual motion control also clears sonar rings and renders a still grid; it stops entrances and resets depth/scroll transforms, while its desktop sticky shell remains. For the hero, reduced motion disables entrances, CSS transitions, smooth scrolling, transforms, and sticky travel. Its control is disabled with a reduced-motion label. Without JavaScript, content and the static dot fallback remain visible and the motion control is hidden.

## Do's and Don'ts

- **Do** preserve the approved palette, visible focus, native link behavior, and Turkish typography support.
- **Do** keep readable copy separate from product imagery and verify both locales when composition changes.
- **Do** keep meaningful content visible before enhancement and respect reduced motion.
- **Do** preserve the supplied SonarGrid algorithm, restrained portfolio settings, and quiet copy mask; retain the static field as a fallback.
- **Do** preserve carousel minimum heights, native scroll fallback, semantic matrix rows, and the chronology reading order across both locales.
- **Don't** add invented metrics, clients, availability claims, unsupported project links, or carousel autoplay.

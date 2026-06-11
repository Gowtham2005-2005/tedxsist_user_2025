# Design Document — TEDxSIST 2026 Update

## Overview

This design covers the five-area update to the TEDxSIST website transitioning it from the 2025 to the 2026 edition. The changes are entirely additive and content-focused — no new routes, no new external dependencies, and no modifications to the Firebase auth flow, API routes, or blog content.

The five areas are:

1. **Centralised registration state** — new `lib/registration-config.ts` exporting `REGISTRATION_OPEN` and `REGISTRATION_DATE`; all registration UI derives from it.
2. **2026 theme content** — replace "Resilience" copy across `StickyScroll.tsx`, `mobile.tsx`, and `ui/timeline.tsx`.
3. **Year reference sweep** — replace `2025` → `2026` in user-visible text in `FAQ.tsx`, `register/page.tsx`, `register/registerforms/page.tsx`, and `google-gemini-effect.tsx`.
4. **About page placeholder cleanup** — add 2026 tab to `PastSpeakers.tsx`, update `TeamSection.tsx` to eliminate raw "TBA"/"coming soon..." text.
5. **Subtle motion polish** — extend existing Framer Motion patterns in `google-gemini-effect.tsx` and `StickyScroll.tsx` for the hero top caption and theme title.

The project uses **Next.js 14 (App Router)**, **React**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Firebase**. All animation work reuses the existing `{ duration: 1, ease: [0.4, 0, 0.2, 1] }` variant pattern already present in the codebase.

---

## Architecture

### Single Config Source

A new file `lib/registration-config.ts` acts as the sole source of truth for registration state. Every UI component that currently embeds hardcoded registration strings (TopBanner, hero caption, Register page) is updated to read from this file instead.

```
lib/
  registration-config.ts   ← REGISTRATION_OPEN, REGISTRATION_DATE
```

No runtime flags, feature-flag services, or environment variables are introduced. The flag is a compile-time TypeScript constant. Changing `REGISTRATION_OPEN` from `false` to `true` (and redeploying) opens registration site-wide.

### Component Modification Map

| File | Change type | Requirement(s) |
|---|---|---|
| `lib/registration-config.ts` | **New file** | 1.1 |
| `components/TopBanner.tsx` | Replace flowbite placeholder with config-driven banner | 1.2, 1.3, 9.2 |
| `components/ui/google-gemini-effect.tsx` | Config-driven caption + CTA; animate caption | 1.4, 1.5, 9.1, 10.1, 10.3 |
| `app/register/page.tsx` | Guard on `REGISTRATION_OPEN`; year update | 1.6, 1.7, 1.8, 6.1 |
| `app/register/registerforms/page.tsx` | Year + date copy updates | 6.2, 6.3, 6.4, 6.5 |
| `components/StickyScroll.tsx` | Theme copy + animate theme title `whileInView` | 2.1–2.4, 10.2, 10.4 |
| `components/mobile.tsx` | Theme copy | 3.1–3.4 |
| `components/ui/timeline.tsx` | Upcoming event heading + description | 4.1–4.5 |
| `components/FAQ.tsx` | Year reference 2025 → 2026 | 5.1–5.4 |
| `components/PastSpeakers.tsx` | 2026 tab, TBA replacement | 7.1–7.6 |
| `components/TeamSection.tsx` | Rename tab, TBA replacement | 8.1–8.3 |

No files outside this list are modified.

---

## Components and Interfaces

### `lib/registration-config.ts`

```typescript
export const REGISTRATION_OPEN: boolean = false;
export const REGISTRATION_DATE: string = ""; // e.g. "15th January 2026"
```

All consuming components import with:

```typescript
import { REGISTRATION_OPEN, REGISTRATION_DATE } from "@/lib/registration-config";
```

### `TopBanner.tsx`

The current file contains a Flowbite placeholder example. It is replaced with a purpose-built dismissible banner component. The component:

- Reads `REGISTRATION_OPEN` and `REGISTRATION_DATE` from Registration_Config.
- When `false`: shows "Registrations Coming Soon" with no CTA link.
- When `true`: shows "Registration Open" with a "Register Now" link pointing to `/register`.

The component uses `useState` for dismiss state (matching existing codebase patterns), consistent Tailwind classes, and no Flowbite dependency.

### `google-gemini-effect.tsx` — Caption and CTA changes

Two targeted changes:

1. **Caption** (`motion.p` at the top): the hardcoded string `"Registrations Coming Soon! ✨"` is replaced with a conditional derived from `Registration_Config`:
   - If `REGISTRATION_OPEN === false` and `REGISTRATION_DATE` is non-empty: `"Registrations open on {REGISTRATION_DATE} ✨"`
   - If `REGISTRATION_OPEN === false` and `REGISTRATION_DATE` is empty: `"Registrations Coming Soon ✨"`
   - If `REGISTRATION_OPEN === true`: `"Registrations are Open! ✨"`

   The existing `motion.p` animation (`initial opacity 0, y 15 → 1, 0`) is preserved unchanged.

2. **CTA button**: label and click behaviour become conditional:
   - When `false`: label is `"Coming Soon"`, `onClick` is a no-op.
   - When `true`: label is `"Register"`, `onClick` navigates to `/register`.

   The existing `motion.div` wrapping the button (fade-slide-up, delay 1.6 s) is preserved unchanged.

### `app/register/page.tsx`

A registration-open guard is added at the top of the component, before the auth check:

```typescript
if (!REGISTRATION_OPEN) {
  return (
    <main className="...">
      <h1>Register for <span className="text-primary">TEDx</span>SIST 2026</h1>
      <p>
        {REGISTRATION_DATE
          ? `Registrations open on ${REGISTRATION_DATE}.`
          : "Registrations will open soon."}
      </p>
    </main>
  );
}
```

When `REGISTRATION_OPEN === true`, the existing auth + login flow renders exactly as before (no structural change). The heading is updated from "TEDxSIST 2025" to "TEDxSIST 2026" regardless of registration state.

### `app/register/registerforms/page.tsx`

Three text replacements:

| Location | Old text | New text |
|---|---|---|
| `<h2>` heading | TEDxSIST 2025 Registration | TEDxSIST 2026 Registration |
| Already-registered message | TEDx\</span\>SIST 2025 | TEDx\</span\>SIST 2026 |
| ATTENTION alert description | Feb 24, 2025 | 24th June 2026 |
| Toast on 409 response | TEDxSIST 2025 | TEDxSIST 2026 |

No logic changes — only string substitutions.

### `StickyScroll.tsx`

The `sections` array is updated:

- **Index 1** ("Our Vision & Impact"): description rewritten without "resilience" as a theme descriptor; community-impact language is preserved.
- **Index 2** ("Theme: Resilience" → "Theme: Opportunity in the Unknown"): title and description replaced with exact required copy.
- **Index 3** ("Why Attend TEDxSIST"): description rewritten to include at least one of the required keywords without "resilience".

The `motion.div` on the theme section title gets a `whileInView` trigger added, consistent with the existing pattern from other components (`mobile.tsx`, `FAQ.tsx`):

```typescript
initial="hidden"
whileInView="visible"
viewport={{ once: false, amount: 0.5 }}
```

using the existing `titleVariants` shape: `{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.4, 0, 0.2, 1] } } }`.

No new `motion` wrappers are added to paragraph text, cards, or list items.

### `mobile.tsx` (TEDxSections)

Same content changes as `StickyScroll.tsx` (theme title, description, Vision & Impact, Why Attend). No animation changes — the existing `motion.h1` `titleVariants` are preserved.

### `components/ui/timeline.tsx`

Only the first entry in `timelineData` (title: "Upcoming") is modified:

```typescript
{
  title: "Upcoming",
  content: {
    headingHighlight: "Opportunity in the Unknown",
    heading: ": Building the Unmasked",
    description: "In every uncertainty, there is a hidden opening to rethink, rebuild, and rediscover possibility. ..."
  }
}
```

The 2023 and 2022 entries are untouched.

### `FAQ.tsx`

Two changes:

1. The subtitle paragraph: `"TEDxSIST 2025"` → `"TEDxSIST 2026"`.
2. The `faqItems` array: the question `"How can I attend TEDxSIST 2025?"` is updated to `"...TEDxSIST 2026?"`. No other questions contain a standalone "2025" year reference.

All animations, styles, and structure are preserved.

### `PastSpeakers.tsx`

Three changes:

1. A new `2026` year is added to the `years` tuple as its first element: `[2026, 2025, 2023, 2022]`.
2. A `testimonials2026` array is added with a single placeholder entry:
   ```typescript
   { quote: "The 2026 speaker lineup will be revealed soon. Stay tuned for updates.", name: "TEDxSIST 2026", designation: "Coming Soon", src: "/sample.png" }
   ```
3. The `type Year` union and the `testimonialsByYear` record are expanded to include `2026`.
4. The tab for the year `2025` is relabelled `"2025 (Previous Edition)"`.
5. The initial active tab defaults to `"2026"` (it is the first element).
6. A `renderTestimonials` helper filters out any 2025 entries whose `name` or `designation` contains `"TBA"`, replacing them with: `{ quote: "Speaker details from the 2025 edition will be announced shortly.", name: "TEDxSIST 2025", designation: "Previous Edition", src: "/sample.png" }`.

### `TeamSection.tsx`

Two changes:

1. The tab label `"2025 Team"` is renamed to `"2026 Team"` in the `teams` array and the `TeamName` union type.
2. The `testimonialsByTeam["2026 Team"]` entry (currently a single placeholder) is left in place, but a `renderTeamMembers` helper is introduced that filters all testimonials across all tabs: any entry where `name`, `designation`, or `quote` contains `"TBA"` or `"coming soon..."` is replaced with `{ quote: "Team details for this edition will be announced shortly.", name: "—", designation: "—", src: "/sample.png" }`.

---

## Data Models

### RegistrationConfig

```typescript
// lib/registration-config.ts
export const REGISTRATION_OPEN: boolean = false;
export const REGISTRATION_DATE: string = "";
```

Semantics:

| `REGISTRATION_OPEN` | `REGISTRATION_DATE` | Behaviour |
|---|---|---|
| `false` | `""` | "Coming soon" with no date |
| `false` | `"15th Jan 2026"` | "Opens on 15th Jan 2026" |
| `true` | any | Registration flow active |

### ThemeContent

The 2026 theme copy used across `StickyScroll`, `mobile.tsx`, and `timeline.tsx`:

```
headingHighlight: "Opportunity in the Unknown"
heading suffix:   ": Building the Unmasked"   (timeline only)
description: "In every uncertainty, there is a hidden opening to rethink, rebuild,
  and rediscover possibility. Opportunity in the Unknown invites us to step beyond
  predictability and engage with ideas that challenge what we assume. Building the
  Unmasked explores what happens when individuals, systems, and communities reveal
  their most honest potential. Through bold conversations and fresh perspectives,
  TEDxSIST 2026 aims to turn ambiguity into action. This edition celebrates courage,
  clarity, and the power of shaping the future before it fully reveals itself."
```

### PlaceholderCard (PastSpeakers / TeamSection)

```typescript
interface PlaceholderCard {
  quote: string;     // polished interim copy
  name: string;      // "TEDxSIST 2026" or "—"
  designation: string;
  src: string;       // "/sample.png"
}
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

This feature involves conditional rendering logic driven by configuration and data, making several properties suitable for property-based testing. The library used is [**fast-check**](https://github.com/dubzzz/fast-check), the standard PBT library for TypeScript/JavaScript.

---

### Property 1: Registration date appears in the closed message

*For any* non-empty string value of `REGISTRATION_DATE`, when `REGISTRATION_OPEN` is `false` and the Register page is rendered, the rendered output SHALL contain the exact value of `REGISTRATION_DATE`.

**Validates: Requirements 1.10**

---

### Property 2: Hero caption derives from Registration_Config

*For any* `REGISTRATION_OPEN` value and any `REGISTRATION_DATE` string, the text rendered in the hero section top caption SHALL be determined solely by those config values and SHALL NOT be the hardcoded string `"Registrations Coming Soon! ✨"` when the config disagrees.

More precisely:
- When `REGISTRATION_OPEN === true`: caption contains an "open" message.
- When `REGISTRATION_OPEN === false` and `REGISTRATION_DATE` is non-empty: caption contains the value of `REGISTRATION_DATE`.
- When `REGISTRATION_OPEN === false` and `REGISTRATION_DATE` is empty: caption contains "Coming Soon" (generic, not a hardcoded date).

**Validates: Requirements 9.1**

---

### Property 3: FAQ year references are consistently 2026

*For any* FAQ items array, after the FAQ component processes the data:
- Every question or answer that contained the standalone string `"2025"` used as a year reference SHALL render as `"2026"` in that position.
- Every question or answer that did NOT contain `"2025"` SHALL render its text unchanged.

**Validates: Requirements 5.3, 5.4**

---

### Property 4: No raw "TBA" placeholders rendered in PastSpeakers

*For any* set of speaker data entries for the 2025 tab, including entries whose `name` or `designation` field contains the raw string `"TBA"`, the PastSpeakers component SHALL NOT render the string `"TBA"` as visible text in any card. Any such entry SHALL instead display the polished replacement copy.

**Validates: Requirements 7.4**

---

### Property 5: No raw placeholder text rendered in TeamSection

*For any* set of team member entries across any tab of the TeamSection component, including entries where `name`, `designation`, or `quote` contains `"TBA"` or `"coming soon..."`, the component SHALL NOT render those raw strings as visible text. Every such entry SHALL display the polished replacement message.

**Validates: Requirements 8.2, 8.3**

---

## Error Handling

### Registration state guard

When `REGISTRATION_OPEN === false`, the Register page guard renders an informational message without throwing or redirecting. If the `REGISTRATION_DATE` string is `null` or `undefined` (defensive against misconfiguration), the component falls back to the generic "coming soon" message rather than rendering the date.

### Placeholder replacement (PastSpeakers / TeamSection)

The TBA-replacement helpers are pure filter/map operations on the in-memory data arrays. They have no failure mode. If a future entry unexpectedly contains `null` in a name field, the field check `field?.includes("TBA")` safely returns `false` rather than throwing.

### TopBanner dismiss state

The banner uses local `useState` for the dismissed flag. No persistence is needed — the banner reappears on next page load, which is acceptable for an informational message.

### Animation errors

All new Framer Motion usage follows existing patterns. No new dependencies or experimental APIs are introduced, so no new failure modes exist.

---

## Testing Strategy

### Approach

This feature is primarily content and conditional rendering. The testing strategy is a combination of:

- **Property-based tests** (fast-check) for the five correctness properties above.
- **Example-based unit tests** (Jest + React Testing Library) for the specific binary conditional scenarios.
- **Smoke checks** (code review + build verification) for structural/animation requirements.

### Property-Based Tests

Each property maps to a single fast-check test with a minimum of **100 runs**. Tests are tagged with the feature and property number:

```
// Feature: tedxsist-2026-update, Property 1: Registration date appears in closed message
// Feature: tedxsist-2026-update, Property 2: Hero caption derives from Registration_Config
// Feature: tedxsist-2026-update, Property 3: FAQ year references are consistently 2026
// Feature: tedxsist-2026-update, Property 4: No raw "TBA" placeholders in PastSpeakers
// Feature: tedxsist-2026-update, Property 5: No raw placeholder text in TeamSection
```

**Property 1** — Generator: `fc.string({ minLength: 1 })` for `REGISTRATION_DATE`. Assertion: rendered string from `RegisterPage` (with `REGISTRATION_OPEN=false`) contains the date value.

**Property 2** — Generators: `fc.boolean()` for `REGISTRATION_OPEN`, `fc.string()` for `REGISTRATION_DATE`. Assertion: caption element text matches expected derived value; does NOT equal the hardcoded `"Registrations Coming Soon! ✨"` when config disagrees.

**Property 3** — Generator: `fc.array(fc.record({ question: fc.string(), answer: fc.string() }))`. FAQs are rendered, then the rendered output is checked: any source occurrence of `"2025"` becomes `"2026"`, all other text is unchanged.

**Property 4** — Generator: `fc.array(fc.record({ name: fc.string(), designation: fc.string(), quote: fc.string(), src: fc.constant("/sample.png") }))` mixed with entries where `name` or `designation` is `"TBA"`. Assertion: rendered output contains no literal `"TBA"` text.

**Property 5** — Same generator as Property 4, extended to include `"coming soon..."` in quote fields, applied across all team tabs.

### Example-Based Unit Tests

| Scenario | Test |
|---|---|
| TopBanner with `REGISTRATION_OPEN=false` | "Coming Soon" visible, no Register link |
| TopBanner with `REGISTRATION_OPEN=true` | "Registration Open" visible, `/register` link present |
| Hero CTA with `REGISTRATION_OPEN=false` | Button label "Coming Soon", no navigate on click |
| Hero CTA with `REGISTRATION_OPEN=true` | Button label "Register", navigates to `/register` |
| Register page, unauthenticated, closed | Info message shown, LoginForm not rendered |
| Register page, authenticated, closed | Info message shown, no redirect |
| Register page, open | Normal auth flow renders |
| FAQ subtitle contains "2026" | Assert text |
| PastSpeakers defaults to 2026 tab | Assert active tab on mount |
| PastSpeakers 2026 tab shows placeholder | Assert placeholder card text |
| TeamSection tab label is "2026 Team" | Assert tab title |
| Timeline upcoming entry headings | Assert exact strings |
| Navbar Register button always present | Assert button rendered |

### Smoke / Code-Review Checks

- `lib/registration-config.ts` exports `REGISTRATION_OPEN` and `REGISTRATION_DATE` with correct TypeScript types.
- `google-gemini-effect.tsx` motion variant on caption uses `duration: 1`, `ease: [0.4, 0, 0.2, 1]` or `[0.25, 0.4, 0.25, 1]` (matching existing pattern).
- `StickyScroll.tsx` theme section title uses `whileInView` with `viewport={{ once: false, amount: 0.5 }}`.
- No new `motion` wrappers on paragraph text, cards, or list items.
- Build (`next build`) passes with zero TypeScript errors.
- Footer copyright year remains `new Date().getFullYear()`.
- Blog links and Navbar structure are unchanged.

# Implementation Plan: TEDxSIST 2026 Update

## Overview

Incrementally update the TEDxSIST website from the 2025 to the 2026 edition across five areas: centralised registration state config, theme content replacement, year-reference sweep, About page placeholder cleanup, and subtle motion polish. All changes are additive and non-breaking — no new routes, no new external dependencies, and no modifications to Firebase auth, API routes, or blog content.

---

## Tasks

- [x] 1. Create centralised registration config and wire TopBanner
  - [x] 1.1 Create `lib/registration-config.ts` exporting `REGISTRATION_OPEN` and `REGISTRATION_DATE`
    - Add `export const REGISTRATION_OPEN: boolean = false` and `export const REGISTRATION_DATE: string = ""`
    - _Requirements: 1.1_
  - [x] 1.2 Rewrite `components/TopBanner.tsx` to read from Registration_Config
    - Remove the Flowbite placeholder; replace with a purpose-built dismissible banner using `useState` for dismiss state
    - When `REGISTRATION_OPEN === false`: show "Registrations Coming Soon" with no CTA link
    - When `REGISTRATION_OPEN === true`: show "Registration Open" with a "Register Now" link pointing to `/register`
    - Import `REGISTRATION_OPEN` and `REGISTRATION_DATE` from `@/lib/registration-config`
    - _Requirements: 1.1, 1.2, 1.3, 9.2_
  - [x] 1.3 Write unit tests for TopBanner conditional rendering
    - Test: `REGISTRATION_OPEN=false` → "Coming Soon" visible, no Register link
    - Test: `REGISTRATION_OPEN=true` → "Registration Open" visible, `/register` link present
    - _Requirements: 1.2, 1.3_

- [x] 2. Update hero caption and CTA in `google-gemini-effect.tsx`
  - [x] 2.1 Replace hardcoded caption string with config-derived conditional text
    - Import `REGISTRATION_OPEN` and `REGISTRATION_DATE` from `@/lib/registration-config`
    - Caption logic: `REGISTRATION_OPEN === true` → "Registrations are Open! ✨"; `false` + non-empty date → "Registrations open on {REGISTRATION_DATE} ✨"; `false` + empty date → "Registrations Coming Soon ✨"
    - Preserve the existing `motion.p` animation (`initial opacity 0, y 15 → 1, 0`) without modification
    - _Requirements: 1.4, 9.1, 10.1_
  - [x] 2.2 Make Hero_CTA button label and click behaviour conditional
    - When `REGISTRATION_OPEN === false`: label "Coming Soon", `onClick` is a no-op
    - When `REGISTRATION_OPEN === true`: label "Register", `onClick` navigates to `/register`
    - Preserve the existing `motion.div` wrapping and its fade-slide-up animation (delay 1.6 s) without modification
    - _Requirements: 1.4, 1.5, 10.3_
  - [x] 2.3 Write property test for hero caption (Property 2)
    - **Property 2: Hero caption derives from Registration_Config**
    - Generators: `fc.boolean()` for `REGISTRATION_OPEN`, `fc.string()` for `REGISTRATION_DATE`
    - Assert caption text matches expected derived value and does NOT equal the hardcoded string `"Registrations Coming Soon! ✨"` when config disagrees
    - **Validates: Requirements 9.1**
  - [x] 2.4 Write unit tests for Hero_CTA conditional behaviour
    - Test: `REGISTRATION_OPEN=false` → button label "Coming Soon", no navigation on click
    - Test: `REGISTRATION_OPEN=true` → button label "Register", navigates to `/register`
    - _Requirements: 1.4, 1.5_

- [x] 3. Add registration-open guard and year update to Register pages
  - [x] 3.1 Update `app/register/page.tsx` with REGISTRATION_OPEN guard and year copy
    - Import `REGISTRATION_OPEN` and `REGISTRATION_DATE` from `@/lib/registration-config`
    - Add guard at the top of the component: when `REGISTRATION_OPEN === false`, render an informational message ("Registrations are not yet open") before the auth check; include `REGISTRATION_DATE` in the message if non-empty, otherwise show "Registrations will open soon"
    - Update heading from "TEDxSIST 2025" to "TEDxSIST 2026" in all registration states
    - When `REGISTRATION_OPEN === true`, existing auth + login flow renders unchanged
    - _Requirements: 1.6, 1.7, 1.8, 1.10, 1.11, 6.1_
  - [x] 3.2 Write property test for registration date in closed message (Property 1)
    - **Property 1: Registration date appears in the closed message**
    - Generator: `fc.string({ minLength: 1 })` for `REGISTRATION_DATE`
    - Render `RegisterPage` with `REGISTRATION_OPEN=false` and assert the rendered output contains the exact `REGISTRATION_DATE` value
    - **Validates: Requirements 1.10**
  - [x] 3.3 Write unit tests for Register page guard
    - Test: unauthenticated user, `REGISTRATION_OPEN=false` → info message shown, LoginForm not rendered
    - Test: authenticated user, `REGISTRATION_OPEN=false` → info message shown, no redirect to `/register/registerforms`
    - Test: `REGISTRATION_OPEN=true` → normal auth flow renders
    - _Requirements: 1.6, 1.7, 1.8_
  - [x] 3.4 Update `app/register/registerforms/page.tsx` with 2026 year and date references
    - Replace heading "TEDxSIST 2025 Registration" → "TEDxSIST 2026 Registration"
    - Replace already-registered confirmation message occurrence of "TEDxSIST 2025" → "TEDxSIST 2026"
    - Update ATTENTION alert date from "Feb 24, 2025" → "24th June 2026"
    - Replace 409 duplicate-submission toast text "TEDxSIST 2025" → "TEDxSIST 2026"
    - No logic changes — string substitutions only
    - _Requirements: 6.2, 6.3, 6.4, 6.5_

- [x] 4. Checkpoint — verify registration config wiring
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Replace 2026 theme content on desktop (StickyScroll) and mobile (mobile.tsx)
  - [x] 5.1 Update `components/StickyScroll.tsx` with 2026 theme copy
    - Replace section title "Theme: Resilience" → "Theme: Opportunity in the Unknown"
    - Replace theme section description with the exact 2026 copy from Requirements 2.2
    - Rewrite "Our Vision & Impact" description to remove "resilience" as a theme descriptor (Requirements 2.3)
    - Rewrite "Why Attend TEDxSIST" description to include at least one of: "discovery", "curiosity", "courage", "future-building" and remove "resilience" (Requirements 2.4)
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  - [x] 5.2 Add `whileInView` animation to the theme section title in `StickyScroll.tsx`
    - Add a `titleVariants` shape: `{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.4, 0, 0.2, 1] } } }` on the theme section title `motion.div`
    - Use `whileInView="visible"` with `viewport={{ once: false, amount: 0.5 }}` consistent with the existing pattern
    - Do NOT add new `motion` wrappers to paragraph text, cards, or list items
    - _Requirements: 10.2, 10.4, 10.5_
  - [x] 5.3 Update `components/mobile.tsx` with 2026 theme copy
    - Same content changes as StickyScroll: theme title, theme description, Vision & Impact, Why Attend
    - Preserve the existing `motion.h1` `titleVariants` without modification
    - Do NOT add any new `motion` wrappers
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 10.4_

- [x] 6. Update Events page timeline upcoming entry
  - [x] 6.1 Modify the first (Upcoming) entry in `components/ui/timeline.tsx`
    - Set `headingHighlight` to "Opportunity in the Unknown"
    - Set `heading` to ": Building the Unmasked" (removing " – Exploring Human Experiences")
    - Replace description with the exact 2026 copy from Requirements 4.2
    - Leave `title: "Upcoming"` unchanged
    - Leave 2023 ("Uncharted Reality") and 2022 ("Merging Minds") entries untouched
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 11.5_

- [x] 7. Update FAQ year references
  - [x] 7.1 Update year references in `components/FAQ.tsx`
    - Replace "TEDxSIST 2025" → "TEDxSIST 2026" in the subtitle paragraph
    - Update question "How can I attend TEDxSIST 2025?" → "How can I attend TEDxSIST 2026?"
    - Scan all `faqItems` question and answer fields: replace any standalone "2025" year reference with "2026"
    - Preserve all questions and answers whose text does not contain a standalone "2025" reference
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 11.7_
  - [x] 7.2 Write property test for FAQ year references (Property 3)
    - **Property 3: FAQ year references are consistently 2026**
    - Generator: `fc.array(fc.record({ question: fc.string(), answer: fc.string() }))`
    - Assert every source occurrence of standalone "2025" renders as "2026"; all other text is unchanged
    - **Validates: Requirements 5.3, 5.4**

- [x] 8. Checkpoint — verify theme and year-reference changes
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Clean up About page — PastSpeakers tab
  - [x] 9.1 Add 2026 tab and update PastSpeakers in `components/PastSpeakers.tsx`
    - Add `2026` as the first element of the `years` tuple: `[2026, 2025, 2023, 2022]`
    - Expand `type Year` union and `testimonialsByYear` record to include `2026`
    - Add `testimonials2026` array with a single placeholder: `{ quote: "The 2026 speaker lineup will be revealed soon. Stay tuned for updates.", name: "TEDxSIST 2026", designation: "Coming Soon", src: "/sample.png" }`
    - Relabel the 2025 tab button to "2025 (Previous Edition)"
    - Default initial active tab to `2026` (first element)
    - Add a `renderTestimonials` helper that filters 2025 entries: any entry whose `name` or `designation` contains `"TBA"` is replaced with `{ quote: "Speaker details from the 2025 edition will be announced shortly.", name: "TEDxSIST 2025", designation: "Previous Edition", src: "/sample.png" }`
    - Leave 2023 and 2022 tab content unchanged
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_
  - [x] 9.2 Write property test for PastSpeakers TBA replacement (Property 4)
    - **Property 4: No raw "TBA" placeholders rendered in PastSpeakers**
    - Generator: `fc.array(fc.record({ name: fc.string(), designation: fc.string(), quote: fc.string(), src: fc.constant("/sample.png") }))` mixed with entries where `name` or `designation` is `"TBA"`
    - Assert rendered output contains no literal `"TBA"` text
    - **Validates: Requirements 7.4**
  - [x] 9.3 Write unit tests for PastSpeakers tab state
    - Test: defaults to 2026 tab on initial mount
    - Test: 2026 tab shows single placeholder card with expected copy
    - Test: 2025 tab label reads "2025 (Previous Edition)"
    - _Requirements: 7.1, 7.2, 7.3, 7.6_

- [x] 10. Clean up About page — TeamSection tab
  - [x] 10.1 Rename tab and add TBA guard in `components/TeamSection.tsx`
    - Rename tab label and `TeamName` union from "2025 Team" → "2026 Team" in the `teams` array
    - Introduce a `renderTeamMembers` helper that, for ALL tabs, replaces any entry where `name`, `designation`, or `quote` contains `"TBA"` or `"coming soon..."` with: `{ quote: "Team details for this edition will be announced shortly.", name: "—", designation: "—", src: "/sample.png" }`
    - Apply `renderTeamMembers` to every tab's testimonial list
    - _Requirements: 8.1, 8.2, 8.3_
  - [x] 10.2 Write property test for TeamSection placeholder replacement (Property 5)
    - **Property 5: No raw placeholder text rendered in TeamSection**
    - Same generator as Property 4, extended to include `"coming soon..."` in `quote` fields, applied across all team tabs
    - Assert rendered output contains no literal `"TBA"` or `"coming soon..."` text
    - **Validates: Requirements 8.2, 8.3**
  - [x] 10.3 Write unit tests for TeamSection
    - Test: tab label reads "2026 Team"
    - Test: entries with `"TBA"` in name/designation/quote are replaced with polished copy across all tabs
    - _Requirements: 8.1, 8.2, 8.3_

- [x] 11. Final checkpoint — full build and test sweep
  - Run `next build` and verify zero TypeScript errors
  - Ensure all tests pass, ask the user if questions arise.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation after logical groups of changes
- Property tests (fast-check, ≥100 runs each) validate universal correctness properties for the five conditional-rendering behaviours
- Unit tests validate specific binary scenarios for TopBanner, Hero CTA, Register page guard, PastSpeakers, and TeamSection
- No new routes, external dependencies, Firebase changes, API route changes, or blog content changes are introduced
- Footer copyright year must remain `new Date().getFullYear()` — do not hardcode it
- Navbar structure, logo, blog dropdown links, and 2023/2022 event entries must remain unchanged

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "2.1", "3.1", "5.1", "5.3", "6.1", "7.1", "9.1", "10.1"] },
    { "id": 2, "tasks": ["1.3", "2.2", "3.4", "5.2"] },
    { "id": 3, "tasks": ["2.3", "2.4", "3.2", "3.3", "7.2", "9.2", "9.3", "10.2", "10.3"] }
  ]
}
```

# Requirements Document

## Introduction

This feature updates the TEDxSIST website from the 2025 edition to the 2026 edition. The changes cover five areas:

1. **Registration state centralisation** — eliminate the conflict between simultaneous "Registrations Coming Soon" and "Registration Open" messaging by introducing a single config source that all registration-related UI derives from.
2. **Theme content replacement** — replace all "Resilience" / TEDxSIST 2025 theme content on the Home, Events, and mobile sections with the 2026 theme "Opportunity in the Unknown" and supporting concept "Building the Unmasked".
3. **Year reference sweep** — update every user-visible year reference, badge, intro line, and nav item from 2025 to 2026, while keeping blog content, past-event sections (2023, 2022), and footer copyright logic unchanged.
4. **About page placeholder cleanup** — replace raw "TBA" and "coming soon..." placeholders in the Past Speakers and Our Team tabs with polished interim copy; add a 2026 tab placeholder where appropriate.
5. **Light motion polish** — add subtle reveal animations to the hero text, theme section, and CTA buttons only, preserving all existing animations and the overall visual identity.

---

## Glossary

- **Registration_Config**: A centralised configuration object (TypeScript constants file) that exposes `REGISTRATION_OPEN: boolean` and optionally `REGISTRATION_DATE: string`. All registration UI components read from this single source.
- **TopBanner**: The dismissible banner rendered at the top of every page that communicates registration status.
- **Hero_CTA**: The primary call-to-action button in the hero section (currently labelled "Register") rendered inside `google-gemini-effect.tsx`.
- **Register_Page**: The page at `/register` that shows either the login form or a "registrations not yet open" state, determined by `Registration_Config`.
- **RegisterForms_Page**: The authenticated form page at `/register/registerforms`.
- **Theme_Section**: The sticky-scroll section and its mobile equivalent that describes the current edition's theme.
- **StickyScroll**: The desktop sticky scroll component (`StickyScroll.tsx`) containing four content sections including the theme block.
- **TEDxSections**: The mobile card-based component (`mobile.tsx`) mirroring the content of `StickyScroll`.
- **Timeline**: The events page timeline component (`ui/timeline.tsx`) listing the upcoming event and past events.
- **FAQ_Component**: The accordion FAQ section (`FAQ.tsx`) used on both the home page and the `/faq` route.
- **PastSpeakers**: The tabbed speakers component on the About page (`PastSpeakers.tsx`).
- **TeamSection**: The tabbed team component on the About page (`TeamSection.tsx`).
- **Navbar_Register_Button**: The "Register" button in the desktop Navbar and its mobile equivalent.
- **Footer**: The site footer (`Footer.tsx`), whose copyright year is dynamically set from `new Date().getFullYear()` and must remain unchanged.

---

## Requirements

### Requirement 1: Centralised Registration State Configuration

**User Story:** As a developer, I want all registration-related UI to derive from a single boolean config, so that I can enable or disable registration across the entire site by changing one value.

#### Acceptance Criteria

1. THE Registration_Config SHALL export `REGISTRATION_OPEN: boolean` and `REGISTRATION_DATE: string` from a single source file, and all registration-related UI components SHALL import from that source.
2. WHEN `REGISTRATION_OPEN` is `false`, THE TopBanner SHALL display a "Registrations Coming Soon" message and SHALL NOT display a "Register Now" call-to-action link.
3. WHEN `REGISTRATION_OPEN` is `true`, THE TopBanner SHALL display a "Registration Open" message and SHALL display a "Register Now" call-to-action link pointing to `/register`.
4. WHEN `REGISTRATION_OPEN` is `false`, THE Hero_CTA button SHALL display the label "Coming Soon" and SHALL NOT navigate to any page when clicked.
5. WHEN `REGISTRATION_OPEN` is `true`, THE Hero_CTA button SHALL navigate to `/register` on click.
6. WHEN `REGISTRATION_OPEN` is `false` and an unauthenticated user navigates to `/register`, THE Register_Page SHALL display a "Registrations are not yet open" informational message and SHALL NOT render the login form.
7. WHEN `REGISTRATION_OPEN` is `false` and an authenticated user navigates to `/register`, THE Register_Page SHALL display the same "Registrations are not yet open" informational message and SHALL NOT redirect to `/register/registerforms`.
8. WHEN `REGISTRATION_OPEN` is `true` and the user navigates to `/register`, THE Register_Page SHALL render the existing authentication and login flow unchanged.
9. THE Navbar_Register_Button SHALL remain visible in all states and SHALL navigate to `/register`; the Register_Page itself governs the experience based on `REGISTRATION_OPEN`.
10. IF `REGISTRATION_DATE` is a non-empty string, THEN THE Register_Page "Registrations are not yet open" message SHALL include the value of `REGISTRATION_DATE` as the opening date.
11. IF `REGISTRATION_DATE` is an empty string, THEN THE Register_Page SHALL display a generic "Registrations will open soon" message without a date.

---

### Requirement 2: 2026 Theme Content on Home Page (Desktop)

**User Story:** As a site visitor, I want the Home page to present the 2026 theme "Opportunity in the Unknown" with its supporting concept and copy, so that the current edition is accurately represented.

#### Acceptance Criteria

1. THE StickyScroll SHALL replace the section titled "Theme: Resilience" with a section titled "Theme: Opportunity in the Unknown".
2. THE StickyScroll theme section description SHALL contain the exact copy: "In every uncertainty, there is a hidden opening to rethink, rebuild, and rediscover possibility. Opportunity in the Unknown invites us to step beyond predictability and engage with ideas that challenge what we assume. Building the Unmasked explores what happens when individuals, systems, and communities reveal their most honest potential. Through bold conversations and fresh perspectives, TEDxSIST 2026 aims to turn ambiguity into action. This edition celebrates courage, clarity, and the power of shaping the future before it fully reveals itself."
3. THE StickyScroll "Our Vision & Impact" section description SHALL NOT contain the word "resilience" used as a theme name or descriptor; other community-impact language is permitted.
4. THE StickyScroll "Why Attend TEDxSIST" section description SHALL contain at least one of the words "discovery", "curiosity", "courage", or "future-building" and SHALL NOT contain the word "resilience".

---

### Requirement 3: 2026 Theme Content on Home Page (Mobile)

**User Story:** As a mobile site visitor, I want the same 2026 theme copy as desktop users, so that the experience is consistent regardless of device.

#### Acceptance Criteria

1. THE TEDxSections component SHALL replace the section titled "Theme: Resilience" with a section titled "Theme: Opportunity in the Unknown".
2. THE TEDxSections theme section description SHALL contain the exact copy: "In every uncertainty, there is a hidden opening to rethink, rebuild, and rediscover possibility. Opportunity in the Unknown invites us to step beyond predictability and engage with ideas that challenge what we assume. Building the Unmasked explores what happens when individuals, systems, and communities reveal their most honest potential. Through bold conversations and fresh perspectives, TEDxSIST 2026 aims to turn ambiguity into action. This edition celebrates courage, clarity, and the power of shaping the future before it fully reveals itself."
3. THE TEDxSections "Our Vision & Impact" section description SHALL NOT contain the word "resilience".
4. THE TEDxSections "Why Attend TEDxSIST" section description SHALL contain at least one of the words "discovery", "curiosity", "courage", or "future-building" and SHALL NOT contain the word "resilience".

---

### Requirement 4: Events Page — Upcoming Event Update

**User Story:** As a site visitor, I want the upcoming event on the Events page to reflect the 2026 theme title and description, so that I can understand what the next event is about.

#### Acceptance Criteria

1. THE Timeline upcoming entry `headingHighlight` field SHALL be set to "Opportunity in the Unknown" and the `heading` field SHALL be set to "Building the Unmasked", replacing the previous values.
2. THE Timeline upcoming entry description SHALL contain the exact copy: "In every uncertainty, there is a hidden opening to rethink, rebuild, and rediscover possibility. Opportunity in the Unknown invites us to step beyond predictability and engage with ideas that challenge what we assume. Building the Unmasked explores what happens when individuals, systems, and communities reveal their most honest potential. Through bold conversations and fresh perspectives, TEDxSIST 2026 aims to turn ambiguity into action. This edition celebrates courage, clarity, and the power of shaping the future before it fully reveals itself."
3. THE Timeline upcoming entry `title` label SHALL remain "Upcoming" and the old heading suffix " – Exploring Human Experiences" SHALL NOT appear in any field of the upcoming entry.
4. THE Timeline 2023 entry ("Uncharted Reality") SHALL remain unchanged.
5. THE Timeline 2022 entry ("Merging Minds: League of Castaways") SHALL remain unchanged.

---

### Requirement 5: FAQ Year Reference Update

**User Story:** As a site visitor, I want the FAQ section to reference TEDxSIST 2026 so that the page feels current and accurate.

#### Acceptance Criteria

1. THE FAQ_Component subtitle paragraph SHALL contain the text "TEDxSIST 2026" and SHALL NOT contain the text "TEDxSIST 2025".
2. THE FAQ_Component question that currently reads "How can I attend TEDxSIST 2025?" SHALL be updated to read "How can I attend TEDxSIST 2026?".
3. WHEN any FAQ question or answer field contains the standalone string "2025" used as a year reference, THE FAQ_Component SHALL replace that occurrence with "2026".
4. THE FAQ_Component SHALL preserve all existing questions and answers whose text does not contain a standalone "2025" year reference.

---

### Requirement 6: Register Page Year Reference Update

**User Story:** As a user on the Register page, I want all visible text to refer to TEDxSIST 2026 so that I know I am registering for the correct edition.

#### Acceptance Criteria

1. THE Register_Page heading SHALL read "Register for TEDxSIST 2026" (replacing "TEDxSIST 2025").
2. THE RegisterForms_Page heading SHALL read "TEDxSIST 2026 Registration" (replacing "TEDxSIST 2025 Registration").
3. WHEN the user has already registered, THE RegisterForms_Page confirmation message SHALL contain the text "TEDxSIST 2026".
4. THE RegisterForms_Page ATTENTION alert SHALL update the event date reference from "Feb 24, 2025" to "24th June 2026".
5. WHEN a user attempts to register a second time and receives a duplicate-submission error notification, THE notification text SHALL contain "TEDxSIST 2026" and SHALL NOT contain "TEDxSIST 2025".

---

### Requirement 7: About Page — Past Speakers Tab Cleanup

**User Story:** As a site visitor browsing the About page, I want the Past Speakers section to present polished interim copy for the 2026 lineup rather than raw placeholder text, so that the page looks professional.

#### Acceptance Criteria

1. THE PastSpeakers component SHALL add a "2026" tab as the first tab in the year list.
2. WHEN the "2026" tab is active, THE PastSpeakers component SHALL display a single card with the message "The 2026 speaker lineup will be revealed soon. Stay tuned for updates." and a placeholder image.
3. THE PastSpeakers "2025" tab label SHALL read "2025 (Previous Edition)".
4. WHEN the "2025" tab is active, THE PastSpeakers component SHALL NOT display any card whose speaker name or description field contains the raw string "TBA"; instead, any such entry SHALL be replaced with a card displaying the copy "Speaker details from the 2025 edition will be announced shortly."
5. THE PastSpeakers 2023 and 2022 tab content SHALL remain unchanged.
6. THE PastSpeakers component SHALL default to displaying the "2026" tab on initial load.

---

### Requirement 8: About Page — Our Team Tab Cleanup

**User Story:** As a site visitor browsing the About page, I want the Our Team section to show polished interim copy rather than raw "TBA" placeholder text, so that the page looks professional.

#### Acceptance Criteria

1. THE TeamSection component tab label for the current edition SHALL read "2026 Team" instead of "2025 Team".
2. WHEN the "2026 Team" tab is active, THE TeamSection SHALL NOT render any member card whose `name`, `designation`, or `quote` field contains the raw strings "TBA" or "coming soon..."; instead, the entire card SHALL display the message "Team details for this edition will be announced shortly."
3. THE TeamSection SHALL apply criterion 2's replacement check to all tabs, not just the "2026 Team" tab, so that no raw "TBA" or "coming soon..." values are ever rendered directly as visible text.

---

### Requirement 9: Consistent 2026 Branding Across Visible UI

**User Story:** As a site visitor, I want all visible UI elements to consistently reference 2026 as the active edition, so that there is no confusion between past and current editions.

#### Acceptance Criteria

1. THE Hero_CTA section top caption SHALL reference the current registration state message (from `Registration_Config`) rather than the hardcoded "Registrations Coming Soon! ✨" string.
2. THE TopBanner SHALL derive its content from `Registration_Config` and SHALL NOT contain hardcoded year-specific messaging independent of the config.
3. WHEN the Blogs dropdown in the Navbar displays the featured blog card, the label "TEDxSIST 2025: Resilience" SHALL remain unchanged as it refers to a historical blog post and not the active edition.
4. THE Footer copyright year SHALL remain dynamically derived from `new Date().getFullYear()` and SHALL NOT be hardcoded to any specific year.

---

### Requirement 10: Subtle Reveal Animations for Key Elements

**User Story:** As a site visitor, I want the hero text, theme section heading, and CTA buttons to animate in smoothly on page load, so that the page feels polished without being overdesigned.

#### Acceptance Criteria

1. THE Hero section title ("TEDxSIST 2026") and typewriter subtitle SHALL animate in with a fade-and-slide-up effect on page load; existing animation code in the hero component SHALL be preserved without modification.
2. THE StickyScroll theme section title SHALL animate in with a fade-and-slide-up effect when it enters the viewport, using `framer-motion`'s `whileInView` trigger consistent with the existing animation pattern in `StickyScroll.tsx`.
3. THE Hero_CTA button SHALL animate in with a fade-and-slide-up effect on page load; existing animation code in the hero component SHALL be preserved without modification.
4. THE StickyScroll and TEDxSections components SHALL NOT introduce new `motion` wrappers or animation variants on paragraph text, cards, or list items beyond what is already present in the unmodified source.
5. IF new `motion` variants are introduced, THEN THE variants SHALL use `framer-motion`, set `duration` to `1`, and set `ease` to `[0.4, 0, 0.2, 1]`, matching the existing codebase pattern.

---

### Requirement 11: Preservation of Existing Design and Functionality

**User Story:** As the site owner, I want all changes to be additive and non-breaking, so that the responsive layout, visual identity, and existing feature set remain intact.

#### Acceptance Criteria

1. WHEN any modified page is viewed at mobile (≤768 px), tablet (769–1024 px), and desktop (≥1025 px) breakpoints, THE layout SHALL not exhibit overflow, overlapping elements, or broken flex/grid structures.
2. FOR any component whose source file is NOT modified by this feature, THE existing Framer Motion animation variants and timing SHALL remain identical to the unmodified source.
3. THE Firebase authentication flow, registration API endpoint (`/api/register`), and subscription API endpoint (`/api/subscribe`) SHALL not be modified.
4. THE blog content, blog slugs, and Navbar blog dropdown links SHALL not be modified.
5. THE Events page 2023 and 2022 past-event entries SHALL not be modified.
6. THE Navbar logo, navigation link labels, and navigation link order SHALL not be modified.
7. WHEN a component is shared across multiple pages (e.g. `FAQ_Component` renders on both `/` and `/faq`), THE content change SHALL be visible on every page that renders that component.

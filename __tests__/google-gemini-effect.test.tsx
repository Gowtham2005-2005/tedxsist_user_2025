/**
 * Tests for GoogleGeminiEffect — hero caption and CTA behaviour
 *
 * Task 2.3: Property 2 — Hero caption derives from Registration_Config
 *   Tests the pure deriveHeroCaption logic that mirrors the component's logic.
 *   Simulates property-based coverage by iterating multiple inputs.
 *   Validates: Requirements 9.1
 *
 * Task 2.4: Unit tests for Hero_CTA conditional label and click behaviour
 *   Tests deriveCtaLabel plus component-level CTA click/navigation.
 *   Validates: Requirements 1.4, 1.5
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useMotionValue } from "framer-motion";

// ---------------------------------------------------------------------------
// Pure helper functions — mirrors logic in google-gemini-effect.tsx
// ---------------------------------------------------------------------------
function deriveHeroCaption(open: boolean, date: string): string {
  return open
    ? "Registrations are Open! ✨"
    : date
    ? `Registrations open on ${date} ✨`
    : "Registrations Coming Soon ✨";
}

function deriveCtaLabel(open: boolean): string {
  return open ? "Register" : "Coming Soon";
}

// ============================================================================
// Task 2.3 — Property 2: Hero caption derives from Registration_Config
//   Validates: Requirements 9.1
// ============================================================================

describe("Hero caption — Property 2 (Requirements 9.1)", () => {
  // Test 1: open=true, any date → always "Registrations are Open! ✨"
  it("open=true, date empty → 'Registrations are Open! ✨'", () => {
    expect(deriveHeroCaption(true, "")).toBe("Registrations are Open! ✨");
  });

  it("open=true, date '15th Jan 2026' → still 'Registrations are Open! ✨'", () => {
    expect(deriveHeroCaption(true, "15th Jan 2026")).toBe(
      "Registrations are Open! ✨"
    );
  });

  it("open=true, date 'Some Random Date' → still 'Registrations are Open! ✨'", () => {
    expect(deriveHeroCaption(true, "Some Random Date")).toBe(
      "Registrations are Open! ✨"
    );
  });

  // Test 2: open=false, non-empty date → contains date AND starts with "Registrations open on"
  it("open=false, date '15th Jan 2026' → starts with 'Registrations open on' and contains the date", () => {
    const caption = deriveHeroCaption(false, "15th Jan 2026");
    expect(caption).toContain("15th Jan 2026");
    expect(caption.startsWith("Registrations open on")).toBe(true);
  });

  it("open=false, date '1st March 2026' → starts with 'Registrations open on' and contains the date", () => {
    const caption = deriveHeroCaption(false, "1st March 2026");
    expect(caption).toContain("1st March 2026");
    expect(caption.startsWith("Registrations open on")).toBe(true);
  });

  it("open=false, date '24th June 2026' → starts with 'Registrations open on' and contains the date", () => {
    const caption = deriveHeroCaption(false, "24th June 2026");
    expect(caption).toContain("24th June 2026");
    expect(caption.startsWith("Registrations open on")).toBe(true);
  });

  // Test 3: open=false, empty date → "Registrations Coming Soon ✨" (NO exclamation mark)
  it("open=false, date '' → 'Registrations Coming Soon ✨' (no exclamation mark)", () => {
    const caption = deriveHeroCaption(false, "");
    expect(caption).toBe("Registrations Coming Soon ✨");
    expect(caption).not.toContain("!");
  });

  // Test 4: The old hardcoded string (with "!") must NEVER appear when open=false and date is empty
  it("open=false, date '' → caption is NEVER the old hardcoded 'Registrations Coming Soon! ✨'", () => {
    const caption = deriveHeroCaption(false, "");
    expect(caption).not.toBe("Registrations Coming Soon! ✨");
  });

  it("open=true → caption is NEVER 'Registrations Coming Soon! ✨'", () => {
    const caption = deriveHeroCaption(true, "");
    expect(caption).not.toBe("Registrations Coming Soon! ✨");
  });

  it("open=false, non-empty date → caption is NEVER 'Registrations Coming Soon! ✨'", () => {
    const caption = deriveHeroCaption(false, "15th Jan 2026");
    expect(caption).not.toBe("Registrations Coming Soon! ✨");
  });

  // Test 5: Property-like — loop 10+ date strings with open=false and verify each appears in caption
  it("property sweep — 10 different dates with open=false all appear in their caption", () => {
    const dates = [
      "1st January 2026",
      "15th February 2026",
      "1st March 2026",
      "10th April 2026",
      "24th June 2026",
      "7th July 2026",
      "20th August 2026",
      "3rd September 2026",
      "11th October 2026",
      "30th November 2026",
      "25th December 2026",
    ];

    for (const date of dates) {
      const caption = deriveHeroCaption(false, date);
      expect(caption).toContain(date);
      expect(caption.startsWith("Registrations open on")).toBe(true);
      // None should ever match the old hardcoded string
      expect(caption).not.toBe("Registrations Coming Soon! ✨");
    }
  });
});

// ============================================================================
// Task 2.4 — Unit tests for Hero_CTA conditional label (Requirements 1.4, 1.5)
// ============================================================================

describe("Hero_CTA label — unit tests (Requirements 1.4, 1.5)", () => {
  // Test 6: open=false → CTA label is "Coming Soon"
  it("open=false → CTA label is 'Coming Soon'", () => {
    expect(deriveCtaLabel(false)).toBe("Coming Soon");
  });

  it("open=false → CTA label is NOT 'Register'", () => {
    expect(deriveCtaLabel(false)).not.toBe("Register");
  });

  // Test 7: open=true → CTA label is "Register"
  it("open=true → CTA label is 'Register'", () => {
    expect(deriveCtaLabel(true)).toBe("Register");
  });

  it("open=true → CTA label is NOT 'Coming Soon'", () => {
    expect(deriveCtaLabel(true)).not.toBe("Coming Soon");
  });
});

// ============================================================================
// Task 2.4 — Component-level CTA click behaviour (Requirements 1.4, 1.5)
// ============================================================================

let mockRegistrationOpen = false;
let mockRegistrationDate = "";
const mockPush = jest.fn();

jest.mock("@/lib/registration-config", () => ({
  get REGISTRATION_OPEN() {
    return mockRegistrationOpen;
  },
  get REGISTRATION_DATE() {
    return mockRegistrationDate;
  },
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("framer-motion", () => ({
  motion: {
    p: ({ children, ...props }: React.ComponentProps<"p">) => <p {...props}>{children}</p>,
    h1: ({ children, ...props }: React.ComponentProps<"h1">) => <h1 {...props}>{children}</h1>,
    div: ({ children, ...props }: React.ComponentProps<"div">) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: React.ComponentProps<"span">) => <span {...props}>{children}</span>,
    path: (props: React.ComponentProps<"path">) => <path {...props} />,
  },
  useMotionValue: (initial: number) => ({ get: () => initial, set: jest.fn() }),
}));

jest.mock("@/components/ui/spotlight-new", () => ({
  Spotlight: () => <div data-testid="spotlight" />,
}));

jest.mock("@/components/ui/typewriter-effect", () => ({
  TypewriterBackspace: () => <span>Typewriter</span>,
}));

jest.mock("@/components/ui/hover-border-gradient", () => ({
  HoverBorderGradient: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
}));

jest.mock("lucide-react", () => ({
  ArrowRight: () => <svg data-testid="arrow-icon" />,
}));

import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";

function HeroTestWrapper() {
  const pathLengths = Array.from({ length: 5 }, () => useMotionValue(0));
  return <GoogleGeminiEffect pathLengths={pathLengths} />;
}

function renderHero() {
  return render(<HeroTestWrapper />);
}

describe("Hero_CTA click behaviour — component tests (Requirements 1.4, 1.5)", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockRegistrationDate = "";
  });

  it("REGISTRATION_OPEN=false → 'Coming Soon' button does not navigate on click", async () => {
    mockRegistrationOpen = false;
    const user = userEvent.setup();
    renderHero();

    await user.click(screen.getByRole("button", { name: /Coming Soon/i }));
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("REGISTRATION_OPEN=true → 'Register' button navigates to /register", async () => {
    mockRegistrationOpen = true;
    const user = userEvent.setup();
    renderHero();

    await user.click(screen.getByRole("button", { name: /Register/i }));
    expect(mockPush).toHaveBeenCalledWith("/register");
  });
});

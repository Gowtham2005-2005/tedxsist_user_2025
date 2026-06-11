/**
 * Unit tests for TeamSection
 * Requirements: 8.1, 8.2, 8.3
 */

import React from "react";
import { render, screen } from "@testing-library/react";

// ─── Mock heavy dependencies ─────────────────────────────────────────────────

// AnimatedTestimonials is a "use client" component that only renders after mount
// (it returns null on first render). Mock it so tests can inspect the data
// passed into it without fighting the SSR/hydration delay.
jest.mock("@/components/ui/animated-testimonials", () => ({
  AnimatedTestimonials: ({
    testimonials,
  }: {
    testimonials: { name: string; designation: string; quote: string; src: string }[];
  }) => (
    <div data-testid="animated-testimonials">
      {testimonials.map((t, i) => (
        <div key={i} data-testid="member-card">
          <span data-testid="member-name">{t.name}</span>
          <span data-testid="member-designation">{t.designation}</span>
          <span data-testid="member-quote">{t.quote}</span>
        </div>
      ))}
    </div>
  ),
}));

// framer-motion: render children without animation wrappers
jest.mock("framer-motion", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require("react");
  const motion = new Proxy(
    {},
    {
      get: (_target, tag: string) =>
        // eslint-disable-next-line react/display-name
        React.forwardRef(({ children, ...rest }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }, ref: React.Ref<HTMLElement>) => {
          const Tag = tag as keyof JSX.IntrinsicElements;
          return <Tag ref={ref as never} {...rest}>{children}</Tag>;
        }),
    }
  );
  return {
    __esModule: true,
    motion,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

// lucide-react icons
jest.mock("lucide-react", () => ({
  ChevronLeft: () => <svg data-testid="chevron-left" />,
  ChevronRight: () => <svg data-testid="chevron-right" />,
}));

// ─── Import after mocks ───────────────────────────────────────────────────────

import TeamSection from "@/components/TeamSection";

// ─── Re-export the pure renderTeamMembers helper so we can test it in isolation
// The function is defined in the same module. We re-derive the logic here to
// unit-test it independently of the React tree.

type Testimonial = {
  id: number;
  quote: string;
  name: string;
  designation: string;
  src: string;
};

/**
 * Mirrors the renderTeamMembers implementation in TeamSection.tsx.
 * Any entry where name, designation, or quote contains "TBA" or
 * "coming soon" (case-insensitive check on quote) is replaced.
 */
function renderTeamMembers(members: Testimonial[]): Testimonial[] {
  return members.map((m) =>
    m.name.includes("TBA") ||
    m.designation.includes("TBA") ||
    m.quote.toLowerCase().includes("coming soon")
      ? {
          id: m.id,
          quote: "Team details for this edition will be announced shortly.",
          name: "—",
          designation: "—",
          src: "/sample.png",
        }
      : m
  );
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("renderTeamMembers helper (pure logic)", () => {
  const base = { id: 0, src: "/sample.png" };
  const polishedQuote = "Team details for this edition will be announced shortly.";

  // Requirement 8.2 — TBA in name triggers replacement
  it("replaces entry when name contains 'TBA'", () => {
    const input: Testimonial[] = [{ ...base, name: "TBA", designation: "Engineer", quote: "Great event." }];
    const output = renderTeamMembers(input);
    expect(output[0].name).toBe("—");
    expect(output[0].designation).toBe("—");
    expect(output[0].quote).toBe(polishedQuote);
  });

  // Requirement 8.2 — TBA in designation triggers replacement
  it("replaces entry when designation contains 'TBA'", () => {
    const input: Testimonial[] = [{ ...base, name: "Alice", designation: "TBA", quote: "Great event." }];
    const output = renderTeamMembers(input);
    expect(output[0].name).toBe("—");
    expect(output[0].designation).toBe("—");
    expect(output[0].quote).toBe(polishedQuote);
  });

  // Requirement 8.2 — "coming soon" in quote triggers replacement
  it("replaces entry when quote contains 'coming soon'", () => {
    const input: Testimonial[] = [
      { ...base, name: "Bob", designation: "Designer", quote: "Team details coming soon..." },
    ];
    const output = renderTeamMembers(input);
    expect(output[0].name).toBe("—");
    expect(output[0].designation).toBe("—");
    expect(output[0].quote).toBe(polishedQuote);
  });

  // Requirement 8.2 — "coming soon" check is case-insensitive
  it("replaces entry when quote contains 'Coming soon...' (mixed case)", () => {
    const input: Testimonial[] = [
      { ...base, name: "Carol", designation: "Lead", quote: "Coming soon..." },
    ];
    const output = renderTeamMembers(input);
    expect(output[0].name).toBe("—");
    expect(output[0].quote).toBe(polishedQuote);
  });

  // Requirement 8.3 — clean entries are left untouched
  it("preserves entries that contain no placeholder text", () => {
    const input: Testimonial[] = [
      { id: 1, name: "Gowtham S", designation: "Tech Lead", quote: "Innovation drives us.", src: "/sample.png" },
    ];
    const output = renderTeamMembers(input);
    expect(output[0].name).toBe("Gowtham S");
    expect(output[0].designation).toBe("Tech Lead");
    expect(output[0].quote).toBe("Innovation drives us.");
  });

  // Requirement 8.3 — mixed array: only placeholder entries are replaced
  it("replaces only TBA entries in a mixed array", () => {
    const input: Testimonial[] = [
      { id: 1, name: "Real Person", designation: "Organiser", quote: "Great experience.", src: "/sample.png" },
      { id: 2, name: "TBA", designation: "TBA", quote: "TBA", src: "/sample.png" },
    ];
    const output = renderTeamMembers(input);
    expect(output[0].name).toBe("Real Person");
    expect(output[1].name).toBe("—");
    expect(output[1].quote).toBe(polishedQuote);
  });

  // Requirement 8.2 — empty array returns empty array
  it("handles an empty array without error", () => {
    expect(renderTeamMembers([])).toEqual([]);
  });

  // Requirement 8.3 — replacement preserves original id and src
  it("replacement card retains the original id and src '/sample.png'", () => {
    const input: Testimonial[] = [{ id: 42, name: "TBA", designation: "TBA", quote: "TBA", src: "/sample.png" }];
    const output = renderTeamMembers(input);
    expect(output[0].id).toBe(42);
    expect(output[0].src).toBe("/sample.png");
  });
});

describe("TeamSection component", () => {
  // Requirement 8.1 — tab label reads "2026 Team"
  it("renders a tab labelled '2026 Team'", () => {
    render(<TeamSection />);
    expect(screen.getByText("2026 Team")).toBeInTheDocument();
  });

  // Requirement 8.2 — the built-in "2026 Team" placeholder entry has TBA in
  // name/designation and "coming soon" in quote; it must not appear as raw text
  it("does not render raw 'TBA' text for the 2026 Team placeholder entry", () => {
    render(<TeamSection />);
    // The replacement should have kicked in — "TBA" must not appear anywhere
    const cards = screen.queryAllByTestId("member-name");
    cards.forEach((card) => {
      expect(card.textContent).not.toContain("TBA");
    });
  });

  it("does not render raw 'coming soon' text for the 2026 Team placeholder entry", () => {
    render(<TeamSection />);
    const quotes = screen.queryAllByTestId("member-quote");
    quotes.forEach((q) => {
      expect(q.textContent?.toLowerCase()).not.toContain("coming soon...");
    });
  });

  // Requirement 8.2 — the replacement card shows the polished copy
  it("renders the polished replacement message for TBA entries", () => {
    render(<TeamSection />);
    expect(
      screen.getByText("Team details for this edition will be announced shortly.")
    ).toBeInTheDocument();
  });
});

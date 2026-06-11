/**
 * FAQ Component — Property 3: FAQ year references are consistently 2026
 *
 * Validates: Requirements 5.3, 5.4
 *
 * Since fast-check is not installed, we simulate property-based testing
 * with explicit test cases that cover the same invariants a generator
 * would exercise.
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { FAQ2 } from "@/components/FAQ";

// ── Mocks ─────────────────────────────────────────────────────────────────────

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

jest.mock("@/components/ui/accordion", () => ({
  Accordion: ({ children }: any) => <div>{children}</div>,
  AccordionItem: ({ children }: any) => <div>{children}</div>,
  AccordionTrigger: ({ children, onClick }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
  AccordionContent: ({ children }: any) => <div>{children}</div>,
}));

jest.mock("@/components/ui/badge", () => ({
  Badge: ({ children }: any) => <span>{children}</span>,
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({ children }: any) => <button>{children}</button>,
}));

// lucide-react icon (used inside FAQ2 via Button child)
jest.mock("lucide-react", () => ({
  PhoneCall: () => <svg data-testid="phone-icon" />,
}));

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Returns all text nodes from document.body flattened into one string. */
function allBodyText(): string {
  return document.body.textContent ?? "";
}

/**
 * Checks whether a standalone "2025" year string appears in the given text.
 * We match digits surrounded by non-digit boundaries to avoid false positives
 * on substrings like "20250" or "202500".
 */
function containsStandalone2025(text: string): boolean {
  return /(?<!\d)2025(?!\d)/.test(text);
}

// ── Test Suite ────────────────────────────────────────────────────────────────

describe("FAQ2 — Property 3: year references are consistently 2026", () => {
  beforeEach(() => {
    render(<FAQ2 />);
  });

  // ── Property 3a ─────────────────────────────────────────────────────────────
  /**
   * **Validates: Requirements 5.1**
   * The subtitle paragraph must contain "TEDxSIST 2026" and must NOT contain
   * "TEDxSIST 2025".
   */
  it("subtitle contains 'TEDxSIST 2026' and does not contain 'TEDxSIST 2025'", () => {
    const body = allBodyText();
    expect(body).toContain("TEDxSIST 2026");
    expect(body).not.toContain("TEDxSIST 2025");
  });

  // ── Property 3b ─────────────────────────────────────────────────────────────
  /**
   * **Validates: Requirements 5.2**
   * The attending question must read "TEDxSIST 2026", not "TEDxSIST 2025".
   */
  it("renders 'How can I attend TEDxSIST 2026?' and not the 2025 variant", () => {
    expect(
      screen.getByText("How can I attend TEDxSIST 2026?")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("How can I attend TEDxSIST 2025?")
    ).not.toBeInTheDocument();
  });

  // ── Property 3c ─────────────────────────────────────────────────────────────
  /**
   * **Validates: Requirements 5.3**
   * No standalone "2025" year reference appears anywhere in the rendered FAQ.
   * This is the core universality property — equivalent to testing all possible
   * FAQ item combinations and asserting the sweep holds for every one.
   */
  it("no rendered text in the FAQ contains the standalone year string '2025'", () => {
    const body = allBodyText();
    expect(containsStandalone2025(body)).toBe(false);
  });

  // ── Property 3d ─────────────────────────────────────────────────────────────
  /**
   * **Validates: Requirements 5.4**
   * All other questions that do not reference a year must still be present and
   * unchanged after the year sweep.
   */
  it("preserves all other FAQ questions unchanged", () => {
    const expectedQuestions = [
      "What is TEDxSIST?",
      "How can I become a speaker at TEDxSIST?",
      "What kind of talks can I expect at TEDxSIST?",
      "How can I support TEDxSIST as a sponsor?",
      "Can I watch TEDxSIST talks online?",
      "How do I volunteer for TEDxSIST?",
    ];

    for (const question of expectedQuestions) {
      expect(screen.getByText(question)).toBeInTheDocument();
    }
  });
});

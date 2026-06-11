/**
 * Unit tests for TopBanner conditional rendering
 * Validates: Requirements 1.2, 1.3
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

// Mutable backing store.  `var` is hoisted along with `jest.mock` so the
// factory closure can reference it safely.
// eslint-disable-next-line no-var
var mockRegistrationConfig = { REGISTRATION_OPEN: false, REGISTRATION_DATE: "" };

// The mock module exports named constants.  We use Object.defineProperty with
// getters so every render re-reads the current value from mockRegistrationConfig
// even though the import binding was already evaluated.
jest.mock("@/lib/registration-config", () => {
  const mod: { REGISTRATION_OPEN: boolean; REGISTRATION_DATE: string } =
    {} as never;
  Object.defineProperty(mod, "REGISTRATION_OPEN", {
    get: () => mockRegistrationConfig.REGISTRATION_OPEN,
    enumerable: true,
  });
  Object.defineProperty(mod, "REGISTRATION_DATE", {
    get: () => mockRegistrationConfig.REGISTRATION_DATE,
    enumerable: true,
  });
  return mod;
});

// Mock next/link to render a plain <a> so href is inspectable in tests.
jest.mock("next/link", () => {
  const MockLink = ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
  MockLink.displayName = "MockLink";
  return { __esModule: true, default: MockLink };
});

// Transitive deps may touch next/navigation.
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
  usePathname: () => "/",
}));

// Import after mocks are hoisted.
import { TopBanner } from "@/components/TopBanner";

describe("TopBanner — REGISTRATION_OPEN = false", () => {
  beforeEach(() => {
    mockRegistrationConfig.REGISTRATION_OPEN = false;
    mockRegistrationConfig.REGISTRATION_DATE = "";
  });

  it('renders "Registrations Coming Soon" text', () => {
    render(<TopBanner />);
    expect(screen.getByText("Registrations Coming Soon")).toBeInTheDocument();
  });

  it("does NOT render a link pointing to /register", () => {
    render(<TopBanner />);
    const registerLink = screen.queryByRole("link", { name: /register now/i });
    expect(registerLink).not.toBeInTheDocument();
  });
});

describe("TopBanner — REGISTRATION_OPEN = true", () => {
  beforeEach(() => {
    mockRegistrationConfig.REGISTRATION_OPEN = true;
    mockRegistrationConfig.REGISTRATION_DATE = "";
  });

  it('renders "Registration Open" text', () => {
    render(<TopBanner />);
    expect(screen.getByText("Registration Open")).toBeInTheDocument();
  });

  it('renders a "Register Now →" link pointing to /register', () => {
    render(<TopBanner />);
    const link = screen.getByRole("link", { name: /register now/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/register");
  });
});

describe("TopBanner — Dismiss button", () => {
  beforeEach(() => {
    mockRegistrationConfig.REGISTRATION_OPEN = false;
    mockRegistrationConfig.REGISTRATION_DATE = "";
  });

  it("removes the banner from the DOM when × is clicked", () => {
    render(<TopBanner />);

    // Banner should be visible initially.
    expect(screen.getByText("Registrations Coming Soon")).toBeInTheDocument();

    // Click the dismiss button.
    const dismissBtn = screen.getByRole("button", { name: /dismiss banner/i });
    fireEvent.click(dismissBtn);

    // Banner should be gone.
    expect(
      screen.queryByText("Registrations Coming Soon")
    ).not.toBeInTheDocument();
  });
});

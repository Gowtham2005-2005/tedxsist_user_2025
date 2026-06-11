/**
 * Unit tests for TopBanner conditional rendering
 * Validates: Requirements 1.2, 1.3
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mutable flag — we mutate this between describe blocks to control the mock.
let mockRegistrationOpen = false;
let mockRegistrationDate = "";

jest.mock("@/lib/registration-config", () => ({
  get REGISTRATION_OPEN() {
    return mockRegistrationOpen;
  },
  get REGISTRATION_DATE() {
    return mockRegistrationDate;
  },
}));

// next/link is a client-side component; render it as a plain <a> in tests.
jest.mock("next/link", () => {
  const Link = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  );
  Link.displayName = "Link";
  return Link;
});

import { TopBanner } from "@/components/TopBanner";

describe("TopBanner — REGISTRATION_OPEN = false", () => {
  beforeEach(() => {
    mockRegistrationOpen = false;
    mockRegistrationDate = "";
  });

  it("renders 'Registrations Coming Soon' message", () => {
    render(<TopBanner />);
    expect(
      screen.getByText(/Registrations Coming Soon/i)
    ).toBeInTheDocument();
  });

  it("does NOT render a link to /register", () => {
    render(<TopBanner />);
    const registerLink = screen.queryByRole("link", { name: /Register Now/i });
    expect(registerLink).not.toBeInTheDocument();
  });
});

describe("TopBanner — REGISTRATION_OPEN = true", () => {
  beforeEach(() => {
    mockRegistrationOpen = true;
    mockRegistrationDate = "";
  });

  it("renders 'Registration Open' message", () => {
    render(<TopBanner />);
    expect(screen.getByText(/Registration Open/i)).toBeInTheDocument();
  });

  it("renders a 'Register Now' link pointing to /register", () => {
    render(<TopBanner />);
    const link = screen.getByRole("link", { name: /Register Now/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/register");
  });
});

describe("TopBanner — dismiss button", () => {
  beforeEach(() => {
    mockRegistrationOpen = false;
    mockRegistrationDate = "";
  });

  it("clicking the × dismiss button removes the banner from the DOM", async () => {
    const user = userEvent.setup();
    render(<TopBanner />);

    // Banner is visible before dismissal
    expect(screen.getByText(/Registrations Coming Soon/i)).toBeInTheDocument();

    const dismissBtn = screen.getByRole("button", { name: /Dismiss banner/i });
    await user.click(dismissBtn);

    // Banner should no longer be in the document
    expect(screen.queryByText(/Registrations Coming Soon/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Dismiss banner/i })).not.toBeInTheDocument();
  });
});

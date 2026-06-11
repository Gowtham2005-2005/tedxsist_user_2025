/**
 * Tests for app/register/page.tsx
 *
 * Task 3.2 — Property 1: Registration date appears in the closed message
 * Validates: Requirements 1.10
 *
 * Task 3.3 — Unit tests for Register page guard
 * Validates: Requirements 1.6, 1.7, 1.8, 1.11
 */

import React from "react";
import { render, screen, act, cleanup } from "@testing-library/react";

// jest.mock calls are hoisted before any variable declarations, so the
// factory CANNOT close over a variable defined in the same file.
// Instead we return a plain module object and mutate it via jest.requireMock.
jest.mock("@/lib/registration-config", () => ({
  REGISTRATION_OPEN: false,
  REGISTRATION_DATE: "",
}));

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

let mockUser: { uid: string } | null = null;
let mockAuthLoading = false;

jest.mock("@/context/auth-context", () => ({
  useAuth: () => ({ user: mockUser, isLoading: mockAuthLoading }),
}));

jest.mock("@/components/login-form", () => ({
  LoginForm: () => <div data-testid="login-form">Login Form</div>,
}));

// Import AFTER mocks so Jest hoisting applies correctly.
import RegisterPage from "@/app/register/page";

// Helper: get the mutable config reference for per-test mutation.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockConfig = jest.requireMock("@/lib/registration-config") as {
  REGISTRATION_OPEN: boolean;
  REGISTRATION_DATE: string;
};

// ---------------------------------------------------------------------------
// Task 3.2 — Property 1: Registration date appears in the closed message
// Simulates property-based testing with ≥10 explicit non-empty date strings.
// ---------------------------------------------------------------------------

describe("Property 1: Registration date appears in closed message (Req 1.10)", () => {
  const testDates = [
    "15th Jan 2026",
    "1st March 2026",
    "June 2026",
    "24th June 2026",
    "December 2026",
    "1 Jan 2026",
    "Q2 2026",
    "Spring 2026",
    "Late 2026",
    "2026-06-24",
  ];

  beforeEach(() => {
    mockConfig.REGISTRATION_OPEN = false;
    mockConfig.REGISTRATION_DATE = "";
    mockUser = null;
    mockAuthLoading = false;
  });

  afterEach(() => {
    cleanup();
  });

  for (const date of testDates) {
    it(`date "${date}" appears in the rendered closed message`, () => {
      mockConfig.REGISTRATION_DATE = date;
      render(<RegisterPage />);
      // The component renders: `Registrations open on ${REGISTRATION_DATE}.`
      expect(
        screen.getByText(new RegExp(date.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
      ).toBeInTheDocument();
      // LoginForm must NOT be rendered when registrations are closed.
      expect(screen.queryByTestId("login-form")).not.toBeInTheDocument();
    });
  }
});

// ---------------------------------------------------------------------------
// Task 3.3 — Unit tests for Register page guard
// ---------------------------------------------------------------------------

describe("Unit: REGISTRATION_OPEN=false + empty date → generic fallback message", () => {
  beforeEach(() => {
    mockConfig.REGISTRATION_OPEN = false;
    mockConfig.REGISTRATION_DATE = "";
    mockUser = null;
    mockAuthLoading = false;
  });

  afterEach(() => {
    cleanup();
  });

  it('shows "Registrations will open soon." and does NOT render LoginForm', () => {
    render(<RegisterPage />);
    expect(screen.getByText("Registrations will open soon.")).toBeInTheDocument();
    expect(screen.queryByTestId("login-form")).not.toBeInTheDocument();
  });
});

describe('Unit: REGISTRATION_OPEN=false + non-empty REGISTRATION_DATE → date text visible', () => {
  beforeEach(() => {
    mockConfig.REGISTRATION_OPEN = false;
    mockConfig.REGISTRATION_DATE = "15th Jan 2026";
  });

  afterEach(() => {
    cleanup();
  });

  it("shows the date string in the closed message and hides LoginForm", () => {
    render(<RegisterPage />);
    expect(screen.getByText(/15th Jan 2026/)).toBeInTheDocument();
    expect(screen.queryByTestId("login-form")).not.toBeInTheDocument();
  });
});

describe('Unit: REGISTRATION_OPEN=false → heading "Register for TEDxSIST 2026" visible', () => {
  beforeEach(() => {
    mockConfig.REGISTRATION_OPEN = false;
    mockConfig.REGISTRATION_DATE = "";
    mockUser = null;
    mockAuthLoading = false;
  });

  afterEach(() => {
    cleanup();
  });

  it('shows heading "Register for TEDxSIST 2026"', () => {
    render(<RegisterPage />);
    // The heading contains both plain text and a <span>, so getByRole is reliable.
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Register for TEDxSIST 2026");
  });
});

describe("Unit: authenticated user + REGISTRATION_OPEN=false → closed message, no redirect", () => {
  beforeEach(() => {
    mockConfig.REGISTRATION_OPEN = false;
    mockConfig.REGISTRATION_DATE = "24th June 2026";
    mockUser = { uid: "user-123" };
    mockAuthLoading = false;
    mockPush.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it("shows closed message and does not redirect authenticated users", () => {
    render(<RegisterPage />);
    expect(screen.getByText(/24th June 2026/)).toBeInTheDocument();
    expect(screen.queryByTestId("login-form")).not.toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });
});

describe("Unit: REGISTRATION_OPEN=true → auth flow (LoginForm) rendered", () => {
  beforeEach(() => {
    mockConfig.REGISTRATION_OPEN = true;
    mockConfig.REGISTRATION_DATE = "";
    mockUser = null;
    mockAuthLoading = false;
  });

  afterEach(() => {
    cleanup();
  });

  it("renders LoginForm when registrations are open and user is unauthenticated", async () => {
    await act(async () => {
      render(<RegisterPage />);
    });
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
  });
});

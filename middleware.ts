import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const registrationsOpen = true; // Change to true when registration opens

  if (!registrationsOpen) {
    const protectedRoutes = ["/register", "/register/registerforms"];

    if (protectedRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/registrations-closed", req.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/register", "/register/registerforms"],
};

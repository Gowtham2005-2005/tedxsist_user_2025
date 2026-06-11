"use client";

import { useState } from "react";
import Link from "next/link";
import { REGISTRATION_OPEN, REGISTRATION_DATE } from "@/lib/registration-config";

export function TopBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative w-full bg-neutral-900 border-b border-neutral-800 px-4 py-2.5 flex items-center justify-center text-sm">
      {REGISTRATION_OPEN ? (
        <p className="flex items-center gap-2 text-neutral-200">
          <span className="inline-block h-2 w-2 rounded-full bg-red-600 animate-pulse" />
          <span className="font-medium text-white">Registration Open</span>
          <span className="text-neutral-400">—</span>
          <Link
            href="/register"
            className="font-semibold text-red-500 hover:text-red-400 underline underline-offset-2 transition-colors"
          >
            Register Now →
          </Link>
        </p>
      ) : (
        <p className="flex items-center gap-2 text-neutral-300">
          <span className="inline-block h-2 w-2 rounded-full bg-red-600" />
          <span className="font-medium text-white">Registrations Coming Soon</span>
          {REGISTRATION_DATE && (
            <span className="text-neutral-400 text-xs">— Opens {REGISTRATION_DATE}</span>
          )}
        </p>
      )}

      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss banner"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-200 transition-colors p-1 rounded"
      >
        <span aria-hidden="true" className="text-base leading-none">×</span>
      </button>
    </div>
  );
}

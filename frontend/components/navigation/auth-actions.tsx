"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";

interface AuthActionsProps {
  readonly session: Session | null;
}

export function AuthActions({ session }: AuthActionsProps) {
  if (!session) {
    return (
      <Link
        href="/auth/sign-in"
        className="rounded-md border px-4 py-2 text-sm font-semibold transition border-[var(--border)] text-[var(--foreground)] hover:text-[var(--brand)] hover:border-[var(--brand)]"
      >
        Sign in
      </Link>
    );
  }

  const role = session.user.role;
  const dashboardPath = role === "RECRUITER" ? "/dashboard/recruiter" : "/dashboard/student";

  return (
    <div className="flex items-center gap-3">
      <Link
        href={dashboardPath}
        className="rounded-md border px-4 py-2 text-sm font-semibold transition border-[var(--border)] text-[var(--foreground)] hover:text-[var(--brand)] hover:border-[var(--brand)]"
      >
        Dashboard
      </Link>
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="rounded-md px-4 py-2 text-sm font-semibold transition"
        style={{ backgroundColor: 'var(--brand)', color: 'var(--brand-contrast)' }}
      >
        Sign out
      </button>
    </div>
  );
}

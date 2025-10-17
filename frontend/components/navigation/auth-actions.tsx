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
        className="rounded-md border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-200"
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
        className="rounded-md border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-200"
      >
        Dashboard
      </Link>
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-cyan-400"
      >
        Sign out
      </button>
    </div>
  );
}

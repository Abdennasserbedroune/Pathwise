"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ROLE_OPTIONS = [
  {
    value: "STUDENT" as const,
    title: "I’m a student",
    description: "Access AI resume critiques, tailored learning tracks, and application guidance.",
  },
  {
    value: "RECRUITER" as const,
    title: "I recruit talent",
    description: "Collaborate on candidate reviews, share feedback, and streamline hiring workflows.",
  },
];

type RoleValue = (typeof ROLE_OPTIONS)[number]["value"];

export function RoleSelector() {
  const [selectedRole, setSelectedRole] = useState<RoleValue | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { update } = useSession();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedRole) {
      setError("Please choose the experience that fits you best.");
      return;
    }

    setError(null);

    startTransition(async () => {
      const response = await fetch("/api/user/role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: selectedRole }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        const message = body?.error ?? "We couldn't save your choice. Please try again.";
        setError(message);
        return;
      }

      await update({ user: { role: selectedRole } });

      const destination = selectedRole === "RECRUITER" ? "/dashboard/recruiter" : "/dashboard/student";
      router.replace(destination);
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-2xl flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        {ROLE_OPTIONS.map((option) => {
          const isSelected = option.value === selectedRole;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setSelectedRole(option.value)}
              className={`rounded-xl border px-6 py-6 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                isSelected
                  ? "border-cyan-400/80 bg-cyan-500/10"
                  : "border-slate-800 bg-slate-900/40 hover:border-cyan-400/60"
              }`}
            >
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-slate-100">{option.title}</h2>
                <p className="text-sm text-slate-400">{option.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {error && <p className="text-sm text-rose-300">{error}</p>}

      <button
        type="submit"
        disabled={isPending || !selectedRole}
        className="w-full rounded-md bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
      >
        Continue
      </button>
    </form>
  );
}

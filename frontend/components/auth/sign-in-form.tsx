"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) {
      setErrorMessage("Please enter an email address.");
      setStatus("error");
      return;
    }

    setStatus("pending");
    setErrorMessage(null);

    const result = await signIn("email", {
      email,
      redirect: false,
      callbackUrl: "/onboarding/role",
    });

    if (result?.error) {
      setStatus("error");
      setErrorMessage("We were unable to send a magic link. Please try again.");
      return;
    }

    setStatus("sent");
  };

  const handleGoogleSignIn = async () => {
    setStatus("pending");
    setErrorMessage(null);
    await signIn("google", { callbackUrl: "/onboarding/role" });
  };

  const isPending = status === "pending";

  return (
    <div className="flex max-w-md flex-col gap-6">
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isPending}
        className="flex items-center justify-center gap-2 rounded-md border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
      >
        Continue with Google
      </button>

      <div className="relative flex items-center">
        <span className="h-px flex-1 bg-slate-800" />
        <span className="px-4 text-xs uppercase tracking-wide text-slate-500">or</span>
        <span className="h-px flex-1 bg-slate-800" />
      </div>

      <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm text-slate-200">
          Email address
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="rounded-md border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
            required
          />
        </label>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "sent" ? "Link sent" : "Email me a magic link"}
        </button>
      </form>

      {status === "sent" && (
        <p className="text-sm text-cyan-200">Check your email for the secure sign-in link.</p>
      )}

      {status === "error" && errorMessage && (
        <p className="text-sm text-rose-300">{errorMessage}</p>
      )}
    </div>
  );
}

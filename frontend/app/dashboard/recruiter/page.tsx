import { UserRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import authOptions from "@/lib/auth/options";

export default async function RecruiterDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/sign-in");
  }

  if (session.user.role === UserRole.UNSET) {
    redirect("/onboarding/role");
  }

  if (session.user.role !== UserRole.RECRUITER) {
    redirect("/dashboard/student");
  }

  return (
    <div className="container mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-100">Recruiter dashboard</h1>
        <p className="text-sm text-slate-400">
          Welcome back, {session.user.name ?? "Pathwise partner"}. Collaborate with teams and monitor candidate journeys from here.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
          <h2 className="text-lg font-semibold text-cyan-200">Pipeline overview</h2>
          <p className="mt-2 text-sm text-slate-300">
            Sync ATS data and track candidate progression without leaving Pathwise.
          </p>
        </article>
        <article className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
          <h2 className="text-lg font-semibold text-cyan-200">Feedback collaborations</h2>
          <p className="mt-2 text-sm text-slate-300">
            Share AI-assisted reviews with hiring managers and centralize decision logs.
          </p>
        </article>
      </section>
    </div>
  );
}

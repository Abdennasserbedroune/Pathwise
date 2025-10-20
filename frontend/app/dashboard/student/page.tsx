import { UserRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import authOptions from "@/lib/auth/options";
import { ResumeUploader } from "@/components/resume/resume-uploader"; // <CHANGE> add uploader

export default async function StudentDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/sign-in");
  }

  if (session.user.role === UserRole.UNSET) {
    redirect("/onboarding/role");
  }

  if (session.user.role !== UserRole.STUDENT) {
    redirect("/dashboard/recruiter");
  }

  return (
    <div className="container mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        {/* <CHANGE> use design tokens for colors */}
        <h1 className="text-3xl font-semibold text-[var(--foreground)]">Student dashboard</h1>
        <p className="text-sm text-[var(--muted)]">
          Welcome back, {session.user.name ?? "Pathwise member"}. Track résumé insights, AI suggestions, and your interview pipeline here.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {/* <CHANGE> card styles using tokens */}
        <article className="rounded-lg border border-[var(--border)] bg-transparent p-6">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Résumé health</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            We’ll surface AI-powered critique summaries once you upload your next résumé draft.
          </p>
        </article>
        <article className="rounded-lg border border-[var(--border)] bg-transparent p-6">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Application tracker</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Keep tabs on opportunities, deadlines, and recruiter feedback—all in one place.
          </p>
        </article>
      </section>

      {/* <CHANGE> add uploader section */}
      <ResumeUploader />
    </div>
  );
}

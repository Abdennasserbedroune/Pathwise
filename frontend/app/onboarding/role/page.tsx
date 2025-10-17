import { UserRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { RoleSelector } from "@/components/onboarding/role-selector";
import authOptions from "@/lib/auth/options";

export default async function RoleSelectionPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/sign-in");
  }

  if (session.user.role !== UserRole.UNSET) {
    const destination = session.user.role === UserRole.RECRUITER ? "/dashboard/recruiter" : "/dashboard/student";
    redirect(destination);
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-3xl space-y-6 rounded-xl border border-slate-800 bg-slate-900/40 p-10 text-center shadow-xl">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold text-slate-100">Choose your experience</h1>
          <p className="text-sm text-slate-400">
            Pathwise tailors dashboards for students and recruiters. Select the option that aligns with how you plan to use the platform.
          </p>
        </header>
        <RoleSelector />
      </div>
    </div>
  );
}

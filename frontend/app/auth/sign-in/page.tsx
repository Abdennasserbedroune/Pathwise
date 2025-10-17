import { UserRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { SignInForm } from "@/components/auth/sign-in-form";
import authOptions from "@/lib/auth/options";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    if (session.user.role === UserRole.UNSET) {
      redirect("/onboarding/role");
    }

    const destination = session.user.role === UserRole.RECRUITER ? "/dashboard/recruiter" : "/dashboard/student";
    redirect(destination);
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg space-y-6 rounded-xl border border-slate-800 bg-slate-900/50 p-8 shadow-xl">
        <header className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold text-slate-100">Welcome back</h1>
          <p className="text-sm text-slate-400">Sign in to access your personalized Pathwise dashboard.</p>
        </header>
        <SignInForm />
      </div>
    </div>
  );
}

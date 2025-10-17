import { UserRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import authOptions from "@/lib/auth/options";

export default async function DashboardIndexPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/sign-in");
  }

  if (session.user.role === UserRole.UNSET) {
    redirect("/onboarding/role");
  }

  const destination = session.user.role === UserRole.RECRUITER ? "/dashboard/recruiter" : "/dashboard/student";
  redirect(destination);
}

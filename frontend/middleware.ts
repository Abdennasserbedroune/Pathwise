import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  (req) => {
    const { nextUrl } = req;
    const role = req.nextauth.token?.role as string | undefined;

    if (nextUrl.pathname.startsWith("/dashboard")) {
      if (!role || role === "UNSET") {
        return NextResponse.redirect(new URL("/onboarding/role", req.url));
      }

      if (nextUrl.pathname.startsWith("/dashboard/student") && role !== "STUDENT") {
        return NextResponse.redirect(new URL("/dashboard/recruiter", req.url));
      }

      if (nextUrl.pathname.startsWith("/dashboard/recruiter") && role !== "RECRUITER") {
        return NextResponse.redirect(new URL("/dashboard/student", req.url));
      }
    }

    if (nextUrl.pathname.startsWith("/onboarding/role")) {
      if (!role || role === "UNSET") {
        return NextResponse.next();
      }

      const target = role === "STUDENT" ? "/dashboard/student" : "/dashboard/recruiter";
      return NextResponse.redirect(new URL(target, req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth/sign-in",
    },
  },
);

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding/:path*"],
};

import { UserRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import authOptions from "@/lib/auth/options";
import prisma from "@/lib/prisma";

const ALLOWED_ROLES = new Set<UserRole>([UserRole.STUDENT, UserRole.RECRUITER]);

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: { role?: UserRole };

  try {
    payload = (await request.json()) as { role?: UserRole };
  } catch (error) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (!payload.role || !ALLOWED_ROLES.has(payload.role)) {
    return NextResponse.json({ error: "Role selection is invalid." }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      role: payload.role,
      roleAssignedAt: new Date(),
    },
  });

  return NextResponse.json({ success: true, role: payload.role });
}

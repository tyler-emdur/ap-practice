import { prisma } from "@/lib/prisma";

type UserInfo = {
  clerkId: string;
  email?: string | null;
  name?: string | null;
};

export async function ensureUserForClerk({ clerkId, email, name }: UserInfo) {
  const normalizedEmail = email ?? `${clerkId}@placeholder.com`;
  return prisma.user.upsert({
    where: { clerkId },
    update: {
      ...(name ? { name } : {}),
      ...(email ? { email } : {}),
    },
    create: {
      clerkId,
      email: normalizedEmail,
      name: name ?? null,
    },
  });
}

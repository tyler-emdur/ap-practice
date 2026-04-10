import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      progress: true,
      sessions: { orderBy: { createdAt: "desc" }, take: 20 },
    },
  });

  if (!user) return Response.json({ progress: [], sessions: [] });

  return Response.json({ progress: user.progress, sessions: user.sessions });
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { subject, unitId, masteryScore, cardsStudied } = await req.json();

  let user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) {
    user = await prisma.user.create({
      data: { clerkId: userId, email: `${userId}@placeholder.com` },
    });
  }

  const progress = await prisma.subjectProgress.upsert({
    where: { userId_subject_unitId: { userId: user.id, subject, unitId } },
    update: { masteryScore, cardsStudied, lastStudied: new Date() },
    create: { userId: user.id, subject, unitId, masteryScore, cardsStudied, lastStudied: new Date() },
  });

  return Response.json(progress);
}

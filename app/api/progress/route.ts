import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getSubject } from "@/lib/subjects";
import { ensureUserForClerk } from "@/lib/users";
import { checkRateLimit } from "@/lib/rate-limit";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const clerkUser = await currentUser();
  const user = await ensureUserForClerk({
    clerkId: userId,
    email: clerkUser?.primaryEmailAddress?.emailAddress,
    name: `${clerkUser?.firstName ?? ""} ${clerkUser?.lastName ?? ""}`.trim() || undefined,
  });

  const hydratedUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      progress: true,
      sessions: { orderBy: { createdAt: "desc" }, take: 20 },
    },
  });

  if (!hydratedUser) return Response.json({ progress: [], sessions: [] });

  return Response.json({ progress: hydratedUser.progress, sessions: hydratedUser.sessions });
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const limit = checkRateLimit(`progress:update:${userId}`, 60, 60_000);
  if (!limit.ok) {
    return Response.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const body = await req.json();
  const subjectId = typeof body.subjectId === "string" ? body.subjectId : "";
  const unitId = typeof body.unitId === "string" ? body.unitId : "";
  const masteryScore = typeof body.masteryScore === "number" ? body.masteryScore : NaN;
  const cardsStudied = typeof body.cardsStudied === "number" ? body.cardsStudied : NaN;

  const subject = getSubject(subjectId);
  if (!subject) {
    return Response.json({ error: "Invalid subjectId" }, { status: 400 });
  }
  if (!unitId || !subject.units.some((unit) => unit.id === unitId)) {
    return Response.json({ error: "Invalid unitId for subject" }, { status: 400 });
  }
  if (!Number.isFinite(masteryScore) || masteryScore < 0 || masteryScore > 100) {
    return Response.json({ error: "masteryScore must be between 0 and 100" }, { status: 400 });
  }
  if (!Number.isFinite(cardsStudied) || cardsStudied < 0) {
    return Response.json({ error: "cardsStudied must be >= 0" }, { status: 400 });
  }

  const clerkUser = await currentUser();
  const user = await ensureUserForClerk({
    clerkId: userId,
    email: clerkUser?.primaryEmailAddress?.emailAddress,
    name: `${clerkUser?.firstName ?? ""} ${clerkUser?.lastName ?? ""}`.trim() || undefined,
  });

  const progress = await prisma.subjectProgress.upsert({
    where: { userId_subject_unitId: { userId: user.id, subject: subject.id, unitId } },
    update: { masteryScore, cardsStudied, lastStudied: new Date() },
    create: { userId: user.id, subject: subject.id, unitId, masteryScore, cardsStudied, lastStudied: new Date() },
  });

  return Response.json(progress);
}

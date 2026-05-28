import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getSubject } from "@/lib/subjects";
import { ensureUserForClerk } from "@/lib/users";
import { checkRateLimit } from "@/lib/rate-limit";

const ALLOWED_MODES = new Set(["flashcard", "mcq", "frq"]);

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const limit = checkRateLimit(`sessions:create:${userId}`, 60, 60_000);
  if (!limit.ok) {
    return Response.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const body = await req.json();
  const subjectId = typeof body.subjectId === "string" ? body.subjectId : "";
  const mode = typeof body.mode === "string" ? body.mode : "";
  const score = typeof body.score === "number" ? body.score : null;
  const totalQ = typeof body.totalQ === "number" ? body.totalQ : NaN;
  const correctQ = typeof body.correctQ === "number" ? body.correctQ : 0;
  const duration = typeof body.duration === "number" ? body.duration : null;

  if (!subjectId || !getSubject(subjectId)) {
    return Response.json({ error: "Invalid subjectId" }, { status: 400 });
  }
  if (!ALLOWED_MODES.has(mode)) {
    return Response.json({ error: "Invalid mode" }, { status: 400 });
  }
  if (!Number.isFinite(totalQ) || totalQ <= 0) {
    return Response.json({ error: "totalQ must be > 0" }, { status: 400 });
  }
  if (!Number.isFinite(correctQ) || correctQ < 0 || correctQ > totalQ) {
    return Response.json({ error: "correctQ must be between 0 and totalQ" }, { status: 400 });
  }
  if (score !== null && (!Number.isFinite(score) || score < 0 || score > 100)) {
    return Response.json({ error: "score must be between 0 and 100" }, { status: 400 });
  }
  if (duration !== null && (!Number.isFinite(duration) || duration < 0)) {
    return Response.json({ error: "duration must be >= 0" }, { status: 400 });
  }

  const clerkUser = await currentUser();
  const user = await ensureUserForClerk({
    clerkId: userId,
    email: clerkUser?.primaryEmailAddress?.emailAddress,
    name: `${clerkUser?.firstName ?? ""} ${clerkUser?.lastName ?? ""}`.trim() || undefined,
  });

  const session = await prisma.studySession.create({
    data: {
      userId: user.id,
      subject: subjectId,
      mode,
      score,
      totalQ,
      correctQ,
      duration,
    },
  });

  return Response.json({ session });
}

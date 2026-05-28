import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { generateText } from "@/lib/ai";
import { buildGradingPrompt } from "@/lib/prompts/grading";
import { getSubject } from "@/lib/subjects";
import { checkRateLimit } from "@/lib/rate-limit";
import { ensureUserForClerk } from "@/lib/users";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const limit = checkRateLimit(`frq:grade:${userId}`, 20, 60_000);
  if (!limit.ok) {
    return Response.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const body = await req.json();
  const subjectId = typeof body.subjectId === "string" ? body.subjectId : "";
  const frqType = typeof body.frqType === "string" ? body.frqType : "";
  const rubric = typeof body.rubric === "object" && body.rubric !== null ? body.rubric : null;
  const prompt = typeof body.prompt === "string" ? body.prompt : "";
  const response = typeof body.response === "string" ? body.response : "";
  const maxPoints = typeof body.maxPoints === "number" ? body.maxPoints : undefined;

  if (!subjectId || !frqType || !rubric || !prompt || !response.trim()) {
    return Response.json({ error: "Invalid grading request payload" }, { status: 400 });
  }

  const subject = getSubject(subjectId);
  if (!subject) {
    return Response.json({ error: "Invalid subjectId" }, { status: 400 });
  }

  const text = await generateText(buildGradingPrompt(subject.name, frqType, rubric, prompt, response), 2000);

  try {
    const result = JSON.parse(text);

    const clerkUser = await currentUser();
    const user = await ensureUserForClerk({
      clerkId: userId,
      email: clerkUser?.primaryEmailAddress?.emailAddress,
      name: `${clerkUser?.firstName ?? ""} ${clerkUser?.lastName ?? ""}`.trim() || undefined,
    });

    await prisma.fRQAttempt.create({
      data: {
        userId: user.id,
        subject: subject.id,
        prompt,
        response,
        feedback: JSON.stringify(result),
        score: typeof result.score === "number" ? result.score : 0,
        maxPoints: typeof result.totalPoints === "number" ? result.totalPoints : maxPoints ?? 0,
        earnedPoints: typeof result.earnedPoints === "number" ? result.earnedPoints : 0,
      },
    });

    return Response.json(result);
  } catch {
    return Response.json({ error: "Failed to grade response" }, { status: 500 });
  }
}

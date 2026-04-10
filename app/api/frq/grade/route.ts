import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { generateText } from "@/lib/anthropic";
import { buildGradingPrompt } from "@/lib/prompts/grading";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { subject, frqType, rubric, prompt, response, maxPoints } = await req.json();

  const text = await generateText(buildGradingPrompt(subject, frqType, rubric, prompt, response), 2000);

  try {
    const result = JSON.parse(text);

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (user) {
      await prisma.fRQAttempt.create({
        data: {
          userId: user.id,
          subject,
          prompt,
          response,
          feedback: JSON.stringify(result),
          score: result.score,
          maxPoints: result.totalPoints ?? maxPoints,
          earnedPoints: result.earnedPoints,
        },
      });
    }

    return Response.json(result);
  } catch {
    return Response.json({ error: "Failed to grade response" }, { status: 500 });
  }
}

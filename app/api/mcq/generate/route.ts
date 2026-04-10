import { auth } from "@clerk/nextjs/server";
import { generateText } from "@/lib/anthropic";
import { buildMCQPrompt } from "@/lib/prompts/mcq";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { subject, unit, count = 10 } = await req.json();

  const text = await generateText(buildMCQPrompt(subject, unit, count), 4000);

  try {
    const questions = JSON.parse(text);
    return Response.json({ questions });
  } catch {
    return Response.json({ error: "Failed to parse questions" }, { status: 500 });
  }
}

import { auth } from "@clerk/nextjs/server";
import { generateText } from "@/lib/anthropic";
import { buildFRQPrompt } from "@/lib/prompts/frq";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { subject, frqType, unit } = await req.json();

  const text = await generateText(buildFRQPrompt(subject, frqType, unit), 4000);

  try {
    const frq = JSON.parse(text);
    return Response.json({ frq });
  } catch {
    return Response.json({ error: "Failed to parse FRQ" }, { status: 500 });
  }
}

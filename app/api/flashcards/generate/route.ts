import { auth } from "@clerk/nextjs/server";
import { generateText } from "@/lib/anthropic";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { subject, unit, count = 15 } = await req.json();

  const prompt = `You are an AP exam tutor. Generate ${count} flashcards for ${subject}, Unit: ${unit}.

Each card should cover a key concept, term, person, event, or formula that appears on the AP exam.

Respond ONLY with a JSON array, no markdown fences:
[
  {
    "id": "card-1",
    "front": "Term or question",
    "back": "Definition or answer — concise but complete",
    "unit": "${unit}",
    "tags": ["key term", "cause/effect"]
  }
]`;

  const text = await generateText(prompt, 3000);

  try {
    const cards = JSON.parse(text);
    return Response.json({ cards });
  } catch {
    return Response.json({ error: "Failed to parse flashcards" }, { status: 500 });
  }
}

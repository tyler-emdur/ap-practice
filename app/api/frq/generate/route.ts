import { auth } from "@clerk/nextjs/server";
import { getSubject } from "@/lib/subjects";
import { checkRateLimit } from "@/lib/rate-limit";
import { getStaticFrq } from "@/lib/banks/frq";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const limit = checkRateLimit(`frq:generate:${userId}`, 20, 60_000);
  if (!limit.ok) {
    return Response.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const body = await req.json();
  const subjectId = typeof body.subjectId === "string" ? body.subjectId : "";
  const frqType = typeof body.frqType === "string" ? body.frqType : "";
  const unit = typeof body.unit === "string" ? body.unit : undefined;

  if (!subjectId || !frqType) {
    return Response.json({ error: "subjectId and frqType are required" }, { status: 400 });
  }

  const subject = getSubject(subjectId);
  if (!subject) {
    return Response.json({ error: "Invalid subjectId" }, { status: 400 });
  }

  const selectedFrqType = subject.frqTypes.find((item) => item.name === frqType);
  if (!selectedFrqType) {
    return Response.json({ error: "Invalid frqType for subject" }, { status: 400 });
  }

  const frq = getStaticFrq(subject.id, frqType, unit);
  if (!frq) {
    return Response.json({ error: "No FRQ templates found for this subject/type" }, { status: 404 });
  }
  return Response.json({ frq });
}

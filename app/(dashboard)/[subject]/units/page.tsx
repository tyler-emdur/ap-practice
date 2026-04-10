import { notFound } from "next/navigation";
import Link from "next/link";
import { getSubject } from "@/lib/subjects";

export default async function UnitsPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject: subjectId } = await params;
  const subject = getSubject(subjectId);
  if (!subject) notFound();

  const maxWeight = Math.max(...subject.units.map((u) => u.examWeight));

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <Link
            href={`/${subjectId}`}
            className="text-xs text-[#8a8070] hover:text-[#c9a84c] transition-colors"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            ← {subject.name}
          </Link>
          <h1 className="text-3xl font-bold text-[#f0ead6] mt-2" style={{ fontFamily: "var(--font-heading)" }}>
            Unit Breakdown
          </h1>
          <p className="text-sm text-[#8a8070] mt-1" style={{ fontFamily: "var(--font-mono)" }}>
            Exam weight by unit — prioritize high-weight units
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {subject.units.map((unit, i) => (
          <Link
            key={unit.id}
            href={`/${subjectId}/flashcards?unit=${unit.id}`}
            className="group block p-4 rounded-sm border border-[#1e2240] bg-[#13162a] hover:border-[#c9a84c] transition-colors"
          >
            <div className="flex items-center gap-4 mb-2">
              <span
                className="text-xs text-[#8a8070] w-16 shrink-0"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Unit {i + 1}
              </span>
              <span
                className="text-sm font-semibold text-[#f0ead6] group-hover:text-[#c9a84c] transition-colors flex-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {unit.name}
              </span>
              <span
                className="text-xs text-[#c9a84c] shrink-0"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {unit.weight}
              </span>
            </div>

            {/* Weight bar */}
            <div className="ml-20">
              <div className="h-1 rounded-full bg-[#1e2240] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#c9a84c] transition-all"
                  style={{ width: `${(unit.examWeight / maxWeight) * 100}%` }}
                />
              </div>
            </div>

            {"period" in unit && (
              <p
                className="text-xs text-[#8a8070] mt-1 ml-20"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {(unit as { period: string }).period}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

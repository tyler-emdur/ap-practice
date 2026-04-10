import { notFound } from "next/navigation";
import Link from "next/link";
import { getSubject } from "@/lib/subjects";

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject: subjectId } = await params;
  const subject = getSubject(subjectId);
  if (!subject) notFound();

  const modes = [
    { id: "units", label: "Unit Breakdown", description: "Exam weights & study priorities", icon: "◈" },
    { id: "flashcards", label: "Flashcards", description: "AI-generated concept cards", icon: "⬡" },
    { id: "mcq", label: "Multiple Choice", description: "AP-style MCQ practice", icon: "◎" },
    { id: "frq", label: "Free Response", description: "Write & get instant AI feedback", icon: "✎" },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10">
      <div>
        <p className="text-[#c9a84c] text-xs font-mono tracking-widest uppercase mb-2">
          Subject Hub
        </p>
        <h1 className="text-4xl font-bold text-[#f0ead6]" style={{ fontFamily: "var(--font-heading)" }}>
          {subject.name}
        </h1>
        <p className="text-[#8a8070] mt-2 text-sm" style={{ fontFamily: "var(--font-mono)" }}>
          {subject.totalUnits} units · {subject.mcqCount} MCQ in {subject.mcqTime} min · Exam {subject.examDate}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {modes.map((mode) => (
          <Link
            key={mode.id}
            href={`/${subjectId}/${mode.id}`}
            className="p-6 rounded-sm border border-[#1e2240] bg-[#13162a] hover:border-[#c9a84c] transition-colors group"
          >
            <div className="text-2xl mb-3 text-[#c9a84c]">{mode.icon}</div>
            <h2
              className="text-lg font-bold text-[#f0ead6] group-hover:text-[#c9a84c] transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {mode.label}
            </h2>
            <p className="text-sm text-[#8a8070] mt-1" style={{ fontFamily: "var(--font-body)" }}>
              {mode.description}
            </p>
          </Link>
        ))}
      </div>

      {/* FRQ Types */}
      <div>
        <h2 className="text-xl font-bold text-[#f0ead6] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Free Response Types
        </h2>
        <div className="space-y-3">
          {subject.frqTypes.map((frq) => (
            <div
              key={frq.id}
              className="p-4 rounded-sm border border-[#1e2240] bg-[#13162a] flex items-start gap-4"
            >
              <span
                className="text-[#c9a84c] text-xs font-mono mt-0.5 shrink-0 uppercase"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {frq.id}
              </span>
              <div>
                <p className="text-sm font-semibold text-[#f0ead6]" style={{ fontFamily: "var(--font-heading)" }}>
                  {frq.name}
                </p>
                <p className="text-xs text-[#8a8070] mt-1" style={{ fontFamily: "var(--font-body)" }}>
                  {frq.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

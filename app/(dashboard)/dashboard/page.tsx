import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { SUBJECTS } from "@/lib/subjects";

export default async function DashboardPage() {
  const { userId } = await auth();

  let progress: Array<{ subject: string; unitId: string; masteryScore: number; lastStudied: Date | null }> = [];
  if (userId) {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { progress: true },
    });
    progress = user?.progress ?? [];
  }

  const getSubjectAvg = (subjectId: string) => {
    const rows = progress.filter((p) => p.subject === subjectId);
    if (!rows.length) return 0;
    return Math.round(rows.reduce((sum, r) => sum + r.masteryScore, 0) / rows.length);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-4xl font-bold text-[#f0ead6]" style={{ fontFamily: "var(--font-heading)" }}>
          Dashboard
        </h1>
        <p className="text-[#8a8070] mt-2" style={{ fontFamily: "var(--font-body)" }}>
          Your progress across all AP subjects
        </p>
      </div>

      {/* Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SUBJECTS.map((subject) => {
          const avg = getSubjectAvg(subject.id);
          return (
            <Link
              key={subject.id}
              href={`/${subject.id}`}
              className="p-6 rounded-sm border border-[#1e2240] bg-[#13162a] hover:border-[#c9a84c] transition-colors group block"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2
                    className="text-lg font-bold text-[#f0ead6] group-hover:text-[#c9a84c] transition-colors"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {subject.name}
                  </h2>
                  <p className="text-xs text-[#8a8070] mt-1" style={{ fontFamily: "var(--font-mono)" }}>
                    {subject.totalUnits} units · Exam {subject.examDate}
                  </p>
                </div>
              </div>

              {/* Mastery bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-[#8a8070]" style={{ fontFamily: "var(--font-mono)" }}>
                  <span>Mastery</span>
                  <span>{avg}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#1e2240] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${avg}%`,
                      background: avg > 70 ? "#22c55e" : avg > 40 ? "#eab308" : "#ef4444",
                    }}
                  />
                </div>
              </div>

              <div className="mt-4 flex gap-2 flex-wrap">
                {(["units", "flashcards", "mcq", "frq"] as const).map((mode) => (
                  <span
                    key={mode}
                    className="text-xs px-2 py-0.5 rounded-sm border border-[#1e2240] text-[#8a8070]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {mode}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Progress Heatmap */}
      <div>
        <h2 className="text-xl font-bold text-[#f0ead6] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Unit Mastery Heatmap
        </h2>
        <div className="space-y-6">
          {SUBJECTS.map((subject) => (
            <div key={subject.id}>
              <p className="text-xs text-[#8a8070] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                {subject.name}
              </p>
              <div className="flex gap-2 flex-wrap">
                {subject.units.map((unit) => {
                  const row = progress.find((p) => p.subject === subject.id && p.unitId === unit.id);
                  const score = row?.masteryScore ?? 0;
                  const bg =
                    score === 0
                      ? "#1e2240"
                      : score > 70
                      ? "#166534"
                      : score > 40
                      ? "#713f12"
                      : "#7f1d1d";
                  return (
                    <div
                      key={unit.id}
                      title={`${unit.name}: ${Math.round(score)}%`}
                      className="w-8 h-8 rounded-sm cursor-pointer transition-opacity hover:opacity-80"
                      style={{ background: bg }}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-4 text-xs text-[#8a8070]" style={{ fontFamily: "var(--font-mono)" }}>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: "#1e2240" }} /> Not started</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: "#7f1d1d" }} /> Needs work</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: "#713f12" }} /> Developing</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: "#166534" }} /> Mastered</span>
        </div>
      </div>
    </div>
  );
}

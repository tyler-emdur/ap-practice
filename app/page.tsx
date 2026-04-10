import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: "#0d0f1a" }}>
      <div className="max-w-2xl text-center space-y-8">
        <div className="space-y-3">
          <p className="text-[#c9a84c] text-sm font-mono tracking-widest uppercase">AP Study Hub</p>
          <h1 className="text-6xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "#f0ead6" }}>
            APex
          </h1>
          <p className="text-xl text-[#8a8070] max-w-lg mx-auto leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Master AP World History, Computer Science Principles, and Precalculus with AI-powered practice and instant feedback.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/sign-up"
            className="px-8 py-3 rounded-sm text-[#0d0f1a] font-semibold transition-all hover:opacity-90"
            style={{ background: "#c9a84c", fontFamily: "var(--font-mono)" }}
          >
            Get Started
          </Link>
          <Link
            href="/sign-in"
            className="px-8 py-3 rounded-sm border font-semibold transition-all hover:border-[#c9a84c] hover:text-[#c9a84c]"
            style={{ borderColor: "#1e2240", color: "#8a8070", fontFamily: "var(--font-mono)" }}
          >
            Sign In
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#1e2240]">
          {[
            { label: "AP World History", units: "9 units", icon: "🌍" },
            { label: "AP CS Principles", units: "5 units", icon: "💻" },
            { label: "AP Precalculus", units: "4 units", icon: "📐" },
          ].map((s) => (
            <div key={s.label} className="p-4 rounded-sm border border-[#1e2240] bg-[#13162a] text-left">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-sm font-semibold text-[#f0ead6]" style={{ fontFamily: "var(--font-heading)" }}>{s.label}</div>
              <div className="text-xs text-[#8a8070] mt-1" style={{ fontFamily: "var(--font-mono)" }}>{s.units}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

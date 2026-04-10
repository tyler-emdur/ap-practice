import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: "◈" },
  { href: "/ap-world", label: "AP World History", icon: "🌍" },
  { href: "/ap-csp", label: "AP CS Principles", icon: "💻" },
  { href: "/ap-precalc", label: "AP Precalculus", icon: "📐" },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="flex min-h-screen" style={{ background: "#0d0f1a" }}>
      {/* Sidebar */}
      <aside
        className="w-64 flex-shrink-0 flex flex-col border-r"
        style={{ background: "#13162a", borderColor: "#1e2240" }}
      >
        <div className="p-6 border-b" style={{ borderColor: "#1e2240" }}>
          <Link href="/dashboard">
            <h1
              className="text-2xl font-bold text-[#c9a84c]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              APex
            </h1>
            <p className="text-xs text-[#8a8070] mt-1" style={{ fontFamily: "var(--font-mono)" }}>
              AP Study Hub
            </p>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-sm text-[#8a8070] hover:text-[#f0ead6] hover:bg-[#1e2240] transition-colors text-sm"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t" style={{ borderColor: "#1e2240" }}>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
              },
            }}
          />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

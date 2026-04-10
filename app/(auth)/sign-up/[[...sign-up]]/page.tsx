"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#0d0f1a" }}>
      <div className="space-y-6 text-center">
        <h1 className="text-3xl font-bold text-[#f0ead6]" style={{ fontFamily: "var(--font-heading)" }}>
          Join APex
        </h1>
        <SignUp />
      </div>
    </div>
  );
}

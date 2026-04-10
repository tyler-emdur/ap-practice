import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/source-serif-4/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "APex — AP Study Hub",
  description: "Master AP World History, Computer Science Principles, and Precalculus",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body className="min-h-full bg-[#0d0f1a] text-[#f0ead6] antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

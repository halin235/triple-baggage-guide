import type { Metadata } from "next";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "트리플 수하물 케어 MVP",
  description: "ICN ↔ KIX 수하물 규정 가이드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}

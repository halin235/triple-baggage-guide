"use client";

import Link from "next/link";
import { useEffect } from "react";

import { logAnalytics } from "@/lib/analytics";

export default function ToolsPage() {
  useEffect(() => {
    logAnalytics("tools_page_view", { path: "/tools" });
  }, []);

  return (
    <div className="min-h-screen bg-white px-4 pb-28 pt-6">
      <h1 className="text-xl font-bold text-ink">여행도구</h1>
      <p className="mt-2 text-sm text-muted">
        수하물 규정 검색으로 이동할 수 있어요.
      </p>
      <Link
        href="/baggage/search?airport=KIX"
        className="mt-6 block rounded-xl bg-card px-4 py-3 text-center font-semibold text-triple-blue ring-1 ring-line"
        onClick={() =>
          logAnalytics("tools_baggage_search_nav", {
            target: "/baggage/search?airport=KIX",
            airport: "KIX",
          })
        }
      >
        수하물 규정 검색 (KIX)
      </Link>
    </div>
  );
}

"use client";

import { useEffect } from "react";

import { logAnalytics } from "@/lib/analytics";

export default function SavedPage() {
  useEffect(() => {
    logAnalytics("saved_page_view", { path: "/saved" });
  }, []);

  return (
    <div className="min-h-screen bg-white px-4 pb-28 pt-6">
      <h1 className="text-xl font-bold text-ink">저장</h1>
      <p className="mt-2 text-sm text-muted">MVP 범위 외 화면입니다.</p>
    </div>
  );
}

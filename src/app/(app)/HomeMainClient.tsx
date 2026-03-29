"use client";

import { useEffect } from "react";

import { TripleHomeView } from "@/components/home/TripleHomeView";
import { logAnalytics } from "@/lib/analytics";

export function HomeMainClient() {
  useEffect(() => {
    logAnalytics("home_page_view", { path: "/" });
  }, []);

  return <TripleHomeView />;
}

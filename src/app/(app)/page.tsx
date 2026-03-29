"use client";

import { useEffect } from "react";

import HomeProhibitedBaggagePopup from "@/components/home/HomeProhibitedBaggagePopup";
import { TripleHomeView } from "@/components/home/TripleHomeView";
import { logAnalytics } from "@/lib/analytics";

export default function HomePage() {
  useEffect(() => {
    logAnalytics("home_page_view", { path: "/" });
  }, []);

  return (
    <>
      <HomeProhibitedBaggagePopup />
      <TripleHomeView />
    </>
  );
}

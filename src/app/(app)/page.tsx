import { Suspense } from "react";

import HomeProhibitedBaggagePopup from "@/components/home/HomeProhibitedBaggagePopup";

import { HomeMainClient } from "./HomeMainClient";

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<div>로딩 중...</div>}>
        <HomeProhibitedBaggagePopup />
      </Suspense>
      <HomeMainClient />
    </>
  );
}

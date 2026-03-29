import { Suspense } from "react";

import { BaggageCategoryDetailClient } from "@/components/baggage/BaggageCategoryDetailClient";

export default function BaggageCategoryPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-muted">
          불러오는 중…
        </div>
      }
    >
      <BaggageCategoryDetailClient />
    </Suspense>
  );
}

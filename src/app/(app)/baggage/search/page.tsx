import { Suspense } from "react";

import { BaggageSearchClient } from "@/components/baggage/BaggageSearchClient";

export default function BaggageSearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-muted">
          불러오는 중…
        </div>
      }
    >
      <BaggageSearchClient />
    </Suspense>
  );
}

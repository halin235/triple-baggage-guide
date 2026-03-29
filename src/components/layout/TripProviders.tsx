"use client";

import type { ReactNode } from "react";

import { TripDraftProvider } from "@/context/TripDraftContext";

export function TripProviders({ children }: { children: ReactNode }) {
  return <TripDraftProvider>{children}</TripDraftProvider>;
}

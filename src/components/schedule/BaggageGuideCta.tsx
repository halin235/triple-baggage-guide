"use client";

import { FileText } from "lucide-react";
import Link from "next/link";

import { logAnalytics } from "@/lib/analytics";
import type { BaggageAirportCode } from "@/types/baggage";

type Phase = "pre_departure" | "pre_return";

type Variant = "toolbar" | "onPrimary";

export function BaggageGuideCta({
  href,
  phase,
  airport,
  dayLabel,
  variant = "toolbar",
}: {
  href: string;
  phase: Phase;
  airport: BaggageAirportCode;
  dayLabel: string;
  variant?: Variant;
}) {
  const onPrimary =
    variant === "onPrimary"
      ? "inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/55 bg-white/15 px-3 py-2.5 text-[13px] font-semibold text-white shadow-sm backdrop-blur-[2px]"
      : "inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#3182F6] px-3 py-2 text-[13px] font-semibold text-white shadow-sm";

  return (
    <Link
      href={href}
      prefetch
      onClick={() =>
        logAnalytics("p1_baggage_guide_cta_click", {
          phase,
          airport,
          dayLabel,
          targetPath: href,
          variant,
        })
      }
      className={onPrimary}
    >
      <span>수하물 규정 확인하기</span>
      <FileText
        className={`size-4 shrink-0 ${variant === "onPrimary" ? "text-white" : "text-white"}`}
        strokeWidth={2}
        aria-hidden
      />
    </Link>
  );
}

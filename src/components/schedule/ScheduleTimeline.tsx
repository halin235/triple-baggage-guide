"use client";

import { FileText } from "lucide-react";
import Link from "next/link";

import { logAnalytics } from "@/lib/analytics";
import type { BaggageAirportCode } from "@/types/baggage";

const LINE = "#D8DDE2";
const TRIPLE = "#3182F6";

function TimelineRailTop({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-9 shrink-0 flex-col items-center">
      {children}
    </div>
  );
}

/** 0번 노드 — 파란 수하물 CTA (전체 행 링크) */
export function TimelineBaggageHead({
  href,
  phase,
  airport,
  dayLabel,
  dayTitle,
  lineSubtitle,
}: {
  href: string;
  phase: "pre_departure" | "pre_return";
  airport: BaggageAirportCode;
  dayLabel: string;
  dayTitle: string;
  lineSubtitle: string;
}) {
  return (
    <div className="flex gap-0">
      <TimelineRailTop>
        <div
          className="flex size-[26px] shrink-0 items-center justify-center rounded-full border-2 bg-white text-[12px] font-bold text-[#666]"
          style={{ borderColor: LINE }}
        >
          0
        </div>
        <div className="mt-1 min-h-[12px] w-px flex-1" style={{ backgroundColor: LINE }} />
      </TimelineRailTop>
      <div className="min-w-0 flex-1 pb-1 pl-2">
        <Link
          href={href}
          prefetch
          onClick={() =>
            logAnalytics("p1_baggage_guide_cta_click", {
              phase,
              airport,
              dayLabel,
              targetPath: href,
              variant: "timeline_full",
            })
          }
          className="flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 shadow-[0_2px_12px_rgba(49,130,246,0.35)] transition active:scale-[0.99] active:opacity-95"
          style={{ backgroundColor: TRIPLE }}
        >
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-white/90">{lineSubtitle}</p>
            <p className="mt-0.5 text-[17px] font-bold leading-snug text-white">{dayTitle}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/45 bg-white/12 px-3 py-2 text-[12px] font-bold text-white backdrop-blur-[2px]">
            수하물 규정 확인하기
            <FileText className="size-4 shrink-0 text-white" strokeWidth={2} aria-hidden />
          </span>
        </Link>
      </div>
    </div>
  );
}

export function TimelineDistance({ label }: { label: string }) {
  return (
    <div className="flex">
      <div className="flex w-9 shrink-0 flex-col items-center py-1">
        <div className="h-2 w-px shrink-0" style={{ backgroundColor: LINE }} />
        <span className="z-[1] rounded-md border border-[#E8E8E8] bg-white px-2 py-0.5 text-[11px] font-bold text-black shadow-sm">
          {label}
        </span>
        <div className="h-2 w-px shrink-0" style={{ backgroundColor: LINE }} />
      </div>
      <div className="flex-1" />
    </div>
  );
}

export function TimelinePlaceCard({
  index,
  title,
  category,
  showLineAbove,
  showLineBelow,
}: {
  index: number;
  title: string;
  category: string;
  showLineAbove: boolean;
  showLineBelow: boolean;
}) {
  return (
    <div className="flex gap-0">
      <div className="flex w-9 shrink-0 flex-col items-center">
        {showLineAbove ? (
          <div className="min-h-[8px] w-px flex-1" style={{ backgroundColor: LINE }} />
        ) : (
          <div className="min-h-[8px]" />
        )}
        <div
          className="flex size-[26px] shrink-0 items-center justify-center rounded-full border-2 bg-white text-[12px] font-bold text-[#666]"
          style={{ borderColor: LINE }}
        >
          {index}
        </div>
        {showLineBelow ? (
          <div className="min-h-[8px] w-px flex-1" style={{ backgroundColor: LINE }} />
        ) : (
          <div className="min-h-[8px]" />
        )}
      </div>
      <div className="min-w-0 flex-1 pb-3 pl-2 pt-0">
        <div className="rounded-xl border border-[#EEEEEE] bg-white px-3.5 py-3 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
          <p className="text-[16px] font-bold leading-snug text-black">{title}</p>
          <p className="mt-1 text-[13px] font-medium text-[#8B95A1]">{category}</p>
        </div>
      </div>
    </div>
  );
}

export function DaySectionHeader({
  dayNum,
  dateLabel,
}: {
  dayNum: number;
  dateLabel: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between px-1">
      <h2 className="text-[16px] font-bold text-black">
        day {dayNum}{" "}
        <span className="font-semibold text-[#666]">{dateLabel}</span>
      </h2>
      <button
        type="button"
        className="text-[#CCCCCC]"
        aria-label="섹션 접기"
      >
        <span className="text-lg">∨</span>
      </button>
    </div>
  );
}

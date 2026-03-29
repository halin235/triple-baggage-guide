"use client";

import { Siren } from "lucide-react";

import { SummaryActionHighlight } from "@/components/baggage/SummaryActionHighlight";
import { getBaggageBadge, type BaggageBadgeVisual } from "@/lib/baggageBadge";
import type { BaggageRegulationItem } from "@/types/baggage";

const TRIPLE_BLUE = "#3182F6";
const POINT_RED = "#FF4B4B";

const cardRadius = {
  borderTopLeftRadius: 12,
  borderBottomLeftRadius: 12,
  borderLeftWidth: 4,
} as const;

function badgePillClass(visual: BaggageBadgeVisual): string {
  switch (visual) {
    case "prohibited":
      return "bg-[#FFECEC] text-[#E53935] font-bold";
    case "quarantine":
    case "carry_recommended":
      return "bg-[#E8F3FF] font-bold text-[#3182F6]";
    case "caution":
      return "bg-amber-50 font-bold text-amber-800";
    default:
      return "bg-[#E8F3FF] font-semibold text-[#3182F6]";
  }
}

function leftBarColor(visual: BaggageBadgeVisual): string {
  if (visual === "prohibited") return POINT_RED;
  if (visual === "caution") return "#F59E0B";
  return TRIPLE_BLUE;
}

function StatusIcon({ visual }: { visual: BaggageBadgeVisual }) {
  if (visual === "prohibited") {
    return (
      <Siren
        className="size-[22px] shrink-0"
        style={{ color: POINT_RED }}
        strokeWidth={2}
        aria-hidden
      />
    );
  }
  return (
    <span
      className="flex size-[22px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
      style={{ backgroundColor: TRIPLE_BLUE }}
      aria-hidden
    >
      !
    </span>
  );
}

export function BaggageCategoryDetailRow({
  row,
  onSelect,
}: {
  row: BaggageRegulationItem;
  onSelect?: (row: BaggageRegulationItem) => void;
}) {
  const { visual, label } = getBaggageBadge(row);
  const bar = { ...cardRadius, borderLeftColor: leftBarColor(visual) };

  const inner = (
    <>
      <div className="flex items-start gap-3">
        <StatusIcon visual={visual} />
        <p className="min-w-0 flex-1 text-[16px] font-semibold leading-snug text-black">
          {row.itemName}
        </p>
        <span
          className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] leading-none ${badgePillClass(visual)}`}
        >
          {label}
        </span>
      </div>
      <div className="mt-3">
        <SummaryActionHighlight text={row.summaryAction} />
      </div>
      <p className="mt-2.5 text-[13px] leading-relaxed text-[#666666]">
        {row.detailGuide.replace(/🚨/g, "").trim()}
      </p>
      <dl className="mt-3 grid gap-1.5 border-t border-[#F0F0F0] pt-3 text-[12px] text-[#666666]">
        <div className="flex gap-1.5">
          <dt className="shrink-0 font-semibold text-black">기내</dt>
          <dd>{row.carryRegulation.cabin}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="shrink-0 font-semibold text-black">위탁</dt>
          <dd>{row.carryRegulation.checked}</dd>
        </div>
      </dl>
    </>
  );

  if (onSelect) {
    return (
      <button
        type="button"
        onClick={() => onSelect(row)}
        className="w-full rounded-[12px] border border-[#EEEEEE] bg-white p-4 text-left shadow-[0_1px_4px_rgba(0,0,0,0.06)] transition active:bg-[#FAFAFA]"
        style={bar}
      >
        {inner}
      </button>
    );
  }

  return (
    <div
      className="rounded-[12px] border border-[#EEEEEE] bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
      style={bar}
    >
      {inner}
    </div>
  );
}

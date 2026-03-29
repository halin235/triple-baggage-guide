"use client";

import { Siren } from "lucide-react";

import { getBaggageBadge, type BaggageBadgeVisual } from "@/lib/baggageBadge";
import type { BaggageRegulationItem } from "@/types/baggage";

const TRIPLE_BLUE = "#3182F6";
const POINT_RED = "#FF4B4B";

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

export function BaggageResultRow({
  row,
  onSelect,
}: {
  row: BaggageRegulationItem;
  onSelect: (row: BaggageRegulationItem) => void;
}) {
  const { visual, label } = getBaggageBadge(row);

  return (
    <button
      type="button"
      onClick={() => onSelect(row)}
      className="flex w-full items-center gap-3 rounded-[12px] border border-[#EEEEEE] bg-white py-4 pl-4 pr-3 text-left shadow-[0_1px_4px_rgba(0,0,0,0.06)] transition active:bg-[#FAFAFA]"
      style={{
        borderLeftWidth: 4,
        borderLeftColor: leftBarColor(visual),
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
      }}
    >
      <StatusIcon visual={visual} />
      <p className="min-w-0 flex-1 text-[16px] font-semibold leading-snug text-[#000000]">
        {row.itemName}
      </p>
      <span
        className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] leading-none ${badgePillClass(visual)}`}
      >
        {label}
      </span>
    </button>
  );
}

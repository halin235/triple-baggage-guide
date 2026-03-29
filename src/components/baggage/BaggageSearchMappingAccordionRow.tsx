"use client";

import { ChevronDown, Siren } from "lucide-react";

import { CollapsibleChevronPanel } from "@/components/ui/CollapsibleChevronPanel";
import {
  badgeVisualFromCardTone,
  cardToneFromMappingSummary,
} from "@/lib/baggageMappingVisual";
import type { BaggageBadgeVisual } from "@/lib/baggageBadge";
import type { BaggageCardTone } from "@/types/baggage";
import type { BaggageSearchMappingRow } from "@/types/baggageSearchMapping";

const TRIPLE_BLUE = "#3182F6";
const POINT_RED = "#FF4B4B";

function accentFromCardTone(tone: BaggageCardTone): string {
  if (tone === "danger") return POINT_RED;
  if (tone === "warning") return "#F59E0B";
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

export function BaggageSearchMappingAccordionRow({
  row,
  open,
  onToggle,
}: {
  row: BaggageSearchMappingRow;
  open: boolean;
  onToggle: () => void;
}) {
  const tone = cardToneFromMappingSummary(row.summaryTag);
  const visual = badgeVisualFromCardTone(tone);
  const barColor = accentFromCardTone(tone);
  const detailText = row.detailGuide.trim();

  return (
    <div
      className="overflow-hidden rounded-[12px] border border-[#EEEEEE] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
      style={{
        borderLeftWidth: 4,
        borderLeftColor: barColor,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start gap-3 py-4 pl-3 pr-3 text-left transition-colors hover:bg-[#FAFAFA] active:bg-[#F5F5F5]"
      >
        <StatusIcon visual={visual} />
        <p className="min-w-0 flex-1 pt-0.5 text-[16px] font-semibold leading-snug text-black">
          {row.itemTitle}
        </p>
        <span
          className={`max-w-[46%] shrink-0 rounded-full px-2.5 py-1.5 text-left text-[11px] leading-snug ${badgePillClass(visual)}`}
        >
          {row.summaryTag}
        </span>
        <ChevronDown
          className={`mt-0.5 size-5 shrink-0 text-[#8B95A1] transition-transform duration-300 ease-out ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={2}
          aria-hidden
        />
      </button>

      <CollapsibleChevronPanel open={open}>
        <div className="px-4 pb-4">
          {detailText ? (
            <p className="text-[13px] leading-relaxed text-[#666666]">{detailText}</p>
          ) : (
            <p className="text-[13px] leading-relaxed text-[#999999]">상세 안내가 없습니다.</p>
          )}
        </div>
      </CollapsibleChevronPanel>
    </div>
  );
}

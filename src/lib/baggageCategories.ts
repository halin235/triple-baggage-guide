import type { LucideIcon } from "lucide-react";
import {
  Apple,
  Banknote,
  Battery,
  CircleHelp,
  Hammer,
  Monitor,
  Pill,
  SprayCan,
  Wine,
} from "lucide-react";

import { getRegulationsDataStore } from "@/lib/baggageRegulationSheets";
import type { BaggageTripPhase } from "@/lib/baggageRegulationSheets";
import type { BaggageAirportCode } from "@/types/baggage";

/** 수하물 규제 검색 화면 3×3 그리드 고정 순서 (엑셀·기획서와 동일) */
export const BAGGAGE_CATEGORY_GRID_ORDER = [
  "전자제품",
  "배터리",
  "의약품",
  "도구",
  "주류/담배",
  "화장품",
  "자산",
  "식품",
  "etc",
] as const;

export type BaggageGridCategory = (typeof BAGGAGE_CATEGORY_GRID_ORDER)[number];

const ICON_MAP: Record<string, LucideIcon> = {
  전자제품: Monitor,
  배터리: Battery,
  의약품: Pill,
  도구: Hammer,
  "주류/담배": Wine,
  화장품: SprayCan,
  자산: Banknote,
  식품: Apple,
  etc: CircleHelp,
};

export interface CategoryTile {
  name: BaggageGridCategory;
  Icon: LucideIcon;
  count: number;
}

export function getBaggageCategoryIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? CircleHelp;
}

export function getCategoryTiles(
  airport: BaggageAirportCode,
  tripPhase: BaggageTripPhase | null = null
): CategoryTile[] {
  const rows = getRegulationsDataStore({ airport, tripPhase });
  const counts = new Map<string, number>();
  for (const r of rows) {
    counts.set(r.category, (counts.get(r.category) ?? 0) + 1);
  }
  return BAGGAGE_CATEGORY_GRID_ORDER.map((name) => ({
    name,
    Icon: ICON_MAP[name] ?? CircleHelp,
    count: name === "etc" ? 0 : (counts.get(name) ?? 0),
  }));
}

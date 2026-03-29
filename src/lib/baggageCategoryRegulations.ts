import { BAGGAGE_CATEGORY_GRID_ORDER } from "@/lib/baggageCategories";
import {
  getRegulationsDataStore,
  type BaggageTripPhase,
} from "@/lib/baggageRegulationSheets";
import type { BaggageAirportCode } from "@/types/baggage";
import type { BaggageRegulationItem } from "@/types/baggage";

const MAIN_CATEGORIES = new Set<string>(
  BAGGAGE_CATEGORY_GRID_ORDER.filter((c) => c !== "etc")
);

export type BaggageGridCategory = (typeof BAGGAGE_CATEGORY_GRID_ORDER)[number];

export function isGridCategory(name: string): name is BaggageGridCategory {
  return (BAGGAGE_CATEGORY_GRID_ORDER as readonly string[]).includes(name);
}

/** 공항 + 그리드 카테고리(또는 etc)로 `baggageData` 필터 (`tripPhase`는 일정 CTA와 동일 시트 스코프) */
export function regulationsByCategoryAndAirport(
  airport: BaggageAirportCode,
  category: string,
  tripPhase: BaggageTripPhase | null = null
): BaggageRegulationItem[] {
  const pool = getRegulationsDataStore({ airport, tripPhase });
  if (category === "etc") {
    return pool.filter((r) => !MAIN_CATEGORIES.has(r.category));
  }
  return pool.filter((r) => r.category === category);
}

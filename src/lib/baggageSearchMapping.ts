import {
  BAGGAGE_SEARCH_MAPPING_JAPAN,
  BAGGAGE_SEARCH_MAPPING_KOREA,
} from "@/constants/baggageSearchMappingData";
import { BAGGAGE_CATEGORY_GRID_ORDER } from "@/lib/baggageCategories";
import { resolveChecklistBaggageCSheet } from "@/lib/checklistBaggagePhase";
import type { BaggageTripPhase } from "@/lib/baggageRegulationSheets";
import type { BaggageAirportCode } from "@/types/baggage";
import type { BaggageSearchMappingRow } from "@/types/baggageSearchMapping";

const MAIN_GRID_CATEGORIES = new Set<string>(
  BAGGAGE_CATEGORY_GRID_ORDER.filter((c) => c !== "etc")
);

/**
 * 여행 일정(출발~종료)과 오늘 날짜로 매핑 시트 선택.
 * 출국 전~여행 초반(시작일+1까지) → 일본행_검색어_매핑, D+2~종료 → 한국행_검색어_매핑
 * (체크리스트 C안 분기와 동일)
 */
export function getSearchMappingStoreByCalendar(
  today: Date,
  tripStartISO: string,
  tripEndISO: string
): BaggageSearchMappingRow[] {
  const leg = resolveChecklistBaggageCSheet(today, tripStartISO, tripEndISO);
  return leg === "korea" ? BAGGAGE_SEARCH_MAPPING_KOREA : BAGGAGE_SEARCH_MAPPING_JAPAN;
}

export type SearchMappingLeg = "japan" | "korea";

/**
 * 수하물 검색·카테고리 상세의 매핑 시트.
 *
 * 1) URL `tripPhase`가 있으면 **일정 CTA 의도 최우선**  
 *    (`departure` → 일본행, `return` → 한국행) — 여행 마무리 버튼은 항상 한국행.
 * 2) 없으면 달력 D+2 분기(`resolveChecklistBaggageCSheet`).
 */
export function getSearchMappingStoreResolved(
  tripPhase: BaggageTripPhase | null,
  today: Date,
  tripStartISO: string,
  tripEndISO: string
): { rows: BaggageSearchMappingRow[]; leg: SearchMappingLeg } {
  if (tripPhase === "departure") {
    return { rows: BAGGAGE_SEARCH_MAPPING_JAPAN, leg: "japan" };
  }
  if (tripPhase === "return") {
    return { rows: BAGGAGE_SEARCH_MAPPING_KOREA, leg: "korea" };
  }
  const leg = resolveChecklistBaggageCSheet(today, tripStartISO, tripEndISO);
  return {
    rows: leg === "korea" ? BAGGAGE_SEARCH_MAPPING_KOREA : BAGGAGE_SEARCH_MAPPING_JAPAN,
    leg,
  };
}

/** 카테고리 상세 화면: 그리드 카테고리에 맞는 매핑 행만 */
export function filterMappingRowsByGridCategory(
  rows: BaggageSearchMappingRow[],
  category: string
): BaggageSearchMappingRow[] {
  if (category === "etc") {
    return rows.filter((r) => !MAIN_GRID_CATEGORIES.has(r.category));
  }
  return rows.filter((r) => r.category === category);
}

/**
 * URL `tripPhase`·`airport` 기반 (레거시·폴백).
 * Day1 CTA → 일본행, 귀국 → 한국행. `tripPhase` 없으면 ICN=한국행.
 */
export function getSearchMappingStore(
  tripPhase: BaggageTripPhase | null,
  airport: BaggageAirportCode
): BaggageSearchMappingRow[] {
  if (tripPhase === "departure") return BAGGAGE_SEARCH_MAPPING_JAPAN;
  if (tripPhase === "return") return BAGGAGE_SEARCH_MAPPING_KOREA;
  return airport === "ICN" ? BAGGAGE_SEARCH_MAPPING_KOREA : BAGGAGE_SEARCH_MAPPING_JAPAN;
}

/**
 * `유저 예상 검색어`·`소분류`에 검색어(소문자·trim)가 부분 문자열로 포함되면 매칭.
 * (엑셀 컬럼과 동일한 의미: searchAliases = 유저 예상 검색어, itemTitle = 소분류)
 */
export function filterSearchMappingRows(
  rows: BaggageSearchMappingRow[],
  query: string
): BaggageSearchMappingRow[] {
  const userInput = query.trim().toLowerCase();
  if (userInput.length === 0) return [];
  return rows.filter((row) => {
    const expectedKeywords = String(row.searchAliases ?? "").toLowerCase();
    const subCategory = String(row.itemTitle ?? "").toLowerCase();
    return expectedKeywords.includes(userInput) || subCategory.includes(userInput);
  });
}

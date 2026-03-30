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

/** 매핑 행을 그리드 카테고리로 좁힐 때 (카테고리 상세 상단 검색은 전체 시트 사용) */
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

/** 검색어 전체 + 공백/쉼표 분리 토큰 (OR 매칭용, 빈 토큰 제외) */
function searchMappingQueryTokens(query: string): string[] {
  const raw = query.trim().toLowerCase();
  if (!raw) return [];
  const fromSplit = raw.split(/[\s,，、]+/g).map((s) => s.trim()).filter(Boolean);
  const out = new Set<string>([raw, ...fromSplit]);
  return [...out];
}

/**
 * `유저 예상 검색어`·소분류(품목명) 각각에 대해, 아래 중 하나라도 성공하면 매칭(OR).
 * - 전체 입력 문구가 해당 필드에 부분 문자열로 포함
 * - 입력을 공백·쉼표로 나눈 토큰 중 하나가 어느 한 필드에 포함
 */
export function filterSearchMappingRows(
  rows: BaggageSearchMappingRow[],
  query: string
): BaggageSearchMappingRow[] {
  const tokens = searchMappingQueryTokens(query);
  if (tokens.length === 0) return [];
  return rows.filter((row) => {
    const expectedKeywords = String(row.searchAliases ?? "").toLowerCase();
    const itemTitle = String(row.itemTitle ?? "").toLowerCase();
    return tokens.some(
      (tok) => expectedKeywords.includes(tok) || itemTitle.includes(tok)
    );
  });
}

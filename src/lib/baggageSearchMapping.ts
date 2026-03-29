import {
  BAGGAGE_SEARCH_MAPPING_JAPAN,
  BAGGAGE_SEARCH_MAPPING_KOREA,
} from "@/constants/baggageSearchMappingData";
import type { BaggageTripPhase } from "@/lib/baggageRegulationSheets";
import type { BaggageAirportCode } from "@/types/baggage";
import type { BaggageSearchMappingRow } from "@/types/baggageSearchMapping";

/**
 * Day1 CTA → 일본행 매핑 시트, Last Day → 한국행 매핑 시트.
 * `tripPhase` 없으면 URL `airport`로 시트 추정(ICN=한국행, 그 외=일본행).
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

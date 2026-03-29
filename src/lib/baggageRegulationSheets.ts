import { BAGGAGE_REGULATIONS } from "@/constants/baggageData";
import type { BaggageAirportCode, BaggageRegulationItem } from "@/types/baggage";

/** 엑셀 `수하물 규제 카테고리 설계 (1).xlsx` — Case A (출국·KIX) */
export const EXCEL_SHEET_KIX_OSAKA =
  "카테고리별 분류_일본 오사카 간사이 공항 수하물 데이터";

/** 엑셀 동 파일 — Case B (귀국·ICN) */
export const EXCEL_SHEET_ICN_KOREA =
  "카테고리별 분류_한국 인천공항 수하물 데이터";

/** 일정 Day1 / Last Day CTA에서 전달 (`tripPhase` 쿼리) */
export type BaggageTripPhase = "departure" | "return";

export function parseTripPhaseParam(raw: string | null): BaggageTripPhase | null {
  if (raw === "departure" || raw === "day1") return "departure";
  if (raw === "return" || raw === "lastDay") return "return";
  return null;
}

/** 수하물 검색 URL 쿼리 (`tripPhase`는 일정 CTA에서만 붙음) */
export function baggageSearchQueryString(
  airport: BaggageAirportCode,
  tripPhase: BaggageTripPhase | null
): string {
  const p = new URLSearchParams({ airport });
  if (tripPhase) p.set("tripPhase", tripPhase);
  return p.toString();
}

/**
 * 일정에서 온 경우: Day1 → 일본 간사이 시트, Last Day → 인천 시트만 사용.
 * `tripPhase` 없으면 기존처럼 `airport` 노선 필터만 적용.
 */
export function getRegulationsDataStore(input: {
  airport: BaggageAirportCode;
  tripPhase: BaggageTripPhase | null;
}): BaggageRegulationItem[] {
  if (input.tripPhase === "departure") {
    return BAGGAGE_REGULATIONS.filter((r) => r.excelSourceSheet === EXCEL_SHEET_KIX_OSAKA);
  }
  if (input.tripPhase === "return") {
    return BAGGAGE_REGULATIONS.filter((r) => r.excelSourceSheet === EXCEL_SHEET_ICN_KOREA);
  }
  return BAGGAGE_REGULATIONS.filter((r) => r.route.airports.includes(input.airport));
}

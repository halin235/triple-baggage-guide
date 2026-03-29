import { baggageSearchQueryString } from "@/lib/baggageRegulationSheets";
import { resolveBaggagePopupPhase } from "@/lib/baggagePopupPhase";
import type { BaggageAirportCode } from "@/types/baggage";

/**
 * 일정 화면과 동일 분기: D-7~D-1 → 일본행(departure/KIX), 여행 기간 → 한국행(return/ICN),
 * 그 외 → 일본행 준비물(출국 검색) 기본.
 */
export function buildHomeBaggageGuideHref(
  today: Date,
  startISO: string,
  endISO: string,
  outboundAp: BaggageAirportCode,
  returnAp: BaggageAirportCode
): string {
  const phase = resolveBaggagePopupPhase(today, startISO, endISO);
  if (phase === "korea") {
    return `/baggage/search?${baggageSearchQueryString(returnAp, "return")}`;
  }
  return `/baggage/search?${baggageSearchQueryString(outboundAp, "departure")}`;
}

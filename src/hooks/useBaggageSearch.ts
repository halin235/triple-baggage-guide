/**
 * P2/P3 연동용 — Next.js 클라이언트 컴포넌트에서 `useMemo`와 함께 사용하세요.
 *
 * @example
 * const results = useMemo(
 *   () => searchBaggageRegulations(query, { airport: "KIX" }),
 *   [query]
 * );
 */

export {
  byAirport,
  findRegulationsForChecklistItem,
  searchBaggageRegulations,
} from "@/lib/baggageSearch";

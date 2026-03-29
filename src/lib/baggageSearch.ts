import { BAGGAGE_REGULATIONS } from "@/constants/baggageData";
import {
  getRegulationsDataStore,
  type BaggageTripPhase,
} from "@/lib/baggageRegulationSheets";
import type { BaggageAirportCode, BaggageRegulationItem } from "@/types/baggage";

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, "");

/** P3: 검색어로 규정 필터 (품목명·카테고리·요약·상세). `tripPhase` 있으면 해당 엑셀 시트 풀만 검색 */
export function searchBaggageRegulations(
  query: string,
  options?: { airport?: BaggageAirportCode; tripPhase?: BaggageTripPhase | null }
): BaggageRegulationItem[] {
  const q = norm(query.trim());
  const pool =
    options?.airport != null
      ? getRegulationsDataStore({
          airport: options.airport,
          tripPhase: options.tripPhase ?? null,
        })
      : [...BAGGAGE_REGULATIONS];

  if (!q) return pool;

  return pool.filter((row) => {
    const hay = [
      row.itemName,
      row.category,
      row.summaryAction,
      row.detailGuide,
      row.carryRegulation.cabin,
      row.carryRegulation.checked,
    ]
      .map(norm)
      .join("|");
    return hay.includes(q);
  });
}

export function byAirport(airport: BaggageAirportCode): BaggageRegulationItem[] {
  return getRegulationsDataStore({ airport, tripPhase: null });
}

/**
 * P2: 체크리스트 품목명과 규정 품목명 매칭 (부분 일치·쉼표 분리 토큰)
 */
export function findRegulationsForChecklistItem(
  checklistLabel: string,
  options?: { airport?: BaggageAirportCode }
): BaggageRegulationItem[] {
  const tokens = checklistLabel
    .split(/[,，、/]/g)
    .map((t) => t.trim())
    .filter(Boolean);
  const ap = options?.airport;
  const pool =
    ap != null
      ? BAGGAGE_REGULATIONS.filter((r) => r.route.airports.includes(ap))
      : BAGGAGE_REGULATIONS;

  const matches = new Map<string, BaggageRegulationItem>();

  for (const row of pool) {
    const nameN = norm(row.itemName);
    for (const tok of tokens) {
      const t = norm(tok);
      if (!t) continue;
      if (nameN.includes(t) || t.includes(nameN)) {
        matches.set(row.id, row);
        break;
      }
    }
    const fullN = norm(checklistLabel);
    if (fullN && (nameN.includes(fullN) || fullN.includes(nameN))) {
      matches.set(row.id, row);
    }
  }

  return [...matches.values()];
}

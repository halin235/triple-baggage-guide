import { parseISODateLocal } from "@/lib/tripCalendarUtils";

export type ChecklistBaggageCSheetScenario = {
  label: string;
  todayISO: string;
  startISO: string;
  endISO: string;
  expected: "japan" | "korea";
};

function stripToLocalDate(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function addCalendarDays(d: Date, delta: number): Date {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  x.setDate(x.getDate() + delta);
  return x;
}

function compareLocalDate(a: Date, b: Date): number {
  const t = a.getTime() - b.getTime();
  return t < 0 ? -1 : t > 0 ? 1 : 0;
}

/**
 * C안 체크리스트·검색어 매핑 시트 분기 (달력 일 단위, 로컬).
 *
 * - 일본행: 시작일 D-7 ≤ 오늘 ≤ 시작일(D-Day 포함)
 * - 한국행: 시작일 D+1 ≤ 오늘 ≤ 종료일
 * - 오늘 < D-7: 일본행(출국 준비 기본)
 * - 오늘 > 종료일: 한국행(귀국·참고)
 * - `tripPhase` URL 우선은 `getSearchMappingStoreResolved`에서 처리
 */
export function resolveChecklistBaggageCSheet(
  today: Date,
  tripStartISO: string,
  tripEndISO: string
): "japan" | "korea" {
  const t = stripToLocalDate(today);
  const s = stripToLocalDate(parseISODateLocal(tripStartISO));
  const e = stripToLocalDate(parseISODateLocal(tripEndISO));

  if (compareLocalDate(e, s) < 0) return "japan";

  const fromD7 = addCalendarDays(s, -7);
  const startPlus1 = addCalendarDays(s, 1);

  if (compareLocalDate(t, e) > 0) {
    return "korea";
  }

  if (
    compareLocalDate(t, startPlus1) >= 0 &&
    compareLocalDate(t, e) <= 0
  ) {
    return "korea";
  }

  if (compareLocalDate(t, fromD7) >= 0 && compareLocalDate(t, s) <= 0) {
    return "japan";
  }

  return "japan";
}

/** 수동·스크립트 검증용 (시작 4/8, 종료 4/15 가정) */
export const CHECKLIST_BAGGAGE_C_SHEET_SCENARIOS: ChecklistBaggageCSheetScenario[] = [
  { label: "D-8: 일본(기본)", todayISO: "2026-03-31", startISO: "2026-04-08", endISO: "2026-04-15", expected: "japan" },
  { label: "D-7: 일본", todayISO: "2026-04-01", startISO: "2026-04-08", endISO: "2026-04-15", expected: "japan" },
  { label: "D-Day: 일본", todayISO: "2026-04-08", startISO: "2026-04-08", endISO: "2026-04-15", expected: "japan" },
  { label: "D+1: 한국", todayISO: "2026-04-09", startISO: "2026-04-08", endISO: "2026-04-15", expected: "korea" },
  { label: "여행 중: 한국", todayISO: "2026-04-10", startISO: "2026-04-08", endISO: "2026-04-15", expected: "korea" },
  { label: "종료일: 한국", todayISO: "2026-04-15", startISO: "2026-04-08", endISO: "2026-04-15", expected: "korea" },
  { label: "종료 다음날: 한국", todayISO: "2026-04-16", startISO: "2026-04-08", endISO: "2026-04-15", expected: "korea" },
];

export function verifyChecklistBaggageCSheetLogic(): {
  ok: boolean;
  failures: string[];
} {
  const failures: string[] = [];
  for (const s of CHECKLIST_BAGGAGE_C_SHEET_SCENARIOS) {
    const got = resolveChecklistBaggageCSheet(
      parseISODateLocal(s.todayISO),
      s.startISO,
      s.endISO
    );
    if (got !== s.expected) {
      failures.push(`${s.label}: expected ${s.expected}, got ${got}`);
    }
  }

  const oneDay = resolveChecklistBaggageCSheet(
    parseISODateLocal("2026-07-01"),
    "2026-07-01",
    "2026-07-01"
  );
  if (oneDay !== "japan") {
    failures.push(`당일치기 D-Day: expected japan, got ${oneDay}`);
  }
  const oneDayNext = resolveChecklistBaggageCSheet(
    parseISODateLocal("2026-07-02"),
    "2026-07-01",
    "2026-07-01"
  );
  if (oneDayNext !== "korea") {
    failures.push(`당일치기 익일: expected korea, got ${oneDayNext}`);
  }

  return { ok: failures.length === 0, failures };
}

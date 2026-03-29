import { parseISODateLocal } from "@/lib/tripCalendarUtils";

export type BaggagePopupKind = "japan" | "korea";

function stripToLocalDate(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function addCalendarDays(d: Date, delta: number): Date {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  x.setDate(x.getDate() + delta);
  return x;
}

function compareLocalDate(a: Date, b: Date): number {
  const ta = a.getTime();
  const tb = b.getTime();
  if (ta < tb) return -1;
  if (ta > tb) return 1;
  return 0;
}

/**
 * 여행 홈 반입 금지 팝업 분기 (달력 일 단위, 로컬 타임존).
 *
 * - Case 1 (일본행): 여행 시작일 D-7 ~ D-1 (시작일 전날까지, 시작일 당일 제외)
 * - Case 2 (한국행): 여행 시작일 ~ 종료일 (양 끝 포함)
 *
 * 두 구간은 인접만 할 뿐 겹치지 않음 — 시작일 당일은 Case 2만 해당.
 */
export function resolveBaggagePopupPhase(
  today: Date,
  tripStartISO: string,
  tripEndISO: string
): BaggagePopupKind | null {
  const today0 = stripToLocalDate(today);
  const start = stripToLocalDate(parseISODateLocal(tripStartISO));
  const end = stripToLocalDate(parseISODateLocal(tripEndISO));

  if (compareLocalDate(end, start) < 0) return null;

  const fromD7 = addCalendarDays(start, -7);
  const toD1 = addCalendarDays(start, -1);

  if (compareLocalDate(today0, fromD7) >= 0 && compareLocalDate(today0, toD1) <= 0) {
    return "japan";
  }
  if (compareLocalDate(today0, start) >= 0 && compareLocalDate(today0, end) <= 0) {
    return "korea";
  }
  return null;
}

export function baggagePopupDismissStorageKey(
  tripStartISO: string,
  tripEndISO: string,
  kind: BaggagePopupKind
): string {
  return `triple_mvp_baggage_prohibited_popup_v1_${tripStartISO}_${tripEndISO}_${kind}`;
}

export function isBaggagePopupDismissed(
  tripStartISO: string,
  tripEndISO: string,
  kind: BaggagePopupKind
): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(baggagePopupDismissStorageKey(tripStartISO, tripEndISO, kind)) === "1";
}

export function setBaggagePopupDismissed(
  tripStartISO: string,
  tripEndISO: string,
  kind: BaggagePopupKind
): void {
  localStorage.setItem(baggagePopupDismissStorageKey(tripStartISO, tripEndISO, kind), "1");
}

/** 수동·스크립트 검증용 시나리오 (resolveBaggagePopupPhase 기대값) */
export interface BaggagePopupPhaseScenario {
  label: string;
  todayISO: string;
  startISO: string;
  endISO: string;
  expected: BaggagePopupKind | null;
}

export const BAGGAGE_POPUP_PHASE_SCENARIOS: BaggagePopupPhaseScenario[] = [
  {
    label: "D-8: 창 없음",
    todayISO: "2026-03-31",
    startISO: "2026-04-08",
    endISO: "2026-04-15",
    expected: null,
  },
  {
    label: "D-7 첫날(4/1) → 일본",
    todayISO: "2026-04-01",
    startISO: "2026-04-08",
    endISO: "2026-04-15",
    expected: "japan",
  },
  {
    label: "4/4 → 일본",
    todayISO: "2026-04-04",
    startISO: "2026-04-08",
    endISO: "2026-04-15",
    expected: "japan",
  },
  {
    label: "D-1(4/7) → 일본",
    todayISO: "2026-04-07",
    startISO: "2026-04-08",
    endISO: "2026-04-15",
    expected: "japan",
  },
  {
    label: "시작일 당일(4/8) → 한국",
    todayISO: "2026-04-08",
    startISO: "2026-04-08",
    endISO: "2026-04-15",
    expected: "korea",
  },
  {
    label: "여행 중 → 한국",
    todayISO: "2026-04-10",
    startISO: "2026-04-08",
    endISO: "2026-04-15",
    expected: "korea",
  },
  {
    label: "종료일 당일(4/15) → 한국",
    todayISO: "2026-04-15",
    startISO: "2026-04-08",
    endISO: "2026-04-15",
    expected: "korea",
  },
  {
    label: "종료 다음날 → 없음",
    todayISO: "2026-04-16",
    startISO: "2026-04-08",
    endISO: "2026-04-15",
    expected: null,
  },
];

export function verifyBaggagePopupPhaseLogic(): { ok: boolean; failures: string[] } {
  const failures: string[] = [];
  for (const s of BAGGAGE_POPUP_PHASE_SCENARIOS) {
    const got = resolveBaggagePopupPhase(
      parseISODateLocal(s.todayISO),
      s.startISO,
      s.endISO
    );
    if (got !== s.expected) {
      failures.push(`${s.label}: expected ${s.expected}, got ${got} (today=${s.todayISO})`);
    }
  }

  const singleStart = resolveBaggagePopupPhase(
    parseISODateLocal("2026-07-01"),
    "2026-07-01",
    "2026-07-01"
  );
  if (singleStart !== "korea") {
    failures.push(`당일치기 여행 시작일: expected korea, got ${singleStart}`);
  }

  const singleD1 = resolveBaggagePopupPhase(
    parseISODateLocal("2026-06-30"),
    "2026-07-01",
    "2026-07-01"
  );
  if (singleD1 !== "japan") {
    failures.push(`당일치기 D-1: expected japan, got ${singleD1}`);
  }

  const invalidRange = resolveBaggagePopupPhase(
    parseISODateLocal("2026-04-05"),
    "2026-04-08",
    "2026-04-01"
  );
  if (invalidRange !== null) {
    failures.push(`종료<시작: expected null, got ${invalidRange}`);
  }

  return { ok: failures.length === 0, failures };
}

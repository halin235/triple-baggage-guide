import { parseISODateLocal } from "@/lib/tripCalendarUtils";

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
 * C안 체크리스트 시트 분기 (달력 일 단위, 로컬).
 *
 * - 출국 전 ~ 여행 초반: 시작일 D-7 이전 포함 ~ 시작일 D+1(출발 다음날)까지 → 일본행 시트
 * - 여행 중반 ~ 귀국: 시작일 D+2 ~ 종료일 → 한국행 시트
 * - 종료일 이후: 한국행(참고용)
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

  const fromSecondDayAfterStart = addCalendarDays(s, 2);

  if (compareLocalDate(t, e) > 0) return "korea";
  if (
    compareLocalDate(t, fromSecondDayAfterStart) >= 0 &&
    compareLocalDate(t, e) <= 0
  ) {
    return "korea";
  }
  return "japan";
}

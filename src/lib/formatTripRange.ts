import { parseISODateLocal } from "@/lib/tripCalendarUtils";

const WEEK_KO_SHORT = ["일", "월", "화", "수", "목", "금", "토"] as const;

function isoToMMDDWeekdayParen(iso: string): string {
  const d = parseISODateLocal(iso);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const w = WEEK_KO_SHORT[d.getDay()] ?? "";
  return `${m}.${day}(${w})`;
}

/** 예: 04.08(수) - 04.15(수) */
export function formatTripRangeWithWeekdayParen(
  startISO: string,
  endISO: string
): string {
  return `${isoToMMDDWeekdayParen(startISO)} - ${isoToMMDDWeekdayParen(endISO)}`;
}

/** ISO 날짜 → 표시용 (예: 2026.4.6) */
export function formatTripDateDot(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${y}.${m}.${d}`;
}

/** 시작·종료 ISO → "2026.4.6 - 4.10" 스타일 (같은 해·월이면 종료는 월.일만) */
export function formatTripRangeLine(startISO: string, endISO: string): string {
  const [ys, ms, ds] = startISO.split("-").map(Number);
  const [ye, me, de] = endISO.split("-").map(Number);
  if (!ys || !ms || !ds || !ye || !me || !de) {
    return `${startISO} - ${endISO}`;
  }
  const left = `${ys}.${ms}.${ds}`;
  if (ys === ye && ms === me) {
    return `${left} - ${me}.${de}`;
  }
  if (ys === ye) {
    return `${left} - ${me}.${de}`;
  }
  return `${left} - ${ye}.${me}.${de}`;
}

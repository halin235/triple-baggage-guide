import { parseISODateLocal, toISODate } from "@/lib/tripCalendarUtils";

/** 시작·종료 ISO(YYYY-MM-DD) 포함해 일자 배열 */
export function enumerateTripDays(startISO: string, endISO: string): string[] {
  const out: string[] = [];
  const cur = parseISODateLocal(startISO);
  while (toISODate(cur) <= endISO) {
    out.push(toISODate(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return out;
}

const WEEK_KO = ["일", "월", "화", "수", "목", "금", "토"];

/** 예: 04.08(수) — 타임라인 Day 헤더용 */
export function formatScheduleDayLabel(iso: string): string {
  const d = parseISODateLocal(iso);
  const w = WEEK_KO[d.getDay()] ?? "";
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${m}.${day}(${w})`;
}

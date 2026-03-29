import { parseISODateLocal } from "@/lib/tripCalendarUtils";

function stripToLocalDate(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function compareLocalDate(a: Date, b: Date): number {
  const t = a.getTime() - b.getTime();
  return t < 0 ? -1 : t > 0 ? 1 : 0;
}

export function todayDateOnly(): Date {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}

/**
 * 메인 헤드라인 접미사: 출발 전 `D-9`, 여행 중 `Day 2`, 종료 후 `여행 종료`
 */
export function getTripCountdownHeadline(startISO: string, endISO: string): string {
  const t = todayDateOnly();
  const start = stripToLocalDate(parseISODateLocal(startISO));
  const end = stripToLocalDate(parseISODateLocal(endISO));

  if (compareLocalDate(end, start) < 0) return "일정을 등록해 주세요";

  if (compareLocalDate(t, start) < 0) {
    const days = Math.round((start.getTime() - t.getTime()) / 86400000);
    return `D-${days}`;
  }
  if (compareLocalDate(t, end) > 0) {
    return "여행 종료";
  }
  const dayIdx = Math.round((t.getTime() - start.getTime()) / 86400000) + 1;
  return `Day ${dayIdx}`;
}

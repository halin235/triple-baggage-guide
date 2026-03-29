export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseISODateLocal(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function daysInMonth(year: number, month1: number): number {
  return new Date(year, month1, 0).getDate();
}

/** month1: 1–12, returns 0=Sun … 6=Sat */
export function startWeekday(year: number, month1: number): number {
  return new Date(year, month1 - 1, 1).getDay();
}

export function isInRangeInclusive(
  d: string,
  start: string | null,
  end: string | null
): boolean {
  if (!start || !end) return false;
  return d >= start && d <= end;
}

export function isSameISODate(a: string, b: string): boolean {
  return a === b;
}

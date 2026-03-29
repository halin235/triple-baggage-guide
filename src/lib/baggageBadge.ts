import type { BaggageRegulationItem } from "@/types/baggage";

/** UI 배지 — 엑셀 요약·품목명·톤에서 도출 (디자인 1:1 매칭) */
export type BaggageBadgeVisual =
  | "prohibited"
  | "quarantine"
  | "carry_recommended"
  | "caution"
  | "ok";

export function getBaggageBadge(row: BaggageRegulationItem): {
  visual: BaggageBadgeVisual;
  label: string;
} {
  if (row.cardTone === "danger") {
    return { visual: "prohibited", label: "반입 금지" };
  }
  const sum = row.summaryAction;
  const detail = row.detailGuide;
  if (/검역\s*필수/.test(sum) || /검역\s*필수/.test(detail)) {
    return { visual: "quarantine", label: "검역 필수" };
  }
  if (
    row.itemName.includes("스마트폰") ||
    row.itemName.includes("노트북") ||
    /기내\s*휴대\s*권장/.test(sum)
  ) {
    return { visual: "carry_recommended", label: "기내 휴대 권장" };
  }
  if (row.cardTone === "warning") {
    return { visual: "caution", label: "주의" };
  }
  return { visual: "ok", label: "권장·가능" };
}

import type { BaggageAirportCode } from "@/types/baggage";

export interface ChecklistRow {
  id: string;
  /** 체크리스트에 보이는 라벨 — `findRegulationsForChecklistItem` 매칭용 */
  label: string;
  /** 규정 매칭 시 사용할 공항 데이터 */
  airport: BaggageAirportCode;
}

/** 출국 전(일본 입국·KIX 기준) */
export const CHECKLIST_OUTBOUND: ChecklistRow[] = [
  { id: "ob-1", label: "여권 · e티켓", airport: "KIX" },
  { id: "ob-2", label: "보조배터리", airport: "KIX" },
  { id: "ob-3", label: "충전 케이블, USB 젠더", airport: "KIX" },
  { id: "ob-4", label: "멀티어댑터", airport: "KIX" },
  { id: "ob-5", label: "스킨, 치약, 샴푸", airport: "KIX" },
  { id: "ob-6", label: "상비약", airport: "KIX" },
  { id: "ob-7", label: "가위, 손톱깎이", airport: "KIX" },
];

/** 귀국 전(한국 입국·ICN 기준) */
export const CHECKLIST_INBOUND: ChecklistRow[] = [
  { id: "ib-1", label: "여권 · 세관 신고 물품", airport: "ICN" },
  { id: "ib-2", label: "보조배터리", airport: "ICN" },
  { id: "ib-3", label: "곤약젤리", airport: "ICN" },
  { id: "ib-4", label: "라면", airport: "ICN" },
  { id: "ib-5", label: "치즈, 버터", airport: "ICN" },
  { id: "ib-6", label: "김치", airport: "ICN" },
  { id: "ib-7", label: "건어물", airport: "ICN" },
];

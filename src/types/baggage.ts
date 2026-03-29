/**
 * 수하물 규정 카테고리 설계 (1).xlsx 컬럼 매핑
 *
 * | 엑셀 원본 (KIX 시트)     | 필드                    |
 * |--------------------------|-------------------------|
 * | 소분류 (Item)            | itemName (품목명)       |
 * | 카테고리                 | category                |
 * | 안내 문구 요약 (Action)  | summaryAction           |
 * | 안내 문구 상세           | detailGuide (상세 안내) |
 * | 수하물 카드 컬러         | cardTone                |
 *
 * | 엑셀 원본 (ICN 시트)     | 필드                    |
 * |--------------------------|-------------------------|
 * | 소분류                   | itemName                |
 * | 카테고리                 | category                |
 * | 안내 문구 요약 (Action)  | summaryAction           |
 * | 안내 문구 상세           | detailGuide             |
 * | 안내 아이콘              | cardTone (이모지→톤)    |
 *
 * 엑셀에 별도 컬럼이 없는 **반입 규정(기내/위탁)** 은 요약·상세 문구를 바탕으로 MVP용으로 구조화했습니다.
 * **노선**은 ICN(인천)·KIX(간사이) 특화 데이터이므로 `route.airports` 로 구분합니다.
 */

/** ICN ↔ KIX MVP 기준 공항 코드 */
export type BaggageAirportCode = "ICN" | "KIX";

/** 디자인 Rule P3 — 리스트 보더·배지 (엑셀 🔴🟡🔵) */
export type BaggageCardTone = "danger" | "warning" | "info";

/** 반입 규정: 기내 / 위탁 (엑셀의 단일 문장을 UI용 이원화) */
export interface BaggageCarryRegulation {
  /** 기내 휴대 기준 요약 */
  cabin: string;
  /** 위탁 수하물 기준 요약 */
  checked: string;
}

/** 입국 방향 라벨 (엑셀 `국가 분류`) */
export interface BaggageRouteMeta {
  /** 이 규정이 적용되는 공항 코드 (한 시트 = 한 공항) */
  airports: BaggageAirportCode[];
  /** 예: 🇯🇵 일본행, 🇰🇷 한국행 */
  directionLabel: string;
}

export interface BaggageRegulationItem {
  /** 내부 식별자 (검색·체크리스트 매칭용) */
  id: string;
  /** 품목명 — 엑셀 `소분류` / `소분류 (Item)` */
  itemName: string;
  /** 카테고리 — 엑셀 `카테고리` */
  category: string;
  /** 반입 규정(기내/위탁) — MVP에서 요약·상세로부터 도출 */
  carryRegulation: BaggageCarryRegulation;
  /** 엑셀 `안내 문구 요약 (Action)` */
  summaryAction: string;
  /** 엑셀 `안내 문구 상세` */
  detailGuide: string;
  /** 노선(ICN/KIX) 및 입국 방향 */
  route: BaggageRouteMeta;
  cardTone: BaggageCardTone;
  /** 추적·재생성용 시트명 */
  excelSourceSheet: string;
}

/**
 * 수하물 규제 카테고리 설계 (1).xlsx — 시트 `E안_일본행`, `E안_한국행` 행 데이터
 * (repo 내 excel_dump.json 동일 본문)
 */
export interface EanProhibitedPopupItem {
  id: string;
  /** 엑셀 `수하물` */
  itemName: string;
  /** 엑셀 `안내 문구` (상세 규정·주의사항) */
  detailText: string;
}

/** 시트: E안_일본행 */
export const EAN_JAPAN_PROHIBITED_POPUP_ITEMS: EanProhibitedPopupItem[] = [
  {
    id: "ean-jp-1",
    itemName: "무선 고데기",
    detailText:
      "🚨 충전식 무선 고데기는 기내/위탁 모두 반입 불가예요. 일본 공항에서 압수될 수 있으니 유선 제품을 챙기세요.",
  },
  {
    id: "ean-jp-2",
    itemName: "의약품 내, 수다페드 (슈도에페드린 성분)",
    detailText:
      "🚨 수다페드 성분은 일본 내 처벌 대상이에요. 한국 상비약이라도 성분을 꼭 확인하고 가져가지 마세요.",
  },
];

/** 시트: E안_한국행 */
export const EAN_KOREA_PROHIBITED_POPUP_ITEMS: EanProhibitedPopupItem[] = [
  {
    id: "ean-kr-1",
    itemName: "곤약젤리",
    detailText:
      "🚨 컵 형태 곤약젤리는 한국 입국 시 전면 반입 금지입니다. 반드시 짜먹는 '튜브형' 제품만 구매해서 가져오세요.",
  },
  {
    id: "ean-kr-2",
    itemName: "소시지",
    detailText:
      "🚨 소시지는 가공 방식과 무관하게 반입이 금지돼요. 적발 시 높은 과태료가 부과될 수 있습니다.",
  },
];

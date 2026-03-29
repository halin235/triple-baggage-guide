import {
  EAN_JAPAN_PROHIBITED_POPUP_ITEMS,
  EAN_KOREA_PROHIBITED_POPUP_ITEMS,
  type EanProhibitedPopupItem,
} from "@/constants/eanProhibitedPopupData";

export type { EanProhibitedPopupItem };

/** 엑셀 시트 `E안_일본행` — 품목명·안내 문구(상세) 그대로 */
export function getProhibitedItemsForJapanPopup(): EanProhibitedPopupItem[] {
  return EAN_JAPAN_PROHIBITED_POPUP_ITEMS;
}

/** 엑셀 시트 `E안_한국행` — 품목명·안내 문구(상세) 그대로 */
export function getProhibitedItemsForKoreaPopup(): EanProhibitedPopupItem[] {
  return EAN_KOREA_PROHIBITED_POPUP_ITEMS;
}

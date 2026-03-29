import type { BaggagePopupKind } from "@/lib/baggagePopupPhase";

/**
 * 로컬에서 반입 금지 팝업 UI만 검증할 때 사용합니다.
 * 배포 전에는 `DEV_FORCE_SHOW`를 `false`로 두거나 이 파일의 사용처를 제거하세요.
 */
export const BAGGAGE_POPUP_DEV_FORCE_SHOW = false;

/**
 * `DEV_FORCE_SHOW`가 켜져 있을 때 기본으로 띄울 버전.
 * 일본행 확인 후 한국행을 보려면 `"korea"`로 바꾸거나 `/?popupTest=korea` 로 접속하세요.
 */
export const BAGGAGE_POPUP_DEV_FORCE_VARIANT: BaggagePopupKind = "japan";

/** `?popupTest=japan` | `jpn` | `korea` | `kor` | `kr` */
export function parsePopupTestQuery(raw: string | null): BaggagePopupKind | null {
  if (raw == null || raw === "") return null;
  const v = raw.trim().toLowerCase();
  if (v === "japan" || v === "jpn") return "japan";
  if (v === "korea" || v === "kor" || v === "kr") return "korea";
  return null;
}

export function logBaggagePopupTestVersion(variant: BaggagePopupKind): void {
  const label = variant === "japan" ? "JPN" : "KOR";
  console.log(`Baggage Popup Test: Showing ${label} version`);
}

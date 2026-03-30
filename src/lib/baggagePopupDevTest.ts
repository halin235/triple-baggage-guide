import type { BaggagePopupKind } from "@/lib/baggagePopupPhase";

/**
 * [로컬 D-7 경로 검증 — 테스트 끝나면 아래를 false로]
 * `npm run dev`에서만 적용됩니다. 프로덕션 빌드에서는 항상 꺼집니다.
 * true이면 팝업 분기에 쓰는 "오늘"을 **현재 적용 중인 여행 시작일의 D-7**(달력 기준)로 고정해,
 * 실제 PC 날짜가 D-7~D-1 밖이어도 일본행(`japan`) 팝업이 뜨는지 확인할 수 있습니다.
 * 이전에 "다시 보지 않기"를 눌렀다면 localStorage 키 `triple_mvp_baggage_prohibited_popup_v1_*`를 지우거나 시크릿 창을 쓰세요.
 */
const BAGGAGE_POPUP_DEV_SIMULATE_D7_TOGGLE = false;

export const BAGGAGE_POPUP_DEV_SIMULATE_TODAY_AS_TRIP_D7 =
  process.env.NODE_ENV === "development" && BAGGAGE_POPUP_DEV_SIMULATE_D7_TOGGLE;

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
  if (process.env.NODE_ENV !== "development") return;
  const label = variant === "japan" ? "JPN" : "KOR";
  console.log(`Baggage Popup Test: Showing ${label} version`);
}

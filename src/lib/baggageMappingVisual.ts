import type { BaggageBadgeVisual } from "@/lib/baggageBadge";
import type { BaggageCardTone } from "@/types/baggage";

/** 매핑 시트 `안내 문구 요약` 문자열 → 카드 톤(엑셀 RED/BLUE/ORANGE 계열) */
export function cardToneFromMappingSummary(summary: string): BaggageCardTone {
  if (
    /반입\s*불가|반입\s*금지(?!.*가능)|압수\s*주의|처벌\s*주의|전량\s*폐기|형사\s*처벌|과태료|독성\s*확인|컵형\s*반입\s*금지|반입\s*주의:\s*독성/i.test(
      summary
    )
  ) {
    return "danger";
  }
  if (
    /\[주의:|\[필수:|\[추천:|\[권장:|\[성분\s*확인|\[면세|\[입국\s*시|\[1만\s*달러|\[날\s*6cm|\[위탁\/기내\s*택|\[인체용\s*1개만|\[기본\s*면세|\[위탁\s*수하물\s*가능|\[위탁\s*수하물\s*권장|\[필수:\s*위탁/i.test(
      summary
    )
  ) {
    return "warning";
  }
  return "info";
}

export function badgeVisualFromCardTone(tone: BaggageCardTone): BaggageBadgeVisual {
  if (tone === "danger") return "prohibited";
  if (tone === "warning") return "caution";
  return "ok";
}

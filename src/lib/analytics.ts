export type AnalyticsPayload = Record<string, unknown>;

/**
 * 가설 검증용 — 포맷: [Analytics] Event: {이벤트명}, Property: {세부정보}
 */
export function logAnalytics(event: string, properties: AnalyticsPayload = {}) {
  if (process.env.NODE_ENV !== "development") return;
  const property =
    typeof properties === "object" && properties !== null
      ? JSON.stringify(properties)
      : String(properties);
  console.log(`[Analytics] Event: ${event}, Property: ${property}`);
}

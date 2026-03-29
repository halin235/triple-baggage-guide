"use client";

import { logAnalytics } from "@/lib/analytics";

export function SchedulePromoBanner() {
  return (
    <button
      type="button"
      className="w-full rounded-xl bg-gradient-to-r from-triple-blue to-[#5B9DFF] px-4 py-3.5 text-left shadow-md transition active:scale-[0.99]"
      onClick={() =>
        logAnalytics("ad_banner_click", {
          placement: "schedule_between_days",
          campaign: "baggage_insurance_demo",
        })
      }
    >
      <p className="text-xs font-medium text-white/90">트리플 제휴 · 데모</p>
      <p className="mt-0.5 text-[15px] font-bold text-white">
        수하물 지연 보상 보험 알아보기
      </p>
      <p className="mt-1 text-xs text-white/85">탭하면 외부 랜딩을 가정한 로그만 남깁니다.</p>
    </button>
  );
}

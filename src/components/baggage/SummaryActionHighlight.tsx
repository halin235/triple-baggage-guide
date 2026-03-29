/** 엑셀 `summaryAction` 노란 강조 — 예: [필수: 기내 휴대] */
export function SummaryActionHighlight({ text }: { text: string }) {
  return (
    <span className="inline-block max-w-full rounded-md bg-[#FFF8E1] px-2.5 py-1.5 text-[13px] font-semibold leading-snug text-[#7A5F00] ring-1 ring-[#F5E6A3]/90">
      {text}
    </span>
  );
}

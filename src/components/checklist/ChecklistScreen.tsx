"use client";

import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { SummaryActionHighlight } from "@/components/baggage/SummaryActionHighlight";
import { CollapsibleChevronPanel } from "@/components/ui/CollapsibleChevronPanel";
import {
  CHECKLIST_INBOUND,
  CHECKLIST_OUTBOUND,
} from "@/constants/checklistData";
import { logAnalytics } from "@/lib/analytics";
import { findRegulationsForChecklistItem } from "@/lib/baggageSearch";
import type { BaggageAirportCode } from "@/types/baggage";
import type { BaggageRegulationItem } from "@/types/baggage";

function RegulationPanel({ regs }: { regs: BaggageRegulationItem[] }) {
  if (regs.length === 0) {
    return (
      <p className="text-[13px] leading-relaxed text-muted">
        등록된 수하물 가이드가 없습니다. 검색에서 품목명을 확인해 보세요.
      </p>
    );
  }
  return (
    <div className="space-y-3">
      {regs.map((reg) => (
        <div
          key={reg.id}
          className="rounded-lg border border-[#EEEEEE] bg-[#FAFAFA] p-3"
        >
          <p className="text-[12px] font-semibold uppercase tracking-wide text-muted">
            매칭 품목 · {reg.itemName}
          </p>
          <div className="mt-2">
            <SummaryActionHighlight text={reg.summaryAction} />
          </div>
          <p className="mt-2.5 text-[13px] leading-relaxed text-[#666666]">
            {reg.detailGuide.replace(/🚨/g, "").trim()}
          </p>
          <dl className="mt-3 grid gap-1.5 text-[12px] text-[#666666]">
            <div className="flex gap-1.5">
              <dt className="shrink-0 font-semibold text-ink">기내</dt>
              <dd>{reg.carryRegulation.cabin}</dd>
            </div>
            <div className="flex gap-1.5">
              <dt className="shrink-0 font-semibold text-ink">위탁</dt>
              <dd>{reg.carryRegulation.checked}</dd>
            </div>
          </dl>
        </div>
      ))}
    </div>
  );
}

export function ChecklistScreen() {
  /** 체크(완료) === 규정 패널 펼침 — 동일 상태로 연동 */
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const surfacePayload = useMemo(() => {
    const all = [...CHECKLIST_OUTBOUND, ...CHECKLIST_INBOUND];
    return all.map((r) => ({
      checklistId: r.id,
      label: r.label,
      airport: r.airport,
      regulationIds: findRegulationsForChecklistItem(r.label, {
        airport: r.airport,
      }).map((x) => x.id),
    }));
  }, []);

  useEffect(() => {
    logAnalytics("checklist_page_view", { path: "/checklist" });
  }, []);

  useEffect(() => {
    logAnalytics("checklist_regulation_surface", {
      itemCount: surfacePayload.length,
      withMatch: surfacePayload.filter((x) => x.regulationIds.length > 0)
        .length,
      detail: surfacePayload,
    });
  }, [surfacePayload]);

  const toggleItem = useCallback(
    (id: string, label: string, airport: BaggageAirportCode) => {
      let nextChecked = false;
      setChecked((prev) => {
        nextChecked = !prev[id];
        return { ...prev, [id]: nextChecked };
      });
      const regs = findRegulationsForChecklistItem(label, { airport });
      logAnalytics("checklist_item_toggle", {
        checklistItemId: id,
        label,
        airport,
        checked: nextChecked,
        regulationPanelOpen: nextChecked,
        matchedRegulationIds: regs.map((r) => r.id),
        matchedCount: regs.length,
      });
    },
    []
  );

  const Section = ({
    title,
    subtitle,
    rows,
  }: {
    title: string;
    subtitle: string;
    rows: typeof CHECKLIST_OUTBOUND;
  }) => (
    <section className="rounded-2xl border border-line bg-white p-4 shadow-sm">
      <h2 className="text-lg font-bold text-ink">{title}</h2>
      <p className="mt-1 text-sm text-muted">{subtitle}</p>
      <ul className="mt-4 divide-y divide-line">
        {rows.map((row) => {
          const isOn = !!checked[row.id];
          const regs = findRegulationsForChecklistItem(row.label, {
            airport: row.airport,
          });
          return (
            <li key={row.id} className="py-3 first:pt-0">
              <button
                type="button"
                role="checkbox"
                aria-checked={isOn}
                aria-expanded={isOn}
                onClick={() => toggleItem(row.id, row.label, row.airport)}
                className="flex w-full cursor-pointer gap-3 rounded-lg py-1 pl-0 pr-1 text-left transition-colors hover:bg-[#F7F8FA] active:bg-[#F0F2F5]"
              >
                <span
                  className={`mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    isOn
                      ? "border-triple-blue bg-triple-blue text-white"
                      : "border-line bg-white"
                  }`}
                >
                  {isOn ? (
                    <span
                      key={`${row.id}-v`}
                      className="inline-flex animate-check-pop text-[15px] font-bold leading-none"
                      aria-hidden
                    >
                      ✓
                    </span>
                  ) : null}
                </span>
                <span className="flex min-w-0 flex-1 items-start justify-between gap-2">
                  <span className="min-w-0 pt-0.5 text-base font-medium text-ink">
                    {row.label}
                  </span>
                  <ChevronDown
                    className={`mt-1 size-5 shrink-0 text-muted transition-transform duration-300 ease-out ${
                      isOn ? "rotate-180" : ""
                    }`}
                    strokeWidth={2}
                    aria-hidden
                  />
                </span>
              </button>

              <CollapsibleChevronPanel open={isOn}>
                <RegulationPanel regs={regs} />
              </CollapsibleChevronPanel>
            </li>
          );
        })}
      </ul>
    </section>
  );

  return (
    <div className="min-h-screen bg-card pb-28">
      <header className="border-b border-line bg-white px-4 py-4">
        <h1 className="text-xl font-bold text-ink">체크리스트</h1>
        <p className="mt-1 text-sm text-muted">
          품목 이름이나 왼쪽 원을 누르면 체크와 수하물 규정이 함께 열립니다.
          여러 개를 체크하면 각각 펼쳐진 채로 유지됩니다.
        </p>
      </header>
      <main className="space-y-4 px-4 py-4">
        <Section
          title="출국 전 · 여행 준비물"
          subtitle="일본 입국(KIX) 기준 규정 매칭"
          rows={CHECKLIST_OUTBOUND}
        />
        <Section
          title="귀국 전 · 마무리"
          subtitle="한국 입국(ICN) 기준 규정 매칭"
          rows={CHECKLIST_INBOUND}
        />
      </main>
    </div>
  );
}

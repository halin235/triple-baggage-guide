"use client";

import { ChevronDown, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  BAGGAGE_CHECKLIST_C_JAPAN,
  BAGGAGE_CHECKLIST_C_KOREA,
} from "@/constants/baggageChecklistRegulationData";
import { DEMO_TRIP_END_ISO, DEMO_TRIP_START_ISO } from "@/constants/demoTripDates";
import { useTripDraft } from "@/context/TripDraftContext";
import { logAnalytics } from "@/lib/analytics";
import { resolveChecklistBaggageCSheet } from "@/lib/checklistBaggagePhase";
import { todayDateOnly } from "@/lib/homeTripHeadline";
import { CollapsibleChevronPanel } from "@/components/ui/CollapsibleChevronPanel";

const BAGGAGE_SEARCH_ROW = "수하물 규정 확인하기";

function formatSubtext(raw: string): string | null {
  const t = raw.trim();
  if (!t || t === "-") return null;
  return t;
}

function formatGuideText(raw: string): string | null {
  const t = raw.trim();
  if (!t || t === "-") return null;
  return t;
}

export function ChecklistScreen() {
  const router = useRouter();
  const trip = useTripDraft();
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const startISO =
    trip.isComplete && trip.startDate ? trip.startDate : DEMO_TRIP_START_ISO;
  const endISO = trip.isComplete && trip.endDate ? trip.endDate : DEMO_TRIP_END_ISO;
  const cityLabel = trip.isComplete && trip.city ? trip.city.name : "오사카";

  const sheetKind = useMemo(
    () => resolveChecklistBaggageCSheet(todayDateOnly(), startISO, endISO),
    [startISO, endISO]
  );

  const rows = useMemo(
    () =>
      sheetKind === "japan" ? BAGGAGE_CHECKLIST_C_JAPAN : BAGGAGE_CHECKLIST_C_KOREA,
    [sheetKind]
  );

  /** 일본·한국 공통: '수하물 규정 확인하기' 행 제외 */
  const displayRows = useMemo(
    () => rows.filter((r) => r.itemName !== BAGGAGE_SEARCH_ROW),
    [rows]
  );

  const { sectionTitle, sectionSubtitle } = useMemo(() => {
    if (sheetKind === "japan") {
      return {
        sectionTitle: "출국 전 · 여행 준비물",
        sectionSubtitle:
          "품목 이름이나 왼쪽 원을 누르면 체크와 수하물 규정 안내가 함께 열립니다. 여러 개를 펼치면 각각 유지됩니다.",
      };
    }
    return {
      sectionTitle: "귀국 준비 · 수하물 규정",
      sectionSubtitle:
        "귀국 짐싸기 전 한국 입국 규정을 확인하세요. 품목을 누르면 안내 문구가 펼쳐집니다.",
    };
  }, [sheetKind]);

  useEffect(() => {
    logAnalytics("checklist_page_view", {
      path: "/checklist",
      sheet: sheetKind,
      startISO,
      endISO,
    });
  }, [sheetKind, startISO, endISO]);

  const onBack = useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-white pb-28">
      <header className="border-b border-[#F0F0F0] bg-white px-4 pb-4 pt-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-start gap-2">
            <button
              type="button"
              onClick={onBack}
              className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full text-[#1A1A1A] hover:bg-[#F5F5F5]"
              aria-label="뒤로"
            >
              <ChevronLeft className="size-6" strokeWidth={2} aria-hidden />
            </button>
            <div className="min-w-0 pt-0.5">
              <h1 className="text-[20px] font-bold leading-tight text-[#1A1A1A]">
                체크리스트
              </h1>
              <p className="mt-0.5 text-[14px] text-[#8E8E8E]">{cityLabel}</p>
            </div>
          </div>
          <Link
            href="/schedule"
            className="shrink-0 pt-1.5 text-[15px] font-semibold text-[#00C8B5]"
            onClick={() =>
              logAnalytics("checklist_header_edit", { target: "/schedule" })
            }
          >
            편집
          </Link>
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-[#8E8E8E]">
          {sectionSubtitle}
        </p>
      </header>

      <main className="px-4 py-4">
        <section className="rounded-2xl border border-[#EEEEEE] bg-white p-4 shadow-sm">
          <h2 className="text-[17px] font-bold text-[#1A1A1A]">{sectionTitle}</h2>

          <ul className="mt-4 divide-y divide-[#F2F2F2]">
            {displayRows.flatMap((row) => {
              const isOpen = !!openIds[row.id];
              const sub = formatSubtext(row.itemSubtext);
              const guide = formatGuideText(row.guideText);
              const prefix: ReactNode[] = [];

              if (sheetKind === "japan" && row.itemName === "세안 용품") {
                prefix.push(
                  <li
                    key="subheader-jp-basic-packing"
                    className="list-none py-2 pt-0"
                  >
                    <p className="text-[15px] font-bold tracking-tight text-[#1A1A1A]">
                      기본 짐싸기
                    </p>
                  </li>
                );
              }

              if (sheetKind === "japan" && row.itemName === "수건") {
                prefix.push(
                  <li
                    key="subheader-jp-extra-items"
                    className="list-none border-t border-[#F2F2F2] py-3 pt-4"
                  >
                    <p className="text-[15px] font-bold tracking-tight text-[#1A1A1A]">
                      기본 짐싸기 아이템 추가
                    </p>
                  </li>
                );
              }

              if (sheetKind === "korea" && row.itemName === "수건") {
                prefix.push(
                  <li
                    key="subheader-kr-extra-items"
                    className="list-none border-t border-[#F2F2F2] py-3 pt-4"
                  >
                    <p className="text-[15px] font-bold tracking-tight text-[#1A1A1A]">
                      기본 짐싸기 아이템 추가
                    </p>
                  </li>
                );
              }

              prefix.push(
                <li key={row.id} className="py-3.5 first:pt-1">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => {
                      const nextOpen = !openIds[row.id];
                      logAnalytics("checklist_baggage_row_toggle", {
                        id: row.id,
                        itemName: row.itemName,
                        sheet: sheetKind,
                        open: nextOpen,
                      });
                      setOpenIds((p) => ({ ...p, [row.id]: nextOpen }));
                    }}
                    className="flex w-full cursor-pointer gap-3 rounded-xl py-1 pl-0 pr-1 text-left transition-colors hover:bg-[#FAFAFA] active:bg-[#F5F5F5]"
                  >
                    <span
                      className={`mt-1 flex size-[22px] shrink-0 items-center justify-center rounded-full border-2 ${
                        isOpen
                          ? "border-[#00C8B5] bg-[#E6FBF8]"
                          : "border-[#E0E0E0] bg-white"
                      }`}
                      aria-hidden
                    />
                    <span className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="text-[16px] font-semibold leading-snug text-[#1A1A1A]">
                        {row.itemName}
                      </span>
                      {sub ? (
                        <span className="text-[13px] leading-relaxed text-[#A8A8A8]">
                          {sub}
                        </span>
                      ) : null}
                    </span>
                    <ChevronDown
                      className={`mt-1 size-5 shrink-0 text-[#BDBDBD] transition-transform duration-300 ease-out ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      strokeWidth={2}
                      aria-hidden
                    />
                  </button>

                  <CollapsibleChevronPanel open={isOpen}>
                    <div className="pl-[34px]">
                      {guide ? (
                        <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-[#666666]">
                          {guide}
                        </p>
                      ) : (
                        <p className="text-[13px] text-[#A8A8A8]">
                          별도 안내 문구가 없습니다. 수하물 검색에서 품목을 확인해 보세요.
                        </p>
                      )}
                    </div>
                  </CollapsibleChevronPanel>
                </li>
              );

              return prefix;
            })}
          </ul>
        </section>
      </main>
    </div>
  );
}

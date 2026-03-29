"use client";

import { AlertTriangle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { DEMO_TRIP_END_ISO, DEMO_TRIP_START_ISO } from "@/constants/demoTripDates";
import { useTripDraft } from "@/context/TripDraftContext";
import { getBaggageCategoryIcon } from "@/lib/baggageCategories";
import {
  BAGGAGE_POPUP_DEV_FORCE_SHOW,
  BAGGAGE_POPUP_DEV_FORCE_VARIANT,
  logBaggagePopupTestVersion,
  parsePopupTestQuery,
} from "@/lib/baggagePopupDevTest";
import {
  isBaggagePopupDismissed,
  resolveBaggagePopupPhase,
  setBaggagePopupDismissed,
  type BaggagePopupKind,
} from "@/lib/baggagePopupPhase";
import {
  getProhibitedItemsForJapanPopup,
  getProhibitedItemsForKoreaPopup,
} from "@/lib/baggageProhibitedList";

function todayDateOnly(): Date {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}

/** E안 시트에 카테고리 컬럼 없음 — 리스트 좌측 아이콘만 기존 그리드 카테고리 키로 맞춤 */
const EAN_POPUP_ROW_ICON_CATEGORY: Record<string, string> = {
  "ean-jp-1": "전자제품",
  "ean-jp-2": "의약품",
  "ean-kr-1": "식품",
  "ean-kr-2": "식품",
};

export default function HomeProhibitedBaggagePopup() {
  const searchParams = useSearchParams();
  const popupTestRaw = searchParams.get("popupTest");
  const queryVariant = useMemo(
    () => parsePopupTestQuery(popupTestRaw),
    [popupTestRaw]
  );
  const devForceActive = BAGGAGE_POPUP_DEV_FORCE_SHOW || queryVariant !== null;
  const devForcedKind = queryVariant ?? BAGGAGE_POPUP_DEV_FORCE_VARIANT;

  const { isComplete, startDate, endDate } = useTripDraft();
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<BaggagePopupKind | null>(null);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const effectiveStart = useMemo(
    () => (isComplete && startDate ? startDate : DEMO_TRIP_START_ISO),
    [isComplete, startDate]
  );
  const effectiveEnd = useMemo(
    () => (isComplete && endDate ? endDate : DEMO_TRIP_END_ISO),
    [isComplete, endDate]
  );

  useEffect(() => {
    if (devForceActive) {
      logBaggagePopupTestVersion(devForcedKind);
      setKind(devForcedKind);
      setOpen(true);
      setDontShowAgain(false);
      return;
    }

    const resolved = resolveBaggagePopupPhase(
      todayDateOnly(),
      effectiveStart,
      effectiveEnd
    );
    if (!resolved) {
      setOpen(false);
      setKind(null);
      return;
    }

    if (isBaggagePopupDismissed(effectiveStart, effectiveEnd, resolved)) {
      setOpen(false);
      setKind(null);
      return;
    }

    setKind(resolved);
    setOpen(true);
    setDontShowAgain(false);
  }, [devForceActive, devForcedKind, effectiveStart, effectiveEnd]);

  const items = useMemo(() => {
    if (kind === "japan") return getProhibitedItemsForJapanPopup();
    if (kind === "korea") return getProhibitedItemsForKoreaPopup();
    return [];
  }, [kind]);

  const phaseLabel =
    kind === "japan"
      ? "일본행 반입 금지 물품"
      : kind === "korea"
        ? "한국행 반입 금지 물품"
        : "";

  const handleConfirm = useCallback(() => {
    if (!devForceActive && dontShowAgain && kind) {
      setBaggagePopupDismissed(effectiveStart, effectiveEnd, kind);
    }
    setOpen(false);
  }, [devForceActive, dontShowAgain, kind, effectiveStart, effectiveEnd]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || !kind) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="baggage-prohibited-title"
    >
      <div className="relative flex max-h-[min(85vh,640px)] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="shrink-0 border-b border-line px-5 pb-4 pt-5">
          <div className="flex justify-center">
            <span
              className="flex size-12 items-center justify-center rounded-full bg-[#FEECEC] text-[#E53E3E]"
              aria-hidden
            >
              <AlertTriangle className="size-7" strokeWidth={2.25} />
            </span>
          </div>
          <h2
            id="baggage-prohibited-title"
            className="mt-3 text-center text-[17px] font-bold leading-snug text-ink"
          >
            반입 금지: 이 물건들은
            <br />
            가져갈 수 없어요!
          </h2>
          <p className="mt-2 text-center text-sm font-medium text-muted">{phaseLabel}</p>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
          <ul className="flex flex-col gap-2.5">
            {items.map((row) => {
              const Icon = getBaggageCategoryIcon(
                EAN_POPUP_ROW_ICON_CATEGORY[row.id] ?? "etc"
              );
              return (
                <li
                  key={row.id}
                  className="flex gap-3 rounded-xl border border-line bg-[#FAFBFC] px-3 py-3"
                >
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#FEECEC] text-[#E53E3E]"
                    aria-hidden
                  >
                    <Icon className="size-5" strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-semibold text-ink">{row.itemName}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted">{row.detailText}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="shrink-0 border-t border-line bg-white px-4 pb-5 pt-3">
          <label className="flex cursor-pointer items-center gap-2.5 py-2 text-sm text-ink">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="size-4 rounded border-line accent-triple-blue"
            />
            <span>다시 보지 않기</span>
          </label>
          <button
            type="button"
            onClick={handleConfirm}
            className="mt-1 w-full rounded-xl bg-triple-blue py-3.5 text-[15px] font-semibold text-white transition active:opacity-90"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

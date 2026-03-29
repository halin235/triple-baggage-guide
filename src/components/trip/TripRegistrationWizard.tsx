"use client";

import { ArrowLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  TRAVEL_STYLE_OPTIONS,
  TRIP_CITIES_DOMESTIC,
  TRIP_CITIES_OVERSEAS,
  TRIP_REGIONS,
  type TripCityDomestic,
  type TripCityOption,
  type TripRegion,
  type TravelStyleId,
} from "@/constants/tripRegistrationData";
import { useTripDraft } from "@/context/TripDraftContext";
import { logAnalytics } from "@/lib/analytics";
import {
  daysInMonth,
  isInRangeInclusive,
  parseISODateLocal,
  startWeekday,
  toISODate,
} from "@/lib/tripCalendarUtils";

const TRIPLE = "#3182F6";
const STEPS = 3;

const CITY_GRADIENT: Record<string, string> = {
  tokyo: "from-sky-200 via-pink-100 to-rose-200",
  osaka: "from-amber-200 to-orange-300",
  fukuoka: "from-violet-200 to-fuchsia-200",
  sapporo: "from-blue-200 to-cyan-200",
  bangkok: "from-emerald-200 to-teal-200",
  danang: "from-lime-100 to-emerald-200",
  hongkong: "from-red-200 to-amber-200",
  guam: "from-cyan-200 to-blue-300",
  jeju: "from-green-200 to-teal-300",
  busan: "from-indigo-200 to-blue-300",
  seoul: "from-slate-200 to-zinc-300",
};

function TripProgressBar({ step }: { step: number }) {
  const pct = (step / STEPS) * 100;
  return (
    <div className="h-1 w-full overflow-hidden rounded-full bg-[#ECECEC]">
      <div
        className="h-full rounded-full transition-all duration-500 ease-out"
        style={{
          width: `${pct}%`,
          backgroundColor: TRIPLE,
        }}
      />
    </div>
  );
}

function StepShell({
  step,
  title,
  subtitle,
  onBack,
  children,
}: {
  step: number;
  title: string;
  subtitle?: string;
  onBack: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white pb-32">
      <header className="sticky top-0 z-30 border-b border-[#EEEEEE] bg-white px-4 pb-3 pt-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="flex size-10 items-center justify-center rounded-full text-black hover:bg-[#F5F5F5]"
            aria-label="이전"
          >
            <ArrowLeft className="size-6" strokeWidth={2} />
          </button>
          <div className="min-w-0 flex-1 pr-2">
            <TripProgressBar step={step} />
            <h1 className="mt-3 text-[18px] font-bold leading-snug text-black">{title}</h1>
            {subtitle ? (
              <p className="mt-1 text-[13px] leading-relaxed text-[#8B95A1]">{subtitle}</p>
            ) : null}
          </div>
        </div>
      </header>
      <div
        key={step}
        className="animate-step-in flex-1 px-4 pt-4"
      >
        {children}
      </div>
    </div>
  );
}

function StepPlace({
  onNext,
  onBack,
}: {
  onNext: (city: TripCityOption | TripCityDomestic) => void;
  onBack: () => void;
}) {
  const [tab, setTab] = useState<"overseas" | "domestic">("overseas");
  const [region, setRegion] = useState<TripRegion>("전체");
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<TripCityOption | TripCityDomestic | null>(null);

  const list = useMemo(() => {
    if (tab === "domestic") {
      const q = query.trim().toLowerCase();
      if (!q) return TRIP_CITIES_DOMESTIC;
      return TRIP_CITIES_DOMESTIC.filter(
        (c) =>
          c.name.toLowerCase().includes(q) || c.subtitle.toLowerCase().includes(q)
      );
    }
    let rows = TRIP_CITIES_OVERSEAS;
    if (region !== "전체") {
      rows = rows.filter((c) => c.region === region);
    }
    const q = query.trim().toLowerCase();
    if (q) {
      rows = rows.filter(
        (c) =>
          c.name.toLowerCase().includes(q) || c.subtitle.toLowerCase().includes(q)
      );
    }
    return rows;
  }, [tab, region, query]);

  const sectionTitle = tab === "domestic" ? "국내" : region === "전체" ? "인기 도시" : region;

  return (
    <StepShell
      step={1}
      title="여행, 어디로 떠나시나요?"
      subtitle="도시를 선택하면 일정과 수하물 안내에 반영됩니다."
      onBack={onBack}
    >
      <div className="mb-4 flex rounded-xl bg-[#F2F4F6] p-1">
        <button
          type="button"
          onClick={() => setTab("overseas")}
          className={`flex-1 rounded-lg py-2.5 text-[15px] font-semibold transition ${
            tab === "overseas"
              ? "bg-white text-black shadow-sm"
              : "text-[#8B95A1]"
          }`}
        >
          해외도시
        </button>
        <button
          type="button"
          onClick={() => setTab("domestic")}
          className={`flex-1 rounded-lg py-2.5 text-[15px] font-semibold transition ${
            tab === "domestic"
              ? "bg-white text-black shadow-sm"
              : "text-[#8B95A1]"
          }`}
        >
          국내도시
        </button>
      </div>

      {tab === "overseas" ? (
        <div className="-mx-1 mb-4 flex gap-2 overflow-x-auto pb-1">
          {TRIP_REGIONS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              className={`shrink-0 rounded-full px-3.5 py-2 text-[13px] font-semibold transition ${
                region === r
                  ? "text-white"
                  : "bg-[#F2F4F6] text-black"
              }`}
              style={
                region === r
                  ? { backgroundColor: TRIPLE }
                  : undefined
              }
            >
              {r}
            </button>
          ))}
        </div>
      ) : null}

      <div className="relative mb-4">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-[18px] -translate-y-1/2 text-[#8B95A1]"
          strokeWidth={2}
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="도시 검색"
          className="h-11 w-full rounded-xl border border-[#EEEEEE] bg-[#FAFAFA] py-2 pl-10 pr-3 text-[15px] outline-none ring-[#3182F6]/20 focus:ring-2"
        />
      </div>

      <p className="mb-2 text-[14px] font-bold text-black">{sectionTitle}</p>
      <ul className="space-y-0 divide-y divide-[#F0F0F0]">
        {list.map((city) => {
          const isPicked = picked?.id === city.id;
          const g = CITY_GRADIENT[city.id] ?? "from-gray-200 to-gray-300";
          return (
            <li key={city.id} className="flex items-center gap-3 py-3 first:pt-0">
              <div
                className={`size-14 shrink-0 rounded-full bg-gradient-to-br ${g} shadow-inner`}
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <p className="text-[16px] font-bold text-black">{city.name}</p>
                <p className="mt-0.5 text-[13px] text-[#8B95A1]">{city.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setPicked(city)}
                className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition ${
                  isPicked
                    ? "text-white"
                    : "border border-[#E5E5E5] bg-white text-black"
                }`}
                style={isPicked ? { backgroundColor: TRIPLE } : undefined}
              >
                선택
              </button>
            </li>
          );
        })}
      </ul>

      <div className="fixed bottom-[4.5rem] left-0 right-0 z-40 border-t border-[#EEEEEE] bg-white/95 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-sm">
        <div className="mx-auto max-w-lg">
          <p className="mb-2 text-center text-[12px] text-[#8B95A1]">
            최소 1개 도시 선택
          </p>
          <button
            type="button"
            disabled={!picked}
            onClick={() => picked && onNext(picked)}
            className="h-12 w-full rounded-xl text-[16px] font-bold text-white transition disabled:opacity-40"
            style={{ backgroundColor: TRIPLE }}
          >
            다음
          </button>
        </div>
      </div>
    </StepShell>
  );
}

function MonthBlock({
  year,
  month1,
  rangeStart,
  rangeEnd,
  todayISO,
  onPick,
}: {
  year: number;
  month1: number;
  rangeStart: string | null;
  rangeEnd: string | null;
  todayISO: string;
  onPick: (iso: string) => void;
}) {
  const dim = daysInMonth(year, month1);
  const startPad = startWeekday(year, month1);
  const cells: (number | null)[] = [...Array(startPad).fill(null)];
  for (let d = 1; d <= dim; d++) cells.push(d);

  const label = `${year}년 ${month1}월`;
  const WEEK = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="mb-8">
      <h3 className="mb-3 text-[17px] font-bold text-black">{label}</h3>
      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[12px] font-medium text-[#8B95A1]">
        {WEEK.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-2 text-center text-[14px]">
        {cells.map((d, idx) => {
          if (d == null) {
            return <div key={`e-${idx}`} className="aspect-square" />;
          }
          const iso = `${year}-${String(month1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
          const inRange = isInRangeInclusive(iso, rangeStart, rangeEnd);
          const isStart = rangeStart && iso === rangeStart;
          const isEnd = rangeEnd && iso === rangeEnd;
          const isToday = iso === todayISO;
          const dt = parseISODateLocal(iso);
          const w = dt.getDay();
          const weekend = w === 0 || w === 6;

          let cls =
            "flex aspect-square items-center justify-center rounded-lg text-[14px] font-medium transition ";
          if (inRange || isStart || isEnd) {
            if (isStart || isEnd) {
              cls += "bg-[#3182F6] font-bold text-white shadow-sm ";
            } else {
              cls += "bg-[#E8F3FF] font-semibold text-[#3182F6] ";
            }
          } else {
            cls += weekend ? "text-[#E53935] " : "text-black ";
            if (isToday) cls += "ring-2 ring-[#3182F6] ring-offset-1 ";
          }

          return (
            <button
              key={iso}
              type="button"
              onClick={() => onPick(iso)}
              className={cls}
            >
              <span className="flex flex-col items-center leading-none">
                <span>{d}</span>
                {isToday ? (
                  <span className="mt-0.5 text-[9px] font-semibold text-[#3182F6]">
                    오늘
                  </span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepDates({
  onNext,
  onBack,
}: {
  onNext: (start: string, end: string) => void;
  onBack: () => void;
}) {
  const { startDate: ctxStart, endDate: ctxEnd } = useTripDraft();
  const [anchor] = useState(() => new Date());
  const todayISO = toISODate(anchor);
  const [rangeStart, setRangeStart] = useState<string | null>(null);
  const [rangeEnd, setRangeEnd] = useState<string | null>(null);

  useEffect(() => {
    if (ctxStart) setRangeStart(ctxStart);
    if (ctxEnd) setRangeEnd(ctxEnd);
  }, [ctxStart, ctxEnd]);

  const months = useMemo(() => {
    const out: { y: number; m: number }[] = [];
    let y = anchor.getFullYear();
    let m = anchor.getMonth() + 1;
    for (let i = 0; i < 8; i++) {
      out.push({ y, m });
      m += 1;
      if (m > 12) {
        m = 1;
        y += 1;
      }
    }
    return out;
  }, [anchor]);

  const onPick = useCallback(
    (iso: string) => {
      if (!rangeStart || (rangeStart && rangeEnd)) {
        setRangeStart(iso);
        setRangeEnd(null);
        return;
      }
      if (rangeStart && !rangeEnd) {
        if (iso < rangeStart) {
          setRangeEnd(rangeStart);
          setRangeStart(iso);
        } else {
          setRangeEnd(iso);
        }
      }
    },
    [rangeStart, rangeEnd]
  );

  const canNext = Boolean(rangeStart && rangeEnd);

  return (
    <StepShell
      step={2}
      title="여행일정 등록"
      subtitle="일정에 따른 날씨예보, 여행 정보들을 알려드립니다."
      onBack={onBack}
    >
      <p className="mb-4 text-[13px] text-[#8B95A1]">
        시작일과 종료일을 차례로 눌러 주세요. 범위는 트리플 블루로 표시됩니다.
      </p>
      {months.map(({ y, m }) => (
        <MonthBlock
          key={`${y}-${m}`}
          year={y}
          month1={m}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          todayISO={todayISO}
          onPick={onPick}
        />
      ))}

      <div className="fixed bottom-[4.5rem] left-0 right-0 z-40 border-t border-[#EEEEEE] bg-white/95 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-sm">
        <div className="mx-auto max-w-lg">
          <p className="mb-2 text-center text-[12px] text-[#8B95A1]">
            {canNext
              ? `${rangeStart} ~ ${rangeEnd}`
              : "출발일과 귀국일을 선택해 주세요"}
          </p>
          <button
            type="button"
            disabled={!canNext}
            onClick={() =>
              rangeStart && rangeEnd && onNext(rangeStart, rangeEnd)
            }
            className="h-12 w-full rounded-xl text-[16px] font-bold text-white transition disabled:opacity-40"
            style={{ backgroundColor: TRIPLE }}
          >
            다음
          </button>
        </div>
      </div>
    </StepShell>
  );
}

function StepStyle({
  onComplete,
  onBack,
}: {
  onComplete: (id: TravelStyleId, label: string) => void;
  onBack: () => void;
}) {
  const [sel, setSel] = useState<TravelStyleId | null>(null);

  return (
    <StepShell
      step={3}
      title="이번 여행 스타일은?"
      subtitle="누구와 함께 가시나요?"
      onBack={onBack}
    >
      <div className="flex flex-wrap gap-2">
        {TRAVEL_STYLE_OPTIONS.map((opt) => {
          const active = sel === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSel(opt.id)}
              className={`rounded-full px-4 py-2.5 text-[14px] font-semibold transition ${
                active
                  ? "text-white shadow-md"
                  : "border border-[#E8E8E8] bg-white text-black"
              }`}
              style={active ? { backgroundColor: TRIPLE } : undefined}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      <div className="fixed bottom-[4.5rem] left-0 right-0 z-40 border-t border-[#EEEEEE] bg-white/95 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-sm">
        <div className="mx-auto max-w-lg">
          <button
            type="button"
            disabled={!sel}
            onClick={() => {
              const opt = TRAVEL_STYLE_OPTIONS.find((o) => o.id === sel);
              if (opt) onComplete(opt.id, opt.label);
            }}
            className="h-12 w-full rounded-xl text-[16px] font-bold text-white transition disabled:opacity-40"
            style={{ backgroundColor: TRIPLE }}
          >
            일정 등록 완료
          </button>
        </div>
      </div>
    </StepShell>
  );
}

export function TripRegistrationWizard() {
  const router = useRouter();
  const trip = useTripDraft();
  const {
    setCity,
    setDateRange,
    completeRegistration,
    resetDraft,
  } = trip;
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const goHome = useCallback(() => {
    router.push("/");
  }, [router]);

  const handleStep1Next = useCallback(
    (city: TripCityOption | TripCityDomestic) => {
      setCity(city);
      logAnalytics("trip_reg_step1_city", { cityId: city.id });
      setStep(2);
    },
    [setCity]
  );

  const handleStep2Next = useCallback(
    (start: string, end: string) => {
      setDateRange(start, end);
      logAnalytics("trip_reg_step2_dates", { start, end });
      setStep(3);
    },
    [setDateRange]
  );

  const finish = useCallback(
    (styleId: TravelStyleId, styleLabel: string) => {
      if (!trip.city || !trip.startDate || !trip.endDate) return;
      completeRegistration({
        city: trip.city,
        startDate: trip.startDate,
        endDate: trip.endDate,
        travelStyleId: styleId,
        travelStyleLabel: styleLabel,
      });
      logAnalytics("trip_reg_complete", {
        cityId: trip.city.id,
        start: trip.startDate,
        end: trip.endDate,
        styleId,
      });
      router.push("/schedule");
    },
    [trip.city, trip.startDate, trip.endDate, completeRegistration, router]
  );

  if (step === 1) {
    return (
      <StepPlace
        onNext={handleStep1Next}
        onBack={() => {
          resetDraft();
          goHome();
        }}
      />
    );
  }
  if (step === 2) {
    return (
      <StepDates
        onNext={handleStep2Next}
        onBack={() => setStep(1)}
      />
    );
  }
  return (
    <StepStyle
      onComplete={finish}
      onBack={() => setStep(2)}
    />
  );
}

"use client";

import { CircleHelp, Map, Menu, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { DEMO_TRIP_END_ISO, DEMO_TRIP_START_ISO } from "@/constants/demoTripDates";
import { useTripDraft } from "@/context/TripDraftContext";
import { formatTripRangeWithWeekdayParen } from "@/lib/formatTripRange";
import { buildHomeBaggageGuideHref } from "@/lib/homeBaggageGuideLink";
import { getTripCountdownHeadline, todayDateOnly } from "@/lib/homeTripHeadline";
import { logAnalytics } from "@/lib/analytics";

const TEAL = "#00C8B5";
const CTA_BLUE = "#007AFF";

const HEADER_TABS = [
  "가이드",
  "항공",
  "숙소",
  "관광",
  "맛집",
  "혜택",
  "투어·티켓",
] as const;

const CAROUSEL_SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=960&q=80",
    alt: "시부야 스크램블 교차로",
  },
  {
    src: "https://images.unsplash.com/photo-1513407030348-c983a97b97d8?w=960&q=80",
    alt: "도쿄 야경",
  },
  {
    src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=960&q=80",
    alt: "일본 여행",
  },
];

const AI_USER_NAME = "4조 7eers";

export function TripleHomeView() {
  const router = useRouter();
  const trip = useTripDraft();
  const [carouselIndex, setCarouselIndex] = useState(0);

  const startISO =
    trip.isComplete && trip.startDate ? trip.startDate : DEMO_TRIP_START_ISO;
  const endISO = trip.isComplete && trip.endDate ? trip.endDate : DEMO_TRIP_END_ISO;
  const cityLabel =
    trip.isComplete && trip.city ? `${trip.city.name} 여행` : "오사카 여행";

  const dateLine = useMemo(
    () => formatTripRangeWithWeekdayParen(startISO, endISO),
    [startISO, endISO]
  );
  const dHeadline = useMemo(
    () => getTripCountdownHeadline(startISO, endISO),
    [startISO, endISO]
  );

  const baggageGuideHref = useMemo(
    () =>
      buildHomeBaggageGuideHref(
        todayDateOnly(),
        startISO,
        endISO,
        trip.outboundRegulationAirport,
        trip.returnRegulationAirport
      ),
    [
      startISO,
      endISO,
      trip.outboundRegulationAirport,
      trip.returnRegulationAirport,
    ]
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setCarouselIndex((i) => (i + 1) % CAROUSEL_SLIDES.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, []);

  const onBack = useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    }
  }, [router]);

  const onBaggageGuide = useCallback(() => {
    logAnalytics("home_baggage_guide_cta", {
      href: baggageGuideHref,
      startISO,
      endISO,
    });
  }, [baggageGuideHref, startISO, endISO]);

  return (
    <div className="min-h-screen bg-white pb-28">
      <header
        className="px-5 pb-0 pt-3 text-white"
        style={{ backgroundColor: TEAL }}
      >
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={onBack}
            className="flex size-10 items-center justify-center rounded-full transition hover:bg-white/10"
            aria-label="뒤로"
          >
            <X className="size-6" strokeWidth={2.25} aria-hidden />
          </button>
          <div className="flex items-center gap-0.5">
            <span
              className="flex size-10 items-center justify-center rounded-full opacity-90 hover:bg-white/10"
              aria-hidden
            >
              <Search className="size-[22px]" strokeWidth={2} />
            </span>
            <span
              className="flex size-10 items-center justify-center rounded-full opacity-90 hover:bg-white/10"
              aria-hidden
            >
              <Map className="size-[22px]" strokeWidth={2} />
            </span>
            <span className="relative flex size-10 items-center justify-center rounded-full opacity-90 hover:bg-white/10">
              <Menu className="size-[22px]" strokeWidth={2} aria-hidden />
              <span className="absolute right-2 top-2 size-2 rounded-full bg-[#FF3B30]" />
            </span>
          </div>
        </div>

        <div className="mt-5 pb-2">
          <p className="text-[15px] font-medium leading-tight text-white/95">
            {cityLabel}
          </p>
          <h1 className="mt-2 text-[26px] font-bold leading-[1.25] tracking-tight">
            두근두근, 여행 {dHeadline}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2.5">
            <span className="inline-flex max-w-full items-center rounded-lg bg-black/10 px-3 py-2 text-[12px] font-medium leading-snug text-white/95 backdrop-blur-[2px]">
              여행 일정 날짜 · {dateLine}
            </span>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/schedule"
                className="shrink-0 text-[14px] font-semibold text-white underline decoration-white/50 decoration-1 underline-offset-4"
                onClick={() =>
                  logAnalytics("home_trip_edit_click", { target: "/schedule" })
                }
              >
                편집
              </Link>
              <Link
                href={baggageGuideHref}
                onClick={onBaggageGuide}
                className="flex min-h-[40px] min-w-[64px] shrink-0 flex-col items-center justify-center rounded-[10px] px-2.5 py-1.5 text-center shadow-md transition active:scale-[0.98] active:opacity-95"
                style={{ backgroundColor: CTA_BLUE }}
              >
                <span className="text-[10px] font-bold leading-[1.3] text-white">
                  수하물
                  <br />
                  규정
                  <br />
                  가이드
                </span>
              </Link>
            </div>
          </div>
        </div>

        <nav
          className="mt-4 flex gap-5 overflow-x-auto border-b border-white/25 pb-3.5 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          aria-label="여행 탭"
        >
          {HEADER_TABS.map((label) => (
            <button
              key={label}
              type="button"
              className="shrink-0 whitespace-nowrap text-[15px] font-semibold text-white/95 transition hover:text-white"
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      <section className="bg-white px-5 pt-5">
        <div className="flex items-center gap-1.5">
          <h2 className="text-[15px] font-bold text-[#1A1A1A]">
            {AI_USER_NAME}를 위한 트리플 AI 추천
          </h2>
          <button type="button" className="text-[#B0B0B0]" aria-label="안내">
            <CircleHelp className="size-[18px]" strokeWidth={2} />
          </button>
        </div>

        <div className="relative mt-4 h-[220px] overflow-hidden rounded-xl bg-[#EAEAEA] shadow-sm">
          {CAROUSEL_SLIDES.map((slide, i) => (
            <Image
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              fill
              className={`absolute inset-0 object-cover transition-opacity duration-500 ${
                i === carouselIndex ? "z-[1] opacity-100" : "z-0 opacity-0"
              }`}
              sizes="(max-width: 768px) 100vw, 400px"
              priority={i === 0}
            />
          ))}
          <div className="pointer-events-none absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {CAROUSEL_SLIDES.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === carouselIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative mt-4 min-h-[120px] rounded-xl border border-[#EEEEEE] bg-[#F7F7F7]">
          <button
            type="button"
            className="absolute right-3 top-3 rounded-full p-1.5 text-[#CCCCCC] hover:bg-black/5"
            aria-label="저장"
          >
            <span className="text-lg" aria-hidden>
              ♡
            </span>
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-2.5 border-t border-[#F0F0F0] pt-6">
          <Link
            href="/trip/new"
            className="flex w-full items-center gap-3 rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] px-4 py-3.5 text-left transition hover:border-[#00C8B5]/40 hover:bg-[#F0FFFD]"
            onClick={() => {
              trip.resetDraft();
              logAnalytics("home_new_trip_cta", { target: "/trip/new" });
            }}
          >
            <Search className="size-5 shrink-0 text-[#00C8B5]" strokeWidth={2.25} />
            <div>
              <p className="text-[15px] font-semibold text-[#1A1A1A]">새 여행 일정</p>
              <p className="mt-0.5 text-[13px] text-[#8E8E8E]">도시, 날짜, 스타일 등록</p>
            </div>
          </Link>
          <Link
            href="/schedule"
            className="rounded-xl py-3.5 text-center text-[15px] font-semibold text-[#1A1A1A] ring-1 ring-[#E8E8E8] transition hover:bg-[#FAFAFA]"
            onClick={() =>
              logAnalytics("home_nav_cta_click", {
                target: "/schedule",
                label: "일정",
              })
            }
          >
            일정 보기
          </Link>
        </div>
      </section>
    </div>
  );
}

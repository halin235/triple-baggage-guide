"use client";

import Link from "next/link";
import { ChevronLeft, Percent, Plus, Users } from "lucide-react";
import { useEffect, useMemo } from "react";

import { ScheduleMap } from "@/components/schedule/ScheduleMap";
import {
  DaySectionHeader,
  TimelineBaggageHead,
  TimelineDistance,
  TimelinePlaceCard,
} from "@/components/schedule/ScheduleTimeline";
import { SchedulePromoBanner } from "@/components/schedule/SchedulePromoBanner";
import { DEMO_TRIP_END_ISO, DEMO_TRIP_START_ISO } from "@/constants/demoTripDates";
import { useTripDraft } from "@/context/TripDraftContext";
import { logAnalytics } from "@/lib/analytics";
import {
  enumerateTripDays,
  formatScheduleDayLabel,
} from "@/lib/enumerateTripDays";
import { formatTripRangeWithWeekdayParen } from "@/lib/formatTripRange";

export function ScheduleScreen() {
  const trip = useTripDraft();

  const { tripTitle, dateLine, styleLine, startISO, endISO, cityId } =
    useMemo(() => {
      if (trip.isComplete && trip.city && trip.startDate && trip.endDate) {
        return {
          tripTitle: `${trip.city.name} 여행`,
          dateLine: formatTripRangeWithWeekdayParen(trip.startDate, trip.endDate),
          styleLine: trip.travelStyleLabel
            ? `${trip.travelStyleLabel}와 함께`
            : null,
          startISO: trip.startDate,
          endISO: trip.endDate,
          cityId: trip.city.id,
        };
      }
      return {
        tripTitle: "오사카 여행",
        dateLine: formatTripRangeWithWeekdayParen(
          DEMO_TRIP_START_ISO,
          DEMO_TRIP_END_ISO
        ),
        styleLine: null as string | null,
        startISO: DEMO_TRIP_START_ISO,
        endISO: DEMO_TRIP_END_ISO,
        cityId: "tokyo",
      };
    }, [
      trip.isComplete,
      trip.city,
      trip.startDate,
      trip.endDate,
      trip.travelStyleLabel,
    ]);

  const outboundAp = trip.outboundRegulationAirport;
  const returnAp = trip.returnRegulationAirport;

  const days = useMemo(() => {
    const list = enumerateTripDays(startISO, endISO);
    if (list.length > 0) return list;
    return enumerateTripDays(DEMO_TRIP_START_ISO, DEMO_TRIP_END_ISO);
  }, [startISO, endISO]);

  useEffect(() => {
    logAnalytics("schedule_page_view", { path: "/schedule" });
  }, []);

  const mapLabel = tripTitle.replace(" 여행", "");

  return (
    <div className="min-h-screen bg-white pb-28">
      <header className="sticky top-0 z-40 border-b border-[#F0F0F0] bg-white px-4 pb-3 pt-3">
        <div className="flex items-start gap-2">
          <button
            type="button"
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-black hover:bg-[#F5F5F5]"
            aria-label="뒤로"
          >
            <ChevronLeft className="size-6" strokeWidth={2} aria-hidden />
          </button>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h1 className="text-[22px] font-bold leading-tight text-black">
                {tripTitle}
              </h1>
              <button
                type="button"
                className="shrink-0 pt-1 text-[14px] font-semibold text-[#3182F6]"
              >
                편집
              </button>
            </div>
            <p className="mt-0.5 text-[14px] text-[#999999]">{dateLine}</p>
            <p className="mt-1 text-[13px] text-[#B0B0B0]">
              {styleLine ?? "이 여행의 스타일을 선택해주세요."}
            </p>
          </div>
        </div>
      </header>

      <ScheduleMap cityId={cityId} label={mapLabel} />

      <div className="mt-4 flex flex-wrap gap-2 px-4">
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-full bg-[#3182F6] px-3.5 py-2 text-[13px] font-bold text-white shadow-sm"
        >
          <Users className="size-3.5" strokeWidth={2.5} />
          일행과 함께 일정짜기
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-full bg-[#3182F6] px-3.5 py-2 text-[13px] font-bold text-white shadow-sm"
        >
          <Percent className="size-3.5" strokeWidth={2.5} />
          셀프 패키지
        </button>
        <button
          type="button"
          className="rounded-full border border-[#E5E5E5] bg-white px-3.5 py-2 text-[13px] font-semibold text-[#666]"
        >
          <Plus className="mb-0.5 mr-0.5 inline size-3.5" strokeWidth={2.5} />
          항공편
        </button>
        <button
          type="button"
          className="rounded-full border border-[#E5E5E5] bg-white px-3.5 py-2 text-[13px] font-semibold text-[#666]"
        >
          <Plus className="mb-0.5 mr-0.5 inline size-3.5" strokeWidth={2.5} />
          숙소
        </button>
        <Link
          href="/checklist"
          className="rounded-full border border-[#E5E5E5] bg-white px-3.5 py-2 text-[13px] font-semibold text-[#666]"
          onClick={() =>
            logAnalytics("schedule_chip_checklist", { from: "schedule_header" })
          }
        >
          체크리스트
        </Link>
      </div>

      <main className="mt-6 px-4 pb-8">
        {days.length === 1 ? (
          <section className="mb-10">
            <DaySectionHeader
              dayNum={1}
              dateLabel={formatScheduleDayLabel(days[0]!)}
            />
            <TimelineBaggageHead
              href={`/baggage/search?airport=${outboundAp}&tripPhase=departure`}
              phase="pre_departure"
              airport={outboundAp}
              dayLabel="Day1"
              dayTitle="여행 준비물"
              lineSubtitle="Day 1"
            />
            <TimelineDistance label="38.7km" />
            <TimelinePlaceCard
              index={1}
              title="인천 국제공항"
              category="출발 · 항공"
              showLineAbove
              showLineBelow
            />
            <TimelineDistance label="492km" />
            <TimelinePlaceCard
              index={2}
              title="간사이 국제공항"
              category="도착 · 항공"
              showLineAbove
              showLineBelow
            />
            <TimelineDistance label="12.4km" />
            <TimelinePlaceCard
              index={3}
              title="시내 숙소"
              category="숙소"
              showLineAbove
              showLineBelow
            />
            <div className="my-4 border-t border-dashed border-[#EEEEEE]" />
            <TimelineBaggageHead
              href={`/baggage/search?airport=${returnAp}&tripPhase=return`}
              phase="pre_return"
              airport={returnAp}
              dayLabel="LastDay"
              dayTitle="여행 마무리"
              lineSubtitle="Last Day"
            />
            <TimelineDistance label="12.4km" />
            <TimelinePlaceCard
              index={1}
              title="간사이 국제공항"
              category="출발 · 항공"
              showLineAbove
              showLineBelow
            />
            <TimelineDistance label="492km" />
            <TimelinePlaceCard
              index={2}
              title="인천 국제공항"
              category="도착 · 항공"
              showLineAbove
              showLineBelow={false}
            />
          </section>
        ) : (
          days.map((iso, i) => {
            const isFirst = i === 0;
            const isLast = i === days.length - 1;
            const dayNum = i + 1;
            const dateLabel = formatScheduleDayLabel(iso);

            if (isFirst) {
              return (
                <section key={iso} className="mb-10">
                  <DaySectionHeader dayNum={dayNum} dateLabel={dateLabel} />
                  <TimelineBaggageHead
                    href={`/baggage/search?airport=${outboundAp}&tripPhase=departure`}
                    phase="pre_departure"
                    airport={outboundAp}
                    dayLabel={`Day${dayNum}`}
                    dayTitle="여행 준비물"
                  lineSubtitle={`Day ${dayNum}`}
                />
                <TimelineDistance label="38.7km" />
                <TimelinePlaceCard
                  index={1}
                  title="인천 국제공항"
                  category="출발 · 항공"
                  showLineAbove
                  showLineBelow
                />
                <TimelineDistance label="492km" />
                <TimelinePlaceCard
                  index={2}
                  title="간사이 국제공항"
                  category="도착 · 항공"
                  showLineAbove
                  showLineBelow
                />
                <TimelineDistance label="12.4km" />
                <TimelinePlaceCard
                  index={3}
                  title="시내 숙소"
                  category="숙소 · 체크인"
                  showLineAbove
                  showLineBelow={false}
                />
                </section>
              );
            }

            if (isLast) {
              return (
                <section key={iso} className="mb-10">
                  <DaySectionHeader dayNum={dayNum} dateLabel={dateLabel} />
                  <TimelineBaggageHead
                    href={`/baggage/search?airport=${returnAp}&tripPhase=return`}
                    phase="pre_return"
                    airport={returnAp}
                    dayLabel="LastDay"
                    dayTitle="여행 마무리"
                    lineSubtitle="Last Day"
                  />
                  <TimelineDistance label="8.2km" />
                  <TimelinePlaceCard
                    index={1}
                    title="시내 숙소"
                    category="숙소 · 체크아웃"
                    showLineAbove
                    showLineBelow
                  />
                  <TimelineDistance label="12.4km" />
                  <TimelinePlaceCard
                    index={2}
                    title="간사이 국제공항"
                    category="출발 · 항공"
                    showLineAbove
                    showLineBelow
                  />
                  <TimelineDistance label="492km" />
                  <TimelinePlaceCard
                    index={3}
                    title="인천 국제공항"
                    category="도착 · 항공"
                    showLineAbove
                    showLineBelow={false}
                  />
                </section>
              );
            }

            return (
              <section key={iso} className="mb-10">
                <DaySectionHeader dayNum={dayNum} dateLabel={dateLabel} />
                <TimelinePlaceCard
                  index={0}
                  title={`${mapLabel} 시내 자유 일정`}
                  category="관광 · 맛집 · 쇼핑"
                  showLineAbove
                  showLineBelow={false}
                />
              </section>
            );
          })
        )}

        <SchedulePromoBanner />
      </main>
    </div>
  );
}

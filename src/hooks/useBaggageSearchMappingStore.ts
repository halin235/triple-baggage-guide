"use client";

import { useMemo } from "react";

import { DEMO_TRIP_END_ISO, DEMO_TRIP_START_ISO } from "@/constants/demoTripDates";
import { useTripDraft } from "@/context/TripDraftContext";
import {
  getSearchMappingStoreResolved,
  type SearchMappingLeg,
} from "@/lib/baggageSearchMapping";
import { todayDateOnly } from "@/lib/homeTripHeadline";
import type { BaggageTripPhase } from "@/lib/baggageRegulationSheets";
import type { BaggageSearchMappingRow } from "@/types/baggageSearchMapping";

/**
 * 일본행/한국행 검색어 매핑 테이블 전체 (`baggageSearchMappingData.ts`).
 * `tripPhase`·TripDraft 일정·오늘 날짜로 시트를 고르는 단일 진입점 (검색 화면 공통).
 */
export function useBaggageSearchMappingStore(tripPhase: BaggageTripPhase | null): {
  mappingRows: BaggageSearchMappingRow[];
  mappingLeg: SearchMappingLeg;
  tripStartISO: string;
  tripEndISO: string;
} {
  const tripDraft = useTripDraft();
  const tripStartISO =
    tripDraft.isComplete && tripDraft.startDate ? tripDraft.startDate : DEMO_TRIP_START_ISO;
  const tripEndISO =
    tripDraft.isComplete && tripDraft.endDate ? tripDraft.endDate : DEMO_TRIP_END_ISO;

  return useMemo(() => {
    const resolved = getSearchMappingStoreResolved(
      tripPhase,
      todayDateOnly(),
      tripStartISO,
      tripEndISO
    );
    return {
      mappingRows: resolved.rows,
      mappingLeg: resolved.leg,
      tripStartISO,
      tripEndISO,
    };
  }, [tripPhase, tripStartISO, tripEndISO]);
}

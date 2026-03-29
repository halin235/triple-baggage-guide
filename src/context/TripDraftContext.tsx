"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type {
  TripCityDomestic,
  TripCityOption,
  TravelStyleId,
} from "@/constants/tripRegistrationData";
import type { BaggageAirportCode } from "@/types/baggage";

export type SelectedCity = TripCityOption | TripCityDomestic;

export interface TripDraftValue {
  /** Step 완료 후 true — 수하물/일정 화면에서 사용 */
  isComplete: boolean;
  city: SelectedCity | null;
  startDate: string | null;
  endDate: string | null;
  travelStyleId: TravelStyleId | null;
  travelStyleLabel: string | null;
}

export interface TripDraftContextValue extends TripDraftValue {
  /** 출국(일본 등 입국) 측 규정 공항 — MVP 데이터 기준 */
  outboundRegulationAirport: BaggageAirportCode;
  /** 귀국(한국 입국) 측 규정 공항 */
  returnRegulationAirport: BaggageAirportCode;
  setCity: (city: SelectedCity | null) => void;
  setDateRange: (start: string | null, end: string | null) => void;
  setTravelStyle: (id: TravelStyleId | null, label: string | null) => void;
  completeRegistration: (payload: {
    city: SelectedCity;
    startDate: string;
    endDate: string;
    travelStyleId: TravelStyleId;
    travelStyleLabel: string;
  }) => void;
  resetDraft: () => void;
}

const defaultValue: TripDraftValue = {
  isComplete: false,
  city: null,
  startDate: null,
  endDate: null,
  travelStyleId: null,
  travelStyleLabel: null,
};

const TripDraftContext = createContext<TripDraftContextValue | null>(null);

export function TripDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<TripDraftValue>(defaultValue);

  const setCity = useCallback((city: SelectedCity | null) => {
    setDraft((d) => ({ ...d, city }));
  }, []);

  const setDateRange = useCallback((startDate: string | null, endDate: string | null) => {
    setDraft((d) => ({ ...d, startDate, endDate }));
  }, []);

  const setTravelStyle = useCallback(
    (travelStyleId: TravelStyleId | null, travelStyleLabel: string | null) => {
      setDraft((d) => ({ ...d, travelStyleId, travelStyleLabel }));
    },
    []
  );

  const completeRegistration = useCallback(
    (payload: {
      city: SelectedCity;
      startDate: string;
      endDate: string;
      travelStyleId: TravelStyleId;
      travelStyleLabel: string;
    }) => {
      setDraft({
        isComplete: true,
        city: payload.city,
        startDate: payload.startDate,
        endDate: payload.endDate,
        travelStyleId: payload.travelStyleId,
        travelStyleLabel: payload.travelStyleLabel,
      });
    },
    []
  );

  const resetDraft = useCallback(() => {
    setDraft(defaultValue);
  }, []);

  const outboundRegulationAirport: BaggageAirportCode =
    draft.city?.regulationAirportOutbound ?? "KIX";
  const returnRegulationAirport: BaggageAirportCode =
    draft.city?.regulationAirportReturn ?? "ICN";

  const value = useMemo<TripDraftContextValue>(
    () => ({
      ...draft,
      outboundRegulationAirport,
      returnRegulationAirport,
      setCity,
      setDateRange,
      setTravelStyle,
      completeRegistration,
      resetDraft,
    }),
    [
      draft,
      outboundRegulationAirport,
      returnRegulationAirport,
      setCity,
      setDateRange,
      setTravelStyle,
      completeRegistration,
      resetDraft,
    ]
  );

  return (
    <TripDraftContext.Provider value={value}>{children}</TripDraftContext.Provider>
  );
}

export function useTripDraft(): TripDraftContextValue {
  const ctx = useContext(TripDraftContext);
  if (!ctx) {
    throw new Error("useTripDraft must be used within TripDraftProvider");
  }
  return ctx;
}

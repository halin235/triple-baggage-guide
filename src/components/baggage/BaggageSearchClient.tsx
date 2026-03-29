"use client";

import { ArrowLeft, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { BaggageAttentionAccordionRow } from "@/components/baggage/BaggageAttentionAccordionRow";
import { BaggageSearchMappingAccordionRow } from "@/components/baggage/BaggageSearchMappingAccordionRow";
import { DEMO_TRIP_END_ISO, DEMO_TRIP_START_ISO } from "@/constants/demoTripDates";
import { useTripDraft } from "@/context/TripDraftContext";
import { getCategoryTiles } from "@/lib/baggageCategories";
import { logAnalytics } from "@/lib/analytics";
import { parseTripPhaseParam } from "@/lib/baggageRegulationSheets";
import {
  filterSearchMappingRows,
  getSearchMappingStoreResolved,
} from "@/lib/baggageSearchMapping";
import { searchBaggageRegulations } from "@/lib/baggageSearch";
import { todayDateOnly } from "@/lib/homeTripHeadline";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import type { BaggageAirportCode, BaggageRegulationItem } from "@/types/baggage";
import type { BaggageSearchMappingRow } from "@/types/baggageSearchMapping";

/** Day 1(출국) → KIX, Last Day(귀국) → ICN — 일정 CTA와 동일 쿼리 */
const AIRPORT_TITLE: Record<BaggageAirportCode, string> = {
  KIX: "오사카 간사이(KIX) 입국 규정",
  ICN: "인천공항 귀국 규정",
};

const TRIPLE_BLUE = "#3182F6";

function parseAirport(raw: string | null): BaggageAirportCode {
  return raw === "ICN" ? "ICN" : "KIX";
}

export function BaggageSearchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tripDraft = useTripDraft();
  const airport = parseAirport(searchParams.get("airport"));
  const tripPhaseParam = searchParams.get("tripPhase");
  const tripPhase = useMemo(
    () => parseTripPhaseParam(tripPhaseParam),
    [tripPhaseParam]
  );

  const tripStartISO =
    tripDraft.isComplete && tripDraft.startDate
      ? tripDraft.startDate
      : DEMO_TRIP_START_ISO;
  const tripEndISO =
    tripDraft.isComplete && tripDraft.endDate ? tripDraft.endDate : DEMO_TRIP_END_ISO;

  const { mappingStore, mappingLeg } = useMemo(() => {
    const resolved = getSearchMappingStoreResolved(
      tripPhase,
      todayDateOnly(),
      tripStartISO,
      tripEndISO
    );
    return { mappingStore: resolved.rows, mappingLeg: resolved.leg };
  }, [tripPhase, tripStartISO, tripEndISO]);

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 400);
  const [attentionExpanded, setAttentionExpanded] = useState<Record<string, boolean>>({});
  const [mappingExpanded, setMappingExpanded] = useState<Record<string, boolean>>({});

  const searchActive = query.trim().length > 0;
  const mappingHits = useMemo(
    () => (searchActive ? filterSearchMappingRows(mappingStore, query) : []),
    [mappingStore, query, searchActive]
  );

  const tiles = useMemo(() => getCategoryTiles(airport, tripPhase), [airport, tripPhase]);

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim();
    return searchBaggageRegulations(q, { airport, tripPhase });
  }, [debouncedQuery, airport, tripPhase]);

  useEffect(() => {
    logAnalytics("baggage_search_view", {
      airport,
      tripPhase,
    });
  }, [airport, tripPhase]);

  useEffect(() => {
    setAttentionExpanded({});
  }, [airport, tripPhase]);

  useEffect(() => {
    if (!searchActive) setMappingExpanded({});
  }, [searchActive]);

  useEffect(() => {
    logAnalytics("search_query_input", {
      query: debouncedQuery,
      airport,
      tripPhase,
      resultCount: searchActive ? mappingHits.length : filtered.length,
      searchMode: searchActive ? "mapping_sheet" : "browse",
    });
  }, [debouncedQuery, airport, tripPhase, filtered.length, searchActive, mappingHits.length]);

  const onResultClick = useCallback(
    (row: BaggageRegulationItem) => {
      logAnalytics("search_result_click", {
        itemId: row.id,
        itemName: row.itemName,
        category: row.category,
        airport,
        cardTone: row.cardTone,
      });
    },
    [airport]
  );

  const toggleAttentionRow = useCallback(
    (row: BaggageRegulationItem) => {
      const willOpen = !attentionExpanded[row.id];
      setAttentionExpanded((p) => ({ ...p, [row.id]: !p[row.id] }));
      if (willOpen) {
        onResultClick(row);
      }
      logAnalytics("baggage_attention_accordion_toggle", {
        itemId: row.id,
        airport,
        tripPhase,
        expanded: willOpen,
      });
    },
    [airport, tripPhase, attentionExpanded, onResultClick]
  );

  const toggleMappingRow = useCallback(
    (row: BaggageSearchMappingRow) => {
      const willOpen = !mappingExpanded[row.id];
      setMappingExpanded((p) => ({ ...p, [row.id]: !p[row.id] }));
      logAnalytics("baggage_mapping_search_row_toggle", {
        mappingId: row.id,
        airport,
        tripPhase,
        expanded: willOpen,
      });
    },
    [airport, tripPhase, mappingExpanded]
  );

  const onCategoryNavigate = (name: string) => {
    logAnalytics("category_grid_navigate", {
      category: name,
      airport,
      tripPhase,
    });
    const q = new URLSearchParams({
      airport,
      category: name,
    });
    if (tripPhase) q.set("tripPhase", tripPhase);
    router.push(`/baggage/category?${q.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white pb-28">
      <header className="sticky top-0 z-40 border-b border-[#EEEEEE] bg-white px-4 py-3">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              logAnalytics("baggage_search_back", { airport, from: "header" });
              if (typeof window !== "undefined" && window.history.length > 1) {
                router.back();
              } else {
                router.push("/schedule");
              }
            }}
            className="flex size-10 items-center justify-center rounded-full text-[#3182F6] hover:bg-[#F5F8FF]"
            aria-label="뒤로"
          >
            <ArrowLeft className="size-6" strokeWidth={2.25} aria-hidden />
          </button>
          <h1 className="flex-1 text-center text-[17px] font-bold leading-tight text-black pr-9">
            {AIRPORT_TITLE[airport]}
          </h1>
        </div>
        <p className="mt-2 text-center text-[13px] font-medium text-[#666666]">
          {airport === "ICN"
            ? "목적지 : 서울 인천(ICN)"
            : "목적지 : 오사카 간사이(KIX)"}
        </p>
      </header>

      <div className="px-5 pt-3">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-[#8B95A1]"
            strokeWidth={2}
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              const v = e.target.value;
              setQuery(v);
              logAnalytics("search_input_change", {
                length: v.length,
                airport,
                tripPhase,
              });
            }}
            placeholder="무엇을 가져가시나요?"
            className="h-12 w-full rounded-lg bg-[#EFEFEF] py-3 pl-11 pr-4 text-[16px] text-black placeholder:text-[#8B95A1] focus:outline-none focus:ring-2 focus:ring-[#3182F6]/25"
            aria-label="수하물 검색"
          />
        </div>

        {searchActive ? (
          <section className="mt-4 pb-10" aria-live="polite">
            <h2 className="text-[17px] font-bold leading-tight text-black">검색 결과</h2>
            <p className="mt-1 text-[13px] text-[#999999]">
              {mappingLeg === "japan"
                ? "일본행_검색어_매핑 테이블"
                : "한국행_검색어_매핑 테이블"}
              · 유저 예상 검색어와 매칭된 품목이에요.
            </p>
            <ul className="mt-3 flex flex-col gap-3">
              {mappingHits.map((row) => (
                <li key={row.id}>
                  <BaggageSearchMappingAccordionRow
                    row={row}
                    open={!!mappingExpanded[row.id]}
                    onToggle={() => toggleMappingRow(row)}
                  />
                </li>
              ))}
            </ul>
            {mappingHits.length === 0 ? (
              <p className="py-14 text-center text-[14px] leading-relaxed text-[#999999]">
                검색 결과가 없습니다.
              </p>
            ) : null}
          </section>
        ) : (
          <>
            <section className="mt-4">
              <h2 className="text-[17px] font-bold leading-tight text-black">
                카테고리별 규정
              </h2>
              <p className="mt-1 text-[13px] text-[#999999]">
                카드를 누르면 해당 카테고리 전체 목록으로 이동합니다.
              </p>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {tiles.map(({ name, Icon }) => {
                  const label = name === "etc" ? "etc" : name;
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => onCategoryNavigate(name)}
                      className="flex flex-col items-center gap-2 rounded-xl bg-white py-3 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition hover:bg-[#FAFCFF] active:scale-[0.98]"
                    >
                      <span
                        className="flex size-12 items-center justify-center rounded-lg"
                        style={{ backgroundColor: "#E8F3FF" }}
                      >
                        <Icon
                          className="size-6"
                          style={{ color: TRIPLE_BLUE }}
                          strokeWidth={2}
                          aria-hidden
                        />
                      </span>
                      <span className="px-1 text-center text-[13px] font-medium text-black">
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="mt-8 pb-10">
              <h2 className="text-[17px] font-bold leading-tight text-black">
                주의해야 할 규정
              </h2>
              <p className="mt-1 text-[13px] text-[#999999]">
                품목을 누르면 엑셀의 안내 문구 상세가 펼쳐져요. 여러 개를 동시에 열어 비교할 수
                있습니다.
              </p>
              <ul className="mt-3 flex flex-col gap-3">
                {filtered.map((row) => (
                  <li key={row.id}>
                    <BaggageAttentionAccordionRow
                      row={row}
                      open={!!attentionExpanded[row.id]}
                      onToggle={() => toggleAttentionRow(row)}
                    />
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

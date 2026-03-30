"use client";

import { ArrowLeft, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { BaggageAttentionAccordionRow } from "@/components/baggage/BaggageAttentionAccordionRow";
import { BaggageSearchMappingAccordionRow } from "@/components/baggage/BaggageSearchMappingAccordionRow";
import { useBaggageSearchMappingStore } from "@/hooks/useBaggageSearchMappingStore";
import {
  isGridCategory,
  regulationsByCategoryAndAirport,
} from "@/lib/baggageCategoryRegulations";
import { logAnalytics } from "@/lib/analytics";
import {
  baggageSearchQueryString,
  parseTripPhaseParam,
} from "@/lib/baggageRegulationSheets";
import { filterSearchMappingRows } from "@/lib/baggageSearchMapping";
import type { BaggageAirportCode, BaggageRegulationItem } from "@/types/baggage";
import type { BaggageSearchMappingRow } from "@/types/baggageSearchMapping";

function parseAirport(raw: string | null): BaggageAirportCode {
  return raw === "ICN" ? "ICN" : "KIX";
}

function categoryDisplayName(category: string) {
  return category === "etc" ? "etc" : category;
}

export function BaggageCategoryDetailClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const airport = parseAirport(searchParams.get("airport"));
  const tripPhaseParam = searchParams.get("tripPhase");
  const tripPhase = useMemo(
    () => parseTripPhaseParam(tripPhaseParam),
    [tripPhaseParam]
  );
  const categoryRaw = searchParams.get("category") ?? "";
  const category = useMemo(() => {
    try {
      return decodeURIComponent(categoryRaw);
    } catch {
      return categoryRaw;
    }
  }, [categoryRaw]);

  const { mappingRows: mappingStore, mappingLeg } =
    useBaggageSearchMappingStore(tripPhase);

  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState<Record<string, boolean>>({});
  const [mappingExpanded, setMappingExpanded] = useState<Record<string, boolean>>({});

  const baseList = useMemo(() => {
    if (!isGridCategory(category)) return [];
    return regulationsByCategoryAndAirport(airport, category, tripPhase);
  }, [airport, category, tripPhase]);

  const searchEngaged = searchFocused || query.trim().length > 0;
  const hasQuery = query.trim().length > 0;

  /** 일정·tripPhase에 맞는 매핑 시트 전체 — 카테고리 페이지와 무관 */
  const mappingHits = useMemo(
    () => (hasQuery ? filterSearchMappingRows(mappingStore, query) : []),
    [mappingStore, query, hasQuery]
  );

  const filtered = baseList;

  useEffect(() => {
    if (!isGridCategory(category)) {
      router.replace(`/baggage/search?${baggageSearchQueryString(airport, tripPhase)}`);
    }
  }, [category, airport, tripPhase, router]);

  useEffect(() => {
    if (!isGridCategory(category)) return;
    logAnalytics("baggage_category_detail_view", {
      airport,
      category,
      itemCount: baseList.length,
    });
  }, [airport, category, baseList.length]);

  useEffect(() => {
    logAnalytics("baggage_category_detail_search", {
      airport,
      category,
      queryLen: query.length,
      resultCount: hasQuery ? mappingHits.length : filtered.length,
      searchMode: searchEngaged ? "mapping_sheet_full" : "category_browse",
    });
  }, [
    airport,
    category,
    query.length,
    filtered.length,
    mappingHits.length,
    hasQuery,
    searchEngaged,
  ]);

  useEffect(() => {
    setAccordionOpen({});
  }, [airport, category, tripPhase]);

  useEffect(() => {
    if (!searchEngaged) setMappingExpanded({});
  }, [searchEngaged]);

  const onRowClick = useCallback(
    (row: BaggageRegulationItem) => {
      logAnalytics("baggage_category_detail_row_click", {
        itemId: row.id,
        airport,
        category,
      });
    },
    [airport, category]
  );

  const toggleAccordionRow = useCallback(
    (row: BaggageRegulationItem) => {
      const willOpen = !accordionOpen[row.id];
      setAccordionOpen((p) => ({ ...p, [row.id]: !p[row.id] }));
      if (willOpen) {
        onRowClick(row);
      }
      logAnalytics("baggage_category_detail_accordion_toggle", {
        itemId: row.id,
        airport,
        category,
        expanded: willOpen,
      });
    },
    [accordionOpen, airport, category, onRowClick]
  );

  const toggleMappingRow = useCallback(
    (row: BaggageSearchMappingRow) => {
      const willOpen = !mappingExpanded[row.id];
      setMappingExpanded((p) => ({ ...p, [row.id]: !p[row.id] }));
      logAnalytics("baggage_category_mapping_row_toggle", {
        mappingId: row.id,
        airport,
        category,
        expanded: willOpen,
      });
    },
    [airport, category, mappingExpanded]
  );

  const goBack = useCallback(() => {
    logAnalytics("baggage_category_detail_back", { airport, category, tripPhase });
    router.push(`/baggage/search?${baggageSearchQueryString(airport, tripPhase)}`);
  }, [router, airport, category, tripPhase]);

  if (!isGridCategory(category)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-muted">
        이동 중…
      </div>
    );
  }

  const legLine =
    airport === "ICN"
      ? "인천공항 귀국 기준"
      : "오사카 간사이(KIX) 입국 기준";

  return (
    <div className="min-h-screen bg-white pb-28">
      <header className="sticky top-0 z-40 border-b border-[#EEEEEE] bg-white px-4 py-3">
        <div className="flex items-start gap-1">
          <button
            type="button"
            onClick={goBack}
            className="flex size-10 shrink-0 items-center justify-center rounded-full text-[#3182F6] hover:bg-[#F5F8FF]"
            aria-label="카테고리 목록으로"
          >
            <ArrowLeft className="size-6" strokeWidth={2.25} aria-hidden />
          </button>
          <div className="min-w-0 flex-1 pr-2">
            <h1 className="text-[17px] font-bold leading-snug text-black">
              {categoryDisplayName(category)} 규정 - {legLine}
            </h1>
            <p className="mt-1 text-[13px] font-medium text-[#666666]">
              {airport === "ICN"
                ? "한국 입국(ICN) 데이터"
                : "일본 입국(KIX) 데이터"}
            </p>
          </div>
        </div>
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
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="무엇을 가져가시나요?"
            className="h-12 w-full rounded-lg bg-[#EFEFEF] py-3 pl-11 pr-4 text-[16px] text-black placeholder:text-[#8B95A1] focus:outline-none focus:ring-2 focus:ring-[#3182F6]/25"
            aria-label="수하물 규정 검색 (매핑 테이블 전체)"
          />
        </div>

        {searchEngaged ? (
          <section className="mt-6 pb-10" aria-live="polite">
            <h2 className="text-[17px] font-bold leading-tight text-black">검색 결과</h2>
            <p className="mt-1 text-[13px] text-[#999999]">
              {mappingLeg === "japan"
                ? "일본행_검색어_매핑 테이블"
                : "한국행_검색어_매핑 테이블"}
              · 전체 품목 · 소분류·유저 예상 검색어 OR 매칭
            </p>
            {!hasQuery ? (
              <p className="mt-6 rounded-xl border border-[#EEEEEE] bg-[#FAFBFC] px-4 py-10 text-center text-[14px] leading-relaxed text-[#666666]">
                카테고리와 관계없이 매핑 테이블 전체에서 검색합니다.
                <br />
                키워드를 입력해 보세요.
              </p>
            ) : null}
            {hasQuery ? (
              <>
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
                  <p className="py-12 text-center text-[14px] leading-relaxed text-[#999999]">
                    검색 결과가 없습니다. 다른 검색어를 입력해 보세요.
                  </p>
                ) : null}
              </>
            ) : null}
          </section>
        ) : (
          <section className="mt-6 pb-10" aria-labelledby="category-attention-heading">
            <h2
              id="category-attention-heading"
              className="text-[17px] font-bold leading-tight text-black"
            >
              주의해야 할 규정
            </h2>
            <p className="mt-1 text-[13px] text-[#999999]">
              품목을 누르면 안내 문구 상세가 펼쳐져요. 여러 개를 동시에 열어 비교할 수
              있습니다.
            </p>
            <p className="mt-4 text-[14px] text-[#999999]">
              전체 <span className="font-semibold text-black">{filtered.length}</span>건
            </p>

            <ul className="mt-3 flex flex-col gap-3">
              {filtered.map((row) => (
                <li key={row.id}>
                  <BaggageAttentionAccordionRow
                    row={row}
                    open={!!accordionOpen[row.id]}
                    onToggle={() => toggleAccordionRow(row)}
                  />
                </li>
              ))}
            </ul>

            {filtered.length === 0 ? (
              <p className="py-12 text-center text-[14px] leading-relaxed text-[#999999]">
                조건에 맞는 품목이 없습니다. 검색어를 바꿔 보세요.
              </p>
            ) : null}
          </section>
        )}
      </div>
    </div>
  );
}

/** 엑셀 `일본행_검색어_매핑 테이블` / `한국행_검색어_매핑 테이블` 행 */
export interface BaggageSearchMappingRow {
  id: string;
  /** 엑셀 `카테고리` */
  category: string;
  /** 엑셀 `소분류` — 리스트 제목 */
  itemTitle: string;
  /** 엑셀 `유저 예상 검색어` — 검색 매칭용 */
  searchAliases: string;
  /** 엑셀 `안내 문구 요약` / `안내 문구 요약 (Action)` — 배지 */
  summaryTag: string;
  /** 엑셀 `상세 안내 문구` / `상세 안내 문구 (Detailed Guide)` — 펼침 */
  detailGuide: string;
}

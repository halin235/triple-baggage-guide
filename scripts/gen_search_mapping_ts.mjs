import fs from "fs";

const { jp, kr } = JSON.parse(fs.readFileSync("_mapping_extract.json", "utf8"));

function esc(s) {
  return JSON.stringify(s ?? "");
}

let out = `import type { BaggageSearchMappingRow } from "@/types/baggageSearchMapping";

/** 엑셀 시트: 일본행_검색어_매핑 테이블 */
export const BAGGAGE_SEARCH_MAPPING_JAPAN: BaggageSearchMappingRow[] = [
`;

for (let i = 0; i < jp.length; i++) {
  const r = jp[i];
  out += `  { id: "jp-search-${i}", category: ${esc(r.category)}, itemTitle: ${esc(r.itemTitle)}, searchAliases: ${esc(r.searchAliases)}, summaryTag: ${esc(r.summaryTag)}, detailGuide: ${esc(r.detailGuide)} },\n`;
}

out += `];

/** 엑셀 시트: 한국행_검색어_매핑 테이블 */
export const BAGGAGE_SEARCH_MAPPING_KOREA: BaggageSearchMappingRow[] = [
`;

for (let i = 0; i < kr.length; i++) {
  const r = kr[i];
  out += `  { id: "kr-search-${i}", category: ${esc(r.category)}, itemTitle: ${esc(r.itemTitle)}, searchAliases: ${esc(r.searchAliases)}, summaryTag: ${esc(r.summaryTag)}, detailGuide: ${esc(r.detailGuide)} },\n`;
}

out += `];
`;

fs.writeFileSync("src/constants/baggageSearchMappingData.ts", out);
console.log("ok", jp.length, kr.length);

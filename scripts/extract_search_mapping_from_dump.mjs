/**
 * excel_dump.json → src/constants/baggageSearchMappingData.ts
 * 시트: 일본행_검색어_매핑 테이블, 한국행_검색어_매핑 테이블
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dumpPath = path.join(root, "excel_dump.json");
const outPath = path.join(root, "src/constants/baggageSearchMappingData.ts");

const dump = JSON.parse(fs.readFileSync(dumpPath, "utf8"));

const JP = "일본행_검색어_매핑 테이블";
const KR = "한국행_검색어_매핑 테이블";

function pickCols(row) {
  const category = String(row["카테고리"] ?? "").trim();
  const itemTitle = String(
    row["소분류"] ?? row["소분류 (Item)"] ?? row["품목"] ?? ""
  ).trim();
  const searchAliases = String(row["유저 예상 검색어"] ?? row["검색어"] ?? "").trim();
  const summaryTag = String(
    row["안내 문구 요약"] ?? row["안내 문구 요약 (Action)"] ?? ""
  ).trim();
  const detailGuide = String(
    row["상세 안내 문구"] ??
      row["상세 안내 문구 (Detailed Guide)"] ??
      row["안내 문구 상세"] ??
      ""
  ).trim();
  return { category, itemTitle, searchAliases, summaryTag, detailGuide };
}

function extract(sheetName, idPrefix) {
  const block = dump.find((b) => b.sheet === sheetName);
  if (!block?.rows?.length) {
    console.warn("시트 없음 또는 빈 시트:", sheetName);
    return [];
  }
  const out = [];
  for (let i = 0; i < block.rows.length; i++) {
    const r = pickCols(block.rows[i]);
    if (!r.itemTitle && !r.searchAliases) continue;
    out.push({ ...r, id: `${idPrefix}-search-${out.length}` });
  }
  return out;
}

function esc(s) {
  return JSON.stringify(s ?? "");
}

const jpRows = extract(JP, "jp");
const krRows = extract(KR, "kr");

let ts = `import type { BaggageSearchMappingRow } from "@/types/baggageSearchMapping";

/** 엑셀 시트: 일본행_검색어_매핑 테이블 — excel_dump.json 동기화 */
export const BAGGAGE_SEARCH_MAPPING_JAPAN: BaggageSearchMappingRow[] = [
`;

for (const r of jpRows) {
  ts += `  { id: ${esc(r.id)}, category: ${esc(r.category)}, itemTitle: ${esc(r.itemTitle)}, searchAliases: ${esc(r.searchAliases)}, summaryTag: ${esc(r.summaryTag)}, detailGuide: ${esc(r.detailGuide)} },\n`;
}

ts += `];

/** 엑셀 시트: 한국행_검색어_매핑 테이블 — excel_dump.json 동기화 */
export const BAGGAGE_SEARCH_MAPPING_KOREA: BaggageSearchMappingRow[] = [
`;

for (const r of krRows) {
  ts += `  { id: ${esc(r.id)}, category: ${esc(r.category)}, itemTitle: ${esc(r.itemTitle)}, searchAliases: ${esc(r.searchAliases)}, summaryTag: ${esc(r.summaryTag)}, detailGuide: ${esc(r.detailGuide)} },\n`;
}

ts += `];
`;

fs.writeFileSync(outPath, ts, "utf8");
console.log("Wrote", outPath, jpRows.length, "JP,", krRows.length, "KR");

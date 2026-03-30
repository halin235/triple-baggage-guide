/**
 * excel_dump.json → src/constants/eanProhibitedPopupData.ts
 * 시트: E안_일본행, E안_한국행
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dumpPath = path.join(root, "excel_dump.json");
const outPath = path.join(root, "src/constants/eanProhibitedPopupData.ts");

const dump = JSON.parse(fs.readFileSync(dumpPath, "utf8"));

function rowsFor(sheetName) {
  const block = dump.find((b) => b.sheet === sheetName);
  return block?.rows ?? [];
}

function mapRow(row, idPrefix, idx) {
  const name =
    String(row["수하물"] ?? row["소분류"] ?? row["품목"] ?? "").trim();
  const detail = String(row["안내 문구"] ?? row["상세"] ?? "").trim();
  if (!name) return null;
  return {
    id: `${idPrefix}-${idx + 1}`,
    itemName: name,
    detailText: detail,
  };
}

const jp = rowsFor("E안_일본행")
  .map((r, i) => mapRow(r, "ean-jp", i))
  .filter(Boolean);
const kr = rowsFor("E안_한국행")
  .map((r, i) => mapRow(r, "ean-kr", i))
  .filter(Boolean);

function esc(s) {
  return JSON.stringify(s ?? "");
}

const header = `/**
 * 수하물 규제 카테고리 설계 (1).xlsx — 시트 E안_일본행, E안_한국행 행 데이터
 * (repo 내 excel_dump.json 동기화, 생성: node scripts/extract_ean_popup_from_dump.mjs)
 */
export interface EanProhibitedPopupItem {
  id: string;
  /** 엑셀 수하물 */
  itemName: string;
  /** 엑셀 안내 문구 (상세 규정·주의사항) */
  detailText: string;
}

`;

let body = `/** 시트: E안_일본행 */\nexport const EAN_JAPAN_PROHIBITED_POPUP_ITEMS: EanProhibitedPopupItem[] = [\n`;
for (const r of jp) {
  body += `  {\n    id: ${esc(r.id)},\n    itemName: ${esc(r.itemName)},\n    detailText:\n      ${esc(r.detailText)},\n  },\n`;
}
body += `];\n\n/** 시트: E안_한국행 */\nexport const EAN_KOREA_PROHIBITED_POPUP_ITEMS: EanProhibitedPopupItem[] = [\n`;
for (const r of kr) {
  body += `  {\n    id: ${esc(r.id)},\n    itemName: ${esc(r.itemName)},\n    detailText:\n      ${esc(r.detailText)},\n  },\n`;
}
body += `];\n`;

fs.writeFileSync(outPath, header + body, "utf8");
console.log("Wrote", outPath, jp.length, "JP,", kr.length, "KR");

/**
 * excel_dump.json → src/constants/baggageChecklistRegulationData.ts
 * C안 체크리스트 시트 2종, [위치] 빈 칸은 위 행 값으로 전진 채움
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dumpPath = path.join(root, "excel_dump.json");
const outPath = path.join(root, "src/constants/baggageChecklistRegulationData.ts");

const dump = JSON.parse(fs.readFileSync(dumpPath, "utf8"));

const SHEET_JP = "C안_체크리스트 (일본행) 수하물 규제";
const SHEET_KR = "C안_체크리스트 (한국행) 수하물 규제";

function forwardFillLocation(rows) {
  let last = "";
  return rows.map((r, i) => {
    const loc = (r["위치"] ?? "").trim();
    if (loc) last = loc;
    return {
      id: "",
      location: last || "기본 짐싸기",
      itemName: (r["품목"] ?? "").trim(),
      itemSubtext: (r["품목 하단"] ?? "").trim(),
      guideText: (r["안내 문구"] ?? "").trim(),
    };
  });
}

function buildRows(sheetName, prefix) {
  const block = dump.find((b) => b.sheet === sheetName);
  if (!block?.rows) throw new Error(`Sheet not found: ${sheetName}`);
  const filled = forwardFillLocation(block.rows);
  return filled
    .filter((r) => r.itemName)
    .map((r, i) => ({
      ...r,
      id: `${prefix}-${i + 1}`,
    }));
}

const japan = buildRows(SHEET_JP, "c-jp");
const korea = buildRows(SHEET_KR, "c-kr");

const header = `/**
 * C안_체크리스트 (일본행|한국행) 수하물 규제 — excel_dump.json 동기화
 * 생성: node scripts/extract_checklist_c_sheet.mjs
 */

export interface BaggageChecklistRegulationRow {
  id: string;
  /** [위치] — 전진 채움 적용 */
  location: string;
  /** [품목] */
  itemName: string;
  /** [품목 하단] */
  itemSubtext: string;
  /** [안내 문구] */
  guideText: string;
}

`;

const body = `export const BAGGAGE_CHECKLIST_C_JAPAN: BaggageChecklistRegulationRow[] = ${JSON.stringify(japan, null, 2)};

export const BAGGAGE_CHECKLIST_C_KOREA: BaggageChecklistRegulationRow[] = ${JSON.stringify(korea, null, 2)};
`;

fs.writeFileSync(outPath, header + body, "utf8");
console.log("Wrote", outPath, japan.length, "JP,", korea.length, "KR rows");

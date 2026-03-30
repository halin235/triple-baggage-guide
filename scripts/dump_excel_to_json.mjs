/**
 * 수하물 규정 카테고리 설계 (1).xlsx → excel_dump.json
 * 사용: node scripts/dump_excel_to_json.mjs [엑셀경로]
 * 기본: %USERPROFILE%\\Downloads\\수하물 규정 카테고리 설계 (1).xlsx
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import xlsx from "xlsx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const fallbackDownloads = path.join(
  process.env.USERPROFILE || process.env.HOME || "",
  "Downloads",
  "수하물 규정 카테고리 설계 (1).xlsx"
);
const fallbackProject = path.join(root, "수하물 규정 카테고리 설계 (1).xlsx");

const excelPath = process.argv[2] || (fs.existsSync(fallbackDownloads) ? fallbackDownloads : fallbackProject);
const outPath = path.join(root, "excel_dump.json");

if (!fs.existsSync(excelPath)) {
  console.error("엑셀 파일을 찾을 수 없습니다:", excelPath);
  console.error("사용법: node scripts/dump_excel_to_json.mjs \"C:\\경로\\파일.xlsx\"");
  process.exit(1);
}

/** 단정·직설 톤 (~함, ~불가, ~필수, ~추천)으로 통일 */
function formalizeCell(v) {
  if (typeof v !== "string" || v.length === 0) return v;
  let s = v;
  s = s.replace(/반입 불가예요/g, "반입 불가함");
  s = s.replace(/반입이 안 돼요/g, "반입 불가함");
  s = s.replace(/금지돼요/g, "금지됨");
  s = s.replace(/압수돼요/g, "압수됨");
  s = s.replace(/부과될 수 있어요/g, "부과될 수 있음");
  s = s.replace(/부과될 수 있습니다/g, "부과될 수 있음");
  s = s.replace(/가능해요\./g, "가능함.");
  s = s.replace(/가능합니다\./g, "가능함.");
  s = s.replace(/불가능해요\./g, "불가함.");
  s = s.replace(/추천해요\./g, "추천함.");
  s = s.replace(/추천합니다\./g, "추천함.");
  s = s.replace(/추천드려요/g, "추천함");
  s = s.replace(/편리합니다\./g, "편리함.");
  s = s.replace(/확인하세요/g, "확인 필요");
  s = s.replace(/가져가지 마세요/g, "반입 금지");
  s = s.replace(/소지하지 마세요/g, "소지 금지");
  s = s.replace(/절대 소지하지 마세요/g, "소지 금지");
  s = s.replace(/챙기세요/g, "챙길 것");
  s = s.replace(/들고 타세요/g, "기내 휴대 필수");
  s = s.replace(/직접 들고 타야 합니다/g, "기내 휴대 필수");
  s = s.replace(/넣어주세요/g, "담을 것");
  s = s.replace(/보내세요/g, "보낼 것");
  s = s.replace(/입니다\./g, "임.");
  s = s.replace(/대상이에요/g, "대상임");
  s = s.replace(/위험이 있어요/g, "위험 있음");
  s = s.replace(/받을 수 있어요/g, "받을 수 있음");
  s = s.replace(/있어요\./g, "있음.");
  s = s.replace(/없어요\./g, "없음.");
  s = s.replace(/해요\./g, "함.");
  s = s.replace(/가져올 수 있습니다/g, "가져올 수 있음");
  s = s.replace(/할 수 있습니다/g, "할 수 있음");
  s = s.replace(/됩니다\./g, "됨.");
  s = s.replace(/주의하세요/g, "주의 필요");
  return s;
}

function formalizeRow(row) {
  const out = {};
  for (const [k, v] of Object.entries(row)) {
    out[k] = typeof v === "string" ? formalizeCell(v) : v;
  }
  return out;
}

const wb = xlsx.readFile(excelPath);
const out = [];

for (const sheetName of wb.SheetNames) {
  const sheet = wb.Sheets[sheetName];
  const rows = xlsx.utils
    .sheet_to_json(sheet, { defval: "", raw: false })
    .map(formalizeRow);
  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
  out.push({ sheet: sheetName, columns, rows });
}

fs.writeFileSync(outPath, JSON.stringify(out, null, 2), "utf8");
console.log("Wrote", outPath, "| sheets:", out.length, "| source:", excelPath);

/**
 * 카테고리별 분류_일본 오사카 간사이 공항 수하물 데이터 시트에서
 * 금, 악세사리 / 단백질 파우더 의 "안내 문구 상세"만 갱신
 * 사용: node scripts/patch_kix_two_details.mjs <엑셀경로>
 */
import fs from "fs";
import path from "path";
import xlsx from "xlsx";

const SHEET = "카테고리별 분류_일본 오사카 간사이 공항 수하물 데이터";
const GOLD_DETAIL =
  "순도 90% 이상의 금괴·금제품은 1kg 초과 시 반드시 세관 신고 필수. 착용 중인 금 장신구(목걸이 등)를 포함하여 총 가액이 20만 엔을 넘으면 자진 신고 대상이에요.";
const PROTEIN_DETAIL =
  "가루 제형의 식품은 용량 제한 없이 기내 반입이 가능합니다. 단, 보안 검색 시 '내용물 확인(개봉 검사 등)'을 요청받을 수 있으니 가급적 개봉되지 않은 새 제품이나 성분 표시가 명확한 전용 용기에 담아 가시는 것을 권장해요.";

const excelPath = process.argv[2];
if (!excelPath || !fs.existsSync(excelPath)) {
  console.error("사용법: node scripts/patch_kix_two_details.mjs \"경로\\\\파일.xlsx\"");
  process.exit(1);
}

const wb = xlsx.readFile(excelPath);
const ws = wb.Sheets[SHEET];
if (!ws) {
  console.error("시트 없음:", SHEET);
  process.exit(1);
}

const ref = ws["!ref"];
if (!ref) {
  console.error("빈 시트");
  process.exit(1);
}
const rng = xlsx.utils.decode_range(ref);

function headerMatch(h, target) {
  const t = String(h ?? "").trim();
  return t === target || t.replace(/\s+/g, " ") === target;
}

let colItem = -1;
let colDetail = -1;
for (let c = rng.s.c; c <= rng.e.c; c++) {
  const addr = xlsx.utils.encode_cell({ r: rng.s.r, c });
  const v = ws[addr]?.v;
  if (headerMatch(v, "소분류 (Item)") || headerMatch(v, "소분류")) colItem = c;
  if (headerMatch(v, "안내 문구 상세")) colDetail = c;
}

if (colItem < 0 || colDetail < 0) {
  console.error("열을 찾지 못함. 소분류/안내 문구 상세 필요.", { colItem, colDetail });
  process.exit(1);
}

let patched = 0;
for (let r = rng.s.r + 1; r <= rng.e.r; r++) {
  const item = ws[xlsx.utils.encode_cell({ r, c: colItem })]?.v;
  if (item === "금, 악세사리") {
    const a = xlsx.utils.encode_cell({ r, c: colDetail });
    ws[a] = { v: GOLD_DETAIL, t: "s" };
    patched++;
  }
  if (item === "단백질 파우더") {
    const a = xlsx.utils.encode_cell({ r, c: colDetail });
    ws[a] = { v: PROTEIN_DETAIL, t: "s" };
    patched++;
  }
}

if (patched !== 2) {
  console.error("예상 2행 수정, 실제:", patched, "(엑셀에 해당 소분류 행이 있는지 확인)");
  process.exit(1);
}

xlsx.writeFile(wb, excelPath);
console.log("갱신 완료:", path.resolve(excelPath), "| 시트:", SHEET);

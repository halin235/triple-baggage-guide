# -*- coding: utf-8 -*-
"""Generate src/constants/baggageData.ts from excel_dump.json."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def slug(s: str) -> str:
    s = re.sub(r"[^\w가-힣]+", "-", s.lower())
    s = re.sub(r"-+", "-", s).strip("-")
    return s[:80] if len(s) > 80 else s


def tone_from_emoji(cell: str) -> str:
    if "🔴" in cell:
        return "danger"
    if "🟡" in cell:
        return "warning"
    return "info"


def infer_carry(summary: str, detail: str) -> tuple[str, str]:
    s, d = summary, detail
    if "반입 불가" in s or "반입 금지" in s or "전면 반입 금지" in d:
        return ("반입 불가(압수·폐기 위험)", "반입 불가(압수·폐기 위험)")
    if s.startswith("[필수: 기내") or ("기내 휴대" in s and "위탁 금지" in d):
        return ("필수 휴대", "위탁 금지")
    if "[필수: 위탁" in s or s.startswith("[필수: 위탁"):
        return ("기내 반입 불가", "위탁 필수")
    if "추천: 위탁" in s:
        return ("100ml·날 길이 등 조건 충족 시 기내 가능", "대용량·분실 방지 위해 위탁 권장")
    if "본체 위탁" in s:
        return ("리튬 배터리 분리 후 기내", "본체는 위탁 가능")
    if "6cm" in s:
        return ("날 6cm 이하만 기내", "초과 시 위탁")
    if "1인 1개" in s:
        return ("1인 1개 몸 소지(휴대)", "위탁 금지")
    if "택 1" in s or "기내/위탁 가능" in s:
        return ("한도 내 조건부 기내", "한도 내 조건부 위탁(택일)")
    if "면세" in s or "한도" in s or "신고" in s or "검역" in s:
        return ("보안·액체 규정 준수 시 기내 가능", "위탁 가능(면세·검역·신고는 별도)")
    return ("항공사·현지 세관 최종 확인", "항공사·현지 세관 최종 확인")


def esc(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def main():
    with open(ROOT / "excel_dump.json", "r", encoding="utf-8") as f:
        data = json.load(f)
    sheets = {s["sheet"]: s for s in data}

    kix_rows = sheets["카테고리별 분류_일본 오사카 간사이 공항 수하물 데이터"]["rows"]
    icn_rows = sheets["카테고리별 분류_한국 인천공항 수하물 데이터"]["rows"]

    items = []
    n = 0

    for row in kix_rows:
        n += 1
        name = (row.get("소분류 (Item)") or row.get("소분류") or "").strip()
        summary = (
            row.get("안내 문구 요약 (Action)")
            or row.get("안내 문구 요약")
            or ""
        ).strip()
        detail = (row.get("안내 문구 상세") or row.get("안내 문구") or "").strip()
        cat = (row.get("카테고리") or "").strip()
        tone = tone_from_emoji(
            str(row.get("수하물 카드 컬러", "") or row.get("안내 아이콘", "") or "")
        )
        cabin, checked = infer_carry(summary, detail)
        sid = f"kix-{slug(cat)}-{slug(name)}-{n}"
        items.append(
            {
                "id": sid,
                "itemName": name,
                "category": cat,
                "carryRegulation": {"cabin": cabin, "checked": checked},
                "summaryAction": summary,
                "detailGuide": detail,
                "route": {
                    "airports": ["KIX"],
                    "directionLabel": (row.get("국가 분류") or "").strip() or "🇯🇵 일본행",
                },
                "cardTone": tone,
                "excelSourceSheet": "카테고리별 분류_일본 오사카 간사이 공항 수하물 데이터",
            }
        )

    for row in icn_rows:
        n += 1
        name = (row.get("소분류") or row.get("소분류 (Item)") or "").strip()
        summary = (
            row.get("안내 문구 요약 (Action)")
            or row.get("안내 문구 요약")
            or ""
        ).strip()
        detail = (row.get("안내 문구 상세") or row.get("안내 문구") or "").strip()
        cat = (row.get("카테고리") or "").strip()
        tone = tone_from_emoji(str(row.get("안내 아이콘", "") or row.get("수하물 카드 컬러", "") or ""))
        cabin, checked = infer_carry(summary, detail)
        sid = f"icn-{slug(cat)}-{slug(name)}-{n}"
        items.append(
            {
                "id": sid,
                "itemName": name,
                "category": cat,
                "carryRegulation": {"cabin": cabin, "checked": checked},
                "summaryAction": summary,
                "detailGuide": detail,
                "route": {
                    "airports": ["ICN"],
                    "directionLabel": (row.get("국가 분류") or "").strip() or "🇰🇷 한국행",
                },
                "cardTone": tone,
                "excelSourceSheet": "카테고리별 분류_한국 인천공항 수하물 데이터",
            }
        )

    out = ROOT / "src" / "constants" / "baggageData.ts"
    out.parent.mkdir(parents=True, exist_ok=True)

    blocks = []
    for it in items:
        blocks.append(
            "\n".join(
                [
                    "  {",
                    f"    id: {esc(it['id'])},",
                    f"    itemName: {esc(it['itemName'])},",
                    f"    category: {esc(it['category'])},",
                    "    carryRegulation: {",
                    f"      cabin: {esc(it['carryRegulation']['cabin'])},",
                    f"      checked: {esc(it['carryRegulation']['checked'])},",
                    "    },",
                    f"    summaryAction: {esc(it['summaryAction'])},",
                    f"    detailGuide: {esc(it['detailGuide'])},",
                    "    route: {",
                    f"      airports: {json.dumps(it['route']['airports'])},",
                    f"      directionLabel: {esc(it['route']['directionLabel'])},",
                    "    },",
                    f"    cardTone: {json.dumps(it['cardTone'])},",
                    f"    excelSourceSheet: {esc(it['excelSourceSheet'])},",
                    "  }",
                ]
            )
        )

    body = "\n".join(
        [
            'import type { BaggageRegulationItem } from "@/types/baggage";',
            "",
            "/**",
            " * 수하물 규정 카테고리 설계 (1).xlsx",
            " * - 카테고리별 분류_일본 오사카 간사이 공항 수하물 데이터",
            " * - 카테고리별 분류_한국 인천공항 수하물 데이터",
            " * 생성: scripts/gen_baggage_ts.py",
            " */",
            "",
            "export const BAGGAGE_REGULATIONS: BaggageRegulationItem[] = [",
            ",\n".join(blocks),
            "];",
            "",
        ]
    )
    out.write_text(body, encoding="utf-8")
    print("Wrote", out, "count", len(items))


if __name__ == "__main__":
    main()

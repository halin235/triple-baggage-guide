/**
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

export const BAGGAGE_CHECKLIST_C_JAPAN: BaggageChecklistRegulationRow[] = [
  {
    "id": "c-jp-1",
    "location": "기본 짐싸기",
    "itemName": "세안 용품",
    "itemSubtext": "칫솔, 치약, 클렌징 폼",
    "guideText": "액체·젤류는 100ml 초과 시 기내 반입 불가."
  },
  {
    "id": "c-jp-2",
    "location": "기본 짐싸기",
    "itemName": "기초 화장품",
    "itemSubtext": "스킨, 로션, 선크림, 미스트",
    "guideText": "100ml 초과 액체류는 위탁 수하물 전용, 스프레이는 500ml 이하 1개만 가능."
  },
  {
    "id": "c-jp-3",
    "location": "기본 짐싸기",
    "itemName": "샤워용품",
    "itemSubtext": "샴푸, 린스, 바디워시",
    "guideText": "액체·젤류는 100ml 초과 시 기내 반입 불가."
  },
  {
    "id": "c-jp-4",
    "location": "기본 짐싸기",
    "itemName": "비상약",
    "itemSubtext": "두통약,지사제, 해열제 등",
    "guideText": "일본 방문 시 '수다페드' 성분 포함 상비약 반입 금지(처벌 대상). 시럽 등 액체 상비약은 100ml를 넘으면 처방전이 있어야 기내 반입이 가능."
  },
  {
    "id": "c-jp-5",
    "location": "기본 짐싸기",
    "itemName": "상의",
    "itemSubtext": "-",
    "guideText": "-"
  },
  {
    "id": "c-jp-6",
    "location": "기본 짐싸기",
    "itemName": "하의",
    "itemSubtext": "-",
    "guideText": "-"
  },
  {
    "id": "c-jp-7",
    "location": "기본 짐싸기",
    "itemName": "속옷, 양말",
    "itemSubtext": "-",
    "guideText": "-"
  },
  {
    "id": "c-jp-8",
    "location": "기본 짐싸기",
    "itemName": "데이터 이용 준비",
    "itemSubtext": "유심 eSIM, 포켓 와이파이",
    "guideText": "포켓 와이파이는 기내수하물만 가능."
  },
  {
    "id": "c-jp-9",
    "location": "기본 짐싸기",
    "itemName": "충전기",
    "itemSubtext": "충전 케이블, 젠더",
    "guideText": "-"
  },
  {
    "id": "c-jp-10",
    "location": "기본 짐싸기",
    "itemName": "변환 플러스",
    "itemSubtext": "돼지코, 여행용 멀티어댑터",
    "guideText": "배터리 내장형 어댑터는 기내수하물만 가능."
  },
  {
    "id": "c-jp-11",
    "location": "기본 짐싸기",
    "itemName": "작은 가방",
    "itemSubtext": "여행 중 간단한 소지품 넣고 다닐 가방",
    "guideText": "-"
  },
  {
    "id": "c-jp-12",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "수하물 규정 확인하기",
    "itemSubtext": "수하물 무게, 규정, 체크하기",
    "guideText": "-"
  },
  {
    "id": "c-jp-13",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "수건",
    "itemSubtext": "-",
    "guideText": "-"
  },
  {
    "id": "c-jp-14",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "색조 화장품",
    "itemSubtext": "-",
    "guideText": "-"
  },
  {
    "id": "c-jp-15",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "여성용품",
    "itemSubtext": "-",
    "guideText": "-"
  },
  {
    "id": "c-jp-16",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "면도용품",
    "itemSubtext": "면도기, 면도크림",
    "guideText": "면도날 6cm 이상 위탁수하물만 가능. 일회용·충전식면도기 기내 반입 가능. 액체·젤류는 100ml 초과 시 기내 반입 불가."
  },
  {
    "id": "c-jp-17",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "거울",
    "itemSubtext": "-",
    "guideText": "-"
  },
  {
    "id": "c-jp-18",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "헤어드라이기",
    "itemSubtext": "고데기, 무선 고데기 등",
    "guideText": "충전식 무선 고데기는 기내/위탁 모두 반입 불가."
  },
  {
    "id": "c-jp-19",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "헤어용품",
    "itemSubtext": "빗, 왁스, 헤어에센스",
    "guideText": "액체·젤류는 100ml 초과 시 기내 반입 불가."
  },
  {
    "id": "c-jp-20",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "신발",
    "itemSubtext": "운동화, 쪼리",
    "guideText": "-"
  },
  {
    "id": "c-jp-21",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "모자, 선글라스",
    "itemSubtext": "-",
    "guideText": "-"
  },
  {
    "id": "c-jp-22",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "잠옷",
    "itemSubtext": "-",
    "guideText": "-"
  },
  {
    "id": "c-jp-23",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "보조배터리",
    "itemSubtext": "리튬 배터리",
    "guideText": "보조 배터리 및 리튬 배터리는 기내수하물만 가능."
  },
  {
    "id": "c-jp-24",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "삼각대, 셀카봉",
    "itemSubtext": "",
    "guideText": "-"
  },
  {
    "id": "c-jp-25",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "비상식량",
    "itemSubtext": "컵라면, 컵밥, 고추장 튜브, 봉지 라면, 젓갈 등",
    "guideText": "젓갈류 검역 증명서 미비 시 전량 압수/폐기. 라면·컵라면 스프 내 육류 성분 포함 시 반입 제한."
  },
  {
    "id": "c-jp-26",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "위생용품",
    "itemSubtext": "휴지, 물티슈, 손소독제, 손톱깍이 등",
    "guideText": "손톱깎이는 기내/위탁 모두 가능. 액체·젤류는 100ml 초과 시 기내 반입 불가."
  },
  {
    "id": "c-jp-27",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "필기구, 문구류",
    "itemSubtext": "연필, 수첩, 커터칼, 가위",
    "guideText": "커터칼은 위탁만 가능. 가위 날이 6cm 초과 시 위탁 필수."
  },
  {
    "id": "c-jp-28",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "목베개, 안대, 귀마개",
    "itemSubtext": "-",
    "guideText": "-"
  },
  {
    "id": "c-jp-29",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "우산, 우비",
    "itemSubtext": "-",
    "guideText": "-"
  },
  {
    "id": "c-jp-30",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "방한용품",
    "itemSubtext": "바람막이, 목도리, 장갑",
    "guideText": "-"
  },
  {
    "id": "c-jp-31",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "지퍼백 / 비닐봉지",
    "itemSubtext": "-",
    "guideText": "-"
  },
  {
    "id": "c-jp-32",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "작은 담요",
    "itemSubtext": "-",
    "guideText": "-"
  },
  {
    "id": "c-jp-33",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "물놀이 용품",
    "itemSubtext": "수영복, 비치타월, 튜브 등",
    "guideText": "-"
  },
  {
    "id": "c-jp-34",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "현금/자산",
    "itemSubtext": "달러",
    "guideText": "미화 1만 달러 이상의 현금을 소지하고 출입국 시 반드시 세관에 신고 필수."
  },
  {
    "id": "c-jp-35",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "주류",
    "itemSubtext": "사케, 위스키, 와인, 소주, 맥주",
    "guideText": "일본 입국 시 주류 면세는 3병(병당 760ml)까지. 한도 넘길 시 세관 신고 필요."
  },
  {
    "id": "c-jp-36",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "담배",
    "itemSubtext": "일반 연초, 액상 니코틴",
    "guideText": "일본 입국 시 담배 1보루(200개비) / 전담 액상 20ml"
  },
  {
    "id": "c-jp-37",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "향수",
    "itemSubtext": "향수",
    "guideText": "향수 2온스(56ml) 한도(초과 시 가산세/세관 신고). 단, 오드콜로뉴·오드뚜왈렛은 향수 합계 제외"
  },
  {
    "id": "c-jp-38",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "기념품(스낵류)",
    "itemSubtext": "말린 생선, 버터, 치즈, 컵형 곤약젤리, 소시지, 육포, 생과일, 생채소 등",
    "guideText": "고액 과태료 주의: 육포·소시지(포장 무관 불가), 생과일·채소(반입 제한).\n압수 및 폐기: 컵형 곤약젤리, 치즈·버터(증명서 필수)."
  },
  {
    "id": "c-jp-39",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "악세서리",
    "itemSubtext": "명품 가방, 명품 시계, 짝퉁 브랜드",
    "guideText": "$800 초과 시 자진 신고 (관세 30% 감면 혜택). 위조품 단속 매우 강력, 적발 시 전량 압수 및 폐기."
  },
  {
    "id": "c-jp-40",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "기타(주의/금지 물품)",
    "itemSubtext": "수다페드, 아드레랄, CBD(대마 성분)오일, 살충제",
    "guideText": "수다페드(처벌), 아드레랄(구속), CBD(입국거부)"
  },
  {
    "id": "c-jp-41",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "전자 기기",
    "itemSubtext": "드론",
    "guideText": "드론 본체 위탁수하물 가능, 리튬 배터리는 기내수하물만 가능."
  }
];

export const BAGGAGE_CHECKLIST_C_KOREA: BaggageChecklistRegulationRow[] = [
  {
    "id": "c-kr-1",
    "location": "기본 짐싸기",
    "itemName": "세안 용품",
    "itemSubtext": "칫솔, 치약, 클렌징 폼",
    "guideText": "치약/폼 등 액체·젤류는 용기당 100ml 초과 시 기내 반입이 금지되니 반드시 위탁 수하물로 부치세요."
  },
  {
    "id": "c-kr-2",
    "location": "기본 짐싸기",
    "itemName": "기초 화장품",
    "itemSubtext": "스킨, 로션, 선크림, 미스트",
    "guideText": "100ml 초과 액체류는 위탁 전용이며, 미스트(스프레이)는 인체용에 한해 500ml 이하 1개만 휴대/위탁 가능합니다."
  },
  {
    "id": "c-kr-3",
    "location": "기본 짐싸기",
    "itemName": "샤워용품",
    "itemSubtext": "샴푸, 린스, 바디워시",
    "guideText": "대용량 세정제는 기내 반입이 불가하므로 캐리어(위탁)에 담아주세요. 면세점 구매품은 밀봉 상태를 유지해야 합니다."
  },
  {
    "id": "c-kr-4",
    "location": "기본 짐싸기",
    "itemName": "비상약",
    "itemSubtext": "두통약,지사제, 해열제 등",
    "guideText": "일반 상비약은 반입 가능하나, 일본에서 산 'EVE' 등 특정 약물은 성분 확인이 필요할 수 있습니다. (시럽제는 100ml 규정 적용)"
  },
  {
    "id": "c-kr-5",
    "location": "기본 짐싸기",
    "itemName": "상의",
    "itemSubtext": "-",
    "guideText": "의류는 반입 제한이 없으나, 고가의 브랜드 의류 구매 시 면세 한도($800) 계산에 포함해야 합니다."
  },
  {
    "id": "c-kr-6",
    "location": "기본 짐싸기",
    "itemName": "하의",
    "itemSubtext": "-",
    "guideText": "의류는 반입 제한이 없으나, 고가의 브랜드 의류 구매 시 면세 한도($800) 계산에 포함해야 합니다."
  },
  {
    "id": "c-kr-7",
    "location": "기본 짐싸기",
    "itemName": "속옷, 양말",
    "itemSubtext": "-",
    "guideText": "제한 사항이 없습니다. 편하게 짐을 꾸리세요."
  },
  {
    "id": "c-kr-8",
    "location": "기본 짐싸기",
    "itemName": "데이터 이용 준비",
    "itemSubtext": "유심 eSIM, 포켓 와이파이",
    "guideText": "포켓 와이파이는 리튬 배터리가 포함되어 있어 위탁 수하물이 절대 불가하며, 반드시 기내에 직접 들고 타야 합니다."
  },
  {
    "id": "c-kr-9",
    "location": "기본 짐싸기",
    "itemName": "충전기",
    "itemSubtext": "충전 케이블, 젠더",
    "guideText": "단순 케이블과 젠더는 기내/위탁 모두 가능합니다. 분실 방지를 위해 파우치에 넣어 위탁 수하물로 보내는 것을 추천합니다."
  },
  {
    "id": "c-kr-10",
    "location": "기본 짐싸기",
    "itemName": "변환 플러스",
    "itemSubtext": "돼지코, 여행용 멀티어댑터",
    "guideText": "단순 어댑터는 제한 없으나, 배터리 내장형 멀티어댑터는 반드시 기내 수하물로 휴대해야 합니다."
  },
  {
    "id": "c-kr-11",
    "location": "기본 짐싸기",
    "itemName": "작은 가방",
    "itemSubtext": "여행 중 간단한 소지품 넣고 다닐 가방",
    "guideText": "가방 자체는 규제가 없으나, 가방 안에 라이터나 배터리 등 위탁 금지 품목이 들어있지 않은지 확인하세요."
  },
  {
    "id": "c-kr-12",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "수건",
    "itemSubtext": "-",
    "guideText": "제한 사항이 없습니다."
  },
  {
    "id": "c-kr-13",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "색조 화장품",
    "itemSubtext": "-",
    "guideText": "립스틱, 팩트 등 고체형은 자유롭지만, 파운데이션이나 마스카라 등 액상/젤 타입은 100ml 기내 반입 규정을 준수하세요."
  },
  {
    "id": "c-kr-14",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "여성용품",
    "itemSubtext": "-",
    "guideText": "기내 및 위탁 수하물 모두 자유롭게 반입 가능합니다."
  },
  {
    "id": "c-kr-15",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "면도용품",
    "itemSubtext": "면도기, 면도크림",
    "guideText": "전기/충전식 면도기는 기내 휴대가 안전하며, 100ml 초과 면도크림(스프레이)은 반드시 위탁 수하물로 보내야 합니다."
  },
  {
    "id": "c-kr-16",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "거울",
    "itemSubtext": "-",
    "guideText": "파손 위험이 있으니 옷 사이에 잘 감싸서 위탁 수하물로 보내거나 기내에 휴대하세요."
  },
  {
    "id": "c-kr-17",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "헤어드라이기",
    "itemSubtext": "고데기, 무선 고데기 등",
    "guideText": "[주의] 배터리 일체형 무선 고데기는 일본 공항 보안 검색 시 기내/위탁 모두 압수될 수 있으니 유선 제품을 권장합니다."
  },
  {
    "id": "c-kr-18",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "헤어용품",
    "itemSubtext": "빗, 왁스, 헤어에센스",
    "guideText": "액상 에센스나 젤 타입 왁스는 100ml 초과 시 기내 반입 불가입니다. 대용량 제품은 반드시 캐리어에 넣으세요."
  },
  {
    "id": "c-kr-19",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "신발",
    "itemSubtext": "운동화, 쪼리",
    "guideText": "신발 밑창에 흙이 많이 묻은 경우 검역 대상이 될 수 있으니 깨끗하게 털어서 짐을 싸주세요."
  },
  {
    "id": "c-kr-20",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "모자, 선글라스",
    "itemSubtext": "-",
    "guideText": "제한 사항이 없습니다."
  },
  {
    "id": "c-kr-21",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "잠옷",
    "itemSubtext": "-",
    "guideText": "제한 사항이 없습니다."
  },
  {
    "id": "c-kr-22",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "보조배터리",
    "itemSubtext": "리튬 배터리",
    "guideText": "위탁 수하물(캐리어) 금지 품목 1순위입니다. 반드시 기내에 휴대하세요. (160Wh 초과 제품은 반입 불가)"
  },
  {
    "id": "c-kr-23",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "삼각대, 셀카봉",
    "itemSubtext": "",
    "guideText": "끝이 날카롭지 않은 접이식은 기내 반입이 가능하나, 길이가 긴 경우 항공사별로 위탁을 요구할 수 있습니다."
  },
  {
    "id": "c-kr-24",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "비상식량",
    "itemSubtext": "컵라면, 컵밥, 고추장 튜브, 봉지 라면, 젓갈 등",
    "guideText": "[주의] 육류 성분(스프 내 소고기 등)이 포함된 라면/컵밥은 원칙적으로 검역 대상이며 반입이 제한될 수 있습니다."
  },
  {
    "id": "c-kr-25",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "위생용품",
    "itemSubtext": "휴지, 물티슈, 손소독제, 손톱깍이 등",
    "guideText": "-"
  },
  {
    "id": "c-kr-26",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "필기구, 문구류",
    "itemSubtext": "연필, 수첩, 커터칼, 가위",
    "guideText": "🚨 커터칼은 보안 검색 시 즉시 압수됩니다. 공항에서 버리지 않도록 반드시 캐리어에 넣어주세요.\n가위는 날 길이가 6cm 이하일 때만 기내 반입이 돼요. 큰 가위는 미리 캐리어에 넣으세요."
  },
  {
    "id": "c-kr-27",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "목베개, 안대, 귀마개",
    "itemSubtext": "-",
    "guideText": "-"
  },
  {
    "id": "c-kr-28",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "우산, 우비",
    "itemSubtext": "-",
    "guideText": "-"
  },
  {
    "id": "c-kr-29",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "방한용품",
    "itemSubtext": "바람막이, 목도리, 장갑",
    "guideText": "-"
  },
  {
    "id": "c-kr-30",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "지퍼백 / 비닐봉지",
    "itemSubtext": "-",
    "guideText": "-"
  },
  {
    "id": "c-kr-31",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "작은 담요",
    "itemSubtext": "-",
    "guideText": "-"
  },
  {
    "id": "c-kr-32",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "물놀이 용품",
    "itemSubtext": "수영복, 비치타월, 튜브 등",
    "guideText": "-"
  },
  {
    "id": "c-kr-33",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "현금/자산",
    "itemSubtext": "달러",
    "guideText": "해외 취득 물품 총액 $800 초과 시 자진 신고하세요. 미화 1만 달러 초과 현금 지참 시에도 반드시 신고가 필요합니다."
  },
  {
    "id": "c-kr-34",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "주류",
    "itemSubtext": "사케, 위스키, 와인, 소주, 맥주",
    "guideText": "면세 한도는 1인당 2병(합계 2L 이하, $400 이하)입니다. 이를 초과하면 세관 신고서에 반드시 체크해야 합니다."
  },
  {
    "id": "c-kr-35",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "담배",
    "itemSubtext": "일반 연초, 액상 니코틴",
    "guideText": "-"
  },
  {
    "id": "c-kr-36",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "향수",
    "itemSubtext": "향수",
    "guideText": "-"
  },
  {
    "id": "c-kr-37",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "기념품(스낵류)",
    "itemSubtext": "말린 생선, 버터, 치즈, 컵형 곤약젤리, 소시지, 육포, 생과일, 생채소 등",
    "guideText": "🚨 컵형 곤약젤리는 전량 압수 대상입니다. 튜브형(파우치형) 젤리만 반입 가능하니 구매 시 반드시 확인하세요!\n🚨 육포, 소시지 등 육가공품은 진공포장이라도 반입 금지입니다. 적발 시 최대 1,000만 원의 과태료가 부과됩니다.\n김은 자유롭지만, 젓갈/말린 생선은 인당 5kg & 10만 원 이내여야 하며 정부 발행 검역 증명서가 없으면 폐기될 수 있습니다."
  },
  {
    "id": "c-kr-38",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "악세서리",
    "itemSubtext": "명품 가방, 명품 시계, 짝퉁 브랜드",
    "guideText": "-"
  },
  {
    "id": "c-kr-39",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "기타(주의/금지 물품)",
    "itemSubtext": "수다페드, 아드레랄, CBD(대마 성분)오일, 살충제",
    "guideText": "-"
  },
  {
    "id": "c-kr-40",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "전자 기기",
    "itemSubtext": "드론",
    "guideText": "-"
  }
];

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
    "guideText": "100ml 초과 액체류는 위탁 수하물 전용, 스프레이는 인체용에 한해 500ml 이하 1개만 휴대/위탁 가능."
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
    "guideText": "[위탁 불가] 포켓 와이파이는 리튬 배터리 포함으로 반드시 기내 수하물로만 가능."
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
    "itemSubtext": "위스키, 와인, 소주, 맥주, 사케",
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
    "itemSubtext": "말린 생선, 버터, 치즈, 컵형 곤약젤리, 소시지, 육포, 생과일, 생채소, 단백질 파우더 등",
    "guideText": "[고액 과태료] 육포·소시지(포장 무관 불가), 생과일·채소(반입 제한).\n[압수/폐기] 컵형 곤약젤리, 치즈·버터(증명서 필수).\n[기내 수하물] 가루 제형의 식품은 용량 제한 없이 기내 반입이 가능하지만, 보안 검색 시 '내용물 확인(개봉 검사 등)'을 요청받을 수 있으니 가급적 개봉되지 않은 새 제품이나 성분 표시가 명확한 전용 용기에 담아 가시는 것을 권장합니다."
  },
  {
    "id": "c-jp-39",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "악세서리",
    "itemSubtext": "목걸이, 귀걸이, 반지",
    "guideText": "착용 중인 제품을 포함하여 합계액이 $800를 초과하면 신고하세요. 자진 신고 시 관세 30% 감면 혜택이 있습니다."
  },
  {
    "id": "c-jp-40",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "명품",
    "itemSubtext": "명품 가방, 명품 시계, 짝퉁 브랜드",
    "guideText": "$800 초과 시 자진 신고 (관세 30% 감면 혜택). 위조품 단속 매우 강력, 적발 시 전량 압수 및 폐기."
  },
  {
    "id": "c-jp-41",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "기타(주의/금지 물품)",
    "itemSubtext": "수다페드, 아드레랄, CBD(대마 성분)오일, 살충제",
    "guideText": "[처벌 주의] 수다페드(슈도에페드린) 성분 포함 상비약은 일본 내 반입 금지 및 처벌 대상임. 지참 전 성분을 반드시 확인 필요.\n[구속 위험] 아드레랄 등 각성 성분이 포함된 약물은 일본 내 반입 시 구속될 위험이 있습니다. 절대 소지 금지.\n[입국 거부] CBD(대마 성분) 오일 및 관련 제품은 일본 입국 거부 사유가 됨. 적발 시 엄격히 처벌되니 유의 필수."
  },
  {
    "id": "c-jp-42",
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
    "guideText": "액체·젤류는 100ml 초과 시 기내 반입 불가."
  },
  {
    "id": "c-kr-2",
    "location": "기본 짐싸기",
    "itemName": "기초 화장품",
    "itemSubtext": "스킨, 로션, 선크림, 미스트",
    "guideText": "100ml 초과 액체류는 위탁 전용, 스프레이는 인체용에 한해 500ml 이하 1개만 휴대/위탁 가능."
  },
  {
    "id": "c-kr-3",
    "location": "기본 짐싸기",
    "itemName": "샤워용품",
    "itemSubtext": "샴푸, 린스, 바디워시",
    "guideText": "액체·젤류는 100ml 초과 시 기내 반입 불가."
  },
  {
    "id": "c-kr-4",
    "location": "기본 짐싸기",
    "itemName": "비상약",
    "itemSubtext": "두통약,지사제, 해열제 등",
    "guideText": "일반 상비약은 반입 가능하나, 일본에서 산 'EVE' 등 특정 약물은 성분 확인 필요. (시럽제는 100ml 규정 적용)"
  },
  {
    "id": "c-kr-5",
    "location": "기본 짐싸기",
    "itemName": "상의",
    "itemSubtext": "-",
    "guideText": "의류는 반입 제한이 없으나, 고가의 브랜드 의류 구매 시 면세 한도($800) 계산에 포함."
  },
  {
    "id": "c-kr-6",
    "location": "기본 짐싸기",
    "itemName": "하의",
    "itemSubtext": "-",
    "guideText": "의류는 반입 제한이 없으나, 고가의 브랜드 의류 구매 시 면세 한도($800) 계산에 포함."
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
    "guideText": "[위탁 불가] 포켓 와이파이는 리튬 배터리 포함으로 반드시 기내 수하물로만 가능."
  },
  {
    "id": "c-kr-9",
    "location": "기본 짐싸기",
    "itemName": "충전기",
    "itemSubtext": "충전 케이블, 젠더",
    "guideText": "기내/위탁 모두 가능. 분실 방지를 위해 파우치에 넣어 위탁 수하물 추천."
  },
  {
    "id": "c-kr-10",
    "location": "기본 짐싸기",
    "itemName": "변환 플러스",
    "itemSubtext": "돼지코, 여행용 멀티어댑터",
    "guideText": "단순형은 제한 없음. 배터리 내장형 어댑터는 반드시 기내 수하물로 휴대."
  },
  {
    "id": "c-kr-11",
    "location": "기본 짐싸기",
    "itemName": "작은 가방",
    "itemSubtext": "여행 중 간단한 소지품 넣고 다닐 가방",
    "guideText": "가방 자체는 규제가 없으나, 내부에 라이터나 배터리 등 위탁 금지 품목이 들어있지 않은지 확인 필수."
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
    "guideText": "립스틱, 팩트 등 고체형은 자유롭지만, 파운데이션이나 마스카라 등 액상/젤 타입은 100ml 초과 시 기내 반입 불가."
  },
  {
    "id": "c-kr-14",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "여성용품",
    "itemSubtext": "-",
    "guideText": "기내 및 위탁 수하물 모두 자유롭게 반입 가능."
  },
  {
    "id": "c-kr-15",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "면도용품",
    "itemSubtext": "면도기, 면도크림",
    "guideText": "전기/충전식 면도기는 기내 휴대가 안전, 면도날 6cm 이상 위탁 전용. 100ml 초과 면도크림(스프레이)은 위탁 필수."
  },
  {
    "id": "c-kr-16",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "거울",
    "itemSubtext": "-",
    "guideText": "파손 위험이 있으니 옷 사이에 감싸서 위탁 수하물로 보내거나 기내 휴대 권장."
  },
  {
    "id": "c-kr-17",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "헤어드라이기",
    "itemSubtext": "고데기, 무선 고데기 등",
    "guideText": "일반 유선 고데기는 기내 및 위탁 수하물 모두 가능. 단, 무선 고데기는 리튬 배터리 화재 위험으로 가급적 기내 수하물로 휴대 권장."
  },
  {
    "id": "c-kr-18",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "헤어용품",
    "itemSubtext": "빗, 왁스, 헤어에센스",
    "guideText": "액상 에센스나 젤 타입 왁스는 100ml 초과 시 기내 반입 불가."
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
    "guideText": "[위탁 불가] 160Wh 초과 반입 불가. 반드시 직접 들고 타야 함 (기내 전용)."
  },
  {
    "id": "c-kr-23",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "삼각대, 셀카봉",
    "itemSubtext": "",
    "guideText": "접이식은 기내 가능. 길이가 긴 제품은 항공사 확인 후 위탁 수하물 권장."
  },
  {
    "id": "c-kr-24",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "비상식량",
    "itemSubtext": "컵라면, 컵밥, 고추장 튜브, 봉지 라면, 젓갈 등",
    "guideText": "[주의] 스프 내 육류 성분 포함 시 반입 제한. 성분 표기를 미리 확인 필요."
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
    "guideText": "커터칼은 보안 검색 시 즉시 압수, 위탁만 가능. 가위는 날이 6cm 초과 시 반드시 위탁 수하물로 처리."
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
    "itemSubtext": "달러, 금",
    "guideText": "$800 초과 시 자진 신고 (관세 30% 감면 혜택). 미화 1만 달러 초과 현금 지참 시 반드시 세관 신고 필수."
  },
  {
    "id": "c-kr-34",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "주류",
    "itemSubtext": "사케, 위스키, 와인, 소주, 맥주",
    "guideText": "주류 면세는 ①전체 2병 이하 ②합계 용량 2L 이하 ③총 가격 $400 이하라는 3가지 조건을 모두 충족 시 면세."
  },
  {
    "id": "c-kr-35",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "담배",
    "itemSubtext": "일반 연초, 전자담배 (액상), 라이터",
    "guideText": "전자담배는 100ml 이하만 기내수하물로 반입 가능, 위탁 수하물로 반입 불가.\n일반 연초 1보루(200개비) / 전자담배 액상 20ml까지 면세 적용."
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
    "guideText": "[압수/폐기] 컵형 곤약젤리는 반입 불가. 튜브(파우치)형 제품만 안전하게 지참 가능.\n[고액 과태료] 육포·소시지는 포장 무관 반입 금지. 적발 시 최대 1,000만 원의 과태료 부과.\n[검역 필수] 젓갈·말린 생선은 인당 5kg & 10만 원 이내 제한. 정부 발행 검역 증명서 미비 시 전량 압수 및 폐기. (김은 자유롭게 반입 가능)"
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
    "guideText": "[반입 금지,형사 처벌 주의] 아드레랄, 수다페드 등 마약류 위반 성분이 포함된 의약품과 CBD(대마) 성분 제품은 해외 구매 시 국내 반입이 엄격히 금지되며, 적발 시 구속 수사 및 형사 처벌 대상.\n[성분 확인 필수] 본인이 복용하는 상비약이나 건강기능식품 내에 국내 반입 제한 성분이 포함되어 있지 않은지 입국 전 반드시 재확인 필수.\n[위험물 반입 불가] 스프레이형이나 가스 충전식 살충제는 폭발 위험물로 분류되어 기내 휴대 및 위탁 수하물 이용이 전면 불가능."
  },
  {
    "id": "c-kr-40",
    "location": "기본 짐싸기 아이템 추가",
    "itemName": "전자 기기",
    "itemSubtext": "드론",
    "guideText": "-"
  }
];

/** 일정 등록 Step 1 — 도시 (트리플 스타일 데모 데이터) */

export const TRIP_REGIONS = [
  "전체",
  "일본",
  "동남아시아",
  "중화/중국",
  "남태평양",
] as const;

export type TripRegion = (typeof TRIP_REGIONS)[number];

export interface TripCityOption {
  id: string;
  name: string;
  subtitle: string;
  region: TripRegion;
  /** 수하물 MVP: 일본 입국 규정은 KIX 시트, 귀국은 ICN */
  regulationAirportOutbound: "KIX";
  regulationAirportReturn: "ICN";
}

export const TRIP_CITIES_OVERSEAS: TripCityOption[] = [
  {
    id: "tokyo",
    name: "도쿄",
    subtitle: "도쿄, 하코네, 요코하마, 가마쿠라",
    region: "일본",
    regulationAirportOutbound: "KIX",
    regulationAirportReturn: "ICN",
  },
  {
    id: "osaka",
    name: "오사카",
    subtitle: "오사카, 교토, 고베, 나라",
    region: "일본",
    regulationAirportOutbound: "KIX",
    regulationAirportReturn: "ICN",
  },
  {
    id: "fukuoka",
    name: "후쿠오카",
    subtitle: "후쿠오카, 유후인, 벳푸",
    region: "일본",
    regulationAirportOutbound: "KIX",
    regulationAirportReturn: "ICN",
  },
  {
    id: "sapporo",
    name: "삿포로",
    subtitle: "삿포로, 니세코, 오타루",
    region: "일본",
    regulationAirportOutbound: "KIX",
    regulationAirportReturn: "ICN",
  },
  {
    id: "bangkok",
    name: "방콕",
    subtitle: "방콕, 파타야, 후아힌",
    region: "동남아시아",
    regulationAirportOutbound: "KIX",
    regulationAirportReturn: "ICN",
  },
  {
    id: "danang",
    name: "다낭",
    subtitle: "다낭, 호이안, 후에",
    region: "동남아시아",
    regulationAirportOutbound: "KIX",
    regulationAirportReturn: "ICN",
  },
  {
    id: "hongkong",
    name: "홍콩",
    subtitle: "홍콩, 마카오",
    region: "중화/중국",
    regulationAirportOutbound: "KIX",
    regulationAirportReturn: "ICN",
  },
  {
    id: "guam",
    name: "괌",
    subtitle: "괌 본섬",
    region: "남태평양",
    regulationAirportOutbound: "KIX",
    regulationAirportReturn: "ICN",
  },
];

export interface TripCityDomestic {
  id: string;
  name: string;
  subtitle: string;
  regulationAirportOutbound: "KIX";
  regulationAirportReturn: "ICN";
}

export const TRIP_CITIES_DOMESTIC: TripCityDomestic[] = [
  {
    id: "jeju",
    name: "제주",
    subtitle: "제주 전역",
    regulationAirportOutbound: "KIX",
    regulationAirportReturn: "ICN",
  },
  {
    id: "busan",
    name: "부산",
    subtitle: "부산, 경주, 울산",
    regulationAirportOutbound: "KIX",
    regulationAirportReturn: "ICN",
  },
  {
    id: "seoul",
    name: "서울",
    subtitle: "서울, 인천, 수원",
    regulationAirportOutbound: "KIX",
    regulationAirportReturn: "ICN",
  },
];

/** Step 3 — 누구와 */
export const TRAVEL_STYLE_OPTIONS = [
  { id: "family_kids", label: "아이와" },
  { id: "friends", label: "친구와" },
  { id: "parents", label: "부모님과" },
  { id: "couple", label: "연인과" },
  { id: "solo", label: "혼자" },
  { id: "colleagues", label: "동료와" },
] as const;

export type TravelStyleId = (typeof TRAVEL_STYLE_OPTIONS)[number]["id"];

import type { CategoryId } from "@/lib/categories";

export interface Tool {
  /** URL 슬러그 (영문 키워드 기반) */
  slug: string;
  /** 사용자에게 보이는 도구 이름 */
  title: string;
  /** 메타 설명용 짧은 한 줄 (160자 이내) */
  description: string;
  /** 카테고리 ID */
  category: CategoryId;
  /** SEO 키워드 */
  keywords: string[];
  /** 게시일 (YYYY-MM-DD) */
  publishedAt: string;
  /** 마지막 갱신일 (YYYY-MM-DD). 세금 계산기처럼 매년 갱신 필요한 경우 사용 */
  updatedAt?: string;
  /** 기준일 표기. 세법·요율 기준 도구에 필수 (예: "2026년 4월 기준") */
  rateBasis?: string;
}

/**
 * 정식 출시된 도구 목록.
 * 새 도구 페이지 추가 시 여기에 등록 (sitemap·홈 카탈로그·구조화 데이터에 자동 반영).
 */
export const tools: Tool[] = [
  {
    slug: "salary-calculator",
    title: "연봉 실수령액 계산기",
    description:
      "연봉을 입력하면 4대보험과 소득세를 차감한 월 실수령액을 즉시 계산합니다.",
    category: "finance",
    keywords: [
      "연봉 실수령액",
      "연봉 계산기",
      "월급 실수령",
      "4대보험 계산",
      "소득세 계산",
    ],
    publishedAt: "2026-04-29",
    updatedAt: "2026-04-29",
    rateBasis: "2026년 4월 기준",
  },
  {
    slug: "severance-pay-calculator",
    title: "퇴직금 계산기",
    description:
      "입사일·퇴사일·평균임금을 입력하면 법정 퇴직금을 즉시 계산합니다.",
    category: "finance",
    keywords: ["퇴직금 계산기", "법정 퇴직금", "평균임금", "근로자퇴직급여"],
    publishedAt: "2026-04-29",
    updatedAt: "2026-04-29",
    rateBasis: "2026년 4월 기준",
  },
  {
    slug: "four-insurance-calculator",
    title: "4대보험 계산기",
    description:
      "월급 기준 국민연금·건강보험·장기요양·고용·산재보험을 근로자/사업주로 분리 계산합니다.",
    category: "finance",
    keywords: [
      "4대보험 계산기",
      "국민연금",
      "건강보험",
      "고용보험",
      "산재보험",
    ],
    publishedAt: "2026-04-29",
    updatedAt: "2026-04-29",
    rateBasis: "2026년 4월 기준",
  },
  {
    slug: "annual-leave-pay",
    title: "연차수당 계산기",
    description:
      "월 통상임금과 미사용 연차 일수를 입력하면 연차수당을 즉시 계산합니다.",
    category: "finance",
    keywords: ["연차수당 계산기", "통상임금", "연차 미사용 수당"],
    publishedAt: "2026-04-29",
    updatedAt: "2026-04-29",
  },
  {
    slug: "comprehensive-income-tax",
    title: "종합소득세 간이 계산기",
    description:
      "종합소득금액을 입력하면 누진세율 기반 산출세액과 결정세액을 추산합니다.",
    category: "finance",
    keywords: ["종합소득세", "종합소득세 계산기", "사업소득세", "5월 종소세"],
    publishedAt: "2026-04-29",
    updatedAt: "2026-04-29",
    rateBasis: "2026년 4월 기준",
  },
  {
    slug: "vat-calculator",
    title: "부가가치세 계산기",
    description:
      "공급가액에서 부가세·합계를, 합계에서 공급가액·부가세를 양방향으로 계산합니다 (10% 기준).",
    category: "finance",
    keywords: [
      "부가가치세 계산기",
      "부가세 계산기",
      "VAT 계산",
      "공급가액 계산",
      "부가세 별도",
    ],
    publishedAt: "2026-06-01",
    updatedAt: "2026-06-01",
    rateBasis: "부가세율 10% (일반과세) 기준",
  },
  {
    slug: "hourly-wage-calculator",
    title: "시급·주휴수당 계산기",
    description:
      "시급과 근무시간으로 주휴수당·주급·월급을 계산합니다. 2026년 최저시급 10,320원 기준.",
    category: "finance",
    keywords: [
      "주휴수당 계산기",
      "시급 계산기",
      "최저임금 계산기",
      "2026 최저시급",
      "알바 월급",
    ],
    publishedAt: "2026-06-01",
    updatedAt: "2026-06-01",
    rateBasis: "2026년 최저시급 10,320원 기준",
  },
  {
    slug: "text-counter",
    title: "글자수 세기",
    description:
      "공백 포함·제외 글자수, 단어 수, 줄 수, 단락 수, UTF-8 바이트를 즉시 계산합니다.",
    category: "productivity",
    keywords: ["글자수 세기", "자기소개서 글자수", "논술 글자수"],
    publishedAt: "2026-04-29",
    updatedAt: "2026-04-29",
  },
  {
    slug: "spacing-checker",
    title: "띄어쓰기 검사기",
    description:
      "한국어에서 자주 보이는 띄어쓰기 누락 패턴을 규칙 기반으로 자동 교정합니다.",
    category: "productivity",
    keywords: ["띄어쓰기 검사기", "한국어 띄어쓰기", "맞춤법"],
    publishedAt: "2026-04-29",
    updatedAt: "2026-04-29",
  },
  {
    slug: "markdown-to-html",
    title: "마크다운 → HTML 변환기",
    description:
      "자주 쓰는 마크다운 문법을 안전한 HTML로 변환합니다.",
    category: "productivity",
    keywords: ["마크다운 변환", "Markdown to HTML"],
    publishedAt: "2026-04-29",
    updatedAt: "2026-04-29",
  },
  {
    slug: "timestamp-converter",
    title: "타임스탬프 변환기",
    description:
      "Unix 타임스탬프(초·밀리초)와 사람이 읽는 날짜를 양방향으로 변환합니다.",
    category: "productivity",
    keywords: ["타임스탬프 변환기", "Unix timestamp", "ISO 8601"],
    publishedAt: "2026-04-29",
    updatedAt: "2026-04-29",
  },
  {
    slug: "korean-age",
    title: "만 나이 계산기",
    description:
      "생년월일로 만 나이·연 나이·옛 한국 나이를 한 번에 계산합니다.",
    category: "lifestyle",
    keywords: ["만 나이 계산기", "한국 나이", "연 나이"],
    publishedAt: "2026-04-29",
    updatedAt: "2026-04-29",
  },
  {
    slug: "bmi-calculator",
    title: "BMI 계산기",
    description:
      "키와 몸무게로 BMI를 계산하고 대한비만학회 기준 분류를 보여 드립니다.",
    category: "lifestyle",
    keywords: ["BMI 계산기", "체질량지수", "비만도"],
    publishedAt: "2026-04-29",
    updatedAt: "2026-04-29",
  },
  {
    slug: "dday-calculator",
    title: "디데이 계산기",
    description:
      "목표일까지 남은 일수 또는 지난 일수를 계산합니다.",
    category: "lifestyle",
    keywords: ["디데이 계산기", "D-day", "남은 일수"],
    publishedAt: "2026-04-29",
    updatedAt: "2026-04-29",
  },
  {
    slug: "drink-driving-time",
    title: "음주 후 운전 가능 시간",
    description:
      "Widmark 공식으로 음주 후 BAC와 운전 가능 추정 시점을 계산합니다.",
    category: "lifestyle",
    keywords: ["음주 후 운전 가능 시간", "혈중알코올농도", "BAC"],
    publishedAt: "2026-04-29",
    updatedAt: "2026-04-29",
  },
  {
    slug: "percent-calculator",
    title: "퍼센트 계산기",
    description:
      "비율, 퍼센트 값, 증감률을 한 번에 계산합니다. A는 B의 몇 %인지 즉시 확인하세요.",
    category: "lifestyle",
    keywords: [
      "퍼센트 계산기",
      "백분율 계산기",
      "비율 계산",
      "증감률 계산",
    ],
    publishedAt: "2026-06-01",
    updatedAt: "2026-06-01",
  },
  {
    slug: "unit-converter",
    title: "단위 변환기",
    description:
      "길이·무게·부피의 다양한 단위를 한 번에 변환합니다.",
    category: "converter",
    keywords: ["단위 변환기", "길이 변환", "무게 변환", "부피 변환"],
    publishedAt: "2026-04-29",
    updatedAt: "2026-04-29",
  },
  {
    slug: "exchange-rate",
    title: "환율 계산기",
    description:
      "달러·유로·엔·위안 등 주요 통화와 원화를 변환합니다 (정적 환율).",
    category: "converter",
    keywords: ["환율 계산기", "달러 원화", "유로 환율", "엔화 환율"],
    publishedAt: "2026-04-29",
    updatedAt: "2026-04-29",
    rateBasis: "2026년 4월 기준 (정적 데이터)",
  },
  {
    slug: "color-converter",
    title: "색상 코드 변환기",
    description:
      "HEX·RGB·HSL 색상 코드를 양방향으로 변환하고 미리봅니다.",
    category: "converter",
    keywords: ["색상 코드 변환", "HEX RGB", "HSL 변환"],
    publishedAt: "2026-04-29",
    updatedAt: "2026-04-29",
  },
  {
    slug: "pyeong-converter",
    title: "평수 변환기",
    description:
      "제곱미터(㎡)와 평을 양방향으로 변환합니다. 아파트 전용면적 ㎡를 평으로 바로 환산하세요.",
    category: "converter",
    keywords: [
      "평수 변환기",
      "평 제곱미터 변환",
      "㎡ 평 계산",
      "전용면적 평수",
    ],
    publishedAt: "2026-06-01",
    updatedAt: "2026-06-01",
  },
  {
    slug: "loan-interest",
    title: "대출 이자 계산기",
    description:
      "원리금균등·원금균등 상환 방식의 월 납입액과 총 이자를 비교합니다.",
    category: "realestate",
    keywords: ["대출 이자 계산기", "원리금균등", "원금균등", "주택담보대출"],
    publishedAt: "2026-04-29",
    updatedAt: "2026-04-29",
  },
  {
    slug: "real-estate-transfer-tax",
    title: "부동산 양도세 간이 계산기",
    description:
      "취득가·양도가·보유기간으로 1세대 1주택 비과세와 일반 양도세를 추산합니다.",
    category: "realestate",
    keywords: ["양도세 계산기", "양도소득세", "1세대 1주택 비과세"],
    publishedAt: "2026-04-29",
    updatedAt: "2026-04-29",
    rateBasis: "2026년 4월 기준",
  },
  {
    slug: "deposit-savings-maturity",
    title: "적금/예금 만기 계산기",
    description:
      "정기적금·정기예금의 세후 만기 수령액을 단리 기준으로 계산합니다.",
    category: "realestate",
    keywords: ["적금 계산기", "예금 계산기", "만기 수령액", "이자소득세"],
    publishedAt: "2026-04-29",
    updatedAt: "2026-04-29",
  },
  {
    slug: "jeonse-monthly-converter",
    title: "전월세 환산 계산기",
    description:
      "전월세 전환율로 보증금과 월세를 양방향 환산합니다.",
    category: "realestate",
    keywords: ["전월세 환산", "전월세 전환율", "보증금 월세"],
    publishedAt: "2026-04-29",
    updatedAt: "2026-04-29",
  },
];

/**
 * 출시 예정 도구. 카탈로그에 "준비 중"으로 노출되어 사이트 풍부도를 보존하고,
 * 사용자에게 향후 라인업을 알림. sitemap·구조화 데이터에는 포함되지 않음.
 * 도구가 정식 출시되면 이 배열에서 제거하고 `tools`에 등록.
 */
export interface PlannedTool {
  /** 예상 슬러그 (확정 전이라도 미리 정해두면 카드 hover 시 안내 가능) */
  slug: string;
  title: string;
  description: string;
  category: CategoryId;
}

export const plannedTools: PlannedTool[] = [];

export function getToolsByCategory(category: CategoryId): Tool[] {
  return tools.filter((tool) => tool.category === category);
}

export function getPlannedByCategory(category: CategoryId): PlannedTool[] {
  return plannedTools.filter((tool) => tool.category === category);
}

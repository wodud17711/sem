/**
 * 한국 4대보험·소득세 요율 (2026년 4월 기준).
 *
 * 출처:
 * - 4대 사회보험 정보연계센터 (https://www.4insure.or.kr)
 * - 국세청 (https://www.nts.go.kr) — 소득세법 누진세율
 * - 국세청 홈택스 근로소득 간이세액표 (https://www.hometax.go.kr)
 *
 * 매년 7월 보수월액 한도 변동 / 매년 1월 일부 요율 변동.
 * 갱신 시 RATE_BASIS 문자열도 함께 수정할 것.
 */

export const RATE_BASIS = "2026년 4월 기준";

/** 근로자 부담 4대보험 요율 (보수월액 또는 총급여 대비) */
export const INSURANCE_RATES_WORKER = {
  /** 국민연금: 보수월액 × 4.5% */
  nationalPension: 0.045,
  /** 건강보험: 보수월액 × 3.545% */
  health: 0.03545,
  /** 장기요양보험: 건강보험료 × 12.95% */
  longTermCareOfHealth: 0.1295,
  /** 고용보험(실업급여): 총급여 × 0.9% */
  employment: 0.009,
} as const;

/**
 * 사업주 부담 4대보험 요율.
 * 고용보험·산재보험은 회사 규모와 업종에 따라 변동 폭이 크므로 평균값 사용.
 */
export const INSURANCE_RATES_EMPLOYER = {
  nationalPension: 0.045,
  health: 0.03545,
  longTermCareOfHealth: 0.1295,
  /** 고용보험 사업주: 실업급여 0.9% + 고용안정·직업능력개발 (회사 규모별) */
  employmentByCompanySize: {
    /** 150인 미만 (우선지원 대상기업) */
    "under-150": 0.009 + 0.0025,
    /** 150-999인 */
    "150-999": 0.009 + 0.0065,
    /** 1,000인 이상 */
    "1000-plus": 0.009 + 0.0085,
  },
  /** 산재보험 (사업주 100% 부담). 업종별 차이 크지만 전체 평균치 사용 */
  industrialAccidentAverage: 0.0146,
} as const;

/** 국민연금 보수월액 상·하한 (2025-07-01 ~ 2026-06-30 적용 추정치) */
export const NATIONAL_PENSION_BASE = {
  upper: 6_170_000,
  lower: 390_000,
} as const;

/** 비과세 식대 한도 (2024-01-01 이후 월 한도) */
export const MEAL_ALLOWANCE_MONTHLY_LIMIT = 200_000;

/** 인적공제 (1인당, 연간) */
export const PERSONAL_DEDUCTION_PER_HEAD = 1_500_000;

/** 지방소득세: 산출된 소득세의 10% */
export const LOCAL_INCOME_TAX_RATE = 0.1;

/**
 * 구직급여(실업급여) 기준 (2026년).
 * - 지급률: 평균임금(급여기초일액)의 60%
 * - 상한액: 1일 68,100원
 * - 하한액: 1일 66,048원 (= 최저시급 10,320원 × 80% × 8시간)
 *
 * 상·하한액은 매년 변동하므로 갱신 시 함께 수정할 것.
 */
export const UNEMPLOYMENT = {
  rate: 0.6,
  dailyUpper: 68_100,
  dailyLower: 66_048,
} as const;

/**
 * 종합소득세(근로소득) 누진세율 — 과세표준 기준.
 * 각 구간: 과세표준이 `upTo` 이하일 때 적용.
 * 산식: 산출세액 = baseTax + (과세표준 - threshold) × rate
 */
export const INCOME_TAX_BRACKETS: ReadonlyArray<{
  upTo: number;
  rate: number;
  baseTax: number;
  threshold: number;
}> = [
  { upTo: 14_000_000, rate: 0.06, baseTax: 0, threshold: 0 },
  { upTo: 50_000_000, rate: 0.15, baseTax: 840_000, threshold: 14_000_000 },
  { upTo: 88_000_000, rate: 0.24, baseTax: 6_240_000, threshold: 50_000_000 },
  { upTo: 150_000_000, rate: 0.35, baseTax: 15_360_000, threshold: 88_000_000 },
  { upTo: 300_000_000, rate: 0.38, baseTax: 37_060_000, threshold: 150_000_000 },
  { upTo: 500_000_000, rate: 0.4, baseTax: 94_060_000, threshold: 300_000_000 },
  {
    upTo: 1_000_000_000,
    rate: 0.42,
    baseTax: 174_060_000,
    threshold: 500_000_000,
  },
  {
    upTo: Number.POSITIVE_INFINITY,
    rate: 0.45,
    baseTax: 384_060_000,
    threshold: 1_000_000_000,
  },
];

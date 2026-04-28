import {
  INCOME_TAX_BRACKETS,
  INSURANCE_RATES_WORKER,
  LOCAL_INCOME_TAX_RATE,
  MEAL_ALLOWANCE_MONTHLY_LIMIT,
  NATIONAL_PENSION_BASE,
  PERSONAL_DEDUCTION_PER_HEAD,
  RATE_BASIS,
} from "./rates-2026";

export interface SalaryInput {
  /** 연봉 (원). 비과세 포함된 명목 연봉 */
  annualSalary: number;
  /** 부양가족 수 (본인 포함). 1 이상 */
  dependents: number;
  /** 비과세 식대 월 20만원 적용 여부 */
  applyMealAllowance: boolean;
}

export interface InsuranceBreakdown {
  nationalPension: number;
  health: number;
  longTermCare: number;
  employment: number;
  total: number;
}

export interface SalaryResult {
  /** 월 명목 급여 (= 연봉 / 12) */
  monthlyGross: number;
  /** 월 비과세 식대 적용액 */
  monthlyNonTaxable: number;
  /** 월 4대보험 (근로자 부담) */
  insurance: InsuranceBreakdown;
  /** 월 소득세 */
  incomeTax: number;
  /** 월 지방소득세 */
  localIncomeTax: number;
  /** 월 총 공제액 */
  totalDeduction: number;
  /** 월 실수령액 */
  netMonthly: number;
  /** 연 실수령액 */
  netAnnual: number;
  /** 사용된 요율 기준일 */
  rateBasis: string;
}

const round = (n: number) => Math.round(n);

/**
 * 근로소득공제 — 소득세법 §47.
 * 총급여 구간별 점진 차감, 한도 2,000만원.
 */
export function calcEarnedIncomeDeduction(grossIncome: number): number {
  if (grossIncome <= 5_000_000) return grossIncome * 0.7;
  if (grossIncome <= 15_000_000)
    return 3_500_000 + (grossIncome - 5_000_000) * 0.4;
  if (grossIncome <= 45_000_000)
    return 7_500_000 + (grossIncome - 15_000_000) * 0.15;
  if (grossIncome <= 100_000_000)
    return 12_000_000 + (grossIncome - 45_000_000) * 0.05;
  const calc = 14_750_000 + (grossIncome - 100_000_000) * 0.02;
  return Math.min(calc, 20_000_000);
}

/** 누진세율 적용으로 산출세액 계산 */
export function calcProgressiveTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  for (const bracket of INCOME_TAX_BRACKETS) {
    if (taxableIncome <= bracket.upTo) {
      return (
        bracket.baseTax + (taxableIncome - bracket.threshold) * bracket.rate
      );
    }
  }
  return 0;
}

/**
 * 근로소득세액공제 — 소득세법 §59.
 * 산출세액 130만원 기준 차등 + 총급여 기준 한도.
 */
export function calcEarnedIncomeTaxCredit(
  calculatedTax: number,
  grossIncome: number,
): number {
  const credit =
    calculatedTax <= 1_300_000
      ? calculatedTax * 0.55
      : 715_000 + (calculatedTax - 1_300_000) * 0.3;

  let limit: number;
  if (grossIncome <= 33_000_000) {
    limit = 740_000;
  } else if (grossIncome <= 70_000_000) {
    limit = Math.max(660_000, 740_000 - (grossIncome - 33_000_000) * 0.008);
  } else if (grossIncome <= 120_000_000) {
    limit = Math.max(500_000, 660_000 - (grossIncome - 70_000_000) * 0.5);
  } else {
    limit = Math.max(200_000, 500_000 - (grossIncome - 120_000_000) * 0.5);
  }

  return Math.min(credit, limit);
}

/** 4대보험 근로자 부담분 (월) */
export function calcInsurance(
  monthlyTaxableSalary: number,
  monthlyTotalGross: number,
): InsuranceBreakdown {
  const pensionBase = Math.max(
    NATIONAL_PENSION_BASE.lower,
    Math.min(monthlyTaxableSalary, NATIONAL_PENSION_BASE.upper),
  );
  const nationalPension = round(
    pensionBase * INSURANCE_RATES_WORKER.nationalPension,
  );
  const health = round(monthlyTaxableSalary * INSURANCE_RATES_WORKER.health);
  const longTermCare = round(
    health * INSURANCE_RATES_WORKER.longTermCareOfHealth,
  );
  // 고용보험은 비과세 포함한 총급여 기준
  const employment = round(
    monthlyTotalGross * INSURANCE_RATES_WORKER.employment,
  );
  const total = nationalPension + health + longTermCare + employment;
  return { nationalPension, health, longTermCare, employment, total };
}

/**
 * 연봉 → 월 실수령액 계산.
 * 단순 가정: 자녀세액공제·신용카드·의료비·주택자금 등 추가 공제는 미반영.
 * 실제 결정세액은 연말정산 결과에 따라 달라질 수 있음.
 */
export function calcSalary(input: SalaryInput): SalaryResult {
  const { annualSalary, dependents, applyMealAllowance } = input;

  if (annualSalary <= 0) {
    throw new Error("연봉은 0보다 커야 합니다.");
  }
  if (dependents < 1) {
    throw new Error("부양가족 수는 본인 포함 1 이상이어야 합니다.");
  }

  const monthlyGross = annualSalary / 12;
  const monthlyNonTaxable = applyMealAllowance
    ? MEAL_ALLOWANCE_MONTHLY_LIMIT
    : 0;
  const annualNonTaxable = monthlyNonTaxable * 12;

  // 보수월액: 비과세 차감 후 (4대보험 기준)
  const monthlyTaxableSalary = monthlyGross - monthlyNonTaxable;
  const insurance = calcInsurance(monthlyTaxableSalary, monthlyGross);

  // 소득세 계산 (연 단위)
  const grossForTax = annualSalary - annualNonTaxable;
  const earnedIncomeDeduction = calcEarnedIncomeDeduction(grossForTax);
  const earnedIncome = grossForTax - earnedIncomeDeduction;
  const annualPersonalDeduction = PERSONAL_DEDUCTION_PER_HEAD * dependents;
  const annualInsuranceDeduction = insurance.total * 12;
  const taxableIncome = Math.max(
    0,
    earnedIncome - annualPersonalDeduction - annualInsuranceDeduction,
  );

  const calculatedTax = calcProgressiveTax(taxableIncome);
  const taxCredit = calcEarnedIncomeTaxCredit(calculatedTax, grossForTax);
  const determinedAnnualTax = Math.max(0, calculatedTax - taxCredit);

  const incomeTax = round(determinedAnnualTax / 12);
  const localIncomeTax = round(incomeTax * LOCAL_INCOME_TAX_RATE);

  const totalDeduction = insurance.total + incomeTax + localIncomeTax;
  const netMonthly = round(monthlyGross - totalDeduction);
  const netAnnual = netMonthly * 12;

  return {
    monthlyGross: round(monthlyGross),
    monthlyNonTaxable,
    insurance,
    incomeTax,
    localIncomeTax,
    totalDeduction,
    netMonthly,
    netAnnual,
    rateBasis: RATE_BASIS,
  };
}

import {
  INSURANCE_RATES_EMPLOYER,
  INSURANCE_RATES_WORKER,
  MEAL_ALLOWANCE_MONTHLY_LIMIT,
  NATIONAL_PENSION_BASE,
  RATE_BASIS,
} from "./rates-2026";

export type CompanySize = "under-150" | "150-999" | "1000-plus";

export interface FourInsuranceInput {
  /** 월 명목급여 (원) */
  monthlyGross: number;
  /** 비과세 식대 월 20만원 적용 여부 */
  applyMealAllowance: boolean;
  /** 회사 규모 (사업주 고용보험 요율 결정) */
  companySize: CompanySize;
}

export interface FourInsuranceShare {
  nationalPension: number;
  health: number;
  longTermCare: number;
  employment: number;
  /** 산재보험 (사업주만) */
  industrialAccident?: number;
  total: number;
}

export interface FourInsuranceResult {
  worker: FourInsuranceShare;
  employer: FourInsuranceShare;
  combined: number;
  rateBasis: string;
}

const round = (n: number) => Math.round(n);

export function calcFourInsurance(input: FourInsuranceInput): FourInsuranceResult {
  const { monthlyGross, applyMealAllowance, companySize } = input;

  if (monthlyGross <= 0) {
    throw new Error("월 급여는 0보다 커야 합니다.");
  }

  const monthlyNonTaxable = applyMealAllowance ? MEAL_ALLOWANCE_MONTHLY_LIMIT : 0;
  const taxable = monthlyGross - monthlyNonTaxable;
  const pensionBase = Math.max(
    NATIONAL_PENSION_BASE.lower,
    Math.min(taxable, NATIONAL_PENSION_BASE.upper),
  );

  // 근로자
  const wPension = round(pensionBase * INSURANCE_RATES_WORKER.nationalPension);
  const wHealth = round(taxable * INSURANCE_RATES_WORKER.health);
  const wLongTerm = round(wHealth * INSURANCE_RATES_WORKER.longTermCareOfHealth);
  const wEmployment = round(monthlyGross * INSURANCE_RATES_WORKER.employment);
  const worker: FourInsuranceShare = {
    nationalPension: wPension,
    health: wHealth,
    longTermCare: wLongTerm,
    employment: wEmployment,
    total: wPension + wHealth + wLongTerm + wEmployment,
  };

  // 사업주
  const ePension = round(pensionBase * INSURANCE_RATES_EMPLOYER.nationalPension);
  const eHealth = round(taxable * INSURANCE_RATES_EMPLOYER.health);
  const eLongTerm = round(eHealth * INSURANCE_RATES_EMPLOYER.longTermCareOfHealth);
  const eEmpRate =
    INSURANCE_RATES_EMPLOYER.employmentByCompanySize[companySize];
  const eEmployment = round(monthlyGross * eEmpRate);
  const eIndustrial = round(
    monthlyGross * INSURANCE_RATES_EMPLOYER.industrialAccidentAverage,
  );
  const employer: FourInsuranceShare = {
    nationalPension: ePension,
    health: eHealth,
    longTermCare: eLongTerm,
    employment: eEmployment,
    industrialAccident: eIndustrial,
    total: ePension + eHealth + eLongTerm + eEmployment + eIndustrial,
  };

  return {
    worker,
    employer,
    combined: worker.total + employer.total,
    rateBasis: RATE_BASIS,
  };
}

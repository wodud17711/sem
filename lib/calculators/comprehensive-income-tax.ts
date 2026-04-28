/**
 * 종합소득세 간이 계산.
 * 근거: 소득세법 §55 (세율), §59의2 (표준세액공제 등).
 *
 * 간이 모델 가정:
 * - 사용자가 이미 종합소득금액(각 소득금액의 합)을 입력
 * - 인적공제만 적용 (1인 150만원)
 * - 표준세액공제 13만원 (대부분 일반 납세자에게 적용)
 * - 신용카드, 의료비, 교육비, 기부금 등 다른 공제는 미반영
 *
 * 더 정확한 계산은 국세청 홈택스 종합소득세 모의계산을 사용해야 합니다.
 */

import {
  INCOME_TAX_BRACKETS,
  LOCAL_INCOME_TAX_RATE,
  PERSONAL_DEDUCTION_PER_HEAD,
  RATE_BASIS,
} from "./rates-2026";
import { calcProgressiveTax } from "./salary";

/** 표준세액공제 (소득세법 §59의2) */
export const STANDARD_TAX_CREDIT = 130_000;

export interface ComprehensiveIncomeTaxInput {
  /** 종합소득금액 (원). 각 소득에 대한 필요경비/공제 차감 후 합계 */
  comprehensiveIncome: number;
  /** 부양가족 수 (본인 포함, 1 이상) */
  dependents: number;
}

export interface ComprehensiveIncomeTaxResult {
  taxableIncome: number;
  calculatedTax: number;
  taxCredit: number;
  determinedTax: number;
  localIncomeTax: number;
  totalTax: number;
  effectiveRate: number;
  rateBasis: string;
}

const round = (n: number) => Math.round(n);

export function calcComprehensiveIncomeTax(
  input: ComprehensiveIncomeTaxInput,
): ComprehensiveIncomeTaxResult {
  const { comprehensiveIncome, dependents } = input;
  if (comprehensiveIncome < 0) {
    throw new Error("종합소득금액은 0 이상이어야 합니다.");
  }
  if (dependents < 1) {
    throw new Error("부양가족 수는 본인 포함 1 이상이어야 합니다.");
  }

  const personalDeduction = PERSONAL_DEDUCTION_PER_HEAD * dependents;
  const taxableIncome = Math.max(0, comprehensiveIncome - personalDeduction);
  const calculatedTax = round(calcProgressiveTax(taxableIncome));
  const taxCredit = STANDARD_TAX_CREDIT;
  const determinedTax = Math.max(0, calculatedTax - taxCredit);
  const localIncomeTax = round(determinedTax * LOCAL_INCOME_TAX_RATE);
  const totalTax = determinedTax + localIncomeTax;
  const effectiveRate = comprehensiveIncome > 0 ? totalTax / comprehensiveIncome : 0;

  return {
    taxableIncome,
    calculatedTax,
    taxCredit,
    determinedTax,
    localIncomeTax,
    totalTax,
    effectiveRate,
    rateBasis: RATE_BASIS,
  };
}

/** 누진세 구간 정보 (UI에서 활용) */
export function getBrackets() {
  return INCOME_TAX_BRACKETS;
}

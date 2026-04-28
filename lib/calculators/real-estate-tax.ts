/**
 * 부동산 양도세 간이 계산.
 * 근거: 소득세법 §55 누진세율, §95 장기보유특별공제, §103 기본공제.
 *
 * 간이 모델 가정:
 * - 1세대 1주택 비과세: 양도가 12억 이하 + 2년 이상 보유 시 전액 비과세
 * - 그 외: 일반 누진세율 적용 (다주택 중과세는 별도 옵션 필요, 미반영)
 * - 장기보유특별공제: 일반 부동산 1년당 2%, 최대 30% (15년 이상)
 *   1세대 1주택의 더 큰 공제(보유+거주)는 미반영
 * - 기본공제 연 250만원
 *
 * 정확한 양도세는 다주택 중과, 조정대상지역, 1세대 1주택 12억 초과분
 * 처리 등이 복잡하므로 본 계산기는 참고용입니다.
 */

import { calcProgressiveTax } from "./salary";

const BASIC_DEDUCTION = 2_500_000;
const ONE_HOUSE_EXEMPTION_LIMIT = 1_200_000_000; // 12억
const ONE_HOUSE_HOLDING_MIN_YEARS = 2;

export interface RealEstateTaxInput {
  /** 취득가 (원) */
  acquisitionPrice: number;
  /** 양도가 (원) */
  salePrice: number;
  /** 필요경비 (취득세, 중개수수료 등). 0 가능 */
  expenses: number;
  /** 보유기간 (년, 소수 가능) */
  holdingYears: number;
  /** 1세대 1주택 여부 */
  isOneHouseOneFamily: boolean;
}

export interface RealEstateTaxResult {
  /** 양도차익 */
  capitalGain: number;
  /** 비과세 여부 */
  isExempt: boolean;
  /** 비과세 사유 (있을 때) */
  exemptReason?: string;
  /** 장기보유특별공제 (원) */
  longTermDeduction: number;
  /** 양도소득금액 */
  taxableGain: number;
  /** 기본공제 적용 후 과세표준 */
  taxableBase: number;
  /** 산출세액 (소득세) */
  calculatedTax: number;
  /** 지방소득세 */
  localTax: number;
  /** 총 납부세액 */
  totalTax: number;
}

const round = (n: number) => Math.round(n);

export function calcRealEstateTax(
  input: RealEstateTaxInput,
): RealEstateTaxResult {
  const {
    acquisitionPrice,
    salePrice,
    expenses,
    holdingYears,
    isOneHouseOneFamily,
  } = input;
  if (acquisitionPrice <= 0 || salePrice <= 0) {
    throw new Error("취득가와 양도가는 0보다 커야 합니다.");
  }
  if (holdingYears < 0) {
    throw new Error("보유기간은 0 이상이어야 합니다.");
  }

  const capitalGain = Math.max(0, salePrice - acquisitionPrice - expenses);

  // 1세대 1주택 비과세
  if (
    isOneHouseOneFamily &&
    salePrice <= ONE_HOUSE_EXEMPTION_LIMIT &&
    holdingYears >= ONE_HOUSE_HOLDING_MIN_YEARS
  ) {
    return {
      capitalGain,
      isExempt: true,
      exemptReason: "1세대 1주택 비과세 (12억 이하, 2년 이상 보유)",
      longTermDeduction: 0,
      taxableGain: 0,
      taxableBase: 0,
      calculatedTax: 0,
      localTax: 0,
      totalTax: 0,
    };
  }

  // 장기보유특별공제: 1년당 2%, 최대 30%
  const ltrate = Math.min(0.3, Math.floor(holdingYears) * 0.02);
  const longTermDeduction = round(capitalGain * ltrate);
  const taxableGain = Math.max(0, capitalGain - longTermDeduction);
  const taxableBase = Math.max(0, taxableGain - BASIC_DEDUCTION);
  const calculatedTax = round(calcProgressiveTax(taxableBase));
  const localTax = round(calculatedTax * 0.1);
  const totalTax = calculatedTax + localTax;

  return {
    capitalGain,
    isExempt: false,
    longTermDeduction,
    taxableGain,
    taxableBase,
    calculatedTax,
    localTax,
    totalTax,
  };
}

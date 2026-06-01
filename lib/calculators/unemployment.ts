/**
 * 실업급여(구직급여) 간이 계산.
 *
 * 산식:
 *   1일 평균임금(급여기초일액) ≈ 월 평균임금 ÷ 30   (간이 근사)
 *   1일 구직급여일액 = 평균임금일액 × 60%, 단 상·하한액 적용
 *   총 예상 수급액 = 구직급여일액 × 소정급여일수
 *
 * 소정급여일수는 이직일 기준 연령(50세)과 고용보험 가입기간에 따라 결정된다.
 *
 * 제외(간이 계산기 한계): 평균임금 정밀 산정(실제 일수·상여),
 * 반복수급 감액, 조기재취업수당, 수급 요건 판단.
 */

import { UNEMPLOYMENT } from "./rates-2026";

export interface UnemploymentInput {
  /** 월 평균임금 (퇴사 전 3개월 평균, 세전, 원) */
  monthlyWage: number;
  /** 이직일 기준 만 나이 */
  age: number;
  /** 고용보험 가입기간 (년) */
  insuredYears: number;
}

export interface UnemploymentResult {
  /** 1일 평균임금 (급여기초일액) */
  dailyAverageWage: number;
  /** 1일 구직급여일액 (상·하한 적용 후) */
  dailyBenefit: number;
  /** 상한액에 걸렸는지 */
  cappedAtUpper: boolean;
  /** 하한액으로 보정됐는지 */
  cappedAtLower: boolean;
  /** 소정급여일수 */
  benefitDays: number;
  /** 총 예상 수급액 */
  totalBenefit: number;
}

const round = (n: number) => Math.round(n);

/**
 * 소정급여일수 표 (2019.10.1~ 적용).
 * 연령은 이직일 기준, 가입기간은 피보험단위기간 기준.
 */
export function getBenefitDays(age: number, insuredYears: number): number {
  const senior = age >= 50; // 50세 이상 또는 장애인
  if (insuredYears < 1) return 120;
  if (insuredYears < 3) return senior ? 180 : 150;
  if (insuredYears < 5) return senior ? 210 : 180;
  if (insuredYears < 10) return senior ? 240 : 210;
  return senior ? 270 : 240;
}

export function calcUnemployment(
  input: UnemploymentInput,
): UnemploymentResult {
  const { monthlyWage, age, insuredYears } = input;
  if (monthlyWage < 0 || age < 0 || insuredYears < 0) {
    throw new Error("입력값은 0 이상이어야 합니다.");
  }

  const dailyAverageWage = round(monthlyWage / 30);
  const raw = round(dailyAverageWage * UNEMPLOYMENT.rate);

  let dailyBenefit = raw;
  let cappedAtUpper = false;
  let cappedAtLower = false;
  if (raw > UNEMPLOYMENT.dailyUpper) {
    dailyBenefit = UNEMPLOYMENT.dailyUpper;
    cappedAtUpper = true;
  } else if (raw < UNEMPLOYMENT.dailyLower) {
    dailyBenefit = UNEMPLOYMENT.dailyLower;
    cappedAtLower = true;
  }

  const benefitDays = getBenefitDays(age, insuredYears);

  return {
    dailyAverageWage,
    dailyBenefit,
    cappedAtUpper,
    cappedAtLower,
    benefitDays,
    totalBenefit: dailyBenefit * benefitDays,
  };
}

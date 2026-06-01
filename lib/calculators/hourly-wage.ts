/**
 * 시급·주휴수당 계산.
 *
 * 주휴수당(근로기준법 제55조): 1주 소정근로시간이 15시간 이상이고
 * 그 주의 소정근로일을 개근하면, 유급 주휴일에 대한 수당을 지급한다.
 *
 * 산식:
 *   주휴시간   = min(1주 소정근로시간, 40) ÷ 40 × 8
 *   주휴수당   = 주휴시간 × 시급
 *   주급       = (소정근로시간 + 주휴시간) × 시급
 *   월 환산시간 = round((소정근로시간 + 주휴시간) × (365 ÷ 12 ÷ 7))
 *               → 주 40시간 근로자는 약 209시간
 *   월급       = 월 환산시간 × 시급
 *
 * 연장·야간·휴일근로 가산수당은 포함하지 않는다(소정근로 기준).
 */

/** 주휴수당 발생 최소 주당 소정근로시간 */
export const WEEKLY_HOLIDAY_MIN_HOURS = 15;

/** 주휴시간 산정 기준이 되는 법정 1주 근로시간 */
const FULL_TIME_WEEKLY_HOURS = 40;

/** 월 환산용 주당 평균 주수 (365 ÷ 12 ÷ 7) */
const WEEKS_PER_MONTH = 365 / 12 / 7;

export interface HourlyWageInput {
  /** 시급 (원) */
  hourlyWage: number;
  /** 1주 소정근로시간 */
  weeklyHours: number;
}

export interface HourlyWageResult {
  /** 주휴수당 대상 여부 (주 15시간 이상) */
  eligible: boolean;
  /** 주휴시간 */
  weeklyHolidayHours: number;
  /** 주휴수당 (원, 주 단위) */
  weeklyHolidayPay: number;
  /** 주급 = 소정근로 임금 + 주휴수당 (원) */
  weeklyPay: number;
  /** 월 환산 근로시간 (주휴 포함) */
  monthlyHours: number;
  /** 월급 환산 (원) */
  monthlyPay: number;
}

const round = (n: number) => Math.round(n);

export function calcHourlyWage(input: HourlyWageInput): HourlyWageResult {
  const { hourlyWage, weeklyHours } = input;
  if (hourlyWage < 0 || weeklyHours < 0) {
    throw new Error("시급과 근로시간은 0 이상이어야 합니다.");
  }

  const eligible = weeklyHours >= WEEKLY_HOLIDAY_MIN_HOURS;
  const weeklyHolidayHours = eligible
    ? (Math.min(weeklyHours, FULL_TIME_WEEKLY_HOURS) / FULL_TIME_WEEKLY_HOURS) * 8
    : 0;

  const weeklyHolidayPay = round(weeklyHolidayHours * hourlyWage);
  const weeklyPay = round(weeklyHours * hourlyWage) + weeklyHolidayPay;

  const monthlyHours = round((weeklyHours + weeklyHolidayHours) * WEEKS_PER_MONTH);
  const monthlyPay = round(monthlyHours * hourlyWage);

  return {
    eligible,
    weeklyHolidayHours,
    weeklyHolidayPay,
    weeklyPay,
    monthlyHours,
    monthlyPay,
  };
}

/**
 * 연차수당 계산.
 * 근거: 근로기준법 제60조(연차 유급휴가), 통상임금 산정 방식 (대법원 판례).
 *
 * 표준 산식 (월급제 기준 209시간제):
 *   시간당 통상임금 = 월 통상임금 ÷ 209
 *   1일 통상임금 = 시간당 통상임금 × 8
 *   연차수당 = 1일 통상임금 × 미사용 연차 일수
 *
 * 209시간 = 주 40시간 × (365 ÷ 12 ÷ 7) + 주휴 8시간 × (365 ÷ 12 ÷ 7) ≈ 209
 */

export const STANDARD_MONTHLY_HOURS = 209;

export interface AnnualLeaveInput {
  /** 월 통상임금 (원). 기본급 + 정기적·일률적 수당 */
  monthlyOrdinaryWage: number;
  /** 미사용 연차 일수 */
  unusedDays: number;
}

export interface AnnualLeaveResult {
  hourlyWage: number;
  dailyWage: number;
  totalPay: number;
}

const round = (n: number) => Math.round(n);

export function calcAnnualLeavePay(
  input: AnnualLeaveInput,
): AnnualLeaveResult {
  const { monthlyOrdinaryWage, unusedDays } = input;
  if (monthlyOrdinaryWage <= 0) {
    throw new Error("월 통상임금은 0보다 커야 합니다.");
  }
  if (unusedDays < 0) {
    throw new Error("미사용 연차는 0 이상이어야 합니다.");
  }
  const hourlyWage = round(monthlyOrdinaryWage / STANDARD_MONTHLY_HOURS);
  const dailyWage = round(hourlyWage * 8);
  const totalPay = round(dailyWage * unusedDays);
  return { hourlyWage, dailyWage, totalPay };
}

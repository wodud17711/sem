/**
 * 법정 퇴직금 계산.
 * 근거: 근로자퇴직급여 보장법 제8조, 근로기준법 제2조·제19조 (평균임금).
 *
 * 법정 공식:
 *   퇴직금 = 1일 평균임금 × 30 × (재직일수 / 365)
 *   1일 평균임금 = 산정사유 발생일 이전 3개월 임금총액 / 그 기간 일수
 *
 * 본 계산기는 사용자가 최근 3개월 월 평균 급여를 입력하면
 * 1일 평균임금 ≈ 월 평균 급여 × 3 / 90 (= 월 평균 급여 / 30)으로 근사한다.
 * 1년 미만 재직 시 법정 퇴직금이 발생하지 않는다.
 */

export interface SeveranceInput {
  /** 입사일 (YYYY-MM-DD) */
  hireDate: string;
  /** 퇴사일 (YYYY-MM-DD) */
  leaveDate: string;
  /** 최근 3개월 월 평균 급여 (원). 상여금·연차수당 안분분 포함 */
  monthlyAverageWage: number;
}

export interface SeveranceResult {
  /** 재직일수 */
  daysWorked: number;
  /** 재직 연수 (소수점 포함) */
  yearsWorked: number;
  /** 1일 평균임금 (원, 반올림) */
  dailyAverageWage: number;
  /** 법정 퇴직금 (세전, 원, 반올림) */
  severancePay: number;
  /** 1년 미만으로 법정 퇴직금이 0인지 여부 */
  belowOneYear: boolean;
}

const round = (n: number) => Math.round(n);
const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function calcSeverance(input: SeveranceInput): SeveranceResult {
  const { hireDate, leaveDate, monthlyAverageWage } = input;

  const hire = new Date(hireDate);
  const leave = new Date(leaveDate);
  if (Number.isNaN(hire.getTime()) || Number.isNaN(leave.getTime())) {
    throw new Error("올바른 날짜 형식(YYYY-MM-DD)을 입력하세요.");
  }
  if (leave < hire) {
    throw new Error("퇴사일은 입사일 이후여야 합니다.");
  }
  if (monthlyAverageWage <= 0) {
    throw new Error("월 평균 급여는 0보다 커야 합니다.");
  }

  const daysWorked = Math.floor((leave.getTime() - hire.getTime()) / MS_PER_DAY);
  const yearsWorked = daysWorked / 365;
  const dailyAverageWage = round(monthlyAverageWage / 30);

  const belowOneYear = daysWorked < 365;
  const severancePay = belowOneYear
    ? 0
    : round(dailyAverageWage * 30 * (daysWorked / 365));

  return {
    daysWorked,
    yearsWorked,
    dailyAverageWage,
    severancePay,
    belowOneYear,
  };
}

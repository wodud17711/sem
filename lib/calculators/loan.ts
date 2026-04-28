/**
 * 대출 상환 계산.
 *
 * 원리금균등 (annuity, equal total payment):
 *   PMT = P × r(1+r)^n / ((1+r)^n - 1)
 *   매월 같은 금액을 납입. 초기엔 이자 비중 큼.
 *
 * 원금균등 (equal principal payment):
 *   매월 원금 = P / n
 *   이자 = 잔액 × 월이율
 *   매월 납입액이 점차 감소.
 */

export interface LoanInput {
  /** 대출 원금 (원) */
  principal: number;
  /** 연 이자율 (%) — 예: 5 */
  annualRatePercent: number;
  /** 상환 기간 (개월) */
  months: number;
}

export interface LoanResult {
  /** 원리금균등 — 매월 납입액 (고정) */
  equalPayment: {
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  };
  /** 원금균등 — 첫 달·마지막 달·총 이자 */
  equalPrincipal: {
    firstMonthPayment: number;
    lastMonthPayment: number;
    totalPayment: number;
    totalInterest: number;
  };
}

const round = (n: number) => Math.round(n);

export function calcLoan(input: LoanInput): LoanResult {
  const { principal, annualRatePercent, months } = input;
  if (principal <= 0) throw new Error("대출 원금은 0보다 커야 합니다.");
  if (annualRatePercent < 0)
    throw new Error("이자율은 0 이상이어야 합니다.");
  if (months <= 0) throw new Error("상환 기간은 1개월 이상이어야 합니다.");

  const r = annualRatePercent / 100 / 12;

  // 원리금균등
  let pmt: number;
  if (r === 0) {
    pmt = principal / months;
  } else {
    pmt = (principal * (r * Math.pow(1 + r, months))) / (Math.pow(1 + r, months) - 1);
  }
  const equalPaymentTotal = pmt * months;
  const equalPaymentInterest = equalPaymentTotal - principal;

  // 원금균등
  const monthlyPrincipal = principal / months;
  const firstMonthInterest = principal * r;
  const lastMonthInterest = monthlyPrincipal * r; // 잔액 = 마지막 달엔 약 한 회차 원금
  const firstPayment = monthlyPrincipal + firstMonthInterest;
  const lastPayment = monthlyPrincipal + lastMonthInterest;
  // 총 이자 = (n × (n+1) / 2 × 월원금 × r) — 산술수열 합
  const totalInterestEqualPrincipal =
    monthlyPrincipal * r * ((months * (months + 1)) / 2);
  const totalPaymentEqualPrincipal = principal + totalInterestEqualPrincipal;

  return {
    equalPayment: {
      monthlyPayment: round(pmt),
      totalPayment: round(equalPaymentTotal),
      totalInterest: round(equalPaymentInterest),
    },
    equalPrincipal: {
      firstMonthPayment: round(firstPayment),
      lastMonthPayment: round(lastPayment),
      totalPayment: round(totalPaymentEqualPrincipal),
      totalInterest: round(totalInterestEqualPrincipal),
    },
  };
}

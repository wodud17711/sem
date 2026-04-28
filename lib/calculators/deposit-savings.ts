/**
 * 적금/예금 만기 수령액 계산.
 *
 * 정기적금 단리:
 *   원금 = PMT × n
 *   이자 = PMT × r × (n × (n+1) / 2) / 12
 *   (n: 개월수, r: 연이자율, PMT: 월 납입액)
 *
 * 정기예금 단리:
 *   이자 = P × r × t (t: 년)
 *
 * 이자소득세: 15.4% (소득세 14% + 지방소득세 1.4%) 원천징수.
 */

const INTEREST_TAX_RATE = 0.154;

export type DepositType = "savings" | "deposit";

export interface DepositInput {
  type: DepositType;
  /** 적금: 월 납입액, 예금: 일시 예치액 (원) */
  amount: number;
  /** 연 이자율 (%) */
  annualRatePercent: number;
  /** 기간 (개월) */
  months: number;
}

export interface DepositResult {
  principal: number;
  preTaxInterest: number;
  tax: number;
  postTaxInterest: number;
  preTaxTotal: number;
  postTaxTotal: number;
}

const round = (n: number) => Math.round(n);

export function calcDeposit(input: DepositInput): DepositResult {
  const { type, amount, annualRatePercent, months } = input;
  if (amount <= 0) throw new Error("금액은 0보다 커야 합니다.");
  if (annualRatePercent < 0)
    throw new Error("이자율은 0 이상이어야 합니다.");
  if (months <= 0) throw new Error("기간은 1개월 이상이어야 합니다.");

  const r = annualRatePercent / 100;

  let principal: number;
  let preTaxInterest: number;
  if (type === "savings") {
    principal = amount * months;
    preTaxInterest = (amount * r * (months * (months + 1))) / 2 / 12;
  } else {
    principal = amount;
    preTaxInterest = amount * r * (months / 12);
  }

  const tax = preTaxInterest * INTEREST_TAX_RATE;
  const postTaxInterest = preTaxInterest - tax;

  return {
    principal: round(principal),
    preTaxInterest: round(preTaxInterest),
    tax: round(tax),
    postTaxInterest: round(postTaxInterest),
    preTaxTotal: round(principal + preTaxInterest),
    postTaxTotal: round(principal + postTaxInterest),
  };
}

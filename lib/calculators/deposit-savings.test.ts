import { describe, expect, it } from "vitest";
import { calcDeposit } from "./deposit-savings";

describe("calcDeposit", () => {
  it("월 30만원 적금, 연 4%, 12개월", () => {
    const r = calcDeposit({
      type: "savings",
      amount: 300_000,
      annualRatePercent: 4,
      months: 12,
    });
    // 원금 = 360만원
    expect(r.principal).toBe(3_600_000);
    // 이자 (단리) = 30만 × 0.04 × 78/12 = 78,000원
    expect(r.preTaxInterest).toBe(78_000);
    expect(r.tax).toBeGreaterThan(0);
    expect(r.postTaxInterest).toBeLessThan(r.preTaxInterest);
  });

  it("1천만원 예금, 연 5%, 12개월", () => {
    const r = calcDeposit({
      type: "deposit",
      amount: 10_000_000,
      annualRatePercent: 5,
      months: 12,
    });
    expect(r.principal).toBe(10_000_000);
    expect(r.preTaxInterest).toBe(500_000);
    expect(r.tax).toBe(77_000); // 500,000 × 15.4%
    expect(r.postTaxInterest).toBe(423_000);
    expect(r.postTaxTotal).toBe(10_423_000);
  });

  it("이자율 0%이면 이자 0", () => {
    const r = calcDeposit({
      type: "deposit",
      amount: 1_000_000,
      annualRatePercent: 0,
      months: 12,
    });
    expect(r.preTaxInterest).toBe(0);
    expect(r.postTaxTotal).toBe(1_000_000);
  });

  it("0 또는 음수 입력 시 에러", () => {
    expect(() =>
      calcDeposit({
        type: "deposit",
        amount: 0,
        annualRatePercent: 5,
        months: 12,
      }),
    ).toThrow();
  });
});

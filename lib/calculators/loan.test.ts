import { describe, expect, it } from "vitest";
import { calcLoan } from "./loan";

describe("calcLoan", () => {
  it("1억 대출, 연 5%, 30년 (360개월)", () => {
    const r = calcLoan({
      principal: 100_000_000,
      annualRatePercent: 5,
      months: 360,
    });
    // 원리금균등 월 납입 ≈ 536,822원
    expect(r.equalPayment.monthlyPayment).toBeGreaterThan(530_000);
    expect(r.equalPayment.monthlyPayment).toBeLessThan(545_000);
    expect(r.equalPayment.totalInterest).toBeGreaterThan(90_000_000);
    // 원금균등 첫 달 ≈ 277,778 + 416,667 = ?
    // 매월 원금 = 100M/360 = 277,778
    // 첫 달 이자 = 100M × 5%/12 = 416,667
    // 첫 달 총 ≈ 694,444
    expect(r.equalPrincipal.firstMonthPayment).toBeGreaterThan(690_000);
    expect(r.equalPrincipal.firstMonthPayment).toBeLessThan(700_000);
    // 총 이자: 원금균등이 원리금균등보다 적음
    expect(r.equalPrincipal.totalInterest).toBeLessThan(
      r.equalPayment.totalInterest,
    );
  });

  it("이자율 0%이면 단순 분할", () => {
    const r = calcLoan({
      principal: 12_000_000,
      annualRatePercent: 0,
      months: 12,
    });
    expect(r.equalPayment.monthlyPayment).toBe(1_000_000);
    expect(r.equalPayment.totalInterest).toBe(0);
  });

  it("0 또는 음수 입력 시 에러", () => {
    expect(() =>
      calcLoan({ principal: 0, annualRatePercent: 5, months: 12 }),
    ).toThrow();
    expect(() =>
      calcLoan({ principal: 100_000_000, annualRatePercent: 5, months: 0 }),
    ).toThrow();
  });
});

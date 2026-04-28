import { describe, expect, it } from "vitest";
import { calcComprehensiveIncomeTax } from "./comprehensive-income-tax";

describe("calcComprehensiveIncomeTax", () => {
  it("종합소득 1,000만원, 본인 1인", () => {
    const r = calcComprehensiveIncomeTax({
      comprehensiveIncome: 10_000_000,
      dependents: 1,
    });
    // 과세표준 = 1000 - 150 = 850만원
    // 산출세액 = 850 × 6% = 51만원
    // 결정세액 = 51 - 13 = 38만원
    expect(r.taxableIncome).toBe(8_500_000);
    expect(r.calculatedTax).toBe(510_000);
    expect(r.determinedTax).toBe(380_000);
    expect(r.localIncomeTax).toBe(38_000);
    expect(r.totalTax).toBe(418_000);
  });

  it("종합소득 5,000만원, 본인 1인", () => {
    const r = calcComprehensiveIncomeTax({
      comprehensiveIncome: 50_000_000,
      dependents: 1,
    });
    // 과세표준 = 4850만원
    // 산출 = 84만 + (4850-1400)×15% = 84 + 517.5 = 601.5만
    expect(r.taxableIncome).toBe(48_500_000);
    expect(r.calculatedTax).toBe(6_015_000);
    expect(r.determinedTax).toBe(5_885_000);
  });

  it("부양가족이 늘면 결정세액 감소", () => {
    const single = calcComprehensiveIncomeTax({
      comprehensiveIncome: 50_000_000,
      dependents: 1,
    });
    const family = calcComprehensiveIncomeTax({
      comprehensiveIncome: 50_000_000,
      dependents: 3,
    });
    expect(family.determinedTax).toBeLessThan(single.determinedTax);
  });

  it("음수 입력 시 에러", () => {
    expect(() =>
      calcComprehensiveIncomeTax({
        comprehensiveIncome: -1000,
        dependents: 1,
      }),
    ).toThrow();
  });

  it("부양가족 0이면 에러", () => {
    expect(() =>
      calcComprehensiveIncomeTax({
        comprehensiveIncome: 30_000_000,
        dependents: 0,
      }),
    ).toThrow();
  });

  it("저소득 (인적공제 > 종합소득): 세금 0", () => {
    const r = calcComprehensiveIncomeTax({
      comprehensiveIncome: 1_000_000,
      dependents: 1,
    });
    expect(r.taxableIncome).toBe(0);
    expect(r.totalTax).toBe(0);
  });
});

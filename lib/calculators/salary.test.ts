import { describe, expect, it } from "vitest";
import {
  calcEarnedIncomeDeduction,
  calcEarnedIncomeTaxCredit,
  calcProgressiveTax,
  calcSalary,
} from "./salary";

describe("calcEarnedIncomeDeduction (근로소득공제)", () => {
  it("총급여 500만원 이하: 70%", () => {
    expect(calcEarnedIncomeDeduction(5_000_000)).toBe(3_500_000);
    expect(calcEarnedIncomeDeduction(3_000_000)).toBe(2_100_000);
  });
  it("500-1500만원: 350만원 + 초과액 40%", () => {
    expect(calcEarnedIncomeDeduction(15_000_000)).toBe(7_500_000);
    expect(calcEarnedIncomeDeduction(10_000_000)).toBe(5_500_000);
  });
  it("1500-4500만원: 750만원 + 초과액 15%", () => {
    expect(calcEarnedIncomeDeduction(45_000_000)).toBe(12_000_000);
    expect(calcEarnedIncomeDeduction(30_000_000)).toBe(9_750_000);
  });
  it("4500만원-1억: 1200만원 + 초과액 5%", () => {
    expect(calcEarnedIncomeDeduction(50_000_000)).toBe(12_250_000);
    expect(calcEarnedIncomeDeduction(80_000_000)).toBe(13_750_000);
  });
  it("1억 초과: 한도 2,000만원", () => {
    expect(calcEarnedIncomeDeduction(100_000_000)).toBe(14_750_000);
    expect(calcEarnedIncomeDeduction(500_000_000)).toBe(20_000_000);
  });
});

describe("calcProgressiveTax (소득세 누진세율)", () => {
  it("1,400만원 이하: 6%", () => {
    expect(calcProgressiveTax(14_000_000)).toBe(840_000);
    expect(calcProgressiveTax(10_000_000)).toBe(600_000);
  });
  it("1,400-5,000만원: 84만원 + 초과 15%", () => {
    expect(calcProgressiveTax(50_000_000)).toBe(6_240_000);
    expect(calcProgressiveTax(30_000_000)).toBe(3_240_000);
  });
  it("5,000-8,800만원: 624만원 + 초과 24%", () => {
    expect(calcProgressiveTax(88_000_000)).toBe(15_360_000);
  });
  it("음수 또는 0 입력 시 0 반환", () => {
    expect(calcProgressiveTax(0)).toBe(0);
    expect(calcProgressiveTax(-1000)).toBe(0);
  });
});

describe("calcEarnedIncomeTaxCredit (근로소득세액공제)", () => {
  it("총급여 3,300만원 이하: 한도 74만원", () => {
    // 산출세액 100만원: 100만 × 55% = 55만, 한도 74만 → 55만
    expect(calcEarnedIncomeTaxCredit(1_000_000, 30_000_000)).toBe(550_000);
    // 산출세액 200만원: 71.5만 + 70만 × 30% = 92.5만, 한도 74만 → 74만
    expect(calcEarnedIncomeTaxCredit(2_000_000, 30_000_000)).toBe(740_000);
  });
  it("총급여 7,000만원: 한도 약 66만원", () => {
    // (7000 - 3300) × 0.008 = 29.6만 차감 → 74-29.6 = 44.4 → max(66, 44.4) = 66
    const limit = calcEarnedIncomeTaxCredit(10_000_000, 70_000_000);
    expect(limit).toBe(660_000);
  });
});

describe("calcSalary - 일반 연봉 시나리오", () => {
  it("연봉 3,000만원, 본인 1인, 식대 비과세 적용", () => {
    const r = calcSalary({
      annualSalary: 30_000_000,
      dependents: 1,
      applyMealAllowance: true,
    });
    expect(r.monthlyGross).toBe(2_500_000);
    expect(r.monthlyNonTaxable).toBe(200_000);
    // 합리성 체크: 월 실수령은 220-235만 사이
    expect(r.netMonthly).toBeGreaterThan(2_200_000);
    expect(r.netMonthly).toBeLessThan(2_350_000);
    // 4대보험 합계 약 21만~22만원
    expect(r.insurance.total).toBeGreaterThan(200_000);
    expect(r.insurance.total).toBeLessThan(230_000);
  });

  it("연봉 5,000만원, 본인 1인, 식대 비과세 적용", () => {
    const r = calcSalary({
      annualSalary: 50_000_000,
      dependents: 1,
      applyMealAllowance: true,
    });
    expect(r.monthlyGross).toBe(4_166_667);
    // 월 실수령 약 360-370만원
    expect(r.netMonthly).toBeGreaterThan(3_500_000);
    expect(r.netMonthly).toBeLessThan(3_750_000);
  });

  it("연봉 8,000만원, 본인 1인, 식대 비과세 적용", () => {
    const r = calcSalary({
      annualSalary: 80_000_000,
      dependents: 1,
      applyMealAllowance: true,
    });
    expect(r.monthlyGross).toBe(6_666_667);
    // 월 실수령 약 540-570만원
    expect(r.netMonthly).toBeGreaterThan(5_300_000);
    expect(r.netMonthly).toBeLessThan(5_700_000);
  });

  it("연봉 1억, 본인 1인, 식대 비과세 적용", () => {
    const r = calcSalary({
      annualSalary: 100_000_000,
      dependents: 1,
      applyMealAllowance: true,
    });
    // 월 실수령 약 650-680만원
    expect(r.netMonthly).toBeGreaterThan(6_400_000);
    expect(r.netMonthly).toBeLessThan(6_900_000);
  });

  it("부양가족 추가 시 실수령액 증가", () => {
    const single = calcSalary({
      annualSalary: 50_000_000,
      dependents: 1,
      applyMealAllowance: false,
    });
    const family = calcSalary({
      annualSalary: 50_000_000,
      dependents: 3,
      applyMealAllowance: false,
    });
    expect(family.netMonthly).toBeGreaterThan(single.netMonthly);
  });

  it("식대 비과세 적용 시 실수령액 증가", () => {
    const without = calcSalary({
      annualSalary: 50_000_000,
      dependents: 1,
      applyMealAllowance: false,
    });
    const withMeal = calcSalary({
      annualSalary: 50_000_000,
      dependents: 1,
      applyMealAllowance: true,
    });
    expect(withMeal.netMonthly).toBeGreaterThan(without.netMonthly);
  });

  it("결과에 rateBasis가 포함된다", () => {
    const r = calcSalary({
      annualSalary: 50_000_000,
      dependents: 1,
      applyMealAllowance: true,
    });
    expect(r.rateBasis).toMatch(/202[0-9]년/);
  });

  it("잘못된 입력은 에러 발생", () => {
    expect(() =>
      calcSalary({
        annualSalary: 0,
        dependents: 1,
        applyMealAllowance: false,
      }),
    ).toThrow();
    expect(() =>
      calcSalary({
        annualSalary: 50_000_000,
        dependents: 0,
        applyMealAllowance: false,
      }),
    ).toThrow();
  });
});

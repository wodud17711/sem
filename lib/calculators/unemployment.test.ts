import { describe, expect, it } from "vitest";
import { calcUnemployment, getBenefitDays } from "./unemployment";

describe("getBenefitDays — 소정급여일수 표", () => {
  it("50세 미만", () => {
    expect(getBenefitDays(35, 0.5)).toBe(120);
    expect(getBenefitDays(35, 2)).toBe(150);
    expect(getBenefitDays(35, 4)).toBe(180);
    expect(getBenefitDays(35, 7)).toBe(210);
    expect(getBenefitDays(35, 12)).toBe(240);
  });

  it("50세 이상", () => {
    expect(getBenefitDays(55, 0.5)).toBe(120);
    expect(getBenefitDays(55, 2)).toBe(180);
    expect(getBenefitDays(55, 4)).toBe(210);
    expect(getBenefitDays(55, 7)).toBe(240);
    expect(getBenefitDays(55, 12)).toBe(270);
  });
});

describe("calcUnemployment", () => {
  it("중간 구간 — 상·하한 미적용 (월 335만, 35세, 2년)", () => {
    const r = calcUnemployment({
      monthlyWage: 3_350_000,
      age: 35,
      insuredYears: 2,
    });
    // 일평균 111,667 × 60% = 67,000 (하한 66,048~상한 68,100 사이)
    expect(r.dailyAverageWage).toBe(111_667);
    expect(r.dailyBenefit).toBe(67_000);
    expect(r.cappedAtUpper).toBe(false);
    expect(r.cappedAtLower).toBe(false);
    expect(r.benefitDays).toBe(150);
    expect(r.totalBenefit).toBe(10_050_000);
  });

  it("저임금 — 하한액 보정 (월 300만, 35세, 4년)", () => {
    const r = calcUnemployment({
      monthlyWage: 3_000_000,
      age: 35,
      insuredYears: 4,
    });
    // 100,000 × 60% = 60,000 < 하한 66,048 → 66,048
    expect(r.cappedAtLower).toBe(true);
    expect(r.dailyBenefit).toBe(66_048);
    expect(r.benefitDays).toBe(180);
    expect(r.totalBenefit).toBe(66_048 * 180);
  });

  it("고임금 — 상한액 적용 (월 600만, 55세, 12년)", () => {
    const r = calcUnemployment({
      monthlyWage: 6_000_000,
      age: 55,
      insuredYears: 12,
    });
    // 200,000 × 60% = 120,000 > 상한 68,100 → 68,100
    expect(r.cappedAtUpper).toBe(true);
    expect(r.dailyBenefit).toBe(68_100);
    expect(r.benefitDays).toBe(270);
    expect(r.totalBenefit).toBe(68_100 * 270);
  });

  it("음수 입력 시 에러", () => {
    expect(() =>
      calcUnemployment({ monthlyWage: -1, age: 35, insuredYears: 2 }),
    ).toThrow();
  });
});

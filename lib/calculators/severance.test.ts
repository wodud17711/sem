import { describe, expect, it } from "vitest";
import { calcSeverance } from "./severance";

describe("calcSeverance", () => {
  it("정확히 1년 근무, 월 300만원 → 퇴직금 약 300만원", () => {
    const r = calcSeverance({
      hireDate: "2025-01-01",
      leaveDate: "2026-01-01",
      monthlyAverageWage: 3_000_000,
    });
    expect(r.daysWorked).toBe(365);
    expect(r.belowOneYear).toBe(false);
    // 일 평균 = 100,000원, 30일분 × 1년 = 3,000,000원
    expect(r.severancePay).toBe(3_000_000);
  });

  it("3년 근무, 월 400만원 → 퇴직금 약 1,200만원", () => {
    const r = calcSeverance({
      hireDate: "2023-04-01",
      leaveDate: "2026-04-01",
      monthlyAverageWage: 4_000_000,
    });
    // 3년 근무 ≈ 1095일, 재직연수 ≈ 3.0
    expect(r.daysWorked).toBeGreaterThanOrEqual(1095);
    expect(r.severancePay).toBeGreaterThan(11_500_000);
    expect(r.severancePay).toBeLessThan(12_500_000);
  });

  it("1년 미만 근무 시 퇴직금 0", () => {
    const r = calcSeverance({
      hireDate: "2025-06-01",
      leaveDate: "2026-04-29",
      monthlyAverageWage: 3_500_000,
    });
    expect(r.belowOneYear).toBe(true);
    expect(r.severancePay).toBe(0);
  });

  it("입사일이 퇴사일보다 늦으면 에러", () => {
    expect(() =>
      calcSeverance({
        hireDate: "2026-12-01",
        leaveDate: "2026-04-01",
        monthlyAverageWage: 3_000_000,
      }),
    ).toThrow();
  });

  it("월 평균 급여가 0 이하면 에러", () => {
    expect(() =>
      calcSeverance({
        hireDate: "2024-01-01",
        leaveDate: "2026-01-01",
        monthlyAverageWage: 0,
      }),
    ).toThrow();
  });

  it("재직 5년 6개월, 월 500만원", () => {
    const r = calcSeverance({
      hireDate: "2020-10-01",
      leaveDate: "2026-04-01",
      monthlyAverageWage: 5_000_000,
    });
    // 약 5.5년 × 500만원 ≈ 2,750만원
    expect(r.severancePay).toBeGreaterThan(27_000_000);
    expect(r.severancePay).toBeLessThan(28_000_000);
  });
});

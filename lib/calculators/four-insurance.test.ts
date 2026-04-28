import { describe, expect, it } from "vitest";
import { calcFourInsurance } from "./four-insurance";

describe("calcFourInsurance", () => {
  it("월 300만원, 식대 적용, 150인 미만", () => {
    const r = calcFourInsurance({
      monthlyGross: 3_000_000,
      applyMealAllowance: true,
      companySize: "under-150",
    });
    // 보수월액 = 280만원
    // 근로자 국민연금 = 280만 × 4.5% = 126,000
    expect(r.worker.nationalPension).toBe(126_000);
    // 근로자 건강 = 280만 × 3.545% = 99,260
    expect(r.worker.health).toBe(99_260);
    expect(r.worker.total).toBeGreaterThan(0);
    // 사업주 부담은 산재 포함이라 더 큼
    expect(r.employer.total).toBeGreaterThan(r.worker.total);
    expect(r.employer.industrialAccident).toBeGreaterThan(0);
  });

  it("회사 규모가 클수록 사업주 부담 증가", () => {
    const small = calcFourInsurance({
      monthlyGross: 5_000_000,
      applyMealAllowance: false,
      companySize: "under-150",
    });
    const large = calcFourInsurance({
      monthlyGross: 5_000_000,
      applyMealAllowance: false,
      companySize: "1000-plus",
    });
    expect(large.employer.employment).toBeGreaterThan(small.employer.employment);
    expect(large.worker.employment).toBe(small.worker.employment); // 근로자분은 동일
  });

  it("월 급여 0 이하면 에러", () => {
    expect(() =>
      calcFourInsurance({
        monthlyGross: 0,
        applyMealAllowance: false,
        companySize: "under-150",
      }),
    ).toThrow();
  });

  it("rateBasis 포함", () => {
    const r = calcFourInsurance({
      monthlyGross: 4_000_000,
      applyMealAllowance: true,
      companySize: "under-150",
    });
    expect(r.rateBasis).toMatch(/202[0-9]년/);
  });
});

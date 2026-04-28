import { describe, expect, it } from "vitest";
import { calcRealEstateTax } from "./real-estate-tax";

describe("calcRealEstateTax", () => {
  it("1세대 1주택, 10억, 5년 보유 → 비과세", () => {
    const r = calcRealEstateTax({
      acquisitionPrice: 800_000_000,
      salePrice: 1_000_000_000,
      expenses: 0,
      holdingYears: 5,
      isOneHouseOneFamily: true,
    });
    expect(r.isExempt).toBe(true);
    expect(r.totalTax).toBe(0);
  });

  it("1세대 1주택이지만 12억 초과 → 과세 (간이)", () => {
    const r = calcRealEstateTax({
      acquisitionPrice: 1_000_000_000,
      salePrice: 1_500_000_000,
      expenses: 0,
      holdingYears: 5,
      isOneHouseOneFamily: true,
    });
    expect(r.isExempt).toBe(false);
    expect(r.totalTax).toBeGreaterThan(0);
  });

  it("일반 주택, 6억 → 8억, 3년 보유", () => {
    const r = calcRealEstateTax({
      acquisitionPrice: 600_000_000,
      salePrice: 800_000_000,
      expenses: 10_000_000,
      holdingYears: 3,
      isOneHouseOneFamily: false,
    });
    // 양도차익 = 1.9억
    expect(r.capitalGain).toBe(190_000_000);
    // 장특공 = 6% (3년)
    expect(r.longTermDeduction).toBe(11_400_000);
    expect(r.totalTax).toBeGreaterThan(0);
  });

  it("취득가 > 양도가면 양도차익 0", () => {
    const r = calcRealEstateTax({
      acquisitionPrice: 500_000_000,
      salePrice: 400_000_000,
      expenses: 0,
      holdingYears: 5,
      isOneHouseOneFamily: false,
    });
    expect(r.capitalGain).toBe(0);
    expect(r.totalTax).toBe(0);
  });

  it("15년 이상 보유 시 장특공 30% 한도", () => {
    const r = calcRealEstateTax({
      acquisitionPrice: 500_000_000,
      salePrice: 1_500_000_000,
      expenses: 0,
      holdingYears: 20,
      isOneHouseOneFamily: false,
    });
    // 양도차익 10억의 30% = 3억
    expect(r.longTermDeduction).toBe(300_000_000);
  });
});

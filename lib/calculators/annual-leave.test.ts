import { describe, expect, it } from "vitest";
import { calcAnnualLeavePay } from "./annual-leave";

describe("calcAnnualLeavePay", () => {
  it("월 300만원, 미사용 5일 → 약 57만원", () => {
    const r = calcAnnualLeavePay({
      monthlyOrdinaryWage: 3_000_000,
      unusedDays: 5,
    });
    // 시간당 = 3,000,000 / 209 ≈ 14,354
    expect(r.hourlyWage).toBe(14_354);
    // 1일 = 14,354 × 8 = 114,832
    expect(r.dailyWage).toBe(114_832);
    // 5일 = 574,160
    expect(r.totalPay).toBe(574_160);
  });

  it("월 통상임금이 0 이하면 에러", () => {
    expect(() =>
      calcAnnualLeavePay({ monthlyOrdinaryWage: 0, unusedDays: 5 }),
    ).toThrow();
  });

  it("미사용 연차 0이면 0원", () => {
    const r = calcAnnualLeavePay({
      monthlyOrdinaryWage: 4_000_000,
      unusedDays: 0,
    });
    expect(r.totalPay).toBe(0);
  });

  it("미사용 연차가 음수이면 에러", () => {
    expect(() =>
      calcAnnualLeavePay({ monthlyOrdinaryWage: 3_000_000, unusedDays: -1 }),
    ).toThrow();
  });
});

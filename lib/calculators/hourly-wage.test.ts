import { describe, expect, it } from "vitest";
import { calcHourlyWage } from "./hourly-wage";

describe("시급·주휴수당 계산", () => {
  it("2026 최저임금 주 40시간 → 월 209시간, 월급 2,156,880원", () => {
    const r = calcHourlyWage({ hourlyWage: 10_320, weeklyHours: 40 });
    expect(r.eligible).toBe(true);
    expect(r.weeklyHolidayHours).toBe(8);
    expect(r.weeklyHolidayPay).toBe(82_560);
    expect(r.weeklyPay).toBe(495_360); // (40+8) × 10,320
    expect(r.monthlyHours).toBe(209);
    expect(r.monthlyPay).toBe(2_156_880);
  });

  it("주 15시간 단시간 근로자도 주휴수당 발생", () => {
    const r = calcHourlyWage({ hourlyWage: 10_320, weeklyHours: 15 });
    expect(r.eligible).toBe(true);
    // 15/40 × 8 = 3시간
    expect(r.weeklyHolidayHours).toBe(3);
    expect(r.weeklyHolidayPay).toBe(30_960);
    expect(r.weeklyPay).toBe(185_760); // 15×10320 + 30960
  });

  it("주 14시간이면 주휴수당 없음", () => {
    const r = calcHourlyWage({ hourlyWage: 10_320, weeklyHours: 14 });
    expect(r.eligible).toBe(false);
    expect(r.weeklyHolidayHours).toBe(0);
    expect(r.weeklyHolidayPay).toBe(0);
    expect(r.weeklyPay).toBe(144_480); // 14 × 10320
  });

  it("주 40시간 초과여도 주휴시간은 8시간으로 상한", () => {
    const r = calcHourlyWage({ hourlyWage: 10_000, weeklyHours: 48 });
    expect(r.weeklyHolidayHours).toBe(8);
  });

  it("음수 입력 시 에러", () => {
    expect(() => calcHourlyWage({ hourlyWage: -1, weeklyHours: 40 })).toThrow();
    expect(() => calcHourlyWage({ hourlyWage: 10_320, weeklyHours: -5 })).toThrow();
  });
});

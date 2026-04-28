import { describe, expect, it } from "vitest";
import { calcDday } from "./dday";

describe("calcDday", () => {
  it("미래 30일 후", () => {
    const r = calcDday({
      targetDate: "2026-05-29",
      referenceDate: "2026-04-29",
    });
    expect(r.days).toBe(30);
    expect(r.label).toBe("D-30");
  });

  it("과거 10일 전", () => {
    const r = calcDday({
      targetDate: "2026-04-19",
      referenceDate: "2026-04-29",
    });
    expect(r.days).toBe(-10);
    expect(r.label).toBe("D+10");
  });

  it("당일", () => {
    const r = calcDday({
      targetDate: "2026-04-29",
      referenceDate: "2026-04-29",
    });
    expect(r.days).toBe(0);
    expect(r.label).toBe("D-DAY");
  });

  it("잘못된 날짜 형식이면 에러", () => {
    expect(() => calcDday({ targetDate: "invalid" })).toThrow();
  });
});

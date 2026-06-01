import { describe, expect, it } from "vitest";
import { percentChange, percentPortion, percentRatio } from "./percent";

describe("percentRatio (A는 B의 몇 %)", () => {
  it("30은 200의 15%", () => {
    expect(percentRatio(30, 200)).toBe(15);
  });

  it("분모가 0이면 NaN", () => {
    expect(percentRatio(10, 0)).toBeNaN();
  });
});

describe("percentPortion (B의 A%)", () => {
  it("200의 15%는 30", () => {
    expect(percentPortion(15, 200)).toBe(30);
  });

  it("50000의 10%는 5000", () => {
    expect(percentPortion(10, 50000)).toBe(5000);
  });
});

describe("percentChange (증감률)", () => {
  it("100 → 120은 +20%", () => {
    expect(percentChange(100, 120)).toBe(20);
  });

  it("200 → 150은 -25%", () => {
    expect(percentChange(200, 150)).toBe(-25);
  });

  it("기준값이 0이면 NaN", () => {
    expect(percentChange(0, 100)).toBeNaN();
  });
});

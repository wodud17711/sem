import { describe, expect, it } from "vitest";
import { convert } from "./units";

describe("convert", () => {
  it("길이: 1km = 1000m", () => {
    expect(convert("length", "km", "m", 1)).toBe(1000);
  });
  it("길이: 1mile = 1609.344m", () => {
    expect(convert("length", "mile", "m", 1)).toBeCloseTo(1609.344, 3);
  });
  it("길이: 100cm = 1m", () => {
    expect(convert("length", "cm", "m", 100)).toBe(1);
  });
  it("무게: 1kg = 2.2046 lb", () => {
    expect(convert("weight", "kg", "lb", 1)).toBeCloseTo(2.2046, 3);
  });
  it("무게: 1근 = 600g", () => {
    expect(convert("weight", "geun", "g", 1)).toBeCloseTo(600, 0);
  });
  it("부피: 1L = 1000mL", () => {
    expect(convert("volume", "l", "ml", 1)).toBe(1000);
  });
  it("부피: 1gal ≈ 3.7854L", () => {
    expect(convert("volume", "gal", "l", 1)).toBeCloseTo(3.7854, 3);
  });
  it("같은 단위 변환은 입력값", () => {
    expect(convert("length", "m", "m", 5)).toBe(5);
  });
  it("알 수 없는 단위는 에러", () => {
    expect(() => convert("length", "unknown", "m", 1)).toThrow();
  });
});

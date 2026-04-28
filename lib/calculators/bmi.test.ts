import { describe, expect, it } from "vitest";
import { calcBmi } from "./bmi";

describe("calcBmi", () => {
  it("키 170cm, 몸무게 65kg → BMI 22.5 정상", () => {
    const r = calcBmi({ heightCm: 170, weightKg: 65 });
    expect(r.bmi).toBe(22.5);
    expect(r.category).toBe("normal");
  });

  it("키 175cm, 몸무게 80kg → 1단계 비만", () => {
    const r = calcBmi({ heightCm: 175, weightKg: 80 });
    expect(r.bmi).toBeCloseTo(26.1, 1);
    expect(r.category).toBe("obese-1");
  });

  it("키 160cm, 몸무게 45kg → 저체중", () => {
    const r = calcBmi({ heightCm: 160, weightKg: 45 });
    expect(r.category).toBe("underweight");
  });

  it("키 165cm, 몸무게 65kg → 과체중", () => {
    const r = calcBmi({ heightCm: 165, weightKg: 65 });
    expect(r.category).toBe("pre-obese");
  });

  it("정상 체중 범위 계산", () => {
    const r = calcBmi({ heightCm: 170, weightKg: 65 });
    expect(r.normalWeightRange.min).toBeCloseTo(53.5, 0);
    expect(r.normalWeightRange.max).toBeCloseTo(66.2, 0);
  });

  it("0 또는 음수 입력 시 에러", () => {
    expect(() => calcBmi({ heightCm: 0, weightKg: 60 })).toThrow();
    expect(() => calcBmi({ heightCm: 170, weightKg: 0 })).toThrow();
  });
});

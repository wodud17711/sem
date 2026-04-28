import { describe, expect, it } from "vitest";
import { calcDrinkDriving } from "./drink-driving";

describe("calcDrinkDriving (Widmark)", () => {
  it("70kg 남성, 소주 1병(360ml × 17%) 직후", () => {
    const r = calcDrinkDriving({
      volumeMl: 360,
      abvPercent: 17,
      bodyWeightKg: 70,
      sex: "male",
      hoursSinceDrinking: 0,
    });
    expect(r.alcoholGrams).toBeCloseTo(48.3, 0);
    // BAC ≈ 48.3 / (10 × 70 × 0.68) ≈ 0.1015
    expect(r.initialBac).toBeGreaterThan(0.09);
    expect(r.initialBac).toBeLessThan(0.12);
    expect(r.hoursToRevocationThreshold).toBeGreaterThan(0);
  });

  it("60kg 여성, 맥주 500ml × 4.5% 직후", () => {
    const r = calcDrinkDriving({
      volumeMl: 500,
      abvPercent: 4.5,
      bodyWeightKg: 60,
      sex: "female",
      hoursSinceDrinking: 0,
    });
    // BAC ≈ 17.75 / (10 × 60 × 0.55) ≈ 0.0538
    expect(r.initialBac).toBeGreaterThan(0.04);
    expect(r.initialBac).toBeLessThan(0.07);
  });

  it("시간 경과 시 BAC 감소", () => {
    const immediately = calcDrinkDriving({
      volumeMl: 360,
      abvPercent: 17,
      bodyWeightKg: 70,
      sex: "male",
      hoursSinceDrinking: 0,
    });
    const after5h = calcDrinkDriving({
      volumeMl: 360,
      abvPercent: 17,
      bodyWeightKg: 70,
      sex: "male",
      hoursSinceDrinking: 5,
    });
    expect(after5h.currentBac).toBeLessThan(immediately.currentBac);
  });

  it("충분히 시간 경과하면 0", () => {
    const r = calcDrinkDriving({
      volumeMl: 360,
      abvPercent: 17,
      bodyWeightKg: 70,
      sex: "male",
      hoursSinceDrinking: 24,
    });
    expect(r.currentBac).toBe(0);
    expect(r.hoursToSuspensionThreshold).toBe(0);
  });

  it("0 또는 음수 입력 시 에러", () => {
    expect(() =>
      calcDrinkDriving({
        volumeMl: 0,
        abvPercent: 5,
        bodyWeightKg: 70,
        sex: "male",
        hoursSinceDrinking: 0,
      }),
    ).toThrow();
  });
});

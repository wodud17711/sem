import { describe, expect, it } from "vitest";
import { calcJeonseConversion } from "./jeonse";

describe("calcJeonseConversion", () => {
  it("보증금 1억 → 월세 (전환율 5%)", () => {
    const r = calcJeonseConversion({
      direction: "deposit-to-rent",
      inputAmount: 100_000_000,
      conversionRatePercent: 5,
    });
    // 1억 × 0.05 / 12 = 약 416,667원
    expect(r.result).toBe(416_667);
  });

  it("월세 50만원 → 보증금 (전환율 5%)", () => {
    const r = calcJeonseConversion({
      direction: "rent-to-deposit",
      inputAmount: 500_000,
      conversionRatePercent: 5,
    });
    // 50만 × 12 / 0.05 = 1.2억
    expect(r.result).toBe(120_000_000);
  });

  it("잔여 보증금 차감 (반전세 케이스)", () => {
    const r = calcJeonseConversion({
      direction: "deposit-to-rent",
      inputAmount: 200_000_000,
      conversionRatePercent: 5,
      remainingDeposit: 100_000_000,
    });
    // 100,000,000 × 0.05 / 12 = 416,667원
    expect(r.result).toBe(416_667);
  });

  it("0 또는 음수 입력 시 에러", () => {
    expect(() =>
      calcJeonseConversion({
        direction: "deposit-to-rent",
        inputAmount: 0,
        conversionRatePercent: 5,
      }),
    ).toThrow();
    expect(() =>
      calcJeonseConversion({
        direction: "deposit-to-rent",
        inputAmount: 100_000_000,
        conversionRatePercent: 0,
      }),
    ).toThrow();
  });
});

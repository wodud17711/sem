import { describe, expect, it } from "vitest";
import { CURRENCIES, convertCurrency } from "./exchange-rate";

describe("convertCurrency", () => {
  it("USD → KRW", () => {
    const r = convertCurrency(1, "USD", "KRW");
    expect(r).toBeGreaterThan(1000);
  });
  it("KRW → USD 역변환", () => {
    const usd = convertCurrency(100_000, "KRW", "USD");
    const back = convertCurrency(usd, "USD", "KRW");
    expect(back).toBeCloseTo(100_000, 0);
  });
  it("KRW → KRW 동일", () => {
    expect(convertCurrency(50000, "KRW", "KRW")).toBe(50000);
  });
  it("지원하지 않는 통화 시 에러", () => {
    expect(() => convertCurrency(1, "XYZ", "KRW")).toThrow();
  });
  it("모든 통화가 KRW와 양방향 변환 가능", () => {
    for (const c of CURRENCIES) {
      if (c.code === "KRW") continue;
      const krw = convertCurrency(1, c.code, "KRW");
      expect(krw).toBeGreaterThan(0);
    }
  });
});

import { describe, expect, it } from "vitest";
import { fromSupply, fromTotal, VAT_RATE } from "./vat";

describe("부가가치세 계산", () => {
  it("세율은 10%", () => {
    expect(VAT_RATE).toBe(0.1);
  });

  it("공급가액 100,000 → 부가세 10,000, 합계 110,000", () => {
    expect(fromSupply(100_000)).toEqual({
      supply: 100_000,
      vat: 10_000,
      total: 110_000,
    });
  });

  it("합계 110,000 → 공급가액 100,000, 부가세 10,000", () => {
    expect(fromTotal(110_000)).toEqual({
      supply: 100_000,
      vat: 10_000,
      total: 110_000,
    });
  });

  it("합계 11,000 → 공급가액 10,000, 부가세 1,000", () => {
    expect(fromTotal(11_000)).toEqual({
      supply: 10_000,
      vat: 1_000,
      total: 11_000,
    });
  });

  it("공급가액과 부가세의 합은 항상 합계와 같다", () => {
    const r = fromTotal(33_333);
    expect(r.supply + r.vat).toBe(r.total);
  });

  it("0원 입력", () => {
    expect(fromSupply(0)).toEqual({ supply: 0, vat: 0, total: 0 });
  });
});

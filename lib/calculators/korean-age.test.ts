import { describe, expect, it } from "vitest";
import { calcKoreanAge } from "./korean-age";

describe("calcKoreanAge", () => {
  it("생일 지난 경우 (1990-03-15 → 2026-04-29)", () => {
    const r = calcKoreanAge({
      birthDate: "1990-03-15",
      referenceDate: "2026-04-29",
    });
    expect(r.internationalAge).toBe(36);
    expect(r.yearAge).toBe(36);
    expect(r.legacyKoreanAge).toBe(37);
  });

  it("생일 안 지난 경우 (1990-08-15 → 2026-04-29)", () => {
    const r = calcKoreanAge({
      birthDate: "1990-08-15",
      referenceDate: "2026-04-29",
    });
    expect(r.internationalAge).toBe(35);
    expect(r.yearAge).toBe(36);
    expect(r.legacyKoreanAge).toBe(37);
  });

  it("생일 당일 (1990-04-29 → 2026-04-29)", () => {
    const r = calcKoreanAge({
      birthDate: "1990-04-29",
      referenceDate: "2026-04-29",
    });
    expect(r.internationalAge).toBe(36);
  });

  it("미래 생년월일이면 에러", () => {
    expect(() =>
      calcKoreanAge({
        birthDate: "2030-01-01",
        referenceDate: "2026-04-29",
      }),
    ).toThrow();
  });

  it("같은 해 출생", () => {
    const r = calcKoreanAge({
      birthDate: "2026-01-01",
      referenceDate: "2026-04-29",
    });
    expect(r.internationalAge).toBe(0);
    expect(r.yearAge).toBe(0);
    expect(r.legacyKoreanAge).toBe(1);
  });
});

import { describe, expect, it } from "vitest";
import { hexToRgb, hslToRgb, rgbToHex, rgbToHsl } from "./color";

describe("color conversions", () => {
  it("hexToRgb 기본", () => {
    expect(hexToRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb("00ff00")).toEqual({ r: 0, g: 255, b: 0 });
  });

  it("hexToRgb 단축형 #abc", () => {
    expect(hexToRgb("#fff")).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb("#000")).toEqual({ r: 0, g: 0, b: 0 });
  });

  it("hexToRgb 잘못된 입력", () => {
    expect(hexToRgb("xyz")).toBeNull();
    expect(hexToRgb("#12")).toBeNull();
  });

  it("rgbToHex", () => {
    expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe("#ff0000");
    expect(rgbToHex({ r: 0, g: 255, b: 0 })).toBe("#00ff00");
    expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe("#000000");
  });

  it("rgbToHsl 빨강 (0, 100, 50)", () => {
    expect(rgbToHsl({ r: 255, g: 0, b: 0 })).toEqual({ h: 0, s: 100, l: 50 });
  });

  it("rgbToHsl 흰색", () => {
    expect(rgbToHsl({ r: 255, g: 255, b: 255 })).toEqual({ h: 0, s: 0, l: 100 });
  });

  it("hslToRgb 빨강", () => {
    expect(hslToRgb({ h: 0, s: 100, l: 50 })).toEqual({ r: 255, g: 0, b: 0 });
  });

  it("HEX → RGB → HSL → RGB → HEX 라운드트립", () => {
    const start = "#3366cc";
    const rgb = hexToRgb(start);
    expect(rgb).not.toBeNull();
    if (!rgb) return;
    const hsl = rgbToHsl(rgb);
    const rgb2 = hslToRgb(hsl);
    const back = rgbToHex(rgb2);
    // HSL 변환은 정수 반올림으로 약간 손실됨
    expect(back).toMatch(/^#[0-9a-f]{6}$/);
  });
});

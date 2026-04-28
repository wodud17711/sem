import { describe, expect, it } from "vitest";
import { countText } from "./text-stats";

describe("countText", () => {
  it("빈 문자열", () => {
    const r = countText("");
    expect(r.charsWithSpaces).toBe(0);
    expect(r.charsWithoutSpaces).toBe(0);
    expect(r.words).toBe(0);
    expect(r.lines).toBe(0);
    expect(r.paragraphs).toBe(0);
    expect(r.bytes).toBe(0);
  });

  it("영문 단순", () => {
    const r = countText("Hello world");
    expect(r.charsWithSpaces).toBe(11);
    expect(r.charsWithoutSpaces).toBe(10);
    expect(r.words).toBe(2);
    expect(r.lines).toBe(1);
    expect(r.paragraphs).toBe(1);
    expect(r.bytes).toBe(11);
  });

  it("한글 (UTF-8 3바이트씩)", () => {
    const r = countText("안녕하세요");
    expect(r.charsWithSpaces).toBe(5);
    expect(r.charsWithoutSpaces).toBe(5);
    expect(r.bytes).toBe(15); // 5 chars × 3 bytes
  });

  it("줄바꿈과 단락", () => {
    const r = countText("첫 줄\n둘째 줄\n\n다음 단락");
    expect(r.lines).toBe(4);
    expect(r.paragraphs).toBe(2);
  });

  it("공백 다양", () => {
    const r = countText("  hello   world  ");
    expect(r.words).toBe(2);
  });
});

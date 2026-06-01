import { describe, expect, it } from "vitest";
import { pyeongToSqm, sqmToPyeong, SQM_PER_PYEONG } from "./pyeong";

describe("평 ↔ ㎡ 변환", () => {
  it("1평 = 약 3.3058㎡", () => {
    expect(pyeongToSqm(1)).toBeCloseTo(3.305785, 5);
  });

  it("1㎡ = 0.3025평", () => {
    expect(sqmToPyeong(1)).toBeCloseTo(0.3025, 4);
  });

  it("전용 84㎡ ≈ 25.41평", () => {
    expect(sqmToPyeong(84)).toBeCloseTo(25.41, 2);
  });

  it("34평 ≈ 112.4㎡", () => {
    expect(pyeongToSqm(34)).toBeCloseTo(112.4, 1);
  });

  it("왕복 변환은 원래 값으로 복원된다", () => {
    expect(sqmToPyeong(pyeongToSqm(25))).toBeCloseTo(25, 10);
  });

  it("0은 0으로 변환된다", () => {
    expect(pyeongToSqm(0)).toBe(0);
    expect(sqmToPyeong(0)).toBe(0);
  });

  it("환산 상수가 척관법 정의와 일치한다", () => {
    expect(SQM_PER_PYEONG).toBeCloseTo(3.305785, 5);
  });
});

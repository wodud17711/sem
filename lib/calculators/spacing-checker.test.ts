import { describe, expect, it } from "vitest";
import { checkSpacing } from "./spacing-checker";

describe("checkSpacing", () => {
  it("'할수있다' 교정", () => {
    const r = checkSpacing("나는 할수있다");
    expect(r.corrected).toBe("나는 할 수 있다");
    expect(r.changeCount).toBeGreaterThan(0);
  });

  it("'할것이다' 교정", () => {
    const r = checkSpacing("그는 갈것이다");
    expect(r.corrected).toBe("그는 갈 것이다");
  });

  it("이미 올바른 텍스트는 변경 없음", () => {
    const r = checkSpacing("나는 할 수 있다");
    expect(r.corrected).toBe("나는 할 수 있다");
    expect(r.changeCount).toBe(0);
  });

  it("연속 공백 정리", () => {
    const r = checkSpacing("이것은   여러   공백");
    expect(r.corrected).toBe("이것은 여러 공백");
  });

  it("등의 앞 띄어쓰기", () => {
    const r = checkSpacing("사과등의 과일");
    expect(r.corrected).toBe("사과 등의 과일");
  });

  it("빈 문자열 처리", () => {
    const r = checkSpacing("");
    expect(r.corrected).toBe("");
    expect(r.changeCount).toBe(0);
  });
});

import { describe, expect, it } from "vitest";
import { checkSpacing } from "./spacing-checker";

describe("checkSpacing — 의존명사", () => {
  it("'할수있다' 교정", () => {
    const r = checkSpacing("나는 할수있다");
    expect(r.corrected).toBe("나는 할 수 있다");
    expect(r.changeCount).toBeGreaterThan(0);
  });

  it("'할것이다' 교정", () => {
    expect(checkSpacing("그는 갈것이다").corrected).toBe("그는 갈 것이다");
  });

  it("'먹는것' → '먹는 것'", () => {
    expect(checkSpacing("내가 먹는것").corrected).toBe("내가 먹는 것");
  });

  it("'갈것같다' → '갈 것 같다'", () => {
    expect(checkSpacing("비가 올것같다").corrected).toBe("비가 올 것 같다");
  });

  it("'할줄알다' → '할 줄 알다'", () => {
    expect(checkSpacing("운전할줄알아요").corrected).toBe("운전할 줄 알아요");
  });

  it("'먹을만큼' → '먹을 만큼'", () => {
    expect(checkSpacing("먹을만큼 먹었다").corrected).toBe("먹을 만큼 먹었다");
  });

  it("'할뿐' → '할 뿐'", () => {
    expect(checkSpacing("최선을 다할뿐이다").corrected).toBe(
      "최선을 다할 뿐이다",
    );
  });
});

describe("checkSpacing — 보조용언", () => {
  it("'먹고있다' → '먹고 있다'", () => {
    expect(checkSpacing("밥을 먹고있다").corrected).toBe("밥을 먹고 있다");
  });

  it("'보고싶다' → '보고 싶다'", () => {
    expect(checkSpacing("너가 보고싶다").corrected).toBe("너가 보고 싶다");
  });

  it("'하지않다' → '하지 않다'", () => {
    expect(checkSpacing("공부하지않는다").corrected).toBe("공부하지 않는다");
  });

  it("'가지못해' → '가지 못해'", () => {
    expect(checkSpacing("학교에 가지못해서").corrected).toBe(
      "학교에 가지 못해서",
    );
  });
});

describe("checkSpacing — 조사·공백", () => {
  it("등의 앞 띄어쓰기", () => {
    expect(checkSpacing("사과등의 과일").corrected).toBe("사과 등의 과일");
  });

  it("연속 공백 정리", () => {
    expect(checkSpacing("이것은   여러   공백").corrected).toBe(
      "이것은 여러 공백",
    );
  });
});

describe("checkSpacing — 오교정 방지", () => {
  it("대명사 '이것/그것'은 분리하지 않음", () => {
    expect(checkSpacing("이것은 그것과 다르다").corrected).toBe(
      "이것은 그것과 다르다",
    );
  });

  it("명사 '온수'는 건드리지 않음 (수있/수없만 교정)", () => {
    expect(checkSpacing("온수기를 켰다").corrected).toBe("온수기를 켰다");
  });

  it("이미 올바른 텍스트는 변경 없음", () => {
    const r = checkSpacing("나는 할 수 있다");
    expect(r.corrected).toBe("나는 할 수 있다");
    expect(r.changeCount).toBe(0);
  });

  it("빈 문자열 처리", () => {
    const r = checkSpacing("");
    expect(r.corrected).toBe("");
    expect(r.changeCount).toBe(0);
  });
});

/**
 * 한국어 띄어쓰기 검사 — 규칙 기반 (limited).
 *
 * 형태소 분석 없이 정규식만으로 검사하므로 다음 한계가 있습니다:
 * - 의존명사·자립명사가 같은 형태인 경우 구분 불가 (예: "한번" vs "한 번")
 * - 복잡한 보조용언 띄어쓰기 처리 불가
 * - 띄어쓰기보다 붙여 써야 하는 경우(고유명사 등) 미감지
 *
 * 따라서 본 도구는 자주 보이는 명백한 띄어쓰기 누락 패턴만 교정합니다.
 */

interface Rule {
  /** 정규식 (g 플래그 자동 추가) */
  pattern: RegExp;
  /** 치환 문자열 */
  replacement: string;
  /** 사용자에게 보여줄 규칙 설명 */
  description: string;
}

/**
 * 동사·형용사 어미로 자주 사용되는 1음절 글자 화이트리스트.
 * 이것/그것/저것 같은 대명사를 잘못 분리하지 않도록, 특정 어미 뒤에서만 적용.
 */
const VERB_ENDINGS = "할갈올볼줄본한된들온건던간킨";

const RULES: Rule[] = [
  // 의존명사 "수" — 주로 "할 수 있다/없다" 패턴
  {
    pattern: new RegExp(`([${VERB_ENDINGS}])수있`, "g"),
    replacement: "$1 수 있",
    description: "의존명사 '수' 앞뒤 띄어쓰기 (할수있다 → 할 수 있다)",
  },
  {
    pattern: new RegExp(`([${VERB_ENDINGS}])수없`, "g"),
    replacement: "$1 수 없",
    description: "의존명사 '수' 앞뒤 띄어쓰기 (할수없다 → 할 수 없다)",
  },
  // 의존명사 "것" — 동사 어미 뒤에서만
  {
    pattern: new RegExp(`([${VERB_ENDINGS}])것이다`, "g"),
    replacement: "$1 것이다",
    description: "의존명사 '것' 앞 띄어쓰기 (할것이다 → 할 것이다)",
  },
  {
    pattern: new RegExp(`([${VERB_ENDINGS}])것입니다`, "g"),
    replacement: "$1 것입니다",
    description: "의존명사 '것' 앞 띄어쓰기 (할것입니다 → 할 것입니다)",
  },
  {
    pattern: new RegExp(`([${VERB_ENDINGS}])수밖에`, "g"),
    replacement: "$1 수밖에",
    description: "'수밖에' 앞 띄어쓰기",
  },
  // "등" 앞 띄어쓰기 — 명사 뒤 (대부분의 단어 뒤에서 안전)
  {
    pattern: /([가-힣])등이/g,
    replacement: "$1 등이",
    description: "조사 '등' 앞 띄어쓰기",
  },
  {
    pattern: /([가-힣])등의/g,
    replacement: "$1 등의",
    description: "조사 '등' 앞 띄어쓰기",
  },
  {
    pattern: /([가-힣])등을/g,
    replacement: "$1 등을",
    description: "조사 '등' 앞 띄어쓰기",
  },
  // 다중 공백 정리
  {
    pattern: / {2,}/g,
    replacement: " ",
    description: "연속 공백 1개로 정리",
  },
];

export interface SpacingCheckResult {
  original: string;
  corrected: string;
  appliedRules: string[];
  changeCount: number;
}

export function checkSpacing(input: string): SpacingCheckResult {
  let text = input;
  const appliedRules = new Set<string>();
  let changeCount = 0;

  for (const rule of RULES) {
    const before = text;
    text = text.replace(rule.pattern, rule.replacement);
    if (text !== before) {
      appliedRules.add(rule.description);
      // 매치 개수를 정확히 세기
      const matches = before.match(new RegExp(rule.pattern.source, "g"));
      if (matches) changeCount += matches.length;
    }
  }

  return {
    original: input,
    corrected: text,
    appliedRules: [...appliedRules],
    changeCount,
  };
}

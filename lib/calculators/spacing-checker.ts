/**
 * 한국어 띄어쓰기 검사 — 규칙 기반 (limited).
 *
 * 형태소 분석 없이 정규식만으로 검사하므로 다음 한계가 있습니다:
 * - 의존명사·자립명사가 같은 형태인 경우 구분 불가 (예: "한번" vs "한 번")
 * - 문맥에 따라 붙이거나 띄는 경우(고유명사, 합성어 등) 완벽 처리 불가
 *
 * 따라서 오교정(잘못 띄우기) 위험이 낮은, 명백한 패턴만 선별해 교정합니다.
 * 각 규칙은 단위 테스트로 안전성을 검증합니다.
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
 * 관형형 어미(-ㄹ/-ㄴ)로 자주 끝나는 1음절 글자 화이트리스트.
 * 이 글자 뒤의 의존명사는 거의 항상 띄어 써야 하므로, 이 집합 뒤에서만 교정한다.
 * (예: "할" 뒤의 "것/수/줄"은 의존명사)
 */
const ADNOMINAL = "할갈올볼줄본한된들온건던간킨운는을";

const RULES: Rule[] = [
  // ── 관형형 어미 + 의존명사 ──────────────────────────────
  // 의존명사 "것": 관형형 어미 뒤에서는 항상 띄어 쓴다.
  {
    pattern: new RegExp(`([${ADNOMINAL}])것`, "g"),
    replacement: "$1 것",
    description: "의존명사 '것' 띄어쓰기 (할것이다 → 할 것이다)",
  },
  // "것 같다" — 보조형용사 '같다'는 띄어 쓴다.
  {
    pattern: /것같/g,
    replacement: "것 같",
    description: "'것 같다' 띄어쓰기 (갈것같다 → 갈 것 같다)",
  },
  // 의존명사 "수" — '있다/없다/밖에'와 함께 쓰는 안전한 경우만.
  {
    pattern: new RegExp(`([${ADNOMINAL}])수있`, "g"),
    replacement: "$1 수 있",
    description: "의존명사 '수' 띄어쓰기 (할수있다 → 할 수 있다)",
  },
  {
    pattern: new RegExp(`([${ADNOMINAL}])수없`, "g"),
    replacement: "$1 수 없",
    description: "의존명사 '수' 띄어쓰기 (할수없다 → 할 수 없다)",
  },
  {
    pattern: new RegExp(`([${ADNOMINAL}])수밖에`, "g"),
    replacement: "$1 수밖에",
    description: "'수밖에' 띄어쓰기",
  },
  // 의존명사 "줄" — '알다/모르다'와 함께.
  {
    pattern: new RegExp(`([${ADNOMINAL}])줄(알|아|몰|모)`, "g"),
    replacement: "$1 줄 $2",
    description: "의존명사 '줄' 띄어쓰기 (할줄알다 → 할 줄 알다)",
  },
  // 의존명사 "만큼" — 관형형 어미 뒤.
  {
    pattern: new RegExp(`([${ADNOMINAL}])만큼`, "g"),
    replacement: "$1 만큼",
    description: "의존명사 '만큼' 띄어쓰기 (먹을만큼 → 먹을 만큼)",
  },
  // 의존명사 "뿐" — 관형형 어미 뒤.
  {
    pattern: new RegExp(`([${ADNOMINAL}])뿐`, "g"),
    replacement: "$1 뿐",
    description: "의존명사 '뿐' 띄어쓰기 (할뿐 → 할 뿐)",
  },

  // ── 보조용언 ─────────────────────────────────────────
  // -고 있다 (진행)
  {
    pattern: /([가-힣])고있/g,
    replacement: "$1고 있",
    description: "보조용언 '있다' 띄어쓰기 (먹고있다 → 먹고 있다)",
  },
  // -고 싶다 (희망)
  {
    pattern: /([가-힣])고싶/g,
    replacement: "$1고 싶",
    description: "보조용언 '싶다' 띄어쓰기 (보고싶다 → 보고 싶다)",
  },
  // -지 않다 (부정)
  {
    pattern: /([가-힣])지않/g,
    replacement: "$1지 않",
    description: "보조용언 '않다' 띄어쓰기 (하지않다 → 하지 않다)",
  },
  // -지 못하다 (부정)
  {
    pattern: /([가-힣])지못(하|해)/g,
    replacement: "$1지 못$2",
    description: "보조용언 '못하다' 띄어쓰기 (가지못해 → 가지 못해)",
  },

  // ── 조사 "등" 앞 띄어쓰기 ────────────────────────────
  {
    pattern: /([가-힣])등이/g,
    replacement: "$1 등이",
    description: "조사 '등' 띄어쓰기",
  },
  {
    pattern: /([가-힣])등의/g,
    replacement: "$1 등의",
    description: "조사 '등' 띄어쓰기",
  },
  {
    pattern: /([가-힣])등을/g,
    replacement: "$1 등을",
    description: "조사 '등' 띄어쓰기",
  },

  // ── 다중 공백 정리 ──────────────────────────────────
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

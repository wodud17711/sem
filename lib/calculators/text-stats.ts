/**
 * 텍스트 통계 계산.
 * 한국어/영어 혼합 지원. 한글은 글자 단위로 정확히 카운트되며, 바이트는 UTF-8 기준.
 */

export interface TextStats {
  /** 글자 수 (공백 포함) */
  charsWithSpaces: number;
  /** 글자 수 (공백 제외) */
  charsWithoutSpaces: number;
  /** 단어 수 (공백 또는 줄바꿈으로 구분) */
  words: number;
  /** 줄 수 */
  lines: number;
  /** 단락 수 (빈 줄로 구분) */
  paragraphs: number;
  /** UTF-8 바이트 수 */
  bytes: number;
}

export function countText(input: string): TextStats {
  const text = input ?? "";
  const charsWithSpaces = [...text].length;
  const charsWithoutSpaces = [...text.replace(/\s/g, "")].length;
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const lines = text === "" ? 0 : text.split("\n").length;
  const paragraphs = text.trim() === "" ? 0 : text.trim().split(/\n\s*\n/).length;
  const bytes = new TextEncoder().encode(text).length;

  return {
    charsWithSpaces,
    charsWithoutSpaces,
    words,
    lines,
    paragraphs,
    bytes,
  };
}

/**
 * 만 나이 / 한국 나이 / 연 나이 계산.
 * 2023-06-28부터 한국 행정·민사상 나이는 모두 만 나이로 통일됨 (행정기본법 §7의2, 민법 §158).
 */

export interface KoreanAgeInput {
  /** 생년월일 (YYYY-MM-DD) */
  birthDate: string;
  /** 기준일 (YYYY-MM-DD). 기본: 오늘 */
  referenceDate?: string;
}

export interface KoreanAgeResult {
  /** 만 나이 (생일 지났으면 +1) */
  internationalAge: number;
  /** 연 나이 (단순히 현재 연도 - 출생 연도) */
  yearAge: number;
  /** 옛 한국 나이 (연 나이 + 1, 2023-06-28 폐지) */
  legacyKoreanAge: number;
}

export function calcKoreanAge(input: KoreanAgeInput): KoreanAgeResult {
  const birth = new Date(input.birthDate);
  const ref = input.referenceDate ? new Date(input.referenceDate) : new Date();
  if (Number.isNaN(birth.getTime()) || Number.isNaN(ref.getTime())) {
    throw new Error("올바른 날짜 형식(YYYY-MM-DD)을 입력하세요.");
  }
  if (birth > ref) {
    throw new Error("생년월일이 기준일보다 늦습니다.");
  }

  const yearAge = ref.getFullYear() - birth.getFullYear();
  const hasBirthdayPassed =
    ref.getMonth() > birth.getMonth() ||
    (ref.getMonth() === birth.getMonth() && ref.getDate() >= birth.getDate());
  const internationalAge = hasBirthdayPassed ? yearAge : yearAge - 1;
  const legacyKoreanAge = yearAge + 1;

  return { internationalAge, yearAge, legacyKoreanAge };
}

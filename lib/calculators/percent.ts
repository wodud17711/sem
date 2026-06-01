/**
 * 백분율(퍼센트) 계산.
 *
 * 세 가지 자주 쓰는 계산을 제공한다.
 *  1) ratio:  A는 B의 몇 % 인가?            → A / B × 100
 *  2) portion: B의 A% 는 얼마인가?           → B × A / 100
 *  3) change:  A에서 B로 바뀌면 몇 % 변했나?  → (B − A) / A × 100
 */

/** A는 B의 몇 %인가? (B가 0이면 NaN) */
export function percentRatio(part: number, whole: number): number {
  if (whole === 0) return Number.NaN;
  return (part / whole) * 100;
}

/** 전체(whole)의 percent% 값 */
export function percentPortion(percent: number, whole: number): number {
  return (whole * percent) / 100;
}

/** from에서 to로 변할 때 증감률(%). 음수면 감소 (from이 0이면 NaN) */
export function percentChange(from: number, to: number): number {
  if (from === 0) return Number.NaN;
  return ((to - from) / from) * 100;
}

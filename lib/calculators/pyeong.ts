/**
 * 평 ↔ 제곱미터(㎡) 변환.
 *
 * 1평 = 400 / 121 ㎡ ≈ 3.305785㎡ (척관법 기준 1평 = 사방 6자 = 3.3058㎡).
 * 1㎡ = 121 / 400 평 = 0.3025평.
 *
 * 부동산 면적은 보통 ㎡로 고시되며, 평으로 환산해 직관적으로 본다.
 */

/** 1평에 해당하는 제곱미터 */
export const SQM_PER_PYEONG = 400 / 121;

/** 평 → ㎡ */
export function pyeongToSqm(pyeong: number): number {
  return pyeong * SQM_PER_PYEONG;
}

/** ㎡ → 평 */
export function sqmToPyeong(sqm: number): number {
  return sqm / SQM_PER_PYEONG;
}

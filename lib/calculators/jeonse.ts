/**
 * 전월세 환산 계산.
 * 보증금 ↔ 월세를 전월세전환율로 변환.
 *
 * 산식:
 *   월세 = (보증금 × 전환율) ÷ 12
 *   보증금 = (월세 × 12) ÷ 전환율
 *
 * 전환율은 지역·시기에 따라 다름. 한국부동산원 통계 기준 평균 약 5~6%.
 * 주택임대차보호법상 적용 한도는 기준금리 + 2% 또는 10% 중 낮은 값.
 */

export interface JeonseInput {
  /** 변환 방향 */
  direction: "deposit-to-rent" | "rent-to-deposit";
  /** 입력 금액 (원) */
  inputAmount: number;
  /** 전월세전환율 (%, 예: 5) */
  conversionRatePercent: number;
  /** 차감용 잔여 보증금 (deposit-to-rent에서 일부만 월세로 전환할 때) */
  remainingDeposit?: number;
}

export interface JeonseResult {
  /** 결과 금액 */
  result: number;
}

const round = (n: number) => Math.round(n);

export function calcJeonseConversion(input: JeonseInput): JeonseResult {
  const { direction, inputAmount, conversionRatePercent, remainingDeposit = 0 } =
    input;
  if (inputAmount <= 0) {
    throw new Error("금액은 0보다 커야 합니다.");
  }
  if (conversionRatePercent <= 0) {
    throw new Error("전환율은 0보다 커야 합니다.");
  }
  const r = conversionRatePercent / 100;

  if (direction === "deposit-to-rent") {
    // 보증금 → 월세 (잔여 보증금 차감 후 변환)
    const convertingAmount = Math.max(0, inputAmount - remainingDeposit);
    return { result: round((convertingAmount * r) / 12) };
  }
  // 월세 → 보증금
  return { result: round((inputAmount * 12) / r) };
}

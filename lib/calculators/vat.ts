/**
 * 부가가치세(VAT) 계산. 한국 일반과세 부가세율 10% 기준.
 *
 * 용어:
 *  - 공급가액: 부가세를 뺀 순수 물건·용역 값
 *  - 부가세(세액): 공급가액 × 10%
 *  - 공급대가(합계): 공급가액 + 부가세 (소비자가 실제로 내는 금액)
 *
 * 두 방향을 지원한다.
 *  - fromSupply: 공급가액을 알 때 부가세·합계를 구함
 *  - fromTotal:  합계(공급대가)에서 공급가액·부가세를 역산
 */

/** 부가가치세율 (일반과세) */
export const VAT_RATE = 0.1;

export interface VatResult {
  /** 공급가액 (원) */
  supply: number;
  /** 부가세 (원) */
  vat: number;
  /** 합계 = 공급대가 (원) */
  total: number;
}

const round = (n: number) => Math.round(n);

/** 공급가액 → 부가세·합계 */
export function fromSupply(supply: number): VatResult {
  const vat = round(supply * VAT_RATE);
  return { supply: round(supply), vat, total: round(supply) + vat };
}

/** 합계(공급대가) → 공급가액·부가세 */
export function fromTotal(total: number): VatResult {
  const supply = round(total / (1 + VAT_RATE));
  return { supply, vat: round(total) - supply, total: round(total) };
}

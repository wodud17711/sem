/**
 * 정적 환율 데이터 — 외부 API 호출 없이 사용.
 * 모든 환율은 KRW(원)와의 매매기준율(원/통화)로 표현.
 *
 * 출처: 한국은행 경제통계시스템 (ECOS) 매매기준율 평균치.
 * 매주 또는 매월 갱신 권장. 갱신 시 RATE_BASIS도 함께 수정.
 */

export const EXCHANGE_RATE_BASIS = "2026년 4월 기준 (정적 데이터)";

export interface Currency {
  code: string;
  label: string;
  /** 1단위당 원화 (KRW) */
  perKrw: number;
  /** 100단위당 환율 표시가 일반적인 통화 (예: JPY 100엔) */
  unitFactor?: number;
}

export const CURRENCIES: Currency[] = [
  { code: "KRW", label: "대한민국 원 (KRW)", perKrw: 1 },
  { code: "USD", label: "미국 달러 (USD)", perKrw: 1380 },
  { code: "EUR", label: "유로 (EUR)", perKrw: 1500 },
  { code: "JPY", label: "일본 엔 (JPY)", perKrw: 8.9, unitFactor: 100 },
  { code: "CNY", label: "중국 위안 (CNY)", perKrw: 190 },
  { code: "GBP", label: "영국 파운드 (GBP)", perKrw: 1740 },
  { code: "AUD", label: "호주 달러 (AUD)", perKrw: 900 },
  { code: "CAD", label: "캐나다 달러 (CAD)", perKrw: 1010 },
  { code: "CHF", label: "스위스 프랑 (CHF)", perKrw: 1570 },
  { code: "HKD", label: "홍콩 달러 (HKD)", perKrw: 178 },
  { code: "SGD", label: "싱가포르 달러 (SGD)", perKrw: 1020 },
];

export function convertCurrency(
  amount: number,
  fromCode: string,
  toCode: string,
): number {
  const from = CURRENCIES.find((c) => c.code === fromCode);
  const to = CURRENCIES.find((c) => c.code === toCode);
  if (!from || !to) {
    throw new Error("지원하지 않는 통화입니다.");
  }
  // 모든 통화를 원 기준으로 환산: amount × perKrw = KRW
  const inKrw = amount * from.perKrw;
  // KRW를 목표 통화로 환산: KRW ÷ perKrw
  return inKrw / to.perKrw;
}

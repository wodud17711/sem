/**
 * 음주 후 혈중알코올농도(BAC) 추정 — Widmark 공식 기반.
 *
 * BAC(%) = (알코올 그램 × 100) ÷ (체중 g × 분포비) − 시간 × 분해율
 *        = 알코올 그램 ÷ (10 × 체중kg × r) − t × 0.015
 *
 * 한국 도로교통법 기준:
 * - 0.03% 이상: 면허 정지 (1차 위반)
 * - 0.08% 이상: 면허 취소 (1차 위반) / 형사처벌
 *
 * 본 추정은 평균치이며 개인 차(체질, 음식, 컨디션)가 매우 큽니다.
 */

/** 에탄올 비중 (g/mL) */
const ETHANOL_DENSITY = 0.789;
/** 시간당 BAC 분해율 (%/h, 평균) */
export const BAC_ELIMINATION_PER_HOUR = 0.015;
/** 면허 정지 기준 BAC (%) */
export const LICENSE_SUSPENSION_BAC = 0.03;
/** 면허 취소 기준 BAC (%) */
export const LICENSE_REVOCATION_BAC = 0.08;

export type Sex = "male" | "female";

const WIDMARK_R: Record<Sex, number> = {
  male: 0.68,
  female: 0.55,
};

export interface DrinkDrivingInput {
  /** 총 마신 양 (mL) */
  volumeMl: number;
  /** 알코올 도수 (%, 예: 17) */
  abvPercent: number;
  /** 체중 (kg) */
  bodyWeightKg: number;
  sex: Sex;
  /** 음주 종료 후 경과 시간 (시간) */
  hoursSinceDrinking: number;
}

export interface DrinkDrivingResult {
  /** 알코올 그램 */
  alcoholGrams: number;
  /** 음주 직후 추정 BAC (%) */
  initialBac: number;
  /** 현재 시점 추정 BAC (%) — 0 이하면 0 */
  currentBac: number;
  /** 정지 기준(0.03%) 미만으로 떨어지기까지 추가로 필요한 시간 (시간) */
  hoursToSuspensionThreshold: number;
  /** 취소 기준(0.08%) 미만으로 떨어지기까지 추가로 필요한 시간 (시간) */
  hoursToRevocationThreshold: number;
}

const round = (n: number, d = 4) => Math.round(n * 10 ** d) / 10 ** d;

export function calcDrinkDriving(input: DrinkDrivingInput): DrinkDrivingResult {
  const { volumeMl, abvPercent, bodyWeightKg, sex, hoursSinceDrinking } = input;
  if (volumeMl <= 0 || abvPercent <= 0 || bodyWeightKg <= 0) {
    throw new Error("음주량·도수·체중은 0보다 커야 합니다.");
  }
  if (hoursSinceDrinking < 0) {
    throw new Error("경과 시간은 0 이상이어야 합니다.");
  }

  const alcoholGrams = volumeMl * (abvPercent / 100) * ETHANOL_DENSITY;
  const r = WIDMARK_R[sex];
  const initialBac = alcoholGrams / (10 * bodyWeightKg * r);
  const eliminated = hoursSinceDrinking * BAC_ELIMINATION_PER_HOUR;
  const currentBac = Math.max(0, initialBac - eliminated);

  const hoursToSuspensionThreshold =
    currentBac > LICENSE_SUSPENSION_BAC
      ? (currentBac - LICENSE_SUSPENSION_BAC) / BAC_ELIMINATION_PER_HOUR
      : 0;
  const hoursToRevocationThreshold =
    currentBac > LICENSE_REVOCATION_BAC
      ? (currentBac - LICENSE_REVOCATION_BAC) / BAC_ELIMINATION_PER_HOUR
      : 0;

  return {
    alcoholGrams: round(alcoholGrams, 1),
    initialBac: round(initialBac),
    currentBac: round(currentBac),
    hoursToSuspensionThreshold: round(hoursToSuspensionThreshold, 2),
    hoursToRevocationThreshold: round(hoursToRevocationThreshold, 2),
  };
}

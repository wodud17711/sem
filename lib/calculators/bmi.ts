/**
 * BMI(체질량지수) 계산.
 * 분류 기준: 대한비만학회 (한국인 기준).
 *
 * 한국 기준은 WHO 아시아·태평양 기준을 따라 비만 기준이 더 엄격합니다.
 * - WHO 표준: 정상 18.5-24.9, 과체중 25-29.9, 비만 30+
 * - 대한비만학회: 정상 18.5-22.9, 과체중 23-24.9, 비만 25+
 */

export type BmiCategory =
  | "underweight"
  | "normal"
  | "pre-obese"
  | "obese-1"
  | "obese-2"
  | "obese-3";

export const BMI_CATEGORY_LABEL: Record<BmiCategory, string> = {
  underweight: "저체중",
  normal: "정상",
  "pre-obese": "비만전단계 (과체중)",
  "obese-1": "1단계 비만",
  "obese-2": "2단계 비만",
  "obese-3": "3단계 비만 (고도비만)",
};

export interface BmiInput {
  /** 키 (cm) */
  heightCm: number;
  /** 몸무게 (kg) */
  weightKg: number;
}

export interface BmiResult {
  bmi: number;
  category: BmiCategory;
  label: string;
  /** 정상 체중 범위 (kg) */
  normalWeightRange: { min: number; max: number };
}

export function calcBmi(input: BmiInput): BmiResult {
  const { heightCm, weightKg } = input;
  if (heightCm <= 0 || weightKg <= 0) {
    throw new Error("키와 몸무게는 0보다 커야 합니다.");
  }
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  let category: BmiCategory;
  if (bmi < 18.5) category = "underweight";
  else if (bmi < 23) category = "normal";
  else if (bmi < 25) category = "pre-obese";
  else if (bmi < 30) category = "obese-1";
  else if (bmi < 35) category = "obese-2";
  else category = "obese-3";

  const normalMin = 18.5 * heightM * heightM;
  const normalMax = 22.9 * heightM * heightM;

  return {
    bmi: Math.round(bmi * 10) / 10,
    category,
    label: BMI_CATEGORY_LABEL[category],
    normalWeightRange: {
      min: Math.round(normalMin * 10) / 10,
      max: Math.round(normalMax * 10) / 10,
    },
  };
}

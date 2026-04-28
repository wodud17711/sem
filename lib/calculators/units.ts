/**
 * 길이/무게/부피 단위 변환.
 * 모든 변환은 SI 기본 단위(미터, 킬로그램, 리터)를 거쳐 계산.
 */

export type UnitCategory = "length" | "weight" | "volume";

export interface Unit {
  id: string;
  label: string;
  /** SI 기본 단위로 변환할 때 곱하는 계수 */
  toBase: number;
}

export const UNITS: Record<UnitCategory, Unit[]> = {
  length: [
    { id: "mm", label: "밀리미터 (mm)", toBase: 0.001 },
    { id: "cm", label: "센티미터 (cm)", toBase: 0.01 },
    { id: "m", label: "미터 (m)", toBase: 1 },
    { id: "km", label: "킬로미터 (km)", toBase: 1000 },
    { id: "in", label: "인치 (in)", toBase: 0.0254 },
    { id: "ft", label: "피트 (ft)", toBase: 0.3048 },
    { id: "yd", label: "야드 (yd)", toBase: 0.9144 },
    { id: "mile", label: "마일 (mi)", toBase: 1609.344 },
  ],
  weight: [
    { id: "mg", label: "밀리그램 (mg)", toBase: 0.000001 },
    { id: "g", label: "그램 (g)", toBase: 0.001 },
    { id: "kg", label: "킬로그램 (kg)", toBase: 1 },
    { id: "ton", label: "톤 (t)", toBase: 1000 },
    { id: "oz", label: "온스 (oz)", toBase: 0.02834952 },
    { id: "lb", label: "파운드 (lb)", toBase: 0.45359237 },
    { id: "geun", label: "근 (斤, 600g)", toBase: 0.6 },
    { id: "don", label: "돈 (3.75g)", toBase: 0.00375 },
  ],
  volume: [
    { id: "ml", label: "밀리리터 (mL)", toBase: 0.001 },
    { id: "l", label: "리터 (L)", toBase: 1 },
    { id: "tsp", label: "티스푼 (tsp, 5mL)", toBase: 0.005 },
    { id: "tbsp", label: "테이블스푼 (tbsp, 15mL)", toBase: 0.015 },
    { id: "cup", label: "컵 (240mL)", toBase: 0.24 },
    { id: "pt", label: "파인트 (pt, 미국)", toBase: 0.473176 },
    { id: "qt", label: "쿼트 (qt, 미국)", toBase: 0.946353 },
    { id: "gal", label: "갤런 (gal, 미국)", toBase: 3.785411784 },
  ],
};

export function convert(
  category: UnitCategory,
  fromUnitId: string,
  toUnitId: string,
  value: number,
): number {
  const units = UNITS[category];
  const from = units.find((u) => u.id === fromUnitId);
  const to = units.find((u) => u.id === toUnitId);
  if (!from || !to) {
    throw new Error("알 수 없는 단위입니다.");
  }
  return (value * from.toBase) / to.toBase;
}

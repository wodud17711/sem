/**
 * 디데이 계산.
 * 미래 날짜는 D-N (남은 일수), 과거 날짜는 D+N (지난 일수).
 * 당일은 D-DAY로 표시.
 */

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export interface DdayInput {
  /** 목표일 (YYYY-MM-DD) */
  targetDate: string;
  /** 기준일 (YYYY-MM-DD). 기본: 오늘 */
  referenceDate?: string;
}

export interface DdayResult {
  /** 양수면 미래(남은 일수), 음수면 과거(지난 일수), 0이면 당일 */
  days: number;
  /** 표시용 라벨 (예: "D-30", "D+5", "D-DAY") */
  label: string;
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function calcDday(input: DdayInput): DdayResult {
  const target = new Date(input.targetDate);
  const ref = input.referenceDate ? new Date(input.referenceDate) : new Date();
  if (Number.isNaN(target.getTime()) || Number.isNaN(ref.getTime())) {
    throw new Error("올바른 날짜 형식(YYYY-MM-DD)을 입력하세요.");
  }
  const diffMs = startOfDay(target).getTime() - startOfDay(ref).getTime();
  const days = Math.round(diffMs / MS_PER_DAY);

  let label: string;
  if (days === 0) label = "D-DAY";
  else if (days > 0) label = `D-${days}`;
  else label = `D+${-days}`;

  return { days, label };
}

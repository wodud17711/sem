import { describe, it } from "vitest";
import { calcSalary } from "./salary";

const fmt = (n: number) => n.toLocaleString("ko-KR") + "원";

describe("[Snapshot] 일반 연봉별 계산 결과 (홈택스 비교용)", () => {
  const scenarios = [
    { annual: 25_000_000, dep: 1 },
    { annual: 30_000_000, dep: 1 },
    { annual: 40_000_000, dep: 1 },
    { annual: 50_000_000, dep: 1 },
    { annual: 60_000_000, dep: 1 },
    { annual: 70_000_000, dep: 1 },
    { annual: 80_000_000, dep: 1 },
    { annual: 100_000_000, dep: 1 },
    { annual: 50_000_000, dep: 3 },
    { annual: 80_000_000, dep: 4 },
  ];

  for (const s of scenarios) {
    it(`연봉 ${fmt(s.annual)} / 부양 ${s.dep}인 / 식대 적용`, () => {
      const r = calcSalary({
        annualSalary: s.annual,
        dependents: s.dep,
        applyMealAllowance: true,
      });
      const lines = [
        ``,
        `  월 명목급여:    ${fmt(r.monthlyGross)}`,
        `  비과세 식대:    -${fmt(r.monthlyNonTaxable)}`,
        `  국민연금:      -${fmt(r.insurance.nationalPension)}`,
        `  건강보험:      -${fmt(r.insurance.health)}`,
        `  장기요양:      -${fmt(r.insurance.longTermCare)}`,
        `  고용보험:      -${fmt(r.insurance.employment)}`,
        `  소득세:        -${fmt(r.incomeTax)}`,
        `  지방소득세:    -${fmt(r.localIncomeTax)}`,
        `  ─────────────────────────`,
        `  월 실수령:      ${fmt(r.netMonthly)}`,
        `  연 실수령:      ${fmt(r.netAnnual)}`,
      ];
      console.log(lines.join("\n"));
    });
  }
});

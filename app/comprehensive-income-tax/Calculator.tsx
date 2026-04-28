"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";
import { calcComprehensiveIncomeTax } from "@/lib/calculators/comprehensive-income-tax";

const fmt = (n: number) => n.toLocaleString("ko-KR");
const pct = (n: number) => `${(n * 100).toFixed(2)}%`;

export function Calculator() {
  const [incomeText, setIncomeText] = useState("50,000,000");
  const [dependents, setDependents] = useState(1);

  const comprehensiveIncome = useMemo(() => {
    const parsed = parseInt(incomeText.replace(/,/g, ""), 10);
    return Number.isFinite(parsed) ? parsed : 0;
  }, [incomeText]);

  const result = useMemo(() => {
    if (comprehensiveIncome < 0 || dependents < 1) return null;
    try {
      return calcComprehensiveIncomeTax({
        comprehensiveIncome,
        dependents,
      });
    } catch {
      return null;
    }
  }, [comprehensiveIncome, dependents]);

  return (
    <section
      aria-label="종합소득세 간이 계산기"
      className="rounded-xl border border-border bg-background p-6 sm:p-8"
    >
      <div className="grid gap-5">
        <div>
          <label
            htmlFor="comprehensive-income"
            className="block text-sm font-medium text-foreground"
          >
            종합소득금액 (원)
          </label>
          <Input
            id="comprehensive-income"
            type="text"
            inputMode="numeric"
            value={incomeText}
            onChange={(e) => {
              const stripped = e.target.value.replace(/[^0-9]/g, "");
              if (stripped === "") {
                setIncomeText("");
                return;
              }
              const num = parseInt(stripped, 10);
              setIncomeText(num.toLocaleString("ko-KR"));
            }}
            placeholder="예: 50,000,000"
            className="mt-2"
          />
          <p className="mt-1.5 text-xs text-muted-foreground">
            근로·사업·이자·배당·연금·기타 소득에서 필요경비를 차감한 후의
            소득금액 합계.
          </p>
        </div>

        <div>
          <label
            htmlFor="dependents-tax"
            className="block text-sm font-medium text-foreground"
          >
            부양가족 수 (본인 포함)
          </label>
          <Input
            id="dependents-tax"
            type="number"
            min={1}
            max={20}
            value={dependents}
            onChange={(e) => {
              const n = parseInt(e.target.value, 10);
              setDependents(
                Number.isFinite(n) && n >= 1 ? Math.min(n, 20) : 1,
              );
            }}
            className="mt-2 max-w-[120px]"
          />
        </div>
      </div>

      {result && (
        <div className="mt-8 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">총 납부 세액</p>
          <p className="mt-1 text-4xl font-bold tracking-tight sm:text-5xl">
            {fmt(result.totalTax)}
            <span className="ml-1 text-2xl font-semibold sm:text-3xl">원</span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            실효세율 {pct(result.effectiveRate)}
          </p>

          <div className="mt-6 overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">
                    종합소득금액
                  </td>
                  <td className="px-4 py-2.5 text-right font-medium">
                    {fmt(comprehensiveIncome)}원
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">
                    인적공제 ({dependents}인 × 150만원)
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    −{fmt(dependents * 1_500_000)}원
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 font-medium text-foreground">
                    과세표준
                  </td>
                  <td className="px-4 py-2.5 text-right font-medium">
                    {fmt(result.taxableIncome)}원
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">
                    산출세액 (누진세율)
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    {fmt(result.calculatedTax)}원
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">
                    표준세액공제
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    −{fmt(result.taxCredit)}원
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 font-medium text-foreground">
                    결정세액 (소득세)
                  </td>
                  <td className="px-4 py-2.5 text-right font-medium">
                    {fmt(result.determinedTax)}원
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">
                    지방소득세 (10%)
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    {fmt(result.localIncomeTax)}원
                  </td>
                </tr>
                <tr className="bg-muted/40">
                  <td className="px-4 py-2.5 font-semibold text-foreground">
                    총 납부세액
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold">
                    {fmt(result.totalTax)}원
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            ※ 신용카드·의료비·교육비·기부금·연금저축 등 추가 공제는 반영되지
            않은 단순 계산입니다. 정확한 세액은 국세청 홈택스 종합소득세
            모의계산을 사용하세요.
          </p>
        </div>
      )}
    </section>
  );
}

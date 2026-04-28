"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { calcSalary } from "@/lib/calculators/salary";

const fmt = (n: number) => n.toLocaleString("ko-KR");

export function Calculator() {
  const [annualText, setAnnualText] = useState("50,000,000");
  const [dependents, setDependents] = useState(1);
  const [applyMeal, setApplyMeal] = useState(true);

  const annualSalary = useMemo(() => {
    const parsed = parseInt(annualText.replace(/,/g, ""), 10);
    return Number.isFinite(parsed) ? parsed : 0;
  }, [annualText]);

  const result = useMemo(() => {
    if (annualSalary <= 0 || dependents < 1) return null;
    try {
      return calcSalary({
        annualSalary,
        dependents,
        applyMealAllowance: applyMeal,
      });
    } catch {
      return null;
    }
  }, [annualSalary, dependents, applyMeal]);

  return (
    <section
      aria-label="연봉 실수령액 계산기"
      className="rounded-xl border border-border bg-background p-6 sm:p-8"
    >
      <div className="grid gap-5">
        <div>
          <label
            htmlFor="annual-salary"
            className="block text-sm font-medium text-foreground"
          >
            연봉 (원)
          </label>
          <Input
            id="annual-salary"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={annualText}
            onChange={(e) => {
              const stripped = e.target.value.replace(/[^0-9]/g, "");
              if (stripped === "") {
                setAnnualText("");
                return;
              }
              const num = parseInt(stripped, 10);
              setAnnualText(num.toLocaleString("ko-KR"));
            }}
            placeholder="예: 50,000,000"
            className="mt-2"
          />
          <p className="mt-1.5 text-xs text-muted-foreground">
            세전 연봉 총액을 입력하세요. 예: 5천만원이면 50000000
          </p>
        </div>

        <div>
          <label
            htmlFor="dependents"
            className="block text-sm font-medium text-foreground"
          >
            부양가족 수 (본인 포함)
          </label>
          <div className="mt-2 flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={() => setDependents((d) => Math.max(1, d - 1))}
              aria-label="부양가족 수 감소"
            >
              −
            </Button>
            <Input
              id="dependents"
              type="number"
              inputMode="numeric"
              min={1}
              max={20}
              value={dependents}
              onChange={(e) => {
                const n = parseInt(e.target.value, 10);
                setDependents(Number.isFinite(n) && n >= 1 ? Math.min(n, 20) : 1);
              }}
              className="max-w-[80px] text-center"
            />
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={() => setDependents((d) => Math.min(20, d + 1))}
              aria-label="부양가족 수 증가"
            >
              +
            </Button>
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            배우자·자녀 등 인적공제 대상자를 본인 포함해 입력하세요.
          </p>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={applyMeal}
            onChange={(e) => setApplyMeal(e.target.checked)}
            className="mt-1 h-4 w-4 accent-foreground"
          />
          <span>
            <span className="font-medium text-foreground">
              비과세 식대 월 20만원 적용
            </span>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              회사가 식대를 별도 비과세로 지급할 때 체크하세요. 2024년 1월부터
              월 20만원까지 비과세입니다.
            </span>
          </span>
        </label>
      </div>

      {result ? (
        <div className="mt-8 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">월 실수령액</p>
          <p className="mt-1 text-4xl font-bold tracking-tight sm:text-5xl">
            {fmt(result.netMonthly)}
            <span className="ml-1 text-2xl font-semibold sm:text-3xl">원</span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            연 환산 {fmt(result.netAnnual)}원
          </p>

          <div className="mt-6 overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">
                    월 명목급여
                  </td>
                  <td className="px-4 py-2.5 text-right font-medium">
                    {fmt(result.monthlyGross)}원
                  </td>
                </tr>
                {result.monthlyNonTaxable > 0 && (
                  <tr className="border-b border-border">
                    <td className="px-4 py-2.5 text-muted-foreground">
                      비과세 식대
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      −{fmt(result.monthlyNonTaxable)}원
                    </td>
                  </tr>
                )}
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">
                    국민연금
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    −{fmt(result.insurance.nationalPension)}원
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">
                    건강보험
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    −{fmt(result.insurance.health)}원
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">
                    장기요양보험
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    −{fmt(result.insurance.longTermCare)}원
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">
                    고용보험
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    −{fmt(result.insurance.employment)}원
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">소득세</td>
                  <td className="px-4 py-2.5 text-right">
                    −{fmt(result.incomeTax)}원
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">
                    지방소득세
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    −{fmt(result.localIncomeTax)}원
                  </td>
                </tr>
                <tr className="bg-muted/40">
                  <td className="px-4 py-2.5 font-semibold text-foreground">
                    총 공제
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold">
                    −{fmt(result.totalDeduction)}원
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            ※ 신용카드·의료비·자녀세액공제 등 추가 공제는 반영되지 않았습니다.
            정확한 금액은 연말정산 또는 국세청 홈택스에서 확인하세요.
          </p>
        </div>
      ) : (
        annualSalary > 0 && (
          <p className="mt-6 text-sm text-muted-foreground">
            유효한 값을 입력해 주세요.
          </p>
        )
      )}
    </section>
  );
}

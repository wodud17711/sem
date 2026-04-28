"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";
import { calcAnnualLeavePay } from "@/lib/calculators/annual-leave";

const fmt = (n: number) => n.toLocaleString("ko-KR");

export function Calculator() {
  const [wageText, setWageText] = useState("3,000,000");
  const [days, setDays] = useState(5);

  const monthlyOrdinaryWage = useMemo(() => {
    const parsed = parseInt(wageText.replace(/,/g, ""), 10);
    return Number.isFinite(parsed) ? parsed : 0;
  }, [wageText]);

  const result = useMemo(() => {
    if (monthlyOrdinaryWage <= 0 || days < 0) return null;
    try {
      return calcAnnualLeavePay({
        monthlyOrdinaryWage,
        unusedDays: days,
      });
    } catch {
      return null;
    }
  }, [monthlyOrdinaryWage, days]);

  return (
    <section
      aria-label="연차수당 계산기"
      className="rounded-xl border border-border bg-background p-6 sm:p-8"
    >
      <div className="grid gap-5">
        <div>
          <label
            htmlFor="ordinary-wage"
            className="block text-sm font-medium text-foreground"
          >
            월 통상임금 (원)
          </label>
          <Input
            id="ordinary-wage"
            type="text"
            inputMode="numeric"
            value={wageText}
            onChange={(e) => {
              const stripped = e.target.value.replace(/[^0-9]/g, "");
              if (stripped === "") {
                setWageText("");
                return;
              }
              const num = parseInt(stripped, 10);
              setWageText(num.toLocaleString("ko-KR"));
            }}
            placeholder="예: 3,000,000"
            className="mt-2"
          />
          <p className="mt-1.5 text-xs text-muted-foreground">
            기본급 + 정기적·일률적으로 지급되는 수당. 비정기 인센티브는 제외.
          </p>
        </div>

        <div>
          <label
            htmlFor="unused-days"
            className="block text-sm font-medium text-foreground"
          >
            미사용 연차 일수
          </label>
          <Input
            id="unused-days"
            type="number"
            inputMode="numeric"
            min={0}
            max={50}
            value={days}
            onChange={(e) => {
              const n = parseInt(e.target.value, 10);
              setDays(Number.isFinite(n) && n >= 0 ? Math.min(n, 50) : 0);
            }}
            className="mt-2 max-w-[120px]"
          />
        </div>
      </div>

      {result && (
        <div className="mt-8 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">예상 연차수당</p>
          <p className="mt-1 text-4xl font-bold tracking-tight sm:text-5xl">
            {fmt(result.totalPay)}
            <span className="ml-1 text-2xl font-semibold sm:text-3xl">원</span>
          </p>

          <div className="mt-6 overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">
                    시간당 통상임금
                  </td>
                  <td className="px-4 py-2.5 text-right font-medium">
                    {fmt(result.hourlyWage)}원
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">
                    1일 통상임금 (8시간)
                  </td>
                  <td className="px-4 py-2.5 text-right font-medium">
                    {fmt(result.dailyWage)}원
                  </td>
                </tr>
                <tr className="bg-muted/40">
                  <td className="px-4 py-2.5 font-semibold text-foreground">
                    연차수당 ({days}일)
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold">
                    {fmt(result.totalPay)}원
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

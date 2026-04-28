"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";
import { calcSeverance } from "@/lib/calculators/severance";

const fmt = (n: number) => n.toLocaleString("ko-KR");

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
};

export function Calculator() {
  const [hireDate, setHireDate] = useState("2023-01-01");
  const [leaveDate, setLeaveDate] = useState(today());
  const [wageText, setWageText] = useState("4,000,000");

  const monthlyAverageWage = useMemo(() => {
    const parsed = parseInt(wageText.replace(/,/g, ""), 10);
    return Number.isFinite(parsed) ? parsed : 0;
  }, [wageText]);

  const result = useMemo(() => {
    if (!hireDate || !leaveDate || monthlyAverageWage <= 0) return null;
    try {
      return calcSeverance({ hireDate, leaveDate, monthlyAverageWage });
    } catch {
      return null;
    }
  }, [hireDate, leaveDate, monthlyAverageWage]);

  return (
    <section
      aria-label="퇴직금 계산기"
      className="rounded-xl border border-border bg-background p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="hire-date"
            className="block text-sm font-medium text-foreground"
          >
            입사일
          </label>
          <Input
            id="hire-date"
            type="date"
            value={hireDate}
            onChange={(e) => setHireDate(e.target.value)}
            className="mt-2"
          />
        </div>
        <div>
          <label
            htmlFor="leave-date"
            className="block text-sm font-medium text-foreground"
          >
            퇴사일
          </label>
          <Input
            id="leave-date"
            type="date"
            value={leaveDate}
            onChange={(e) => setLeaveDate(e.target.value)}
            className="mt-2"
          />
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="avg-wage"
          className="block text-sm font-medium text-foreground"
        >
          최근 3개월 월 평균 급여 (원)
        </label>
        <Input
          id="avg-wage"
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
          placeholder="예: 4,000,000"
          className="mt-2"
        />
        <p className="mt-1.5 text-xs text-muted-foreground">
          기본급 + 정기 상여금 안분분 + 연차수당 안분분을 포함한 월 평균값.
        </p>
      </div>

      {result && (
        <div className="mt-8 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">예상 퇴직금 (세전)</p>
          <p className="mt-1 text-4xl font-bold tracking-tight sm:text-5xl">
            {fmt(result.severancePay)}
            <span className="ml-1 text-2xl font-semibold sm:text-3xl">원</span>
          </p>

          {result.belowOneYear && (
            <p className="mt-3 rounded-lg border border-border bg-muted/40 p-3 text-sm text-foreground/80">
              재직 1년 미만은 근로자퇴직급여 보장법상 법정 퇴직금이 발생하지
              않습니다 (회사 내규에 따른 위로금은 별개).
            </p>
          )}

          <div className="mt-6 overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">
                    재직일수
                  </td>
                  <td className="px-4 py-2.5 text-right font-medium">
                    {fmt(result.daysWorked)}일 (약{" "}
                    {result.yearsWorked.toFixed(2)}년)
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">
                    1일 평균임금
                  </td>
                  <td className="px-4 py-2.5 text-right font-medium">
                    {fmt(result.dailyAverageWage)}원
                  </td>
                </tr>
                <tr className="bg-muted/40">
                  <td className="px-4 py-2.5 font-semibold text-foreground">
                    퇴직금 (세전)
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold">
                    {fmt(result.severancePay)}원
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            ※ 퇴직소득세는 근속연수와 퇴직금 액수에 따라 별도로 산출되어
            원천징수됩니다. 정확한 세후 수령액은 회사 또는 국세청 홈택스에서
            확인하세요.
          </p>
        </div>
      )}
    </section>
  );
}

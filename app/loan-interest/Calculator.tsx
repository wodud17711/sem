"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";
import { calcLoan } from "@/lib/calculators/loan";

const fmt = (n: number) => n.toLocaleString("ko-KR");

export function Calculator() {
  const [principalText, setPrincipalText] = useState("100,000,000");
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(30);

  const principal = useMemo(() => {
    const n = parseInt(principalText.replace(/,/g, ""), 10);
    return Number.isFinite(n) ? n : 0;
  }, [principalText]);

  const result = useMemo(() => {
    if (principal <= 0 || rate < 0 || years <= 0) return null;
    try {
      return calcLoan({
        principal,
        annualRatePercent: rate,
        months: years * 12,
      });
    } catch {
      return null;
    }
  }, [principal, rate, years]);

  return (
    <section
      aria-label="대출 이자 계산기"
      className="rounded-xl border border-border bg-background p-6 sm:p-8"
    >
      <div className="grid gap-5">
        <div>
          <label className="block text-sm font-medium text-foreground">
            대출 원금 (원)
          </label>
          <Input
            type="text"
            inputMode="numeric"
            value={principalText}
            onChange={(e) => {
              const stripped = e.target.value.replace(/[^0-9]/g, "");
              if (stripped === "") {
                setPrincipalText("");
                return;
              }
              const num = parseInt(stripped, 10);
              setPrincipalText(num.toLocaleString("ko-KR"));
            }}
            className="mt-2"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-foreground">
              연 이자율 (%)
            </label>
            <Input
              type="number"
              min={0}
              max={30}
              step={0.01}
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
              className="mt-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">
              상환 기간 (년)
            </label>
            <Input
              type="number"
              min={1}
              max={50}
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value, 10) || 0)}
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-8 grid gap-6 border-t border-border pt-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border p-5">
            <p className="text-sm font-semibold text-foreground">
              원리금균등 상환
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              매월 같은 금액
            </p>
            <p className="mt-4 text-2xl font-bold tracking-tight">
              {fmt(result.equalPayment.monthlyPayment)}원/월
            </p>
            <div className="mt-4 space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">총 상환액</span>
                <span className="font-medium">
                  {fmt(result.equalPayment.totalPayment)}원
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">총 이자</span>
                <span className="font-medium">
                  {fmt(result.equalPayment.totalInterest)}원
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border p-5">
            <p className="text-sm font-semibold text-foreground">
              원금균등 상환
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              매월 점차 감소
            </p>
            <p className="mt-4 text-sm">
              <span className="text-muted-foreground">첫 달:</span>{" "}
              <span className="font-bold">
                {fmt(result.equalPrincipal.firstMonthPayment)}원
              </span>
            </p>
            <p className="mt-1 text-sm">
              <span className="text-muted-foreground">마지막 달:</span>{" "}
              <span className="font-bold">
                {fmt(result.equalPrincipal.lastMonthPayment)}원
              </span>
            </p>
            <div className="mt-4 space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">총 상환액</span>
                <span className="font-medium">
                  {fmt(result.equalPrincipal.totalPayment)}원
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">총 이자</span>
                <span className="font-medium">
                  {fmt(result.equalPrincipal.totalInterest)}원
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

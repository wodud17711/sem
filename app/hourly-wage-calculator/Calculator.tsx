"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";
import { calcHourlyWage } from "@/lib/calculators/hourly-wage";

/** 2026년 최저시급 */
const MIN_WAGE_2026 = 10_320;

const fmt = (n: number) => n.toLocaleString("ko-KR");

const formatMoney = (s: string) => {
  const stripped = s.replace(/[^0-9]/g, "");
  return stripped === "" ? "" : parseInt(stripped, 10).toLocaleString("ko-KR");
};

const parseMoney = (s: string) => {
  const n = parseInt(s.replace(/,/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
};

const num = (s: string) => {
  const n = parseFloat(s.replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
};

export function Calculator() {
  const [wageText, setWageText] = useState(fmt(MIN_WAGE_2026));
  const [dailyHours, setDailyHours] = useState("8");
  const [daysPerWeek, setDaysPerWeek] = useState("5");

  const hourlyWage = parseMoney(wageText);
  const weeklyHours = num(dailyHours) * num(daysPerWeek);

  const result = useMemo(() => {
    if (hourlyWage <= 0 || weeklyHours <= 0) return null;
    try {
      return calcHourlyWage({ hourlyWage, weeklyHours });
    } catch {
      return null;
    }
  }, [hourlyWage, weeklyHours]);

  return (
    <section
      aria-label="시급 주휴수당 계산기"
      className="rounded-xl border border-border bg-background p-6 sm:p-8"
    >
      <div className="grid gap-5">
        <div>
          <label className="block text-sm font-medium text-foreground">
            시급 (원)
          </label>
          <Input
            type="text"
            inputMode="numeric"
            value={wageText}
            onChange={(e) => setWageText(formatMoney(e.target.value))}
            className="mt-2"
          />
          <button
            type="button"
            onClick={() => setWageText(fmt(MIN_WAGE_2026))}
            className="mt-2 text-xs text-muted-foreground underline-offset-2 hover:underline"
          >
            2026년 최저시급 {fmt(MIN_WAGE_2026)}원 적용
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground">
              하루 근로시간
            </label>
            <Input
              type="number"
              min={0}
              max={24}
              step={0.5}
              value={dailyHours}
              onChange={(e) => setDailyHours(e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">
              주 근로일수
            </label>
            <Input
              type="number"
              min={0}
              max={7}
              step={1}
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(e.target.value)}
              className="mt-2"
            />
          </div>
        </div>

        {weeklyHours > 0 && (
          <p className="text-sm text-muted-foreground">
            1주 소정근로시간{" "}
            <strong className="font-semibold text-foreground">
              {fmt(weeklyHours)}시간
            </strong>
          </p>
        )}
      </div>

      {result && (
        <div className="mt-8 space-y-4 border-t border-border pt-6">
          {!result.eligible && (
            <p className="rounded-lg border border-border bg-muted/40 p-3 text-sm text-foreground/80">
              주 15시간 미만이라 주휴수당이 발생하지 않습니다.
            </p>
          )}

          <div className="flex items-end justify-between gap-4">
            <span className="text-sm text-muted-foreground">
              주휴수당 (주 {result.weeklyHolidayHours}시간분)
            </span>
            <span className="text-xl font-semibold">
              {fmt(result.weeklyHolidayPay)}원
            </span>
          </div>
          <div className="flex items-end justify-between gap-4">
            <span className="text-sm text-muted-foreground">
              주급 (주휴 포함)
            </span>
            <span className="text-xl font-semibold">
              {fmt(result.weeklyPay)}원
            </span>
          </div>
          <div className="flex items-end justify-between gap-4 border-t border-border pt-4">
            <span className="text-sm font-medium text-foreground">
              월급 환산 (약 {fmt(result.monthlyHours)}시간)
            </span>
            <span className="text-3xl font-bold tracking-tight sm:text-4xl">
              {fmt(result.monthlyPay)}
              <span className="ml-1 text-xl font-semibold sm:text-2xl">원</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            연장·야간·휴일근로 가산수당은 포함되지 않은 소정근로 기준 금액입니다.
          </p>
        </div>
      )}
    </section>
  );
}

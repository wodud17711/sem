"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";
import { calcUnemployment } from "@/lib/calculators/unemployment";

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
  const [wageText, setWageText] = useState("3,000,000");
  const [age, setAge] = useState("35");
  const [years, setYears] = useState("3");

  const monthlyWage = parseMoney(wageText);
  const ageNum = num(age);
  const insuredYears = num(years);

  const result = useMemo(() => {
    if (monthlyWage <= 0 || ageNum <= 0) return null;
    try {
      return calcUnemployment({ monthlyWage, age: ageNum, insuredYears });
    } catch {
      return null;
    }
  }, [monthlyWage, ageNum, insuredYears]);

  return (
    <section
      aria-label="실업급여 계산기"
      className="rounded-xl border border-border bg-background p-6 sm:p-8"
    >
      <div className="grid gap-5">
        <div>
          <label className="block text-sm font-medium text-foreground">
            월 평균임금 (퇴사 전 3개월 평균, 세전)
          </label>
          <Input
            type="text"
            inputMode="numeric"
            value={wageText}
            onChange={(e) => setWageText(formatMoney(e.target.value))}
            className="mt-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground">
              만 나이 (이직일 기준)
            </label>
            <Input
              type="number"
              min={0}
              max={120}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">
              고용보험 가입기간 (년)
            </label>
            <Input
              type="number"
              min={0}
              max={50}
              step={0.5}
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-8 space-y-4 border-t border-border pt-6">
          <div className="flex items-end justify-between gap-4">
            <span className="text-sm text-muted-foreground">
              1일 구직급여일액
            </span>
            <span className="text-xl font-semibold">
              {fmt(result.dailyBenefit)}원
            </span>
          </div>
          {result.cappedAtUpper && (
            <p className="text-xs text-muted-foreground">
              평균임금의 60%가 상한액(68,100원)을 넘어 상한액이 적용됐습니다.
            </p>
          )}
          {result.cappedAtLower && (
            <p className="text-xs text-muted-foreground">
              평균임금의 60%가 하한액(66,048원)보다 적어 하한액이 적용됐습니다.
            </p>
          )}
          <div className="flex items-end justify-between gap-4">
            <span className="text-sm text-muted-foreground">소정급여일수</span>
            <span className="text-xl font-semibold">{result.benefitDays}일</span>
          </div>
          <div className="flex items-end justify-between gap-4 border-t border-border pt-4">
            <span className="text-sm font-medium text-foreground">
              총 예상 수급액
            </span>
            <span className="text-3xl font-bold tracking-tight sm:text-4xl">
              {fmt(result.totalBenefit)}
              <span className="ml-1 text-xl font-semibold sm:text-2xl">원</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            평균임금일액을 월급 ÷ 30으로 근사한 추정치입니다. 실제 수급액은
            고용보험 모의계산 결과와 다를 수 있습니다.
          </p>
        </div>
      )}
    </section>
  );
}

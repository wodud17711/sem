"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";
import {
  type CompanySize,
  calcFourInsurance,
  type FourInsuranceShare,
} from "@/lib/calculators/four-insurance";

const fmt = (n: number) => n.toLocaleString("ko-KR");

const sizeLabels: Record<CompanySize, string> = {
  "under-150": "150인 미만",
  "150-999": "150-999인",
  "1000-plus": "1,000인 이상",
};

function ShareTable({
  share,
  side,
}: {
  share: FourInsuranceShare;
  side: "근로자" | "사업주";
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/40">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">{side} 부담</th>
            <th className="px-4 py-3 text-right font-semibold">월 부담액</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-border">
            <td className="px-4 py-2.5 text-muted-foreground">국민연금</td>
            <td className="px-4 py-2.5 text-right">
              {fmt(share.nationalPension)}원
            </td>
          </tr>
          <tr className="border-t border-border">
            <td className="px-4 py-2.5 text-muted-foreground">건강보험</td>
            <td className="px-4 py-2.5 text-right">{fmt(share.health)}원</td>
          </tr>
          <tr className="border-t border-border">
            <td className="px-4 py-2.5 text-muted-foreground">장기요양보험</td>
            <td className="px-4 py-2.5 text-right">
              {fmt(share.longTermCare)}원
            </td>
          </tr>
          <tr className="border-t border-border">
            <td className="px-4 py-2.5 text-muted-foreground">고용보험</td>
            <td className="px-4 py-2.5 text-right">
              {fmt(share.employment)}원
            </td>
          </tr>
          {share.industrialAccident !== undefined && (
            <tr className="border-t border-border">
              <td className="px-4 py-2.5 text-muted-foreground">
                산재보험 (업종 평균)
              </td>
              <td className="px-4 py-2.5 text-right">
                {fmt(share.industrialAccident)}원
              </td>
            </tr>
          )}
          <tr className="border-t border-border bg-muted/40">
            <td className="px-4 py-2.5 font-semibold text-foreground">합계</td>
            <td className="px-4 py-2.5 text-right font-semibold">
              {fmt(share.total)}원
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function Calculator() {
  const [grossText, setGrossText] = useState("3,500,000");
  const [applyMeal, setApplyMeal] = useState(true);
  const [companySize, setCompanySize] = useState<CompanySize>("under-150");

  const monthlyGross = useMemo(() => {
    const parsed = parseInt(grossText.replace(/,/g, ""), 10);
    return Number.isFinite(parsed) ? parsed : 0;
  }, [grossText]);

  const result = useMemo(() => {
    if (monthlyGross <= 0) return null;
    try {
      return calcFourInsurance({
        monthlyGross,
        applyMealAllowance: applyMeal,
        companySize,
      });
    } catch {
      return null;
    }
  }, [monthlyGross, applyMeal, companySize]);

  return (
    <section
      aria-label="4대보험 계산기"
      className="rounded-xl border border-border bg-background p-6 sm:p-8"
    >
      <div className="grid gap-5">
        <div>
          <label
            htmlFor="monthly-gross"
            className="block text-sm font-medium text-foreground"
          >
            월 명목급여 (원)
          </label>
          <Input
            id="monthly-gross"
            type="text"
            inputMode="numeric"
            value={grossText}
            onChange={(e) => {
              const stripped = e.target.value.replace(/[^0-9]/g, "");
              if (stripped === "") {
                setGrossText("");
                return;
              }
              const num = parseInt(stripped, 10);
              setGrossText(num.toLocaleString("ko-KR"));
            }}
            placeholder="예: 3,500,000"
            className="mt-2"
          />
        </div>

        <div>
          <label
            htmlFor="company-size"
            className="block text-sm font-medium text-foreground"
          >
            회사 규모
          </label>
          <select
            id="company-size"
            value={companySize}
            onChange={(e) => setCompanySize(e.target.value as CompanySize)}
            className="mt-2 h-12 w-full rounded-lg border border-border bg-background px-4 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            {(Object.keys(sizeLabels) as CompanySize[]).map((size) => (
              <option key={size} value={size}>
                {sizeLabels[size]}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-muted-foreground">
            사업주 고용보험 요율은 회사 규모에 따라 1.15~1.75% 사이로 달라집니다.
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
          </span>
        </label>
      </div>

      {result && (
        <div className="mt-8 space-y-6 border-t border-border pt-6">
          <div className="grid gap-2 sm:grid-cols-3">
            <div className="rounded-lg border border-border p-4">
              <p className="text-xs text-muted-foreground">근로자 부담</p>
              <p className="mt-1 text-xl font-bold tracking-tight">
                {fmt(result.worker.total)}원
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-xs text-muted-foreground">사업주 부담</p>
              <p className="mt-1 text-xl font-bold tracking-tight">
                {fmt(result.employer.total)}원
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/40 p-4">
              <p className="text-xs text-muted-foreground">총합</p>
              <p className="mt-1 text-xl font-bold tracking-tight">
                {fmt(result.combined)}원
              </p>
            </div>
          </div>
          <ShareTable share={result.worker} side="근로자" />
          <ShareTable share={result.employer} side="사업주" />
          <p className="text-xs text-muted-foreground">
            ※ 산재보험은 업종별 요율이 다르며, 본 계산은 전체 평균치를
            사용합니다. 실제 부담은 사업장 업종 분류에 따라 달라집니다.
          </p>
        </div>
      )}
    </section>
  );
}

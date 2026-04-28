"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";
import { calcRealEstateTax } from "@/lib/calculators/real-estate-tax";

const fmt = (n: number) => n.toLocaleString("ko-KR");

const parseMoney = (s: string) => {
  const n = parseInt(s.replace(/,/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
};

const formatMoney = (s: string) => {
  const stripped = s.replace(/[^0-9]/g, "");
  if (stripped === "") return "";
  return parseInt(stripped, 10).toLocaleString("ko-KR");
};

export function Calculator() {
  const [acq, setAcq] = useState("500,000,000");
  const [sale, setSale] = useState("700,000,000");
  const [exp, setExp] = useState("10,000,000");
  const [holdYears, setHoldYears] = useState(5);
  const [isOneHouse, setIsOneHouse] = useState(true);

  const result = useMemo(() => {
    try {
      return calcRealEstateTax({
        acquisitionPrice: parseMoney(acq),
        salePrice: parseMoney(sale),
        expenses: parseMoney(exp),
        holdingYears: holdYears,
        isOneHouseOneFamily: isOneHouse,
      });
    } catch {
      return null;
    }
  }, [acq, sale, exp, holdYears, isOneHouse]);

  return (
    <section
      aria-label="부동산 양도세 간이 계산기"
      className="rounded-xl border border-border bg-background p-6 sm:p-8"
    >
      <div className="grid gap-5">
        <div>
          <label className="block text-sm font-medium text-foreground">
            취득가 (원)
          </label>
          <Input
            type="text"
            inputMode="numeric"
            value={acq}
            onChange={(e) => setAcq(formatMoney(e.target.value))}
            className="mt-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">
            양도가 (원)
          </label>
          <Input
            type="text"
            inputMode="numeric"
            value={sale}
            onChange={(e) => setSale(formatMoney(e.target.value))}
            className="mt-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">
            필요경비 (취득세·중개수수료 등, 원)
          </label>
          <Input
            type="text"
            inputMode="numeric"
            value={exp}
            onChange={(e) => setExp(formatMoney(e.target.value))}
            className="mt-2"
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-foreground">
              보유기간 (년)
            </label>
            <Input
              type="number"
              min={0}
              max={60}
              step={0.5}
              value={holdYears}
              onChange={(e) => setHoldYears(parseFloat(e.target.value) || 0)}
              className="mt-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">
              주택 보유
            </label>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setIsOneHouse(true)}
                className={`h-12 flex-1 rounded-lg border text-sm font-medium transition-colors ${
                  isOneHouse
                    ? "border-foreground bg-accent text-accent-foreground"
                    : "border-border bg-background text-foreground hover:bg-muted"
                }`}
              >
                1세대 1주택
              </button>
              <button
                type="button"
                onClick={() => setIsOneHouse(false)}
                className={`h-12 flex-1 rounded-lg border text-sm font-medium transition-colors ${
                  !isOneHouse
                    ? "border-foreground bg-accent text-accent-foreground"
                    : "border-border bg-background text-foreground hover:bg-muted"
                }`}
              >
                다주택
              </button>
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-8 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">예상 양도세 (총)</p>
          <p className="mt-1 text-4xl font-bold tracking-tight sm:text-5xl">
            {fmt(result.totalTax)}
            <span className="ml-1 text-2xl font-semibold sm:text-3xl">원</span>
          </p>

          {result.isExempt && (
            <div className="mt-3 rounded-lg border border-foreground/30 bg-muted/40 p-3 text-sm">
              <strong className="font-semibold text-foreground">비과세:</strong>{" "}
              {result.exemptReason}
            </div>
          )}

          <div className="mt-6 overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">
                    양도차익
                  </td>
                  <td className="px-4 py-2.5 text-right font-medium">
                    {fmt(result.capitalGain)}원
                  </td>
                </tr>
                {!result.isExempt && (
                  <>
                    <tr className="border-b border-border">
                      <td className="px-4 py-2.5 text-muted-foreground">
                        장기보유특별공제
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        −{fmt(result.longTermDeduction)}원
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="px-4 py-2.5 text-muted-foreground">
                        기본공제
                      </td>
                      <td className="px-4 py-2.5 text-right">−2,500,000원</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        과세표준
                      </td>
                      <td className="px-4 py-2.5 text-right font-medium">
                        {fmt(result.taxableBase)}원
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="px-4 py-2.5 text-muted-foreground">
                        산출세액 (소득세)
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        {fmt(result.calculatedTax)}원
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="px-4 py-2.5 text-muted-foreground">
                        지방소득세
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        {fmt(result.localTax)}원
                      </td>
                    </tr>
                    <tr className="bg-muted/40">
                      <td className="px-4 py-2.5 font-semibold text-foreground">
                        총 양도세
                      </td>
                      <td className="px-4 py-2.5 text-right font-semibold">
                        {fmt(result.totalTax)}원
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            ※ 다주택 중과세, 조정대상지역, 1세대 1주택 12억 초과분 처리는
            반영되지 않은 단순 추산입니다. 정확한 양도세는 국세청 홈택스 또는
            세무사 상담을 통해 확인하세요.
          </p>
        </div>
      )}
    </section>
  );
}

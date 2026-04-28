"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";
import {
  calcDeposit,
  type DepositType,
} from "@/lib/calculators/deposit-savings";

const fmt = (n: number) => n.toLocaleString("ko-KR");

export function Calculator() {
  const [type, setType] = useState<DepositType>("savings");
  const [amountText, setAmountText] = useState("300,000");
  const [rate, setRate] = useState(4);
  const [months, setMonths] = useState(12);

  const amount = useMemo(() => {
    const n = parseInt(amountText.replace(/,/g, ""), 10);
    return Number.isFinite(n) ? n : 0;
  }, [amountText]);

  const result = useMemo(() => {
    if (amount <= 0 || rate < 0 || months <= 0) return null;
    try {
      return calcDeposit({ type, amount, annualRatePercent: rate, months });
    } catch {
      return null;
    }
  }, [type, amount, rate, months]);

  return (
    <section
      aria-label="적금/예금 만기 계산기"
      className="rounded-xl border border-border bg-background p-6 sm:p-8"
    >
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setType("savings")}
          className={`h-12 flex-1 rounded-lg border text-sm font-medium transition-colors ${
            type === "savings"
              ? "border-foreground bg-accent text-accent-foreground"
              : "border-border bg-background text-foreground hover:bg-muted"
          }`}
        >
          정기적금 (매월 납입)
        </button>
        <button
          type="button"
          onClick={() => setType("deposit")}
          className={`h-12 flex-1 rounded-lg border text-sm font-medium transition-colors ${
            type === "deposit"
              ? "border-foreground bg-accent text-accent-foreground"
              : "border-border bg-background text-foreground hover:bg-muted"
          }`}
        >
          정기예금 (일시 예치)
        </button>
      </div>

      <div className="mt-6 grid gap-5">
        <div>
          <label className="block text-sm font-medium text-foreground">
            {type === "savings" ? "월 납입액 (원)" : "예치 금액 (원)"}
          </label>
          <Input
            type="text"
            inputMode="numeric"
            value={amountText}
            onChange={(e) => {
              const stripped = e.target.value.replace(/[^0-9]/g, "");
              if (stripped === "") {
                setAmountText("");
                return;
              }
              setAmountText(parseInt(stripped, 10).toLocaleString("ko-KR"));
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
              max={20}
              step={0.01}
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
              className="mt-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">
              기간 (개월)
            </label>
            <Input
              type="number"
              min={1}
              max={120}
              value={months}
              onChange={(e) => setMonths(parseInt(e.target.value, 10) || 0)}
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-8 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">만기 수령액 (세후)</p>
          <p className="mt-1 text-4xl font-bold tracking-tight sm:text-5xl">
            {fmt(result.postTaxTotal)}
            <span className="ml-1 text-2xl font-semibold sm:text-3xl">원</span>
          </p>

          <div className="mt-6 overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">원금</td>
                  <td className="px-4 py-2.5 text-right font-medium">
                    {fmt(result.principal)}원
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">
                    세전 이자 (단리)
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    {fmt(result.preTaxInterest)}원
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">
                    이자소득세 (15.4%)
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    −{fmt(result.tax)}원
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">
                    세후 이자
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    {fmt(result.postTaxInterest)}원
                  </td>
                </tr>
                <tr className="bg-muted/40">
                  <td className="px-4 py-2.5 font-semibold text-foreground">
                    세후 만기 수령액
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold">
                    {fmt(result.postTaxTotal)}원
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            ※ 단리 기준 계산입니다. 일부 상품은 복리·우대금리·세금우대 혜택이
            적용되어 수령액이 다를 수 있습니다.
          </p>
        </div>
      )}
    </section>
  );
}

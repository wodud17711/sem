"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";
import { fromSupply, fromTotal } from "@/lib/calculators/vat";

const fmt = (n: number) => n.toLocaleString("ko-KR");

const formatMoney = (s: string) => {
  const stripped = s.replace(/[^0-9]/g, "");
  return stripped === "" ? "" : parseInt(stripped, 10).toLocaleString("ko-KR");
};

const parseMoney = (s: string) => {
  const n = parseInt(s.replace(/,/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
};

export function Calculator() {
  const [mode, setMode] = useState<"supply" | "total">("supply");
  const [amountText, setAmountText] = useState("1,000,000");

  const amount = parseMoney(amountText);

  const result = useMemo(() => {
    if (amount <= 0) return null;
    return mode === "supply" ? fromSupply(amount) : fromTotal(amount);
  }, [mode, amount]);

  return (
    <section
      aria-label="부가가치세 계산기"
      className="rounded-xl border border-border bg-background p-6 sm:p-8"
    >
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("supply")}
          className={`h-12 flex-1 rounded-lg border text-sm font-medium transition-colors ${
            mode === "supply"
              ? "border-foreground bg-accent text-accent-foreground"
              : "border-border bg-background text-foreground hover:bg-muted"
          }`}
        >
          공급가액 기준
        </button>
        <button
          type="button"
          onClick={() => setMode("total")}
          className={`h-12 flex-1 rounded-lg border text-sm font-medium transition-colors ${
            mode === "total"
              ? "border-foreground bg-accent text-accent-foreground"
              : "border-border bg-background text-foreground hover:bg-muted"
          }`}
        >
          합계 기준
        </button>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-foreground">
          {mode === "supply"
            ? "공급가액 (부가세 제외, 원)"
            : "합계 금액 (부가세 포함, 원)"}
        </label>
        <Input
          type="text"
          inputMode="numeric"
          value={amountText}
          onChange={(e) => setAmountText(formatMoney(e.target.value))}
          className="mt-2"
        />
        <p className="mt-1.5 text-xs text-muted-foreground">
          {mode === "supply"
            ? "부가세를 더하기 전 금액을 입력하면 부가세와 합계를 계산합니다."
            : "부가세가 포함된 최종 금액을 입력하면 공급가액과 부가세로 분리합니다."}
        </p>
      </div>

      {result && (
        <div className="mt-8 space-y-4 border-t border-border pt-6">
          <div className="flex items-end justify-between gap-4">
            <span className="text-sm text-muted-foreground">공급가액</span>
            <span className="text-xl font-semibold">{fmt(result.supply)}원</span>
          </div>
          <div className="flex items-end justify-between gap-4">
            <span className="text-sm text-muted-foreground">부가세 (10%)</span>
            <span className="text-xl font-semibold">{fmt(result.vat)}원</span>
          </div>
          <div className="flex items-end justify-between gap-4 border-t border-border pt-4">
            <span className="text-sm font-medium text-foreground">
              합계 (공급대가)
            </span>
            <span className="text-3xl font-bold tracking-tight sm:text-4xl">
              {fmt(result.total)}
              <span className="ml-1 text-xl font-semibold sm:text-2xl">원</span>
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";
import { pyeongToSqm, sqmToPyeong } from "@/lib/calculators/pyeong";

const fmt = (n: number) =>
  n.toLocaleString("ko-KR", { maximumFractionDigits: 2 });

export function Calculator() {
  const [direction, setDirection] = useState<"pyeong-to-sqm" | "sqm-to-pyeong">(
    "sqm-to-pyeong",
  );
  const [valueText, setValueText] = useState("84");

  const value = parseFloat(valueText.replace(/,/g, "")) || 0;

  const result = useMemo(() => {
    if (value <= 0) return null;
    return direction === "pyeong-to-sqm"
      ? pyeongToSqm(value)
      : sqmToPyeong(value);
  }, [direction, value]);

  const fromUnit = direction === "pyeong-to-sqm" ? "평" : "㎡";
  const toUnit = direction === "pyeong-to-sqm" ? "㎡" : "평";

  return (
    <section
      aria-label="평수 변환기"
      className="rounded-xl border border-border bg-background p-6 sm:p-8"
    >
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setDirection("sqm-to-pyeong")}
          className={`h-12 flex-1 rounded-lg border text-sm font-medium transition-colors ${
            direction === "sqm-to-pyeong"
              ? "border-foreground bg-accent text-accent-foreground"
              : "border-border bg-background text-foreground hover:bg-muted"
          }`}
        >
          ㎡ → 평
        </button>
        <button
          type="button"
          onClick={() => setDirection("pyeong-to-sqm")}
          className={`h-12 flex-1 rounded-lg border text-sm font-medium transition-colors ${
            direction === "pyeong-to-sqm"
              ? "border-foreground bg-accent text-accent-foreground"
              : "border-border bg-background text-foreground hover:bg-muted"
          }`}
        >
          평 → ㎡
        </button>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-foreground">
          {fromUnit} 면적
        </label>
        <div className="mt-2 flex items-center gap-2">
          <Input
            type="text"
            inputMode="decimal"
            value={valueText}
            onChange={(e) => setValueText(e.target.value)}
            className="max-w-[200px]"
          />
          <span className="text-lg font-medium text-muted-foreground">
            {fromUnit}
          </span>
        </div>
      </div>

      {result !== null && (
        <div className="mt-8 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">{toUnit} 환산</p>
          <p className="mt-1 text-4xl font-bold tracking-tight sm:text-5xl">
            {fmt(result)}
            <span className="ml-1 text-2xl font-semibold sm:text-3xl">
              {toUnit}
            </span>
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {fmt(value)}
            {fromUnit} = {fmt(result)}
            {toUnit}
          </p>
        </div>
      )}
    </section>
  );
}

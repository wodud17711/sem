"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";
import { CURRENCIES, convertCurrency } from "@/lib/calculators/exchange-rate";

const fmt = (n: number, max = 4) =>
  n.toLocaleString("ko-KR", { maximumFractionDigits: max });

export function Calculator() {
  const [amountText, setAmountText] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("KRW");

  const amount = parseFloat(amountText);

  const result = useMemo(() => {
    if (!Number.isFinite(amount)) return null;
    try {
      return convertCurrency(amount, from, to);
    } catch {
      return null;
    }
  }, [amount, from, to]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <section
      aria-label="환율 계산기"
      className="rounded-xl border border-border bg-background p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <div>
          <label className="block text-sm font-medium text-foreground">
            금액
          </label>
          <Input
            type="number"
            inputMode="decimal"
            step="any"
            value={amountText}
            onChange={(e) => setAmountText(e.target.value)}
            className="mt-2"
          />
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="mt-2 h-12 w-full rounded-lg border border-border bg-background px-4 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end justify-center pb-2">
          <button
            type="button"
            onClick={swap}
            aria-label="통화 위치 바꾸기"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
          >
            ⇄
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground">
            결과
          </label>
          <div className="mt-2 flex h-12 items-center rounded-lg border border-border bg-muted/30 px-4 text-base font-medium text-foreground">
            {result !== null ? fmt(result) : "—"}
          </div>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="mt-2 h-12 w-full rounded-lg border border-border bg-background px-4 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {result !== null && (
        <div className="mt-6 border-t border-border pt-4 text-sm text-muted-foreground">
          {fmt(amount)} {from} = <strong className="font-semibold text-foreground">
            {fmt(result)}
          </strong> {to}
        </div>
      )}
    </section>
  );
}

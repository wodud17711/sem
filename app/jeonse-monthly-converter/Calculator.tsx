"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";
import { calcJeonseConversion } from "@/lib/calculators/jeonse";

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
  const [direction, setDirection] = useState<
    "deposit-to-rent" | "rent-to-deposit"
  >("deposit-to-rent");
  const [amountText, setAmountText] = useState("100,000,000");
  const [rate, setRate] = useState(5);
  const [remainingDepositText, setRemainingDepositText] = useState("0");

  const amount = parseMoney(amountText);
  const remainingDeposit = parseMoney(remainingDepositText);

  const result = useMemo(() => {
    if (amount <= 0 || rate <= 0) return null;
    try {
      return calcJeonseConversion({
        direction,
        inputAmount: amount,
        conversionRatePercent: rate,
        remainingDeposit:
          direction === "deposit-to-rent" ? remainingDeposit : 0,
      });
    } catch {
      return null;
    }
  }, [direction, amount, rate, remainingDeposit]);

  return (
    <section
      aria-label="전월세 환산 계산기"
      className="rounded-xl border border-border bg-background p-6 sm:p-8"
    >
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setDirection("deposit-to-rent")}
          className={`h-12 flex-1 rounded-lg border text-sm font-medium transition-colors ${
            direction === "deposit-to-rent"
              ? "border-foreground bg-accent text-accent-foreground"
              : "border-border bg-background text-foreground hover:bg-muted"
          }`}
        >
          보증금 → 월세
        </button>
        <button
          type="button"
          onClick={() => setDirection("rent-to-deposit")}
          className={`h-12 flex-1 rounded-lg border text-sm font-medium transition-colors ${
            direction === "rent-to-deposit"
              ? "border-foreground bg-accent text-accent-foreground"
              : "border-border bg-background text-foreground hover:bg-muted"
          }`}
        >
          월세 → 보증금
        </button>
      </div>

      <div className="mt-6 grid gap-5">
        <div>
          <label className="block text-sm font-medium text-foreground">
            {direction === "deposit-to-rent"
              ? "전체 보증금 (원)"
              : "월세 (원)"}
          </label>
          <Input
            type="text"
            inputMode="numeric"
            value={amountText}
            onChange={(e) => setAmountText(formatMoney(e.target.value))}
            className="mt-2"
          />
        </div>

        {direction === "deposit-to-rent" && (
          <div>
            <label className="block text-sm font-medium text-foreground">
              남길 보증금 (원, 반전세인 경우)
            </label>
            <Input
              type="text"
              inputMode="numeric"
              value={remainingDepositText}
              onChange={(e) =>
                setRemainingDepositText(formatMoney(e.target.value))
              }
              className="mt-2"
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              전체 보증금 중 일부를 월세로 전환할 때 남길 금액. 0이면 전부 월세로
              환산.
            </p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-foreground">
            전월세 전환율 (%)
          </label>
          <Input
            type="number"
            min={0}
            max={20}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
            className="mt-2 max-w-[120px]"
          />
          <p className="mt-1.5 text-xs text-muted-foreground">
            한국부동산원 발표 평균 약 5~6%. 지역별로 차이가 있습니다.
          </p>
        </div>
      </div>

      {result && (
        <div className="mt-8 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">
            {direction === "deposit-to-rent" ? "월세" : "보증금"}
          </p>
          <p className="mt-1 text-4xl font-bold tracking-tight sm:text-5xl">
            {fmt(result.result)}
            <span className="ml-1 text-2xl font-semibold sm:text-3xl">원</span>
          </p>

          {direction === "deposit-to-rent" && remainingDeposit > 0 && (
            <p className="mt-3 text-sm text-muted-foreground">
              보증금 {fmt(remainingDeposit)}원 + 월세 {fmt(result.result)}원
            </p>
          )}
        </div>
      )}
    </section>
  );
}

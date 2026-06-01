"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";
import {
  percentChange,
  percentPortion,
  percentRatio,
} from "@/lib/calculators/percent";

type Mode = "ratio" | "portion" | "change";

const MODES: { id: Mode; label: string }[] = [
  { id: "ratio", label: "비율" },
  { id: "portion", label: "퍼센트 값" },
  { id: "change", label: "증감률" },
];

const fmt = (n: number) =>
  n.toLocaleString("ko-KR", { maximumFractionDigits: 2 });

const num = (s: string) => {
  const n = parseFloat(s.replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
};

export function Calculator() {
  const [mode, setMode] = useState<Mode>("ratio");
  const [a, setA] = useState("30");
  const [b, setB] = useState("200");

  const aNum = num(a);
  const bNum = num(b);

  const output = useMemo(() => {
    if (aNum === null || bNum === null) return null;
    if (mode === "ratio") {
      const v = percentRatio(aNum, bNum);
      return Number.isNaN(v)
        ? null
        : { value: `${fmt(v)}%`, note: `${fmt(aNum)}은(는) ${fmt(bNum)}의` };
    }
    if (mode === "portion") {
      const v = percentPortion(aNum, bNum);
      return { value: fmt(v), note: `${fmt(bNum)}의 ${fmt(aNum)}%는` };
    }
    const v = percentChange(aNum, bNum);
    if (Number.isNaN(v)) return null;
    const word = v > 0 ? "증가" : v < 0 ? "감소" : "변동 없음";
    return {
      value: `${v > 0 ? "+" : ""}${fmt(v)}%`,
      note: `${fmt(aNum)} → ${fmt(bNum)} (${word})`,
    };
  }, [mode, aNum, bNum]);

  const labels =
    mode === "ratio"
      ? { a: "부분 값 (A)", b: "전체 값 (B)" }
      : mode === "portion"
        ? { a: "퍼센트 (%)", b: "전체 값" }
        : { a: "기준 값 (이전)", b: "비교 값 (이후)" };

  const question =
    mode === "ratio"
      ? "A는 B의 몇 %인가요?"
      : mode === "portion"
        ? "전체 값의 몇 %는 얼마인가요?"
        : "값이 얼마나 증가/감소했나요?";

  return (
    <section
      aria-label="퍼센트 계산기"
      className="rounded-xl border border-border bg-background p-6 sm:p-8"
    >
      <div className="flex gap-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={`h-12 flex-1 rounded-lg border text-sm font-medium transition-colors ${
              mode === m.id
                ? "border-foreground bg-accent text-accent-foreground"
                : "border-border bg-background text-foreground hover:bg-muted"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <p className="mt-5 text-sm text-muted-foreground">{question}</p>

      <div className="mt-3 grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-foreground">
            {labels.a}
          </label>
          <Input
            type="text"
            inputMode="decimal"
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="mt-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">
            {labels.b}
          </label>
          <Input
            type="text"
            inputMode="decimal"
            value={b}
            onChange={(e) => setB(e.target.value)}
            className="mt-2"
          />
        </div>
      </div>

      {output && (
        <div className="mt-8 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">{output.note}</p>
          <p className="mt-1 text-4xl font-bold tracking-tight sm:text-5xl">
            {output.value}
          </p>
        </div>
      )}
    </section>
  );
}

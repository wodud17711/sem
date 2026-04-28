"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";
import { type UnitCategory, UNITS, convert } from "@/lib/calculators/units";

const TABS: { id: UnitCategory; label: string }[] = [
  { id: "length", label: "길이" },
  { id: "weight", label: "무게" },
  { id: "volume", label: "부피" },
];

export function Calculator() {
  const [category, setCategory] = useState<UnitCategory>("length");
  const [valueText, setValueText] = useState("1");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("ft");

  const value = parseFloat(valueText);

  const result = useMemo(() => {
    if (!Number.isFinite(value)) return null;
    try {
      return convert(category, from, to, value);
    } catch {
      return null;
    }
  }, [category, from, to, value]);

  const allConversions = useMemo(() => {
    if (!Number.isFinite(value)) return [];
    return UNITS[category]
      .filter((u) => u.id !== from)
      .map((u) => ({
        unit: u,
        result: convert(category, from, u.id, value),
      }));
  }, [category, from, value]);

  const setCategoryAndDefaults = (c: UnitCategory) => {
    setCategory(c);
    const units = UNITS[c];
    setFrom(units[2]?.id ?? units[0].id);
    setTo(units[3]?.id ?? units[1].id);
  };

  return (
    <section
      aria-label="단위 변환기"
      className="rounded-xl border border-border bg-background p-6 sm:p-8"
    >
      <div role="tablist" className="flex gap-1 border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={category === tab.id}
            onClick={() => setCategoryAndDefaults(tab.id)}
            className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              category === tab.id
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-foreground">값</label>
          <Input
            type="number"
            inputMode="decimal"
            step="any"
            value={valueText}
            onChange={(e) => setValueText(e.target.value)}
            className="mt-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">
            변환 전
          </label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="mt-2 h-12 w-full rounded-lg border border-border bg-background px-4 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            {UNITS[category].map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">
            변환 후
          </label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="mt-2 h-12 w-full rounded-lg border border-border bg-background px-4 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            {UNITS[category].map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {result !== null && (
        <div className="mt-8 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">결과</p>
          <p className="mt-1 text-3xl font-bold tracking-tight">
            {result.toLocaleString("ko-KR", { maximumFractionDigits: 6 })}{" "}
            <span className="text-lg font-medium text-muted-foreground">
              {UNITS[category].find((u) => u.id === to)?.label}
            </span>
          </p>

          {allConversions.length > 0 && (
            <div className="mt-6 overflow-hidden rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/40">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">단위</th>
                    <th className="px-4 py-3 text-right font-semibold">값</th>
                  </tr>
                </thead>
                <tbody>
                  {allConversions.map(({ unit, result: r }) => (
                    <tr key={unit.id} className="border-t border-border">
                      <td className="px-4 py-2.5">{unit.label}</td>
                      <td className="px-4 py-2.5 text-right font-medium">
                        {r.toLocaleString("ko-KR", { maximumFractionDigits: 6 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

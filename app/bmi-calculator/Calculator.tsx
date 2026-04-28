"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";
import { calcBmi } from "@/lib/calculators/bmi";

export function Calculator() {
  const [heightCm, setHeightCm] = useState(170);
  const [weightKg, setWeightKg] = useState(65);

  const result = useMemo(() => {
    if (heightCm <= 0 || weightKg <= 0) return null;
    try {
      return calcBmi({ heightCm, weightKg });
    } catch {
      return null;
    }
  }, [heightCm, weightKg]);

  return (
    <section
      aria-label="BMI 계산기"
      className="rounded-xl border border-border bg-background p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="height"
            className="block text-sm font-medium text-foreground"
          >
            키 (cm)
          </label>
          <Input
            id="height"
            type="number"
            inputMode="decimal"
            min={50}
            max={250}
            step={0.1}
            value={heightCm}
            onChange={(e) => {
              const n = parseFloat(e.target.value);
              setHeightCm(Number.isFinite(n) ? n : 0);
            }}
            className="mt-2"
          />
        </div>
        <div>
          <label
            htmlFor="weight"
            className="block text-sm font-medium text-foreground"
          >
            몸무게 (kg)
          </label>
          <Input
            id="weight"
            type="number"
            inputMode="decimal"
            min={10}
            max={300}
            step={0.1}
            value={weightKg}
            onChange={(e) => {
              const n = parseFloat(e.target.value);
              setWeightKg(Number.isFinite(n) ? n : 0);
            }}
            className="mt-2"
          />
        </div>
      </div>

      {result && (
        <div className="mt-8 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">BMI (체질량지수)</p>
          <p className="mt-1 text-5xl font-bold tracking-tight">
            {result.bmi.toFixed(1)}
          </p>
          <p className="mt-2 text-lg font-semibold">{result.label}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            정상 체중 범위 (BMI 18.5–22.9):{" "}
            {result.normalWeightRange.min}kg ~ {result.normalWeightRange.max}kg
          </p>

          <div className="mt-6 overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">
                    분류 (대한비만학회)
                  </th>
                  <th className="px-4 py-3 text-right font-semibold">
                    BMI 범위
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="px-4 py-2.5">저체중</td>
                  <td className="px-4 py-2.5 text-right">18.5 미만</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-2.5">정상</td>
                  <td className="px-4 py-2.5 text-right">18.5 - 22.9</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-2.5">비만전단계 (과체중)</td>
                  <td className="px-4 py-2.5 text-right">23.0 - 24.9</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-2.5">1단계 비만</td>
                  <td className="px-4 py-2.5 text-right">25.0 - 29.9</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-2.5">2단계 비만</td>
                  <td className="px-4 py-2.5 text-right">30.0 - 34.9</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-2.5">3단계 비만 (고도비만)</td>
                  <td className="px-4 py-2.5 text-right">35.0 이상</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

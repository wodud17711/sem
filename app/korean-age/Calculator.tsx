"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";
import { calcKoreanAge } from "@/lib/calculators/korean-age";

const today = () => new Date().toISOString().slice(0, 10);

export function Calculator() {
  const [birthDate, setBirthDate] = useState("1990-01-01");
  const [refDate, setRefDate] = useState(today());

  const result = useMemo(() => {
    if (!birthDate) return null;
    try {
      return calcKoreanAge({ birthDate, referenceDate: refDate });
    } catch {
      return null;
    }
  }, [birthDate, refDate]);

  return (
    <section
      aria-label="만 나이 계산기"
      className="rounded-xl border border-border bg-background p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="birth"
            className="block text-sm font-medium text-foreground"
          >
            생년월일
          </label>
          <Input
            id="birth"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="mt-2"
          />
        </div>
        <div>
          <label
            htmlFor="ref"
            className="block text-sm font-medium text-foreground"
          >
            기준일
          </label>
          <Input
            id="ref"
            type="date"
            value={refDate}
            onChange={(e) => setRefDate(e.target.value)}
            className="mt-2"
          />
        </div>
      </div>

      {result && (
        <div className="mt-8 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">만 나이</p>
          <p className="mt-1 text-5xl font-bold tracking-tight">
            {result.internationalAge}
            <span className="ml-1 text-2xl font-semibold">세</span>
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border p-4">
              <p className="text-xs text-muted-foreground">연 나이</p>
              <p className="mt-1 text-2xl font-bold">{result.yearAge}세</p>
              <p className="mt-1 text-xs text-muted-foreground">
                현재 연도 − 출생 연도
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-xs text-muted-foreground">옛 한국 나이</p>
              <p className="mt-1 text-2xl font-bold">
                {result.legacyKoreanAge}세
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                2023-06-28 행정상 폐지
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

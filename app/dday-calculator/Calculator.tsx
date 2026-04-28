"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";
import { calcDday } from "@/lib/calculators/dday";

const today = () => new Date().toISOString().slice(0, 10);

export function Calculator() {
  const [target, setTarget] = useState("");
  const [ref, setRef] = useState(today());

  const result = useMemo(() => {
    if (!target) return null;
    try {
      return calcDday({ targetDate: target, referenceDate: ref });
    } catch {
      return null;
    }
  }, [target, ref]);

  return (
    <section
      aria-label="디데이 계산기"
      className="rounded-xl border border-border bg-background p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="target"
            className="block text-sm font-medium text-foreground"
          >
            목표일
          </label>
          <Input
            id="target"
            type="date"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
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
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            className="mt-2"
          />
        </div>
      </div>

      {result && (
        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="text-sm text-muted-foreground">디데이</p>
          <p className="mt-2 text-7xl font-bold tracking-tight">{result.label}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            {result.days > 0
              ? `목표일까지 ${result.days}일 남았습니다.`
              : result.days < 0
                ? `목표일이 ${-result.days}일 지났습니다.`
                : "오늘이 바로 그날입니다!"}
          </p>
        </div>
      )}
    </section>
  );
}

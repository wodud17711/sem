"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { checkSpacing } from "@/lib/calculators/spacing-checker";

export function Calculator() {
  const [text, setText] = useState("");
  const result = useMemo(() => checkSpacing(text), [text]);

  return (
    <section
      aria-label="띄어쓰기 검사기"
      className="rounded-xl border border-border bg-background p-6 sm:p-8"
    >
      <label
        htmlFor="spacing-input"
        className="block text-sm font-medium text-foreground"
      >
        검사할 텍스트
      </label>
      <textarea
        id="spacing-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="예: 나는 할수있다"
        rows={6}
        className="mt-2 w-full resize-y rounded-lg border border-border bg-background p-4 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
      />

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">
            교정 결과 ({result.changeCount}건 수정)
          </p>
          {result.corrected && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => navigator.clipboard.writeText(result.corrected)}
            >
              복사
            </Button>
          )}
        </div>
        <div className="mt-2 min-h-[120px] whitespace-pre-wrap rounded-lg border border-border bg-muted/30 p-4 text-base">
          {result.corrected || (
            <span className="text-muted-foreground">
              결과가 여기에 표시됩니다.
            </span>
          )}
        </div>
      </div>

      {result.appliedRules.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-foreground">적용된 규칙</p>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {result.appliedRules.map((rule) => (
              <li key={rule}>· {rule}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

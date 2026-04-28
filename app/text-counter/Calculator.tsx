"use client";

import { useMemo, useState } from "react";
import { countText } from "@/lib/calculators/text-stats";
import { cn } from "@/lib/utils";

const fmt = (n: number) => n.toLocaleString("ko-KR");

function StatCell({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-background p-4",
        highlight && "bg-muted/40",
      )}
    >
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
    </div>
  );
}

export function Calculator() {
  const [text, setText] = useState("");
  const stats = useMemo(() => countText(text), [text]);

  return (
    <section
      aria-label="글자수 세기"
      className="rounded-xl border border-border bg-background p-6 sm:p-8"
    >
      <label
        htmlFor="text-input"
        className="block text-sm font-medium text-foreground"
      >
        텍스트 입력
      </label>
      <textarea
        id="text-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="여기에 텍스트를 붙여넣거나 입력하세요"
        rows={10}
        className="mt-2 w-full resize-y rounded-lg border border-border bg-background p-4 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
      />

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCell
          label="글자 수 (공백 포함)"
          value={fmt(stats.charsWithSpaces)}
          highlight
        />
        <StatCell
          label="글자 수 (공백 제외)"
          value={fmt(stats.charsWithoutSpaces)}
          highlight
        />
        <StatCell label="단어 수" value={fmt(stats.words)} />
        <StatCell label="줄 수" value={fmt(stats.lines)} />
        <StatCell label="단락 수" value={fmt(stats.paragraphs)} />
        <StatCell label="UTF-8 바이트" value={fmt(stats.bytes)} />
      </div>

      {text.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setText("")}
            className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            지우기
          </button>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(text)}
            className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            복사
          </button>
        </div>
      )}
    </section>
  );
}

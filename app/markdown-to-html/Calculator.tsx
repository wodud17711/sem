"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { markdownToHtml } from "@/lib/calculators/markdown";

const SAMPLE = `# 마크다운 예시

**굵은 글씨**와 *기울임*을 조합해 사용할 수 있어요.

## 리스트

- 첫 번째 항목
- 두 번째 항목
- 세 번째 항목

## 코드

인라인 \`const x = 1;\` 코드도 가능합니다.

\`\`\`
function hello() {
  return "안녕";
}
\`\`\`

## 인용

> 좋은 글은 다듬는 만큼 좋아진다.

## 링크

자세한 내용은 [셈](https://semcalc.com)에서 확인하세요.

---

이상입니다.`;

export function Calculator() {
  const [markdown, setMarkdown] = useState(SAMPLE);
  const html = useMemo(() => markdownToHtml(markdown), [markdown]);

  return (
    <section
      aria-label="마크다운 변환기"
      className="rounded-xl border border-border bg-background p-6 sm:p-8"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="markdown-input"
              className="text-sm font-medium text-foreground"
            >
              마크다운 입력
            </label>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setMarkdown("")}
            >
              지우기
            </Button>
          </div>
          <textarea
            id="markdown-input"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="마크다운 텍스트를 입력하세요"
            rows={16}
            className="mt-2 w-full resize-y rounded-lg border border-border bg-background p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">미리보기</p>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => navigator.clipboard.writeText(html)}
            >
              HTML 복사
            </Button>
          </div>
          <div
            className="markdown-preview mt-2 min-h-[400px] overflow-auto rounded-lg border border-border bg-muted/30 p-4 text-sm"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>

      <details className="mt-6">
        <summary className="cursor-pointer text-sm font-medium text-foreground">
          HTML 코드 보기
        </summary>
        <pre className="mt-2 overflow-auto rounded-lg border border-border bg-muted/30 p-4 text-xs">
          <code>{html}</code>
        </pre>
      </details>

      <style>{`
        .markdown-preview h1 { font-size: 1.75rem; font-weight: 700; margin: 1rem 0 0.5rem; }
        .markdown-preview h2 { font-size: 1.4rem; font-weight: 700; margin: 1rem 0 0.5rem; }
        .markdown-preview h3 { font-size: 1.15rem; font-weight: 600; margin: 0.75rem 0 0.5rem; }
        .markdown-preview h4 { font-size: 1rem; font-weight: 600; margin: 0.75rem 0 0.5rem; }
        .markdown-preview p { margin: 0.5rem 0; line-height: 1.65; }
        .markdown-preview ul { margin: 0.5rem 0; padding-left: 1.5rem; list-style: disc; }
        .markdown-preview li { margin: 0.25rem 0; }
        .markdown-preview blockquote { margin: 0.75rem 0; padding-left: 1rem; border-left: 3px solid var(--border); color: var(--muted-foreground); }
        .markdown-preview hr { margin: 1rem 0; border: 0; border-top: 1px solid var(--border); }
        .markdown-preview code { background: rgba(0,0,0,0.06); padding: 0.1rem 0.3rem; border-radius: 0.25rem; font-family: ui-monospace, monospace; font-size: 0.875em; }
        .markdown-preview pre { margin: 0.75rem 0; padding: 0.75rem 1rem; background: rgba(0,0,0,0.04); border-radius: 0.5rem; overflow-x: auto; }
        .markdown-preview pre code { background: transparent; padding: 0; }
        .markdown-preview a { color: var(--foreground); text-decoration: underline; }
        .markdown-preview strong { font-weight: 700; }
      `}</style>
    </section>
  );
}

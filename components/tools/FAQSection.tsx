import type { ReactNode } from "react";
import { ToolSection } from "./ToolLayout";

interface FAQItem {
  question: string;
  /** 일반 텍스트 답변. 구조화 데이터(JSON-LD)에 반영됨 */
  answer: string;
  /** 화면 렌더링용 답변. 강조·링크 등 풍부 표현이 필요할 때 사용 */
  rendered?: ReactNode;
}

interface FAQSectionProps {
  items: FAQItem[];
}

export function FAQSection({ items }: FAQSectionProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <ToolSection title="자주 묻는 질문">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="divide-y divide-border rounded-lg border border-border">
        {items.map((item) => (
          <details key={item.question} className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-4 hover:bg-muted/50">
              <span className="font-semibold text-foreground">
                {item.question}
              </span>
              <span
                aria-hidden="true"
                className="mt-1 shrink-0 text-muted-foreground transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="px-4 pb-4 text-foreground/80">
              {item.rendered ?? <p>{item.answer}</p>}
            </div>
          </details>
        ))}
      </div>
    </ToolSection>
  );
}

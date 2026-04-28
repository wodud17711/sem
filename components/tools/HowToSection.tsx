import { ToolSection } from "./ToolLayout";

interface HowToStep {
  title: string;
  description: string;
}

interface HowToSectionProps {
  /** 도구 제목 (HowTo 구조화 데이터용) */
  toolName: string;
  steps: HowToStep[];
}

export function HowToSection({ toolName, steps }: HowToSectionProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `${toolName} 사용 방법`,
    step: steps.map((step, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: step.title,
      text: step.description,
    })),
  };

  return (
    <ToolSection title="사용 방법">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="space-y-4">
        {steps.map((step, idx) => (
          <li key={step.title} className="flex gap-4">
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background"
            >
              {idx + 1}
            </span>
            <div>
              <p className="font-semibold text-foreground">{step.title}</p>
              <p className="mt-1 text-foreground/80">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </ToolSection>
  );
}

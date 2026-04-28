import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { FAQSection } from "@/components/tools/FAQSection";
import { HowToSection } from "@/components/tools/HowToSection";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Disclaimer, ToolLayout, ToolSection } from "@/components/tools/ToolLayout";
import { site } from "@/lib/site";
import { Calculator } from "./Calculator";

export const metadata: Metadata = {
  title: "띄어쓰기 검사기",
  description:
    "한국어에서 자주 보이는 띄어쓰기 누락 패턴을 규칙 기반으로 점검합니다. 의존명사·조사 띄어쓰기 자동 교정.",
  keywords: ["띄어쓰기 검사기", "한국어 띄어쓰기", "맞춤법 검사", "의존명사"],
  alternates: { canonical: "/spacing-checker" },
  openGraph: {
    title: "띄어쓰기 검사기 | 셈",
    description: "할수있다 → 할 수 있다. 자주 보이는 띄어쓰기 누락 자동 교정.",
    url: `${site.url}/spacing-checker`,
    type: "website",
  },
};

export default function SpacingCheckerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "띄어쓰기 검사기",
    url: `${site.url}/spacing-checker`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    inLanguage: "ko-KR",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <ToolLayout
        title="띄어쓰기 검사기"
        category="productivity"
        description="자주 보이는 띄어쓰기 누락 패턴을 규칙 기반으로 자동 교정합니다."
      >
        <Calculator />
        <AdSlot position="below-tool" />

        <HowToSection
          toolName="띄어쓰기 검사기"
          steps={[
            {
              title: "텍스트를 입력합니다",
              description:
                "검사할 글을 텍스트 영역에 입력하거나 붙여넣으세요. 입력 즉시 검사 결과가 갱신됩니다.",
            },
            {
              title: "교정된 결과를 확인합니다",
              description:
                "오른쪽 영역에 교정 결과가 표시되며, 적용된 규칙 목록도 함께 보여 줍니다. 복사 버튼으로 결과를 클립보드에 복사할 수 있습니다.",
            },
            {
              title: "한계를 인지하고 사용합니다",
              description:
                "본 도구는 형태소 분석을 사용하지 않으므로 모든 띄어쓰기 오류를 잡지는 못합니다. 중요한 글은 사람이 직접 점검해 주세요.",
            },
          ]}
        />

        <ToolSection title="검사하는 패턴">
          <p>
            본 도구는 정규식 기반으로 다음과 같은 자주 보이는 띄어쓰기 누락을
            교정합니다.
          </p>
          <ul className="ml-5 list-disc space-y-2 text-foreground/90">
            <li>
              <strong className="font-semibold text-foreground">의존명사 '수'</strong>{" "}
              — 할수있다, 할수없다 → 할 수 있다, 할 수 없다
            </li>
            <li>
              <strong className="font-semibold text-foreground">의존명사 '것'</strong>{" "}
              — 동사 어미 뒤에 붙은 경우 (할것이다, 본것입니다)
            </li>
            <li>
              <strong className="font-semibold text-foreground">'수밖에'</strong>
              {" "}— 명사 뒤 띄어쓰기
            </li>
            <li>
              <strong className="font-semibold text-foreground">조사 '등'</strong>{" "}
              — 등이/등의/등을 앞 띄어쓰기
            </li>
            <li>
              <strong className="font-semibold text-foreground">연속 공백</strong>{" "}
              — 두 칸 이상 띄어쓰기를 한 칸으로 정리
            </li>
          </ul>
          <p className="text-sm text-muted-foreground">
            "이것은", "그것은" 같은 대명사는 한 단어로 인정되어 분리되지 않습니다.
          </p>
        </ToolSection>

        <FAQSection
          items={[
            {
              question: "왜 일부 오류는 잡지 못하나요?",
              answer:
                "본 도구는 한국어 형태소 분석 없이 정규식만 사용합니다. 정확한 띄어쓰기 검사는 단어의 품사와 문맥을 분석해야 하는데, 이는 머신러닝 모델이 필요합니다. 본 도구는 빠르고 가볍게 자주 보이는 명백한 오류만 잡는 보조 도구로 사용해 주세요.",
            },
            {
              question: "올바른 띄어쓰기를 잘못 분리하지는 않나요?",
              answer:
                "동사·형용사 어미로 자주 쓰이는 글자(할/갈/올/한/된 등) 뒤에서만 의존명사를 분리하도록 제한했습니다. 따라서 '이것은', '무엇이' 같은 대명사·자립명사는 영향을 받지 않습니다.",
            },
            {
              question: "더 정확한 한국어 검사 도구는?",
              answer:
                "국립국어원의 한국어 어문 규범 검색기, 부산대학교 한국어 맞춤법/문법 검사기 등이 더 정밀한 검사를 제공합니다. 중요한 문서는 이런 도구로 추가 점검하시기 바랍니다.",
            },
            {
              question: "맞춤법 오류도 잡아 주나요?",
              answer:
                "아니요. 본 도구는 띄어쓰기에만 집중합니다. 맞춤법 오류(예: 어떡해 vs 어떻게)는 별도의 사전 기반 검사기가 필요합니다.",
            },
            {
              question: "긴 문서를 한 번에 검사할 수 있나요?",
              answer:
                "텍스트 영역의 길이에 제한이 없으므로 긴 문서도 한 번에 붙여넣을 수 있습니다. 다만 실시간으로 검사가 돌므로 매우 긴 문서(수만 자 이상)에서는 입력이 약간 느려질 수 있습니다.",
            },
          ]}
        />

        <Disclaimer>
          본 도구는 규칙 기반의 보조 검사기로, 모든 띄어쓰기 오류를 잡지는
          못합니다. 출판·논문 등 정확성이 중요한 글은 형태소 분석 기반의 검사기와
          사람의 검수가 필요합니다.
        </Disclaimer>

        <RelatedTools
          slugs={[
            "text-counter",
            "markdown-to-html",
            "timestamp-converter",
            "korean-age",
          ]}
        />
        <AdSlot position="footer" />
      </ToolLayout>
    </>
  );
}

import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { FAQSection } from "@/components/tools/FAQSection";
import { HowToSection } from "@/components/tools/HowToSection";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Disclaimer, ToolLayout, ToolSection } from "@/components/tools/ToolLayout";
import { site } from "@/lib/site";
import { Calculator } from "./Calculator";

export const metadata: Metadata = {
  title: "글자수 세기",
  description:
    "공백 포함·제외 글자수, 단어 수, 줄 수, 단락 수, UTF-8 바이트를 즉시 계산. 자기소개서·논술 분량 점검에.",
  keywords: [
    "글자수 세기",
    "글자수 카운터",
    "자기소개서 글자수",
    "논술 글자수",
    "공백 포함",
  ],
  alternates: { canonical: "/text-counter" },
  openGraph: {
    title: "글자수 세기 | 셈",
    description: "한국어 텍스트 글자수·바이트수 즉시 계산.",
    url: `${site.url}/text-counter`,
    type: "website",
  },
};

export default function TextCounterPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "글자수 세기",
    url: `${site.url}/text-counter`,
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
        title="글자수 세기"
        category="productivity"
        description="공백 포함·제외 글자수와 바이트 수를 실시간으로 보여 드립니다."
      >
        <Calculator />
        <AdSlot position="below-tool" />

        <HowToSection
          toolName="글자수 세기"
          steps={[
            {
              title: "텍스트를 붙여넣거나 입력합니다",
              description:
                "텍스트 영역에 측정할 내용을 붙여넣거나 직접 입력하세요. 입력 즉시 통계가 갱신됩니다.",
            },
            {
              title: "원하는 단위로 확인합니다",
              description:
                "공백 포함/제외 글자수, 단어 수, 줄 수, 단락 수, UTF-8 바이트를 모두 확인할 수 있습니다.",
            },
            {
              title: "결과를 활용합니다",
              description:
                "자기소개서 분량 제한, 트윗 280자, 논술 글자수 등 목적에 맞는 단위를 보고 분량을 조절하세요.",
            },
          ]}
        />

        <ToolSection title="용도별 글자수 기준">
          <ul className="ml-5 list-disc space-y-2 text-foreground/90">
            <li>
              <strong className="font-semibold text-foreground">
                자기소개서.
              </strong>{" "}
              대부분의 기업·대학이 공백 포함 기준으로 카운트합니다. 일부는
              공백 제외 기준이므로 모집 요강을 확인하세요.
            </li>
            <li>
              <strong className="font-semibold text-foreground">논술.</strong>{" "}
              대학 논술은 보통 공백 포함 1,200~1,800자 사이 분량입니다.
            </li>
            <li>
              <strong className="font-semibold text-foreground">트위터.</strong>{" "}
              X(트위터)는 280자 제한입니다. 한글은 1자, 영문도 1자로 카운트됩니다.
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                SMS·LMS.
              </strong>{" "}
              SMS는 90바이트, LMS는 2,000바이트 제한이 있습니다. 한글 1자 = 3바이트
              이므로 30자/666자 정도가 한계입니다.
            </li>
          </ul>
        </ToolSection>

        <FAQSection
          items={[
            {
              question: "공백 포함과 공백 제외, 어떤 게 표준이에요?",
              answer:
                "기관마다 다릅니다. 한국 입시·취업 시장에서는 공백 포함이 더 흔하지만, 일부 기업은 공백 제외 기준을 씁니다. 모집요강이나 채용공고에 명시된 단위를 확인하세요.",
            },
            {
              question: "한글 1자가 3바이트인 이유는?",
              answer:
                "UTF-8 인코딩 기준 한글 한 글자는 3바이트를 차지합니다. 영문 알파벳은 1바이트, 이모지는 4바이트입니다. SMS·LMS 제한처럼 바이트 단위가 중요한 곳에서 자주 묻는 항목입니다.",
            },
            {
              question: "탭 문자도 글자로 세나요?",
              answer:
                "네, 탭은 1자로 세며 공백 포함에 들어갑니다. 공백 제외에서는 빠집니다.",
            },
            {
              question: "워드의 단어 수와 다른 것 같아요.",
              answer:
                "본 도구는 공백·줄바꿈 기준으로 단어를 분리합니다. MS Word는 추가적인 구두점 처리 규칙이 있어 결과가 약간 다를 수 있습니다.",
            },
            {
              question: "원고지 매수도 알 수 있나요?",
              answer:
                "전통적인 원고지 1매는 200자(20행 × 10자)입니다. 공백 포함 글자수를 200으로 나누면 대략적인 매수가 나옵니다.",
            },
          ]}
        />

        <Disclaimer>
          기관·시스템별로 글자수 카운팅 규칙이 다를 수 있습니다. 정확한 기준은
          제출처의 공식 안내를 따르세요.
        </Disclaimer>

        <RelatedTools
          slugs={[
            "spacing-checker",
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

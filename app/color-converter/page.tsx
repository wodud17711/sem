import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { FAQSection } from "@/components/tools/FAQSection";
import { HowToSection } from "@/components/tools/HowToSection";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolLayout, ToolSection } from "@/components/tools/ToolLayout";
import { site } from "@/lib/site";
import { Calculator } from "./Calculator";

export const metadata: Metadata = {
  title: "색상 코드 변환기",
  description:
    "HEX·RGB·HSL 색상 코드를 양방향으로 변환합니다. 실시간 미리보기로 색상 확인 가능.",
  keywords: ["색상 코드 변환", "HEX RGB", "HSL 변환", "color converter"],
  alternates: { canonical: "/color-converter" },
  openGraph: {
    title: "색상 코드 변환기 | 셈",
    description: "HEX ↔ RGB ↔ HSL 변환과 미리보기.",
    url: `${site.url}/color-converter`,
    type: "website",
  },
};

export default function ColorConverterPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "색상 코드 변환기",
    url: `${site.url}/color-converter`,
    applicationCategory: "DesignApplication",
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
        title="색상 코드 변환기"
        category="converter"
        description="HEX·RGB·HSL 형식을 서로 변환하고 색상을 미리 봅니다."
      >
        <Calculator />
        <AdSlot position="below-tool" />

        <HowToSection
          toolName="색상 코드 변환기"
          steps={[
            {
              title: "어느 형식이든 입력합니다",
              description:
                "HEX, RGB, HSL 어느 칸에 입력해도 나머지 두 형식이 즉시 변환됩니다.",
            },
            {
              title: "미리보기로 색상을 확인합니다",
              description:
                "왼쪽 큰 사각형에 현재 색상이 표시됩니다. 디자인 작업 중 색상이 의도에 맞는지 빠르게 점검할 수 있습니다.",
            },
            {
              title: "코드를 복사해 사용합니다",
              description:
                "각 입력 칸을 선택해 복사한 뒤 CSS, Figma, 일러스트레이터 등에 붙여 넣으세요.",
            },
          ]}
        />

        <ToolSection title="형식 안내">
          <ul className="ml-5 list-disc space-y-2 text-foreground/90">
            <li>
              <strong className="font-semibold text-foreground">HEX</strong> —
              6자리 또는 3자리 16진수 코드 (예: #3366cc, #fff). 웹 디자인의
              표준 형식.
            </li>
            <li>
              <strong className="font-semibold text-foreground">RGB</strong> —
              빨강·초록·파랑 채널의 0–255 값. CSS의 rgb() 함수에 사용.
            </li>
            <li>
              <strong className="font-semibold text-foreground">HSL</strong> —
              색상(0–360°), 채도(0–100%), 밝기(0–100%)로 표현. 색상을 직관적으로
              조정할 때 유용.
            </li>
          </ul>
        </ToolSection>

        <FAQSection
          items={[
            {
              question: "HEX 단축형 #abc는 무엇인가요?",
              answer:
                "3자리 HEX는 각 자리를 두 번 반복한 6자리 형태와 같습니다. 예: #abc는 #aabbcc와 동일합니다. 본 도구는 두 형식 모두 지원합니다.",
            },
            {
              question: "왜 HSL ↔ RGB 변환에서 약간 값이 달라지나요?",
              answer:
                "HSL과 RGB 사이 변환은 무리수 연산이 들어가며, 본 도구는 결과를 정수로 반올림합니다. HEX → RGB → HSL → RGB → HEX 라운드트립에서 1~2 정도 값이 달라질 수 있지만 시각적 차이는 거의 없습니다.",
            },
            {
              question: "투명도(alpha)는 안 다루나요?",
              answer:
                "v1에서는 RGB·HEX·HSL의 불투명 색상만 다룹니다. RGBA, HSLA, 8자리 HEX 같은 알파 채널은 추후 확장 예정입니다.",
            },
            {
              question: "HSL 색상값(H)은 왜 0~360인가요?",
              answer:
                "HSL의 H(색상)는 색상환의 각도를 나타내며 0°(빨강), 120°(초록), 240°(파랑)으로 한 바퀴 도는 구조입니다. 따라서 0~360 사이의 값이며, 360과 0은 같은 색입니다.",
            },
            {
              question: "오래된 IE에서도 모든 형식이 작동하나요?",
              answer:
                "RGB·HEX는 모든 브라우저에서 지원됩니다. HSL은 IE9 이상에서 지원되며, 현대 브라우저에서는 모두 사용 가능합니다.",
            },
          ]}
        />

        <RelatedTools
          slugs={[
            "unit-converter",
            "exchange-rate",
            "markdown-to-html",
            "timestamp-converter",
          ]}
        />
        <AdSlot position="footer" />
      </ToolLayout>
    </>
  );
}

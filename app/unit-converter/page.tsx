import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { FAQSection } from "@/components/tools/FAQSection";
import { HowToSection } from "@/components/tools/HowToSection";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolLayout, ToolSection } from "@/components/tools/ToolLayout";
import { site } from "@/lib/site";
import { Calculator } from "./Calculator";

export const metadata: Metadata = {
  title: "단위 변환기",
  description:
    "길이·무게·부피 단위를 한 번에 변환합니다. m·km·인치·근·돈·갤런 등 자주 쓰는 단위 지원.",
  keywords: ["단위 변환기", "길이 변환", "무게 변환", "부피 변환", "근 돈"],
  alternates: { canonical: "/unit-converter" },
  openGraph: {
    title: "단위 변환기 | 셈",
    description: "길이·무게·부피 단위 통합 변환.",
    url: `${site.url}/unit-converter`,
    type: "website",
  },
};

export default function UnitConverterPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "단위 변환기",
    url: `${site.url}/unit-converter`,
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
        title="단위 변환기"
        category="converter"
        description="길이·무게·부피의 다양한 단위를 한 번에 변환합니다."
      >
        <Calculator />
        <AdSlot position="below-tool" />

        <HowToSection
          toolName="단위 변환기"
          steps={[
            {
              title: "카테고리를 선택합니다",
              description:
                "상단 탭에서 길이·무게·부피 중 변환하려는 카테고리를 선택하세요.",
            },
            {
              title: "값과 단위를 지정합니다",
              description:
                "값을 입력하고 변환 전·후 단위를 선택하면 즉시 결과가 표시됩니다.",
            },
            {
              title: "전체 변환표를 활용합니다",
              description:
                "결과 아래에 카테고리 내 모든 단위로의 동시 변환표가 함께 표시됩니다.",
            },
          ]}
        />

        <ToolSection title="자주 쓰는 단위">
          <ul className="ml-5 list-disc space-y-2 text-foreground/90">
            <li>
              <strong className="font-semibold text-foreground">길이</strong>{" "}
              — mm, cm, m, km, 인치, 피트, 야드, 마일
            </li>
            <li>
              <strong className="font-semibold text-foreground">무게</strong>{" "}
              — mg, g, kg, 톤, 온스, 파운드, <strong>근(600g)</strong>,{" "}
              <strong>돈(3.75g)</strong>
            </li>
            <li>
              <strong className="font-semibold text-foreground">부피</strong>{" "}
              — mL, L, 티스푼, 테이블스푼, 컵, 파인트·쿼트·갤런(미국 기준)
            </li>
          </ul>
        </ToolSection>

        <FAQSection
          items={[
            {
              question: "근, 돈은 어디에 쓰는 단위인가요?",
              answer:
                "근(斤, 600g)은 정육점에서 고기를 살 때 자주 쓰입니다. 돈(3.75g)은 한국에서 금·은의 무게 단위로 사용되며, 한 돈은 3.75g, 한 냥은 37.5g(10돈)입니다.",
            },
            {
              question: "갤런이 미국과 영국이 다른가요?",
              answer:
                "네, 미국 갤런은 약 3.785L, 영국 임페리얼 갤런은 약 4.546L입니다. 본 도구는 자주 사용되는 미국 갤런(US liquid gallon)을 기준으로 합니다.",
            },
            {
              question: "마일은 정확히 몇 km인가요?",
              answer:
                "1마일은 정확히 1.609344km입니다. 미국에서 자동차 거리를 표시할 때 사용되는 단위로, 본 도구는 이 정확한 환산값을 사용합니다.",
            },
            {
              question: "온도 단위(섭씨, 화씨)는 없나요?",
              answer:
                "온도는 0점이 다른 별도 단위라 단순 곱셈으로 변환되지 않습니다. 추후 온도 변환을 별도 도구로 추가할 수 있습니다.",
            },
            {
              question: "면적·속도 단위는 안 다루나요?",
              answer:
                "v1에서는 길이·무게·부피 세 카테고리만 다룹니다. 평·헥타르 등 면적, km/h·mph 등 속도 단위는 추후 확장 예정입니다.",
            },
          ]}
        />

        <RelatedTools
          slugs={[
            "exchange-rate",
            "color-converter",
            "timestamp-converter",
            "bmi-calculator",
          ]}
        />
        <AdSlot position="footer" />
      </ToolLayout>
    </>
  );
}

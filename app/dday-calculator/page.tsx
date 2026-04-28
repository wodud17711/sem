import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { FAQSection } from "@/components/tools/FAQSection";
import { HowToSection } from "@/components/tools/HowToSection";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolLayout, ToolSection } from "@/components/tools/ToolLayout";
import { site } from "@/lib/site";
import { Calculator } from "./Calculator";

export const metadata: Metadata = {
  title: "디데이 계산기",
  description:
    "목표일까지 남은 일수 또는 지난 일수를 계산합니다. 시험·결혼식·여행·기념일 카운트다운에.",
  keywords: ["디데이 계산기", "D-day", "남은 일수", "기념일 계산"],
  alternates: { canonical: "/dday-calculator" },
  openGraph: {
    title: "디데이 계산기 | 셈",
    description: "목표일까지 D-N. 지난 날짜는 D+N.",
    url: `${site.url}/dday-calculator`,
    type: "website",
  },
};

export default function DdayCalculatorPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "디데이 계산기",
    url: `${site.url}/dday-calculator`,
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
        title="디데이 계산기"
        category="lifestyle"
        description="목표일까지 남은 일수, 또는 지나간 날짜로부터의 경과일을 계산합니다."
      >
        <Calculator />
        <AdSlot position="below-tool" />

        <HowToSection
          toolName="디데이 계산기"
          steps={[
            {
              title: "목표일을 선택합니다",
              description:
                "달력에서 시험일, 결혼식, 여행 출발일 등 카운트다운하고 싶은 날짜를 선택하세요.",
            },
            {
              title: "기준일을 조정합니다 (선택)",
              description:
                "오늘이 아닌 특정 시점부터의 차이를 보고 싶으면 기준일을 변경하세요.",
            },
            {
              title: "결과를 확인합니다",
              description:
                "미래 날짜는 D-N(남은 일수), 지난 날짜는 D+N(지난 일수), 당일은 D-DAY로 표시됩니다.",
            },
          ]}
        />

        <ToolSection title="활용 예시">
          <ul className="ml-5 list-disc space-y-2 text-foreground/90">
            <li>수험생: 시험일까지 남은 일수 카운트다운</li>
            <li>커플: 만난 지 며칠째인지 (기념일 D+N)</li>
            <li>예비부부: 결혼식까지 남은 일수</li>
            <li>여행자: 여행 출발일까지 남은 일수</li>
            <li>군인: 전역일까지 남은 일수, 입대일로부터 며칠째</li>
            <li>프로젝트: 마감일까지 남은 일수</li>
          </ul>
        </ToolSection>

        <FAQSection
          items={[
            {
              question: "당일은 D-DAY가 맞나요? D-1이 아닌가요?",
              answer:
                "본 계산기는 일반적으로 통용되는 방식을 따릅니다. 목표일 당일은 D-DAY(0일 차이), 그 전날은 D-1, 다음날은 D+1로 표시합니다. 일부 기관(군대 등)에서는 다른 방식을 쓰기도 합니다.",
            },
            {
              question: "기념일이 며칠째인지 어떻게 알아요?",
              answer:
                "처음 만난 날을 목표일로, 오늘을 기준일로 설정하면 D+N에서 N이 만난 일수입니다. 100일·200일·1000일 같은 기념일을 손쉽게 확인할 수 있습니다.",
            },
            {
              question: "시간대 차이가 있는 날짜에서도 정확한가요?",
              answer:
                "본 계산기는 사용자의 브라우저 시간대 기준으로 날짜만 비교합니다. 시·분·초 단위 차이는 무시되므로 시간대 변환 없이 직관적으로 사용할 수 있습니다.",
            },
            {
              question: "윤일(2월 29일)도 정확히 계산되나요?",
              answer:
                "네, JavaScript Date 객체가 윤일을 정확히 처리합니다. 2024년 2월 29일 → 2026년 4월 29일 같은 날짜 차이도 정확히 계산됩니다.",
            },
          ]}
        />

        <RelatedTools
          slugs={[
            "korean-age",
            "bmi-calculator",
            "drink-driving-time",
            "timestamp-converter",
          ]}
        />
        <AdSlot position="footer" />
      </ToolLayout>
    </>
  );
}

import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { FAQSection } from "@/components/tools/FAQSection";
import { HowToSection } from "@/components/tools/HowToSection";
import { RelatedTools } from "@/components/tools/RelatedTools";
import {
  Disclaimer,
  ToolLayout,
  ToolSection,
} from "@/components/tools/ToolLayout";
import { site } from "@/lib/site";
import { Calculator } from "./Calculator";

export const metadata: Metadata = {
  title: "BMI 계산기",
  description:
    "키와 몸무게를 입력하면 BMI(체질량지수)를 계산하고 대한비만학회 기준으로 분류를 보여 드립니다.",
  keywords: ["BMI 계산기", "체질량지수", "비만도 계산", "정상 체중"],
  alternates: { canonical: "/bmi-calculator" },
  openGraph: {
    title: "BMI 계산기 | 셈",
    description: "키·몸무게로 BMI 계산 (한국 기준).",
    url: `${site.url}/bmi-calculator`,
    type: "website",
  },
};

export default function BmiCalculatorPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "BMI 계산기",
    url: `${site.url}/bmi-calculator`,
    applicationCategory: "HealthApplication",
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
        title="BMI 계산기"
        category="lifestyle"
        description="대한비만학회 기준으로 비만도 분류와 정상 체중 범위를 안내합니다."
      >
        <Calculator />
        <AdSlot position="below-tool" />

        <HowToSection
          toolName="BMI 계산기"
          steps={[
            {
              title: "키와 몸무게를 입력합니다",
              description:
                "키는 cm, 몸무게는 kg 단위로 입력하세요. 입력하는 즉시 BMI가 계산됩니다.",
            },
            {
              title: "BMI 값과 분류를 확인합니다",
              description:
                "결과에 BMI 수치와 한국 기준 비만 분류(저체중·정상·과체중·비만 1~3단계)가 표시됩니다.",
            },
            {
              title: "정상 체중 범위를 참고합니다",
              description:
                "현재 키 기준 정상 체중 범위를 함께 보여 드리므로 목표 체중 설정에 활용할 수 있습니다.",
            },
          ]}
        />

        <ToolSection title="BMI 계산식과 한국 기준">
          <p>
            BMI = 몸무게(kg) ÷ 키(m)²
          </p>
          <p>
            한국에서는 대한비만학회의 아시아·태평양 기준을 사용해 비만 기준이
            WHO 표준보다 엄격합니다. WHO는 BMI 25 이상을 과체중, 30 이상을
            비만으로 분류하지만, 한국은 BMI 23 이상을 과체중, 25 이상을 비만으로
            분류합니다.
          </p>
        </ToolSection>

        <FAQSection
          items={[
            {
              question: "BMI만으로 비만을 판단해도 되나요?",
              answer:
                "BMI는 신장 대비 체중을 기준으로 한 단순 지표입니다. 근육량이 많은 운동선수는 BMI가 높게 나오지만 비만이 아닐 수 있고, 노인이나 마른 비만(체지방률 높음)인 사람은 BMI가 정상이어도 위험할 수 있습니다. 체지방률, 허리둘레, 체성분 분석을 함께 보는 것이 정확합니다.",
            },
            {
              question: "허리둘레는 어떤 의미인가요?",
              answer:
                "복부비만 판단에는 허리둘레가 중요합니다. 한국 기준 남성 90cm, 여성 85cm 이상이면 복부비만으로 분류되며, 심혈관 질환 위험이 높아집니다. BMI가 정상이어도 허리둘레가 기준을 넘으면 주의가 필요합니다.",
            },
            {
              question: "어린이도 같은 기준인가요?",
              answer:
                "어린이·청소년은 성장 시기에 따라 기준이 달라지므로 성인 BMI 기준을 그대로 적용하지 않습니다. 소아청소년 표준성장도표의 백분위수를 사용하며, 별도의 평가가 필요합니다.",
            },
            {
              question: "임산부도 사용할 수 있나요?",
              answer:
                "임신 전 BMI는 임신 중 권장 체중 증가량 산정에 사용되지만, 임신 중 BMI는 큰 의미가 없습니다. 임신 중 체중 관리는 산부인과 의사와 상의하세요.",
            },
            {
              question: "BMI가 높으면 어떻게 해야 하나요?",
              answer:
                "단순 BMI 상승만으로 즉시 의학적 개입이 필요한 것은 아닙니다. 식습관, 운동 습관, 가족력, 혈압·혈당·콜레스테롤 등 종합적으로 평가해야 합니다. 체중 감량이 필요하다면 의사 또는 영양사와 상의해 점진적인 계획을 세우세요.",
            },
          ]}
        />

        <Disclaimer>
          BMI는 비만을 판단하는 단순 지표로, 정확한 건강 상태 평가에는 추가
          검사가 필요합니다. 의학적 조언은 의사 또는 영양사와 상의하세요.
        </Disclaimer>

        <RelatedTools
          slugs={[
            "korean-age",
            "dday-calculator",
            "drink-driving-time",
            "salary-calculator",
          ]}
        />
        <AdSlot position="footer" />
      </ToolLayout>
    </>
  );
}

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
  title: "음주 후 운전 가능 시간",
  description:
    "Widmark 공식으로 음주 후 혈중알코올농도(BAC)와 면허 정지·취소 기준 미만으로 떨어지는 추정 시간을 계산합니다. 절대 음주운전 결정에 사용하지 마세요.",
  keywords: [
    "음주 후 운전 가능 시간",
    "혈중알코올농도",
    "BAC 계산",
    "음주측정",
    "Widmark",
  ],
  alternates: { canonical: "/drink-driving-time" },
  openGraph: {
    title: "음주 후 운전 가능 시간 | 셈",
    description: "Widmark 공식 기반 BAC 추정 (참고용).",
    url: `${site.url}/drink-driving-time`,
    type: "website",
  },
};

export default function DrinkDrivingTimePage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "음주 후 운전 가능 시간",
    url: `${site.url}/drink-driving-time`,
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
        title="음주 후 운전 가능 시간"
        category="lifestyle"
        description="Widmark 공식 기반으로 혈중알코올농도(BAC)와 운전 가능 추정 시점을 계산합니다."
      >
        <Calculator />
        <AdSlot position="below-tool" />

        <HowToSection
          toolName="음주 후 운전 가능 시간 계산기"
          steps={[
            {
              title: "음주 정보를 입력합니다",
              description:
                "마신 양(mL)과 알코올 도수(%)를 입력하세요. '소주 1병', '맥주 500cc' 등 빠른 입력 버튼을 활용할 수 있습니다.",
            },
            {
              title: "체중과 성별을 선택합니다",
              description:
                "체중과 성별은 BAC 계산에 직접 영향을 줍니다. Widmark 공식에서 남성은 분포비 0.68, 여성은 0.55를 사용합니다.",
            },
            {
              title: "경과 시간을 입력합니다",
              description:
                "음주를 마친 시점부터 현재까지 몇 시간이 흘렀는지 입력하면 현재 추정 BAC와 운전 가능 시점이 계산됩니다.",
            },
          ]}
        />

        <ToolSection title="한국 음주운전 처벌 기준">
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">BAC</th>
                  <th className="px-4 py-3 text-left font-semibold">처분</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">0.03% ~ 0.08%</td>
                  <td className="px-4 py-3">면허 정지 (1차 위반)</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">0.08% ~ 0.2%</td>
                  <td className="px-4 py-3">면허 취소 + 1년 이하 징역 또는 500만원 이하 벌금</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">0.2% 이상</td>
                  <td className="px-4 py-3">면허 취소 + 2~5년 징역 또는 1천만원~2천만원 벌금</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground">
            도로교통법 제44조. 측정 거부, 사고 야기 시 가중 처벌됩니다.
          </p>
        </ToolSection>

        <FAQSection
          items={[
            {
              question: "이 계산기 결과를 믿고 운전해도 되나요?",
              answer:
                "절대 안 됩니다. 본 계산은 평균치로 한 추정이며, 같은 양을 마셔도 사람마다 BAC가 30~50% 차이날 수 있습니다. 음식 섭취 여부, 컨디션, 약물, 유전적 차이가 모두 영향을 줍니다. 안전을 위해 충분한 시간(보통 음주 다음날 이후) 또는 대중교통·대리운전을 이용하세요.",
            },
            {
              question: "Widmark 공식이 뭔가요?",
              answer:
                "1932년 스웨덴 학자 Widmark가 제안한 BAC 계산 공식입니다. 알코올 흡수와 분해를 단순화한 모델로, 법의학과 음주운전 관련 학술 자료에 널리 사용됩니다. 다만 이 공식은 평균치 추정이고 개인차 변수가 많아 실제 측정값과 차이가 큽니다.",
            },
            {
              question: "공복에 마시면 더 빨리 취하나요?",
              answer:
                "맞습니다. 빈속에 마시면 알코올 흡수가 빨라 BAC 정점이 높아지고 일찍 도달합니다. 본 계산기는 음주 직후 즉시 모든 알코올이 흡수된 것으로 가정하므로, 공복 음주는 약간 더 위험할 수 있고 식사 후 음주는 약간 덜 위험할 수 있습니다.",
            },
            {
              question: "알코올 분해 속도가 일정한가요?",
              answer:
                "본 계산기는 시간당 0.015%의 평균 분해율을 사용합니다. 실제로는 0.012~0.020% 사이로 사람마다 다르며, 같은 사람이라도 컨디션에 따라 변합니다. 분해 속도가 느린 사람은 본 계산보다 BAC가 더 오래 유지됩니다.",
            },
            {
              question: "다음날 아침 숙취 운전도 위험한가요?",
              answer:
                "매우 위험합니다. 늦게까지 많이 마신 경우 다음 날 오전에도 BAC가 0.03%를 넘을 수 있습니다. 본 계산기에서 음주 종료 시점부터의 경과 시간을 정확히 입력하면 대략의 위험도를 추정할 수 있지만, 다시 강조하지만 실제 측정이 가장 정확합니다.",
            },
            {
              question: "측정기를 사야 하나요?",
              answer:
                "음주 후 운전 여부를 결정해야 한다면 차라리 운전을 안 하는 것이 가장 안전합니다. 가정용 음주측정기는 정확도가 경찰용보다 떨어지며, 0.03% 근처에서는 ±0.02% 오차가 발생할 수 있습니다.",
            },
          ]}
        />

        <Disclaimer>
          본 계산기는 평균치 추정 결과이며, 실제 BAC는 개인 차이로 30% 이상
          벌어질 수 있습니다. 절대 본 결과를 근거로 음주 후 운전하지 마세요.
          음주 후 안전한 귀가는 대중교통, 대리운전, 또는 충분한 휴식뿐입니다.
        </Disclaimer>

        <RelatedTools
          slugs={[
            "korean-age",
            "bmi-calculator",
            "dday-calculator",
            "salary-calculator",
          ]}
        />
        <AdSlot position="footer" />
      </ToolLayout>
    </>
  );
}

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
import { RATE_BASIS } from "@/lib/calculators/rates-2026";
import { site } from "@/lib/site";
import { Calculator } from "./Calculator";

export const metadata: Metadata = {
  title: "4대보험 계산기",
  description:
    "월급을 입력하면 국민연금·건강보험·장기요양·고용보험·산재보험을 근로자/사업주 부담분으로 분리해 계산합니다.",
  keywords: [
    "4대보험 계산기",
    "국민연금",
    "건강보험",
    "고용보험",
    "산재보험",
    "사업주 부담",
  ],
  alternates: { canonical: "/four-insurance-calculator" },
  openGraph: {
    title: "4대보험 계산기 | 셈",
    description: "월급별 4대보험을 근로자/사업주 부담으로 분리 계산.",
    url: `${site.url}/four-insurance-calculator`,
    type: "website",
  },
};

export default function FourInsuranceCalculatorPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "4대보험 계산기",
    url: `${site.url}/four-insurance-calculator`,
    applicationCategory: "FinanceApplication",
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
        title="4대보험 계산기"
        category="finance"
        description="국민연금·건강보험·장기요양·고용보험·산재보험을 근로자/사업주로 분리 계산합니다."
        rateBasis={RATE_BASIS}
      >
        <Calculator />
        <AdSlot position="below-tool" />

        <HowToSection
          toolName="4대보험 계산기"
          steps={[
            {
              title: "월 명목급여를 입력합니다",
              description:
                "비과세 항목을 포함한 세전 월급을 입력하세요. 비과세 식대를 별도 지급받는 경우 체크박스를 선택합니다.",
            },
            {
              title: "회사 규모를 선택합니다",
              description:
                "사업주의 고용보험 요율(고용안정·직업능력개발 부담분)이 회사 규모에 따라 달라집니다. 정확한 부담을 보려면 본인 회사 규모에 맞춰 선택하세요.",
            },
            {
              title: "근로자/사업주 부담을 비교합니다",
              description:
                "각 보험 항목별로 근로자와 사업주가 얼마씩 부담하는지, 회사가 매월 지출하는 인건비 총액을 확인할 수 있습니다.",
            },
          ]}
        />

        <ToolSection title="2026년 4월 기준 요율">
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">보험</th>
                  <th className="px-4 py-3 text-right font-semibold">
                    근로자
                  </th>
                  <th className="px-4 py-3 text-right font-semibold">
                    사업주
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">국민연금</td>
                  <td className="px-4 py-3 text-right">4.5%</td>
                  <td className="px-4 py-3 text-right">4.5%</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">건강보험</td>
                  <td className="px-4 py-3 text-right">3.545%</td>
                  <td className="px-4 py-3 text-right">3.545%</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">장기요양</td>
                  <td className="px-4 py-3 text-right">건보료 ×12.95%</td>
                  <td className="px-4 py-3 text-right">건보료 ×12.95%</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">고용보험</td>
                  <td className="px-4 py-3 text-right">0.9%</td>
                  <td className="px-4 py-3 text-right">1.15~1.75%</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">산재보험</td>
                  <td className="px-4 py-3 text-right">0%</td>
                  <td className="px-4 py-3 text-right">평균 1.46%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground">
            국민연금은 보수월액 상·하한이 적용됩니다. 건강보험·장기요양은 매년
            1월, 국민연금 한도는 매년 7월에 변동될 수 있습니다.
          </p>
        </ToolSection>

        <FAQSection
          items={[
            {
              question: "국민연금은 왜 일정 금액 이상에서 같은 값이 나오나요?",
              answer:
                "국민연금은 보수월액 상한이 있어 매년 7월 기준 약 617만원을 초과하는 부분에는 부과되지 않습니다. 따라서 고소득자라도 국민연금 보험료는 일정 수준에서 멈춥니다.",
            },
            {
              question: "산재보험은 왜 평균치만 보여주나요?",
              answer:
                "산재보험료는 사업장의 업종 분류에 따라 0.6%부터 18% 가까이까지 차등 적용됩니다. 본 계산기는 전 업종 평균치인 약 1.46%를 사용하므로, 정확한 금액은 근로복지공단에서 사업장 업종 코드와 함께 조회하세요.",
            },
            {
              question: "고용보험 사업주 부담이 회사 규모에 따라 다른 이유는?",
              answer:
                "고용보험은 실업급여(0.9%)에 더해 고용안정·직업능력개발 부담금이 회사 규모별로 차등 부과됩니다. 1,000인 이상 대기업이 가장 높고, 우선지원대상기업(150인 미만)이 가장 낮습니다.",
            },
            {
              question: "비과세 식대가 보험료에 영향을 주나요?",
              answer:
                "국민연금과 건강보험은 비과세를 제외한 보수월액 기준이라 식대 적용 여부가 영향을 줍니다. 반면 고용보험은 비과세 포함 보수총액 기준이라 영향이 없습니다.",
            },
            {
              question: "프리랜서·자영업자는 어떻게 가입하나요?",
              answer:
                "프리랜서는 직장가입자가 아니므로 본 계산기와 다릅니다. 지역 가입자로 국민연금·건강보험에 가입하며, 산재·고용보험은 일부 직종에 한해 임의가입이 가능합니다. 자세한 내용은 4대 사회보험 정보연계센터에서 확인하세요.",
            },
            {
              question: "회사가 떼는 금액과 다른데, 잘못된 건가요?",
              answer:
                "회사가 사용하는 보수월액(연 1회 7월 정산본)이 현재 입력한 월급과 다를 수 있습니다. 예를 들어 작년 평균을 기준으로 보험료가 산정된 경우입니다. 정확한 본인 부담은 4대 사회보험 정보연계센터의 '내 보험료 조회'에서 확인할 수 있습니다.",
            },
          ]}
        />

        <Disclaimer>
          본 계산기의 결과는 참고용입니다. 사업장의 업종, 회사 규모, 정산
          시점에 따라 실제 부담은 달라질 수 있습니다. 정확한 보험료는 4대 사회
          보험 정보연계센터(www.4insure.or.kr)에서 확인하세요.
        </Disclaimer>

        <RelatedTools
          slugs={[
            "salary-calculator",
            "severance-pay-calculator",
            "annual-leave-pay",
            "comprehensive-income-tax",
          ]}
        />

        <AdSlot position="footer" />
      </ToolLayout>
    </>
  );
}

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
  title: "연차수당 계산기",
  description:
    "월 통상임금과 미사용 연차 일수를 입력하면 연차수당을 즉시 계산합니다. 209시간제 표준 산식 적용.",
  keywords: [
    "연차수당 계산기",
    "통상임금",
    "연차 미사용 수당",
    "유급휴가 수당",
    "근로기준법 60조",
  ],
  alternates: { canonical: "/annual-leave-pay" },
  openGraph: {
    title: "연차수당 계산기 | 셈",
    description: "월 통상임금 ÷ 209 × 8 × 미사용일수.",
    url: `${site.url}/annual-leave-pay`,
    type: "website",
  },
};

export default function AnnualLeavePayPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "연차수당 계산기",
    url: `${site.url}/annual-leave-pay`,
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
        title="연차수당 계산기"
        category="finance"
        description="미사용 연차를 통상임금 기준으로 환산해 연차수당을 계산합니다."
      >
        <Calculator />
        <AdSlot position="below-tool" />

        <HowToSection
          toolName="연차수당 계산기"
          steps={[
            {
              title: "월 통상임금을 입력합니다",
              description:
                "기본급에 정기적·일률적으로 지급되는 수당(직책수당, 자격수당 등)을 합산한 월 통상임금을 입력하세요. 비정기 인센티브, 성과급은 제외합니다.",
            },
            {
              title: "미사용 연차 일수를 입력합니다",
              description:
                "회계연도가 끝난 시점 또는 퇴사 시점에 사용하지 못하고 남은 연차 일수입니다. 회사의 연차 관리 시스템에서 확인할 수 있습니다.",
            },
            {
              title: "연차수당을 확인합니다",
              description:
                "시간당 통상임금과 1일 통상임금이 자동으로 계산되어 표시됩니다. 연차수당 = 1일 통상임금 × 미사용 일수입니다.",
            },
          ]}
        />

        <ToolSection title="계산 원리">
          <p>
            연차수당은 사용하지 못한 연차에 대해 1일 통상임금을 지급하는
            제도입니다. 근로기준법 제60조에 근거합니다.
          </p>
          <ul className="ml-5 list-disc space-y-2 text-foreground/90">
            <li>
              <strong className="font-semibold text-foreground">
                209시간제 산식.
              </strong>{" "}
              월급제 근로자의 월 소정근로시간은 209시간(주 40시간 + 주휴 8시간
              ≈ 209)으로 계산합니다.
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                시간당 통상임금
              </strong>{" "}
              = 월 통상임금 ÷ 209
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                1일 통상임금
              </strong>{" "}
              = 시간당 통상임금 × 8시간
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                연차수당
              </strong>{" "}
              = 1일 통상임금 × 미사용 일수
            </li>
          </ul>
        </ToolSection>

        <ToolSection title="예시 시나리오">
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">
                    월 통상임금
                  </th>
                  <th className="px-4 py-3 text-right font-semibold">
                    미사용 연차
                  </th>
                  <th className="px-4 py-3 text-right font-semibold">
                    연차수당
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">300만원</td>
                  <td className="px-4 py-3 text-right">5일</td>
                  <td className="px-4 py-3 text-right font-semibold">
                    574,160원
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">400만원</td>
                  <td className="px-4 py-3 text-right">10일</td>
                  <td className="px-4 py-3 text-right font-semibold">
                    1,531,096원
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">500만원</td>
                  <td className="px-4 py-3 text-right">15일</td>
                  <td className="px-4 py-3 text-right font-semibold">
                    2,870,808원
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ToolSection>

        <FAQSection
          items={[
            {
              question: "통상임금에 무엇을 포함하나요?",
              answer:
                "정기적·일률적·고정적으로 지급되는 임금이 통상임금입니다. 기본급, 직책수당, 자격수당, 식대(고정 지급분), 정기상여금 일부 등이 포함됩니다. 일정 기간 근속 후 받는 인센티브, 변동 성과급, 일회성 격려금은 제외됩니다.",
            },
            {
              question: "미사용 연차는 자동으로 보상되나요?",
              answer:
                "회계연도 종료 시 또는 퇴사 시점에 미사용 연차에 대해 수당으로 보상받을 권리가 있습니다. 다만 회사가 연차사용촉진제(근로기준법 제61조)를 적법하게 시행한 경우에는 수당이 발생하지 않을 수 있습니다.",
            },
            {
              question: "주 40시간이 아닌데 어떻게 계산해요?",
              answer:
                "주 소정근로시간이 다른 경우 월 소정근로시간도 달라집니다. 예를 들어 주 35시간이면 약 183시간이 됩니다. 본 계산기는 주 40시간 표준(209시간)을 가정하므로 다른 형태의 근로자는 결과를 비례 조정해야 합니다.",
            },
            {
              question: "연차사용촉진제가 뭐예요?",
              answer:
                "회사가 미사용 연차를 사용하도록 두 차례 서면 통보(7월·10월)했음에도 근로자가 사용하지 않으면, 회사는 연차수당 지급 의무가 면제됩니다. 적법한 절차를 거쳤는지 확인이 필요합니다.",
            },
            {
              question: "퇴사할 때 연차수당은 언제 받나요?",
              answer:
                "퇴직금과 함께 14일 이내에 지급되어야 합니다(근로기준법 제36조). 미지급 시 노동부에 임금체불 진정을 제기할 수 있습니다.",
            },
            {
              question: "연차수당에도 세금을 떼나요?",
              answer:
                "연차수당은 근로소득에 해당하므로 일반 급여와 동일하게 4대보험과 소득세가 원천징수됩니다. 본 계산기는 세전 금액을 표시합니다.",
            },
          ]}
        />

        <Disclaimer>
          본 계산기의 결과는 참고용입니다. 회사가 209시간 외 다른 근로시간제를
          채택하거나 통상임금 산정 기준이 다를 경우 실제 수당과 차이가 있을 수
          있습니다.
        </Disclaimer>

        <RelatedTools
          slugs={[
            "salary-calculator",
            "severance-pay-calculator",
            "four-insurance-calculator",
            "comprehensive-income-tax",
          ]}
        />

        <AdSlot position="footer" />
      </ToolLayout>
    </>
  );
}

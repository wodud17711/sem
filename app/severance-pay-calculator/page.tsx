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
  title: "퇴직금 계산기",
  description:
    "입사일·퇴사일·평균임금을 입력하면 법정 퇴직금을 즉시 계산합니다. 1년 미만 근무 안내, 평균임금 환산 공식까지 한 번에.",
  keywords: ["퇴직금 계산기", "법정 퇴직금", "평균임금", "퇴사 정산", "근로자퇴직급여"],
  alternates: { canonical: "/severance-pay-calculator" },
  openGraph: {
    title: "퇴직금 계산기 | 셈",
    description:
      "근로자퇴직급여 보장법 기준 법정 퇴직금을 입사일·평균임금만으로 계산.",
    url: `${site.url}/severance-pay-calculator`,
    type: "website",
  },
};

export default function SeverancePayCalculatorPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "퇴직금 계산기",
    url: `${site.url}/severance-pay-calculator`,
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
        title="퇴직금 계산기"
        category="finance"
        description="근로자퇴직급여 보장법 기준 법정 퇴직금을 계산합니다."
        rateBasis="2026년 4월 기준"
      >
        <Calculator />
        <AdSlot position="below-tool" />

        <HowToSection
          toolName="퇴직금 계산기"
          steps={[
            {
              title: "입사일과 퇴사일을 선택합니다",
              description:
                "달력에서 정확한 날짜를 선택하세요. 재직일수가 1년(365일) 미만이면 법정 퇴직금이 발생하지 않습니다.",
            },
            {
              title: "최근 3개월 월 평균 급여를 입력합니다",
              description:
                "기본급에 정기 상여금과 연차수당의 월 안분액을 더한 월 평균값을 입력하세요. 일반적으로 급여명세서의 통상임금 항목들을 합산합니다.",
            },
            {
              title: "예상 퇴직금을 확인합니다",
              description:
                "입력하면 즉시 1일 평균임금과 법정 퇴직금이 표시됩니다. 결과는 세전 금액이며, 퇴직소득세는 별도로 원천징수됩니다.",
            },
          ]}
        />

        <ToolSection title="계산 원리">
          <p>
            법정 퇴직금은 근로자퇴직급여 보장법 제8조와 근로기준법 제19조에
            근거합니다.
          </p>
          <ul className="ml-5 list-disc space-y-2 text-foreground/90">
            <li>
              <strong className="font-semibold text-foreground">
                재직 1년 이상 요건.
              </strong>{" "}
              계속 근로기간이 1년 미만이면 법정 퇴직금이 발생하지 않습니다.
              4주 평균 1주 소정근로시간이 15시간 미만인 경우도 제외됩니다.
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                1일 평균임금.
              </strong>{" "}
              산정사유 발생일 이전 3개월 임금총액을 그 기간 일수로 나눈 값.
              본 계산기는 월 평균 급여 ÷ 30으로 근사합니다.
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                퇴직금 산식.
              </strong>{" "}
              1일 평균임금 × 30 × (재직일수 ÷ 365). 즉 재직 1년당 약 30일분의
              평균임금이 적립됩니다.
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                평균임금 vs 통상임금.
              </strong>{" "}
              평균임금이 통상임금보다 적은 경우 통상임금을 기준으로 합니다
              (근로기준법 제2조 ②).
            </li>
          </ul>
        </ToolSection>

        <ToolSection title="예시 시나리오">
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">
                    재직 기간
                  </th>
                  <th className="px-4 py-3 text-right font-semibold">
                    월 평균 급여
                  </th>
                  <th className="px-4 py-3 text-right font-semibold">
                    예상 퇴직금
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">1년</td>
                  <td className="px-4 py-3 text-right">300만원</td>
                  <td className="px-4 py-3 text-right font-semibold">
                    300만원
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">3년</td>
                  <td className="px-4 py-3 text-right">400만원</td>
                  <td className="px-4 py-3 text-right font-semibold">
                    약 1,200만원
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">5년 6개월</td>
                  <td className="px-4 py-3 text-right">500만원</td>
                  <td className="px-4 py-3 text-right font-semibold">
                    약 2,750만원
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">10년</td>
                  <td className="px-4 py-3 text-right">600만원</td>
                  <td className="px-4 py-3 text-right font-semibold">
                    6,000만원
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ToolSection>

        <FAQSection
          items={[
            {
              question: "퇴직소득세는 얼마나 떼나요?",
              answer:
                "퇴직소득세는 근속연수와 퇴직금 액수에 따라 누진 적용됩니다. 근속연수가 길수록 근속연수공제가 커져 세부담이 줄어듭니다. 정확한 세액은 국세청 홈택스의 퇴직소득 세액 계산 페이지나 회사 인사팀에서 확인하시기 바랍니다.",
            },
            {
              question: "DC형 퇴직연금에 가입했는데 결과가 다른가요?",
              answer:
                "DC형(확정기여) 퇴직연금은 회사가 매년 일정액을 적립하므로 본 계산기의 법정 퇴직금과 다를 수 있습니다. DB형(확정급여)은 본 계산기와 일치합니다. 본인이 어떤 유형인지 회사 인사팀에서 확인하세요.",
            },
            {
              question: "1년이 며칠 모자라면 정말 한 푼도 못 받나요?",
              answer:
                "근로자퇴직급여 보장법상 1년 미만 근로는 법정 퇴직금 적용 대상이 아닙니다. 다만 회사 내규나 단체협약에 따라 별도의 위로금·격려금이 지급될 수 있으니 인사팀에 확인하세요. 또한 4주 평균 1주 소정근로시간이 15시간 미만인 단시간 근로자는 1년 이상 근무해도 제외됩니다.",
            },
            {
              question: "월 평균 급여에 무엇을 포함해야 하나요?",
              answer:
                "산정사유 발생일 이전 3개월 동안 받은 임금 총액을 포함합니다. 기본급은 물론 정기적·일률적으로 지급되는 상여금과 연차수당의 안분액(연 1회 지급되는 정기상여금이라면 직전 1년치의 3/12), 식대 등이 해당합니다. 비정기적 인센티브는 제외됩니다.",
            },
            {
              question: "퇴직금 중간정산을 받았어요. 어떻게 되나요?",
              answer:
                "중간정산을 받은 시점부터 새로 재직 기간이 시작된 것으로 봅니다. 입사일 대신 마지막 중간정산일 다음날을 입력하면 정확한 금액을 확인할 수 있습니다.",
            },
            {
              question: "정확한 금액은 어디서 확인하나요?",
              answer:
                "고용노동부 퇴직금 계산기와 국세청 홈택스를 함께 활용하시기 바랍니다. 회사가 공식적으로 정산한 금액과 본 계산기 결과가 다르다면 회사가 사용한 평균임금 산정 기준(상여금 안분 방식, 연차수당 처리)을 확인해 보세요.",
            },
          ]}
        />

        <Disclaimer>
          본 계산기의 결과는 참고용이며 법적 효력이 없습니다. 회사 내규,
          평균임금 vs 통상임금 비교, 퇴직소득세에 따라 실제 수령액은 달라질
          수 있습니다.
        </Disclaimer>

        <RelatedTools
          slugs={[
            "salary-calculator",
            "annual-leave-pay",
            "four-insurance-calculator",
            "comprehensive-income-tax",
          ]}
        />

        <AdSlot position="footer" />
      </ToolLayout>
    </>
  );
}

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
  title: "연봉 실수령액 계산기",
  description:
    "연봉을 입력하면 4대보험과 소득세를 차감한 월 실수령액을 즉시 계산합니다. 부양가족 수, 비과세 식대 적용 여부도 반영합니다.",
  keywords: [
    "연봉 실수령액",
    "연봉 계산기",
    "월급 실수령",
    "4대보험 계산",
    "소득세 계산",
    "실수령액 계산기",
  ],
  alternates: { canonical: "/salary-calculator" },
  openGraph: {
    title: "연봉 실수령액 계산기 | 셈",
    description:
      "연봉 → 월 실수령액 즉시 계산. 4대보험·소득세·지방소득세 항목별 분해.",
    url: `${site.url}/salary-calculator`,
    type: "website",
  },
};

export default function SalaryCalculatorPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "연봉 실수령액 계산기",
    url: `${site.url}/salary-calculator`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    inLanguage: "ko-KR",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <ToolLayout
        title="연봉 실수령액 계산기"
        category="finance"
        description="연봉을 입력하면 4대보험과 소득세를 차감한 월 실수령액을 즉시 보여 드립니다."
        rateBasis={RATE_BASIS}
      >
        <Calculator />

        <AdSlot position="below-tool" />

        <HowToSection
          toolName="연봉 실수령액 계산기"
          steps={[
            {
              title: "연봉을 입력합니다",
              description:
                "세전 연봉 총액을 원 단위로 입력하세요. 예를 들어 5천만원이면 50000000을 입력하면 자동으로 쉼표가 붙습니다.",
            },
            {
              title: "부양가족 수를 조정합니다",
              description:
                "본인을 포함한 인적공제 대상자 수를 입력합니다. 배우자, 부양 자녀, 부모님 등 연말정산에서 인적공제를 받는 가족이 해당됩니다.",
            },
            {
              title: "비과세 식대 적용 여부를 선택합니다",
              description:
                "회사에서 식대를 별도 비과세로 지급한다면 체크하세요. 월 20만원까지 비과세 처리되어 4대보험과 소득세가 줄어듭니다.",
            },
            {
              title: "결과 화면에서 분해 내역을 확인합니다",
              description:
                "월 실수령액과 함께 국민연금·건강보험·장기요양·고용보험·소득세·지방소득세 항목별 공제액을 확인할 수 있습니다.",
            },
          ]}
        />

        <ToolSection title="계산 원리">
          <p>
            본 계산기는 다음 순서로 월 실수령액을 산출합니다. 각 단계는 한국의
            현행 법령에 근거합니다.
          </p>
          <ol className="ml-5 list-decimal space-y-2 text-foreground/90">
            <li>
              <strong className="font-semibold text-foreground">
                월 명목급여
              </strong>{" "}
              = 연봉 ÷ 12
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                보수월액
              </strong>{" "}
              = 월 명목급여 − 비과세 식대 (월 20만원, 적용 시)
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                4대보험 (근로자 부담분)
              </strong>{" "}
              = 보수월액 × 요율
              <ul className="ml-5 mt-2 list-disc space-y-1 text-sm">
                <li>국민연금 4.5% (보수월액 상·하한 적용)</li>
                <li>건강보험 3.545%</li>
                <li>장기요양보험 = 건강보험료 × 12.95%</li>
                <li>고용보험 0.9% (총급여 기준)</li>
              </ul>
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                연간 과세표준
              </strong>{" "}
              = 총급여 − 비과세 − 근로소득공제 − 인적공제 (1인당 150만원) − 4대보험
              연 합계
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                산출세액
              </strong>{" "}
              = 누진세율(6~45%) 적용
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                결정세액
              </strong>{" "}
              = 산출세액 − 근로소득세액공제
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                월 소득세
              </strong>{" "}
              ≈ 결정세액 ÷ 12, 지방소득세 = 소득세 × 10%
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                월 실수령액
              </strong>{" "}
              = 월 명목급여 − 4대보험 − 소득세 − 지방소득세
            </li>
          </ol>
          <p className="text-sm text-muted-foreground">
            관련 법령: 소득세법 제47조(근로소득공제), 제55조(세율),
            제59조(근로소득세액공제), 국민건강보험법, 국민연금법, 고용보험법.
            요율은 매년 변동되므로 사용 전 결과 화면의 기준일을 확인하세요.
          </p>
        </ToolSection>

        <ToolSection title="예시 시나리오">
          <p>모두 본인 1인, 비과세 식대 적용 가정.</p>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">연봉</th>
                  <th className="px-4 py-3 text-right font-semibold">
                    월 명목급여
                  </th>
                  <th className="px-4 py-3 text-right font-semibold">
                    월 공제 합계
                  </th>
                  <th className="px-4 py-3 text-right font-semibold">
                    월 실수령액
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">3,000만원</td>
                  <td className="px-4 py-3 text-right">2,500,000원</td>
                  <td className="px-4 py-3 text-right">약 253,000원</td>
                  <td className="px-4 py-3 text-right font-semibold">
                    약 2,247,000원
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">5,000만원</td>
                  <td className="px-4 py-3 text-right">4,166,667원</td>
                  <td className="px-4 py-3 text-right">약 604,000원</td>
                  <td className="px-4 py-3 text-right font-semibold">
                    약 3,563,000원
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">8,000만원</td>
                  <td className="px-4 py-3 text-right">6,666,667원</td>
                  <td className="px-4 py-3 text-right">약 1,239,000원</td>
                  <td className="px-4 py-3 text-right font-semibold">
                    약 5,427,000원
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">1억원</td>
                  <td className="px-4 py-3 text-right">8,333,333원</td>
                  <td className="px-4 py-3 text-right">약 1,718,000원</td>
                  <td className="px-4 py-3 text-right font-semibold">
                    약 6,616,000원
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">
            위 수치는 본 계산기의 산출값이며, 부양가족·각종 공제·연말정산
            결과에 따라 실제 수령액은 달라질 수 있습니다.
          </p>
        </ToolSection>

        <FAQSection
          items={[
            {
              question: "왜 회사에서 받는 명세서와 금액이 조금 달라요?",
              answer:
                "회사는 매월 국세청의 근로소득 간이세액표를 사용하므로 본 계산기와 단위 원 단위로 차이가 날 수 있습니다. 또한 신용카드 사용액·의료비·자녀세액공제 등 연말정산에서 반영되는 항목이 많아 연말정산 시 환급 또는 추가 납부가 발생합니다. 본 계산기는 이런 추가 공제를 단순화해 산출한 근사값입니다.",
            },
            {
              question: "비과세 식대는 어떻게 적용되나요?",
              answer:
                "2024년 1월 1일부터 식대는 월 20만원까지 비과세입니다. 회사가 급여명세서에 식대를 별도 항목으로 비과세 처리해 지급하는 경우에만 적용되며, 식대 항목 없이 급여에 포함된 경우에는 체크 해제하시기 바랍니다.",
            },
            {
              question: "4대보험 요율은 매년 바뀌지 않나요?",
              answer:
                "건강보험·장기요양보험은 매년 1월에 요율이 변경되는 경우가 많고, 국민연금 보수월액 한도는 매년 7월에 조정됩니다. 본 계산기는 페이지 상단의 기준일에 적용되는 요율을 사용합니다. 정확한 최신 요율은 4대 사회보험 정보연계센터에서 확인하세요.",
            },
            {
              question: "부양가족 수에 어떤 사람을 포함해야 하나요?",
              answer:
                "본인, 배우자(연 소득 100만원 이하 또는 근로소득만 있고 총급여 500만원 이하), 부양 자녀, 만 60세 이상 부모님 등 인적공제 대상자를 포함합니다. 정확한 기준은 국세청 연말정산 가이드를 참고하시기 바랍니다.",
            },
            {
              question: "고용보험은 왜 비과세 식대를 빼지 않나요?",
              answer:
                "고용보험료는 비과세 식대를 포함한 총급여(보수총액)를 기준으로 부과됩니다. 반면 국민연금과 건강보험은 비과세를 제외한 보수월액을 기준으로 합니다. 본 계산기는 이 차이를 반영합니다.",
            },
            {
              question: "프리랜서나 사업자도 사용할 수 있나요?",
              answer:
                "본 계산기는 근로소득자의 4대보험·소득세를 가정하므로 프리랜서(3.3% 원천징수)나 사업소득자에게는 정확하지 않습니다. 종합소득세 간이 계산기를 별도로 제공할 예정입니다.",
            },
            {
              question: "결과를 어디에서 검증할 수 있나요?",
              answer:
                "국세청 홈택스의 근로소득 간이세액표 조회, 4대 사회보험 정보연계센터의 보험료 모의 계산 서비스에서 같은 조건으로 비교해 보세요. 미세한 차이는 간이세액표의 구간 처리, 회사별 식대 처리 방식, 추가 공제 적용 여부에 따라 발생합니다.",
            },
          ]}
        />

        <Disclaimer>
          본 계산기의 결과는 참고용이며 법적 효력이 없습니다. 실제 급여명세서와
          차이가 있을 수 있으니, 정확한 금액은 연말정산 결과 또는 국세청
          홈택스에서 확인하시기 바랍니다.
        </Disclaimer>

        <RelatedTools
          slugs={[
            "severance-pay-calculator",
            "four-insurance-calculator",
            "annual-leave-pay",
            "comprehensive-income-tax",
          ]}
        />

        <AdSlot position="footer" />
      </ToolLayout>
    </>
  );
}

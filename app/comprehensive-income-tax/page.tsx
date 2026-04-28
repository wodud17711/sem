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
  title: "종합소득세 간이 계산기",
  description:
    "종합소득금액을 입력하면 누진세율을 적용한 산출세액과 결정세액을 즉시 계산합니다. 사업·근로·이자·배당 합산 소득의 간이 추산.",
  keywords: [
    "종합소득세",
    "종합소득세 계산기",
    "사업소득세",
    "5월 종합소득세",
    "누진세율",
  ],
  alternates: { canonical: "/comprehensive-income-tax" },
  openGraph: {
    title: "종합소득세 간이 계산기 | 셈",
    description: "종합소득 → 과세표준 → 누진세 → 결정세액 한 번에.",
    url: `${site.url}/comprehensive-income-tax`,
    type: "website",
  },
};

export default function ComprehensiveIncomeTaxPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "종합소득세 간이 계산기",
    url: `${site.url}/comprehensive-income-tax`,
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
        title="종합소득세 간이 계산기"
        category="finance"
        description="종합소득금액 기준 누진세율로 결정세액을 추산합니다."
        rateBasis={RATE_BASIS}
      >
        <Calculator />
        <AdSlot position="below-tool" />

        <HowToSection
          toolName="종합소득세 간이 계산기"
          steps={[
            {
              title: "종합소득금액을 합산해 입력합니다",
              description:
                "근로소득금액, 사업소득금액, 이자·배당소득금액, 연금소득금액, 기타소득금액의 합계를 입력하세요. 각 소득의 필요경비는 이미 차감된 상태여야 합니다.",
            },
            {
              title: "부양가족 수를 조정합니다",
              description:
                "본인 포함 인적공제 대상자 수를 입력합니다. 1인당 150만원의 인적공제가 자동 적용됩니다.",
            },
            {
              title: "결정세액과 실효세율을 확인합니다",
              description:
                "과세표준, 누진세율 적용 후 산출세액, 표준세액공제(13만원) 차감 결과인 결정세액과 지방소득세를 확인할 수 있습니다.",
            },
          ]}
        />

        <ToolSection title="누진세율 구조 (소득세법 §55)">
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">
                    과세표준
                  </th>
                  <th className="px-4 py-3 text-right font-semibold">세율</th>
                  <th className="px-4 py-3 text-right font-semibold">
                    누진공제
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">1,400만원 이하</td>
                  <td className="px-4 py-3 text-right">6%</td>
                  <td className="px-4 py-3 text-right">-</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">1,400 - 5,000만원</td>
                  <td className="px-4 py-3 text-right">15%</td>
                  <td className="px-4 py-3 text-right">126만원</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">5,000 - 8,800만원</td>
                  <td className="px-4 py-3 text-right">24%</td>
                  <td className="px-4 py-3 text-right">576만원</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">8,800만원 - 1.5억원</td>
                  <td className="px-4 py-3 text-right">35%</td>
                  <td className="px-4 py-3 text-right">1,544만원</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">1.5 - 3억원</td>
                  <td className="px-4 py-3 text-right">38%</td>
                  <td className="px-4 py-3 text-right">1,994만원</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">3 - 5억원</td>
                  <td className="px-4 py-3 text-right">40%</td>
                  <td className="px-4 py-3 text-right">2,594만원</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">5 - 10억원</td>
                  <td className="px-4 py-3 text-right">42%</td>
                  <td className="px-4 py-3 text-right">3,594만원</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">10억원 초과</td>
                  <td className="px-4 py-3 text-right">45%</td>
                  <td className="px-4 py-3 text-right">6,594만원</td>
                </tr>
              </tbody>
            </table>
          </div>
        </ToolSection>

        <FAQSection
          items={[
            {
              question: "종합소득세는 누가 신고해야 하나요?",
              answer:
                "근로소득 외에 추가 소득이 있는 사람, 사업소득자, 프리랜서(3.3% 원천징수자), 임대사업자, 금융소득이 연 2,000만원을 초과하는 사람 등이 매년 5월에 신고합니다. 근로소득만 있는 직장인은 회사가 연말정산하므로 별도 신고가 필요 없습니다.",
            },
            {
              question: "신고 기간은 언제인가요?",
              answer:
                "전년도 소득에 대해 매년 5월 1일부터 5월 31일까지 신고·납부합니다. 성실신고확인 대상자는 6월 30일까지 연장됩니다.",
            },
            {
              question: "종합소득금액과 종합소득은 다른 건가요?",
              answer:
                "다릅니다. 종합소득은 매출 또는 총수입금액 개념이고, 종합소득금액은 거기에서 필요경비를 뺀 후의 금액입니다. 본 계산기는 종합소득금액(필요경비 차감 후)을 입력해야 합니다.",
            },
            {
              question: "사업자가 추계신고하면 어떻게 계산하나요?",
              answer:
                "장부 기장 없이 추계로 신고하는 경우, 단순경비율 또는 기준경비율로 필요경비를 산정한 후 종합소득금액을 구합니다. 본 계산기는 이미 종합소득금액이 산출된 상태를 가정하므로, 추계신고용 경비율 적용은 별도로 진행하셔야 합니다.",
            },
            {
              question: "부양가족 인적공제 외에 빠진 공제가 있나요?",
              answer:
                "있습니다. 신용카드 사용액, 의료비, 교육비, 기부금, 연금저축, 보장성 보험료, 주택자금, 장애인공제 등 다양한 공제가 있으나 본 간이 계산기는 이를 반영하지 않습니다. 정확한 세액 산출은 국세청 홈택스 종합소득세 모의계산을 활용하세요.",
            },
            {
              question: "표준세액공제 13만원은 누구에게 적용되나요?",
              answer:
                "특별소득공제·특별세액공제를 신청하지 않는 일반 납세자에게 적용됩니다. 본 계산기는 모든 사용자에게 표준세액공제만 일괄 적용하므로, 의료비·교육비 등 큰 지출이 있는 분은 실제로는 더 적은 세금을 낼 수 있습니다.",
            },
          ]}
        />

        <Disclaimer>
          본 계산기는 종합소득세 산출을 단순화한 추산 도구입니다. 사업소득의
          필요경비, 추가 소득공제·세액공제, 가산세 등이 반영되지 않으므로 실제
          신고·납부세액은 다릅니다. 정확한 계산은 국세청 홈택스 종합소득세
          모의계산 또는 세무사 상담을 권장합니다.
        </Disclaimer>

        <RelatedTools
          slugs={[
            "salary-calculator",
            "severance-pay-calculator",
            "four-insurance-calculator",
            "annual-leave-pay",
          ]}
        />

        <AdSlot position="footer" />
      </ToolLayout>
    </>
  );
}

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
  title: "시급·주휴수당 계산기",
  description:
    "시급과 근무시간을 입력하면 주휴수당, 주급, 월급을 즉시 계산합니다. 2026년 최저시급 10,320원 기준.",
  keywords: [
    "주휴수당 계산기",
    "시급 계산기",
    "최저임금 계산기",
    "2026 최저시급",
    "알바 월급 계산",
  ],
  alternates: { canonical: "/hourly-wage-calculator" },
  openGraph: {
    title: "시급·주휴수당 계산기 | 셈",
    description: "시급으로 주휴수당·주급·월급 계산.",
    url: `${site.url}/hourly-wage-calculator`,
    type: "website",
  },
};

export default function HourlyWageCalculatorPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "시급·주휴수당 계산기",
    url: `${site.url}/hourly-wage-calculator`,
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
        title="시급·주휴수당 계산기"
        category="finance"
        description="시급과 근무시간으로 주휴수당·주급·월급을 계산합니다."
        rateBasis="2026년 최저시급 10,320원 기준"
      >
        <Calculator />
        <AdSlot position="below-tool" />

        <HowToSection
          toolName="시급·주휴수당 계산기"
          steps={[
            {
              title: "시급을 입력합니다",
              description:
                "시급을 입력하거나, 2026년 최저시급(10,320원) 버튼을 눌러 바로 적용하세요.",
            },
            {
              title: "근무시간을 입력합니다",
              description:
                "하루 근로시간과 주 근로일수를 입력하면 1주 소정근로시간이 자동으로 계산됩니다.",
            },
            {
              title: "주휴수당과 월급을 확인합니다",
              description:
                "주휴수당, 주휴 포함 주급, 월급 환산액이 한 번에 표시됩니다. 주 15시간 미만이면 주휴수당이 발생하지 않는다는 안내도 함께 보여 드립니다.",
            },
          ]}
        />

        <ToolSection title="주휴수당이란?">
          <p className="text-foreground/90">
            주휴수당은 1주 동안 정해진 근무일을 모두 채운 근로자에게, 유급으로
            주어지는 하루치 휴일 임금입니다. 근로기준법 제55조에 근거하며,
            아르바이트·단시간 근로자에게도 똑같이 적용됩니다.
          </p>
          <ul className="ml-5 list-disc space-y-2 text-foreground/90">
            <li>
              <strong className="font-semibold text-foreground">
                지급 조건
              </strong>{" "}
              — 1주 소정근로시간이 15시간 이상이고, 그 주의 소정근로일을 모두
              개근해야 합니다.
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                주휴시간 산정
              </strong>{" "}
              — 1주 소정근로시간 ÷ 40 × 8. 주 40시간 근로자는 8시간분, 주 20시간
              근로자는 4시간분입니다.
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                월급 환산
              </strong>{" "}
              — 주 40시간 근로자는 주휴를 포함해 월 약 209시간으로 계산합니다.
              2026년 최저시급 기준 월 2,156,880원입니다.
            </li>
          </ul>
        </ToolSection>

        <ToolSection title="2026년 최저임금">
          <p className="text-foreground/90">
            2026년 최저시급은 10,320원으로 2025년(10,030원)보다 290원(2.9%)
            올랐습니다. 주 40시간(주휴 포함 월 209시간) 기준 월 환산액은
            2,156,880원입니다. 최저임금은 업종·연령과 관계없이 모든 사업장에
            동일하게 적용됩니다(수습 3개월 이내 등 일부 예외 제외).
          </p>
        </ToolSection>

        <FAQSection
          items={[
            {
              question: "주 15시간 미만인데 주휴수당을 못 받나요?",
              answer:
                "네, 1주 소정근로시간이 15시간 미만이면 주휴수당 지급 대상이 아닙니다. 15시간 이상이면서 그 주를 개근한 경우에만 발생합니다.",
            },
            {
              question: "주휴수당은 어떻게 계산하나요?",
              answer:
                "1주 소정근로시간을 40으로 나눈 뒤 8을 곱한 시간에 시급을 곱합니다. 예를 들어 주 20시간 근로자는 20÷40×8=4시간분의 시급이 주휴수당입니다.",
            },
            {
              question: "월급에 주휴수당이 포함돼 있나요?",
              answer:
                "월급제(예: 최저임금 월 2,156,880원)에는 주휴수당이 이미 포함돼 있습니다. 월 환산 209시간 중 약 35시간이 주휴시간입니다. 시급제 아르바이트는 주휴수당을 별도로 받아야 합니다.",
            },
            {
              question: "지각이나 조퇴를 하면 주휴수당이 사라지나요?",
              answer:
                "지각·조퇴는 결근이 아니므로 개근으로 인정되어 주휴수당이 발생합니다. 다만 소정근로일에 하루라도 결근하면 그 주의 주휴수당은 지급되지 않습니다.",
            },
            {
              question: "5인 미만 사업장도 주휴수당을 주나요?",
              answer:
                "네, 주휴수당은 사업장 규모와 관계없이 모든 사업장에 적용됩니다. 다만 연장·야간·휴일근로 가산수당(50% 할증)은 5인 미만 사업장에 적용되지 않습니다.",
            },
          ]}
        />

        <Disclaimer>
          본 계산기는 소정근로시간 기준으로 주휴수당과 월급을 환산합니다.
          연장·야간·휴일근로 가산수당, 수습기간 감액, 식대 등 각종 수당은 반영되지
          않으니 참고용으로만 사용하세요. 정확한 임금은 근로계약서와 고용노동부
          상담(국번 없이 1350)을 통해 확인하세요.
        </Disclaimer>

        <RelatedTools
          slugs={[
            "salary-calculator",
            "annual-leave-pay",
            "four-insurance-calculator",
            "severance-pay-calculator",
          ]}
        />
        <AdSlot position="footer" />
      </ToolLayout>
    </>
  );
}

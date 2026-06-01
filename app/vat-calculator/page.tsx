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
  title: "부가가치세(VAT) 계산기",
  description:
    "공급가액에서 부가세와 합계를, 또는 합계에서 공급가액과 부가세를 즉시 계산합니다. 부가세율 10% 기준.",
  keywords: [
    "부가가치세 계산기",
    "부가세 계산기",
    "VAT 계산",
    "공급가액 계산",
    "부가세 별도 계산",
  ],
  alternates: { canonical: "/vat-calculator" },
  openGraph: {
    title: "부가가치세(VAT) 계산기 | 셈",
    description: "공급가액 ↔ 부가세·합계 계산.",
    url: `${site.url}/vat-calculator`,
    type: "website",
  },
};

export default function VatCalculatorPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "부가가치세 계산기",
    url: `${site.url}/vat-calculator`,
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
        title="부가가치세 계산기"
        category="finance"
        description="공급가액과 부가세, 합계를 양방향으로 계산합니다."
        rateBasis="부가세율 10% (일반과세) 기준"
      >
        <Calculator />
        <AdSlot position="below-tool" />

        <HowToSection
          toolName="부가가치세 계산기"
          steps={[
            {
              title: "계산 기준을 선택합니다",
              description:
                "부가세를 더하기 전 '공급가액'을 알면 공급가액 기준을, 부가세가 포함된 '합계'를 알면 합계 기준을 선택하세요.",
            },
            {
              title: "금액을 입력합니다",
              description:
                "숫자만 입력하면 천 단위 구분이 자동으로 표시됩니다.",
            },
            {
              title: "공급가액·부가세·합계를 확인합니다",
              description:
                "세 가지 금액이 한 번에 표시됩니다. 세금계산서 발행이나 견적서 작성에 그대로 활용하세요.",
            },
          ]}
        />

        <ToolSection title="부가가치세란?">
          <p className="text-foreground/90">
            부가가치세(VAT)는 상품·서비스 거래 단계에서 더해지는 가치에 매기는
            세금으로, 한국 일반과세 세율은 10%입니다. 사업자가 소비자에게 받아
            국가에 납부하는 구조라, 견적이나 정산에서 ‘부가세 별도’인지
            ‘부가세 포함’인지 구분하는 게 중요합니다.
          </p>
          <ul className="ml-5 list-disc space-y-2 text-foreground/90">
            <li>
              <strong className="font-semibold text-foreground">
                공급가액
              </strong>{" "}
              — 부가세를 뺀 순수 물건·용역 값
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                부가세(세액)
              </strong>{" "}
              — 공급가액 × 10%
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                공급대가(합계)
              </strong>{" "}
              — 공급가액 + 부가세, 소비자가 실제로 내는 금액
            </li>
          </ul>
          <p className="text-foreground/90">
            합계에서 공급가액을 역산할 때는 합계를 1.1로 나눕니다. 예를 들어
            합계가 11,000원이면 공급가액 10,000원, 부가세 1,000원입니다.
          </p>
        </ToolSection>

        <FAQSection
          items={[
            {
              question: "‘부가세 별도’와 ‘부가세 포함’은 어떻게 다른가요?",
              answer:
                "'부가세 별도'는 표시 금액이 공급가액이라 결제 시 10%가 추가됩니다. '부가세 포함'은 표시 금액에 이미 부가세가 들어 있어 추가 부담이 없습니다. 계약·견적 시 반드시 확인하세요.",
            },
            {
              question: "합계 110,000원의 공급가액은 얼마인가요?",
              answer:
                "합계를 1.1로 나누면 됩니다. 110,000 ÷ 1.1 = 100,000원이 공급가액이고, 부가세는 10,000원입니다. '합계 기준'으로 계산하면 바로 확인할 수 있습니다.",
            },
            {
              question: "간이과세자도 10%로 계산하나요?",
              answer:
                "간이과세자는 업종별 부가가치율을 곱한 낮은 세율이 적용되어 일반과세와 다릅니다. 본 계산기는 일반과세 10% 기준이므로, 간이과세자는 참고용으로만 사용하세요.",
            },
            {
              question: "면세 사업자는 부가세가 없나요?",
              answer:
                "면세 대상(기초 농수산물, 의료·교육 일부 등)은 부가가치세가 면제되어 세금계산서 대신 계산서를 발행합니다. 이 경우 부가세 10%를 붙이지 않습니다.",
            },
            {
              question: "부가세 신고는 언제 하나요?",
              answer:
                "법인은 분기마다, 개인 일반과세자는 1년에 두 번(1월·7월) 확정신고합니다. 간이과세자는 1년에 한 번(다음 해 1월) 신고합니다. 자세한 일정은 국세청 홈택스에서 확인하세요.",
            },
          ]}
        />

        <Disclaimer>
          본 계산기는 일반과세 부가세율 10%를 적용한 단순 계산 도구입니다.
          간이과세·면세·영세율 등 특수한 경우에는 적용 세율이 다르므로, 실제
          세무 신고는 세무사 상담이나 국세청 홈택스를 통해 확인하세요.
        </Disclaimer>

        <RelatedTools
          slugs={[
            "comprehensive-income-tax",
            "salary-calculator",
            "percent-calculator",
            "real-estate-transfer-tax",
          ]}
        />
        <AdSlot position="footer" />
      </ToolLayout>
    </>
  );
}

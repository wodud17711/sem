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
  title: "대출 이자 계산기",
  description:
    "원리금균등·원금균등 상환 방식의 월 납입액과 총 이자를 계산합니다. 주택담보·신용대출 비교에.",
  keywords: ["대출 이자 계산기", "원리금균등", "원금균등", "주택담보대출"],
  alternates: { canonical: "/loan-interest" },
  openGraph: {
    title: "대출 이자 계산기 | 셈",
    description: "원리금균등 vs 원금균등 비교.",
    url: `${site.url}/loan-interest`,
    type: "website",
  },
};

export default function LoanInterestPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "대출 이자 계산기",
    url: `${site.url}/loan-interest`,
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
        title="대출 이자 계산기"
        category="realestate"
        description="원리금균등·원금균등 상환 방식의 월 납입액과 총 이자를 비교합니다."
      >
        <Calculator />
        <AdSlot position="below-tool" />

        <HowToSection
          toolName="대출 이자 계산기"
          steps={[
            {
              title: "대출 정보를 입력합니다",
              description:
                "대출 받을 원금, 연 이자율, 상환 기간(년)을 입력하세요. 자동으로 두 가지 상환 방식의 결과를 비교 계산합니다.",
            },
            {
              title: "두 방식의 결과를 비교합니다",
              description:
                "원리금균등(매월 같은 금액)과 원금균등(점차 감소)의 월 납입액·총 이자를 한눈에 비교할 수 있습니다.",
            },
            {
              title: "본인에게 맞는 방식을 선택합니다",
              description:
                "초기 부담을 줄이려면 원리금균등, 총 이자를 줄이려면 원금균등이 유리합니다.",
            },
          ]}
        />

        <ToolSection title="두 상환 방식 비교">
          <ul className="ml-5 list-disc space-y-2 text-foreground/90">
            <li>
              <strong className="font-semibold text-foreground">
                원리금균등
              </strong>{" "}
              — 매월 동일한 금액 납입. 초기에는 이자 비중이 크고 점차 원금
              비중이 늘어납니다. 가계 예산 관리에 유리.
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                원금균등
              </strong>{" "}
              — 매월 같은 원금에 잔액 기준 이자가 더해집니다. 초기 납입액이
              크지만 빠르게 감소하며, 총 이자가 원리금균등보다 적습니다.
            </li>
          </ul>
          <p className="text-sm text-muted-foreground">
            원금균등이 총 이자는 적지만, 초기 부담이 30~50% 더 클 수 있습니다.
            현재 소득과 향후 소득 변화를 고려해 선택하세요.
          </p>
        </ToolSection>

        <FAQSection
          items={[
            {
              question: "거치 기간은 어떻게 반영하나요?",
              answer:
                "본 계산기는 거치 기간(이자만 내는 기간) 없이 즉시 원리금 상환을 시작하는 경우를 가정합니다. 거치 기간이 있는 경우 거치 기간 동안은 매월 이자만 납부하고, 그 이후 원금 상환이 시작됩니다.",
            },
            {
              question: "변동금리 대출은 어떻게 계산하나요?",
              answer:
                "본 계산기는 고정금리 가정입니다. 변동금리 대출은 향후 금리 변동에 따라 월 납입액이 달라집니다. 현재 금리로 계산하되, 금리 인상에 대비해 여유를 두는 것을 권합니다.",
            },
            {
              question: "중도상환 수수료는 반영되나요?",
              answer:
                "본 계산은 중도상환 없이 만기까지 정상 상환하는 경우입니다. 중도상환 시에는 통상 1~1.5%의 수수료가 발생하며, 3년 경과 후 면제되는 경우가 많습니다.",
            },
            {
              question: "DSR·LTV는 어떻게 보나요?",
              answer:
                "DSR(총부채원리금상환비율)은 연소득 대비 모든 대출 원리금 상환액 비율로, 대출 가능 한도를 결정합니다. LTV(담보인정비율)는 주택 가격 대비 대출 한도입니다. 본 계산기는 이런 한도 검토는 하지 않으며, 은행 상담이 필요합니다.",
            },
            {
              question: "주택담보대출, 신용대출 모두 같은 공식인가요?",
              answer:
                "공식 자체는 같지만, 신용대출은 보통 5~10년 이내 단기, 주담대는 10~40년 장기로 기간이 다릅니다. 또한 신용대출은 만기 일시상환(원금을 만기에 한꺼번에 갚음) 옵션도 있어 본 계산과 다른 구조입니다.",
            },
          ]}
        />

        <Disclaimer>
          본 계산기는 일정한 이자율을 가정한 단순 추정입니다. 실제 대출은 은행
          내규(중도상환 수수료, 거치 기간, 변동금리 등)에 따라 차이가 있으니,
          정확한 조건은 은행 상담을 받으세요.
        </Disclaimer>

        <RelatedTools
          slugs={[
            "deposit-savings-maturity",
            "real-estate-transfer-tax",
            "jeonse-monthly-converter",
            "salary-calculator",
          ]}
        />
        <AdSlot position="footer" />
      </ToolLayout>
    </>
  );
}

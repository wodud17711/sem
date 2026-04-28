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
import { EXCHANGE_RATE_BASIS } from "@/lib/calculators/exchange-rate";
import { site } from "@/lib/site";
import { Calculator } from "./Calculator";

export const metadata: Metadata = {
  title: "환율 계산기",
  description:
    "달러·유로·엔·위안 등 주요 통화와 원화를 변환합니다. 한국은행 매매기준율 기반의 정적 데이터 사용.",
  keywords: ["환율 계산기", "달러 원화", "유로 환율", "엔화 환율", "위안 환율"],
  alternates: { canonical: "/exchange-rate" },
  openGraph: {
    title: "환율 계산기 | 셈",
    description: "주요 통화 ↔ 원화 변환 (참고용 정적 환율).",
    url: `${site.url}/exchange-rate`,
    type: "website",
  },
};

export default function ExchangeRatePage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "환율 계산기",
    url: `${site.url}/exchange-rate`,
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
        title="환율 계산기"
        category="converter"
        description="주요 통화와 원화 사이의 변환을 정적 환율 기준으로 계산합니다."
        rateBasis={EXCHANGE_RATE_BASIS}
      >
        <Calculator />
        <AdSlot position="below-tool" />

        <HowToSection
          toolName="환율 계산기"
          steps={[
            {
              title: "금액과 통화를 선택합니다",
              description:
                "변환할 금액을 입력하고 출발 통화·도착 통화를 선택하세요. 기본은 USD → KRW입니다.",
            },
            {
              title: "결과를 확인합니다",
              description:
                "오른쪽 결과 칸에 변환된 금액이 즉시 표시됩니다. 가운데 ⇄ 버튼으로 통화 방향을 빠르게 바꿀 수 있습니다.",
            },
            {
              title: "최신 환율은 별도 확인",
              description:
                "본 도구는 정기적으로 갱신되는 정적 환율을 사용합니다. 실시간 거래에는 은행·증권사의 실제 매수·매도 환율을 확인하세요.",
            },
          ]}
        />

        <ToolSection title="환율 종류 안내">
          <ul className="ml-5 list-disc space-y-2 text-foreground/90">
            <li>
              <strong className="font-semibold text-foreground">
                매매기준율
              </strong>{" "}
              — 외환시장 평균 환율로, 본 도구가 사용하는 기준. 은행이 고객에게
              제시하는 환율의 중심값.
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                현찰 살 때
              </strong>{" "}
              — 매매기준율 + 환전 수수료(보통 1.5~1.75%). 실제 외화를 살 때 적용.
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                현찰 팔 때
              </strong>{" "}
              — 매매기준율 − 수수료. 보유 외화를 원화로 바꿀 때 적용.
            </li>
            <li>
              <strong className="font-semibold text-foreground">송금 환율</strong>{" "}
              — 해외 송금 시 적용되는 환율. 보통 매매기준율과 가까움.
            </li>
          </ul>
        </ToolSection>

        <FAQSection
          items={[
            {
              question: "왜 실시간 환율이 아닌가요?",
              answer:
                "실시간 환율 API는 비용이 발생하고, 분 단위 변동을 반영하더라도 실제 환전 환율(은행 수수료 포함)과 차이가 큽니다. 본 도구는 매매기준율의 평균치를 정적 데이터로 제공해 빠르게 대략값을 추산하는 용도입니다.",
            },
            {
              question: "은행에서 환전할 때 차이가 큰데요?",
              answer:
                "은행 환전 시에는 매매기준율에 1.5~1.75%의 환전 수수료가 붙습니다. 또한 일부 은행·환전소는 우대율을 적용해 수수료를 깎아 줍니다. 본 도구의 결과는 수수료 없는 매매기준율 기준이므로 실제 환전 금액보다 유리하게 표시됩니다.",
            },
            {
              question: "엔화는 왜 100엔 단위로 표시하는 곳이 있나요?",
              answer:
                "일본 엔은 단위가 작아 1엔 환율보다 100엔 환율이 더 직관적이라 한국 은행은 보통 100엔 기준으로 표시합니다. 본 도구는 1엔 단위로 통일해 사용합니다.",
            },
            {
              question: "환율은 얼마나 자주 바뀌나요?",
              answer:
                "외환시장은 24시간 변동하지만, 한국은행 매매기준율은 매 영업일 기준으로 고시됩니다. 본 도구의 환율은 정기적으로 검토·갱신되며, 페이지 상단의 기준일을 확인하세요.",
            },
            {
              question: "실시간 환율을 보려면 어디로 가야 하나요?",
              answer:
                "한국은행 경제통계시스템(ECOS), 네이버 증권 환율 페이지, 사용 중인 은행 앱에서 실시간 매매기준율과 우대 환율을 확인할 수 있습니다.",
            },
          ]}
        />

        <Disclaimer>
          본 도구는 정적 환율 데이터를 사용합니다. 실제 환전·송금 시에는 은행
          수수료와 변동 환율이 적용되어 결과와 차이가 큽니다. 정확한 거래
          금액은 사용 중인 은행·증권사에서 확인하세요.
        </Disclaimer>

        <RelatedTools
          slugs={[
            "unit-converter",
            "color-converter",
            "loan-interest",
            "deposit-savings-maturity",
          ]}
        />
        <AdSlot position="footer" />
      </ToolLayout>
    </>
  );
}

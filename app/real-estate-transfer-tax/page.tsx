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
  title: "부동산 양도세 간이 계산기",
  description:
    "취득가·양도가·보유기간을 입력하면 1세대 1주택 비과세 여부와 양도세를 추산합니다.",
  keywords: [
    "양도세 계산기",
    "양도소득세",
    "부동산 양도세",
    "1세대 1주택 비과세",
    "장기보유특별공제",
  ],
  alternates: { canonical: "/real-estate-transfer-tax" },
  openGraph: {
    title: "부동산 양도세 간이 계산기 | 셈",
    description: "양도차익 → 장특공 → 누진세 추산.",
    url: `${site.url}/real-estate-transfer-tax`,
    type: "website",
  },
};

export default function RealEstateTransferTaxPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "부동산 양도세 간이 계산기",
    url: `${site.url}/real-estate-transfer-tax`,
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
        title="부동산 양도세 간이 계산기"
        category="realestate"
        description="1세대 1주택 비과세 여부와 일반 양도세를 단순 추산합니다."
        rateBasis="2026년 4월 기준"
      >
        <Calculator />
        <AdSlot position="below-tool" />

        <HowToSection
          toolName="부동산 양도세 간이 계산기"
          steps={[
            {
              title: "취득가와 양도가를 입력합니다",
              description:
                "부동산을 산 가격(취득가)과 팔 가격(양도가)을 원 단위로 입력하세요.",
            },
            {
              title: "필요경비를 입력합니다",
              description:
                "취득세·법무사 비용·중개수수료 등 양도차익에서 차감 가능한 비용을 합산해 입력하세요.",
            },
            {
              title: "보유기간과 주택 수를 선택합니다",
              description:
                "보유기간(년)을 입력하고 1세대 1주택인지 다주택인지 선택하면, 비과세 여부와 양도세가 자동 계산됩니다.",
            },
          ]}
        />

        <ToolSection title="계산 원리 (간이 모델)">
          <ol className="ml-5 list-decimal space-y-2 text-foreground/90">
            <li>
              <strong className="font-semibold text-foreground">
                양도차익
              </strong>{" "}
              = 양도가 − 취득가 − 필요경비
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                1세대 1주택 비과세 판정
              </strong>{" "}
              — 양도가 12억 이하 + 2년 이상 보유 시 전액 비과세
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                장기보유특별공제
              </strong>{" "}
              — 1년당 2%, 최대 30% (15년 이상)
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                기본공제
              </strong>{" "}
              250만원
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                누진세율
              </strong>{" "}
              6~45% (소득세법 §55)
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                지방소득세
              </strong>{" "}
              산출세액의 10%
            </li>
          </ol>
        </ToolSection>

        <FAQSection
          items={[
            {
              question: "다주택자 중과세는 반영되나요?",
              answer:
                "본 계산기는 일반 누진세율(6~45%)만 적용합니다. 조정대상지역 다주택자의 중과세(2주택 +20%p, 3주택 이상 +30%p)는 반영되지 않습니다. 다주택자라면 정확한 세율은 세무사 상담을 받으세요.",
            },
            {
              question: "1세대 1주택의 12억 초과분은 어떻게 계산되나요?",
              answer:
                "12억 초과분에 대해서만 양도세가 부과되며, 보유·거주 기간에 따른 추가 장기보유특별공제(최대 80%)가 적용됩니다. 본 계산기는 이 부분을 단순화해 일반 누진세를 적용하므로 실제보다 많이 나올 수 있습니다.",
            },
            {
              question: "필요경비에 무엇을 포함할 수 있나요?",
              answer:
                "취득 시 납부한 취득세·등록세, 법무사 보수, 부동산 중개수수료, 양도 시 인테리어·시설 개선 비용(자본적 지출, 영수증 필요) 등이 포함됩니다. 단순 도배·장판 같은 수익적 지출은 제외됩니다.",
            },
            {
              question: "장기보유특별공제는 어떻게 계산되나요?",
              answer:
                "본 계산기는 일반 부동산 기준(1년당 2%, 최대 30% / 15년 이상)을 사용합니다. 1세대 1주택은 보유기간(연 4%) + 거주기간(연 4%)을 합산해 최대 80%까지 공제 가능하지만, 본 v1에는 이 옵션이 없습니다.",
            },
            {
              question: "양도세 신고는 언제 하나요?",
              answer:
                "양도일이 속하는 달의 말일부터 2개월 이내에 예정신고·납부합니다. 양도일은 잔금 청산일 또는 등기 이전일 중 빠른 날입니다.",
            },
            {
              question: "주택 외 부동산도 같은 공식인가요?",
              answer:
                "토지·상업용 건물 등도 같은 누진세율 구조이지만, 비사업용 토지나 미등기 양도 등에는 별도 가산세가 있습니다. 본 계산기는 일반 주택 기준입니다.",
            },
          ]}
        />

        <Disclaimer>
          본 계산기는 양도세를 크게 단순화한 추산입니다. 다주택 중과,
          조정대상지역, 1세대 1주택 12억 초과분, 보유·거주 가산공제 등
          중요한 변수가 반영되지 않습니다. 실제 양도세 신고는 국세청
          홈택스 또는 세무사 상담을 거쳐 진행하세요.
        </Disclaimer>

        <RelatedTools
          slugs={[
            "loan-interest",
            "deposit-savings-maturity",
            "jeonse-monthly-converter",
            "comprehensive-income-tax",
          ]}
        />
        <AdSlot position="footer" />
      </ToolLayout>
    </>
  );
}

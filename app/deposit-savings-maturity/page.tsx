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
  title: "적금/예금 만기 계산기",
  description:
    "정기적금·정기예금의 만기 수령액을 단리 기준으로 계산하고 이자소득세 15.4%를 차감한 세후 금액을 보여 드립니다.",
  keywords: ["적금 계산기", "예금 계산기", "만기 수령액", "이자 계산", "이자소득세"],
  alternates: { canonical: "/deposit-savings-maturity" },
  openGraph: {
    title: "적금/예금 만기 계산기 | 셈",
    description: "월 납입 또는 일시 예치 만기 수령액 계산.",
    url: `${site.url}/deposit-savings-maturity`,
    type: "website",
  },
};

export default function DepositSavingsMaturityPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "적금/예금 만기 계산기",
    url: `${site.url}/deposit-savings-maturity`,
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
        title="적금/예금 만기 계산기"
        category="realestate"
        description="정기적금·정기예금의 만기 수령액(세후)을 계산합니다."
      >
        <Calculator />
        <AdSlot position="below-tool" />

        <HowToSection
          toolName="적금/예금 만기 계산기"
          steps={[
            {
              title: "상품 종류를 선택합니다",
              description:
                "정기적금(매월 일정액 납입)인지 정기예금(일시 예치)인지 선택하세요.",
            },
            {
              title: "금액·이자율·기간을 입력합니다",
              description:
                "적금이면 월 납입액, 예금이면 예치 금액을 입력하고, 연 이자율과 기간(개월)을 지정하세요.",
            },
            {
              title: "세후 수령액을 확인합니다",
              description:
                "원금, 세전 이자, 이자소득세(15.4%), 세후 이자, 세후 만기 수령액이 분리 표시됩니다.",
            },
          ]}
        />

        <ToolSection title="적금 vs 예금 차이">
          <ul className="ml-5 list-disc space-y-2 text-foreground/90">
            <li>
              <strong className="font-semibold text-foreground">정기적금</strong>{" "}
              — 매월 일정액을 납입. 월별 납입금에 대한 이자가 다르므로 평균
              납입기간만큼만 이자가 붙습니다. 같은 이율이면 정기예금보다 이자가
              적게 나옵니다.
            </li>
            <li>
              <strong className="font-semibold text-foreground">정기예금</strong>{" "}
              — 일시에 큰 금액을 예치. 전체 기간 동안 같은 원금에 이자가 붙으므로
              적금 대비 이자가 더 큽니다.
            </li>
          </ul>
          <p className="text-sm text-muted-foreground">
            본 계산기는 단리 기준입니다. 일부 상품은 복리이거나 우대금리·세금우대
            (비과세, 9.5% 우대) 혜택이 있어 실제 수령액이 더 클 수 있습니다.
          </p>
        </ToolSection>

        <FAQSection
          items={[
            {
              question: "왜 단리만 계산하나요?",
              answer:
                "한국 시중은행의 정기적금·정기예금은 대부분 단리 상품입니다. 복리는 일부 장기상품에서만 적용되며, 본 계산기는 가장 흔한 단리를 기준으로 합니다.",
            },
            {
              question: "이자소득세 15.4%는 무엇인가요?",
              answer:
                "이자소득에 대한 원천징수 세율로, 소득세 14% + 지방소득세 1.4%입니다. 세금우대저축·청년우대 등 일부 상품은 9.5% 또는 비과세가 적용됩니다.",
            },
            {
              question: "비과세 종합저축은 어떻게 계산하나요?",
              answer:
                "본 계산기는 일반 과세 상품을 가정합니다. 비과세 종합저축은 만 65세 이상 등 대상자에게 5천만원 한도로 제공되며, 비과세이므로 결과의 '세전 이자' 칸이 그대로 만기 수령액이 됩니다.",
            },
            {
              question: "복리는 언제 유리한가요?",
              answer:
                "기간이 길고 이자율이 높을수록 복리 효과가 커집니다. 1~2년 정도의 단기 상품에서는 복리·단리 차이가 크지 않지만, 5년 이상 장기 또는 변액보험·연금 상품은 복리 효과가 의미 있게 누적됩니다.",
            },
            {
              question: "ISA·연금저축은 비과세인가요?",
              answer:
                "ISA(개인종합자산관리계좌)는 가입 후 3~5년 만기 시 200만원까지 비과세, 초과분은 9.9% 분리과세입니다. 연금저축은 인출 시 5.5% 연금소득세가 부과됩니다. 본 계산기로는 정확한 ISA·연금저축 수령액을 계산할 수 없으니 각 상품의 약관을 확인하세요.",
            },
          ]}
        />

        <Disclaimer>
          본 계산기는 단리 기준의 단순 추정입니다. 실제 상품은 우대금리·세금우대
          혜택, 복리 적용, 중도해지 페널티 등에 따라 결과가 다를 수 있습니다.
          가입 전 각 은행의 약관을 확인하세요.
        </Disclaimer>

        <RelatedTools
          slugs={[
            "loan-interest",
            "real-estate-transfer-tax",
            "jeonse-monthly-converter",
            "exchange-rate",
          ]}
        />
        <AdSlot position="footer" />
      </ToolLayout>
    </>
  );
}

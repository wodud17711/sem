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
  title: "전월세 환산 계산기",
  description:
    "전월세 전환율로 보증금과 월세를 양방향 환산합니다. 반전세 부분 전환도 지원.",
  keywords: [
    "전월세 환산",
    "전월세 전환율",
    "보증금 월세",
    "반전세 계산",
  ],
  alternates: { canonical: "/jeonse-monthly-converter" },
  openGraph: {
    title: "전월세 환산 계산기 | 셈",
    description: "보증금 ↔ 월세 환산.",
    url: `${site.url}/jeonse-monthly-converter`,
    type: "website",
  },
};

export default function JeonseMonthlyConverterPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "전월세 환산 계산기",
    url: `${site.url}/jeonse-monthly-converter`,
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
        title="전월세 환산 계산기"
        category="realestate"
        description="전월세 전환율로 보증금과 월세를 양방향으로 환산합니다."
      >
        <Calculator />
        <AdSlot position="below-tool" />

        <HowToSection
          toolName="전월세 환산 계산기"
          steps={[
            {
              title: "변환 방향을 선택합니다",
              description:
                "보증금을 월세로 환산할지, 월세를 보증금으로 환산할지 선택하세요.",
            },
            {
              title: "금액과 전환율을 입력합니다",
              description:
                "변환할 금액과 전월세 전환율(%)을 입력하면 즉시 결과가 표시됩니다. 전환율은 보통 5~6%입니다.",
            },
            {
              title: "반전세는 남길 보증금을 입력합니다",
              description:
                "전체 보증금 중 일부만 월세로 전환하는 반전세인 경우, 남길 보증금을 입력하면 차액만 월세로 환산됩니다.",
            },
          ]}
        />

        <ToolSection title="전월세 전환율 안내">
          <ul className="ml-5 list-disc space-y-2 text-foreground/90">
            <li>
              <strong className="font-semibold text-foreground">
                일반 전환율
              </strong>{" "}
              — 한국부동산원 발표 기준 전국 평균 약 5~6%. 서울이 가장 높고,
              지방이 낮은 편.
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                법정 한도
              </strong>{" "}
              — 주택임대차보호법 제7조의2에 따라 한국은행 기준금리 + 2%
              또는 10% 중 낮은 값을 초과할 수 없습니다 (계약 갱신 시 적용).
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                계약 시 협의
              </strong>{" "}
              — 신규 계약 시에는 임대인·임차인 협의로 자유롭게 정합니다. 다만
              이상하게 높은 전환율은 임차인에게 불리하므로 시세를 확인하세요.
            </li>
          </ul>
        </ToolSection>

        <FAQSection
          items={[
            {
              question: "왜 전월세 전환율이 5~6%로 높나요?",
              answer:
                "전세금은 임대인이 활용해 다른 곳에 투자하거나 대출 상환에 쓸 수 있는 자금입니다. 이를 월세로 받을 때는 단순 예금 이자보다 임대 관리 비용·공실 위험 등이 더해져 전환율이 높게 형성됩니다.",
            },
            {
              question: "반전세는 어떻게 계산하나요?",
              answer:
                "예: 전세 2억을 보증금 1억 + 월세로 변환하려면, '전체 보증금 2억', '남길 보증금 1억'을 입력하세요. 전환되는 1억에 대해 (1억 × 전환율 / 12) 월세가 계산됩니다.",
            },
            {
              question: "법정 전환율이 더 낮으면 어떻게 되나요?",
              answer:
                "계약 갱신 시 법정 한도(기준금리 + 2% 또는 10% 중 낮은 값)를 초과하는 전환은 무효입니다. 임차인은 기존 계약 조건 유지를 주장할 수 있습니다. 신규 계약은 자유 협의 사항입니다.",
            },
            {
              question: "왜 보증금을 줄이면 월세가 늘어나나요?",
              answer:
                "임대인 입장에서는 보증금이 적을수록 회수 위험이 커지므로 그만큼 월세로 보전받습니다. 이 환산 비율이 전월세 전환율이며, 본 계산기는 그 산식을 그대로 적용합니다.",
            },
            {
              question: "지역별 평균 전환율은 어디서 보나요?",
              answer:
                "한국부동산원 부동산통계정보(R-ONE), 국토교통부 실거래가 공개시스템에서 지역·아파트 단지별 전환율 통계를 확인할 수 있습니다.",
            },
          ]}
        />

        <Disclaimer>
          본 계산기는 단순 환산 도구입니다. 실제 전월세 계약 시에는 보증금
          반환 보증, 임대차계약 갱신 청구권, 계약갱신 시 인상률 한도 등 다양한
          법적 요소가 있으니 공인중개사·법률 상담을 통해 진행하세요.
        </Disclaimer>

        <RelatedTools
          slugs={[
            "loan-interest",
            "real-estate-transfer-tax",
            "deposit-savings-maturity",
            "salary-calculator",
          ]}
        />
        <AdSlot position="footer" />
      </ToolLayout>
    </>
  );
}

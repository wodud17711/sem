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
  title: "실업급여 계산기",
  description:
    "월급·나이·고용보험 가입기간으로 구직급여 일액과 소정급여일수, 총 예상 수급액을 계산합니다. 2026년 기준.",
  keywords: [
    "실업급여 계산기",
    "구직급여 계산",
    "실업급여 얼마",
    "소정급여일수",
    "실업급여 상한액",
  ],
  alternates: { canonical: "/unemployment-benefit-calculator" },
  openGraph: {
    title: "실업급여 계산기 | 셈",
    description: "구직급여 일액·소정급여일수·총 수급액 계산.",
    url: `${site.url}/unemployment-benefit-calculator`,
    type: "website",
  },
};

export default function UnemploymentBenefitCalculatorPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "실업급여 계산기",
    url: `${site.url}/unemployment-benefit-calculator`,
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
        title="실업급여 계산기"
        category="finance"
        description="구직급여 일액과 소정급여일수, 총 예상 수급액을 추산합니다."
        rateBasis="2026년 기준 (상한 68,100원 · 하한 66,048원)"
      >
        <Calculator />
        <AdSlot position="below-tool" />

        <HowToSection
          toolName="실업급여 계산기"
          steps={[
            {
              title: "월 평균임금을 입력합니다",
              description:
                "퇴사 직전 3개월 동안 받은 세전 평균 월급을 입력하세요. 본 계산기는 이를 30으로 나눠 1일 평균임금으로 환산합니다.",
            },
            {
              title: "나이와 가입기간을 입력합니다",
              description:
                "이직일 기준 만 나이와 고용보험 가입기간(년)을 입력하면 소정급여일수가 자동으로 결정됩니다.",
            },
            {
              title: "예상 수급액을 확인합니다",
              description:
                "1일 구직급여일액, 소정급여일수, 총 예상 수급액이 표시됩니다. 상·하한액이 적용된 경우 안내도 함께 보여 드립니다.",
            },
          ]}
        />

        <ToolSection title="실업급여는 어떻게 계산되나요?">
          <p className="text-foreground/90">
            실업급여(구직급여)는 비자발적으로 퇴사한 근로자가 재취업을 준비하는
            동안 받는 급여입니다. 금액은 ‘1일 구직급여일액 × 소정급여일수’로
            정해집니다.
          </p>
          <ul className="ml-5 list-disc space-y-2 text-foreground/90">
            <li>
              <strong className="font-semibold text-foreground">
                1일 구직급여일액
              </strong>{" "}
              — 퇴사 전 평균임금(1일분)의 60%. 단 2026년 기준 상한 68,100원,
              하한 66,048원이 적용됩니다.
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                하한액 산정
              </strong>{" "}
              — 최저시급(2026년 10,320원) × 80% × 8시간 = 66,048원. 평균임금이
              낮아도 이 금액은 보장됩니다.
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                소정급여일수
              </strong>{" "}
              — 이직일 기준 나이(50세)와 가입기간에 따라 120일~270일.
            </li>
          </ul>
        </ToolSection>

        <ToolSection title="소정급여일수 표">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="px-3 py-3 font-medium">가입기간</th>
                  <th className="px-3 py-3 font-medium">50세 미만</th>
                  <th className="px-3 py-3 font-medium">50세 이상·장애인</th>
                </tr>
              </thead>
              <tbody className="text-foreground/90">
                <tr className="border-t border-border">
                  <td className="px-3 py-3">1년 미만</td>
                  <td className="px-3 py-3">120일</td>
                  <td className="px-3 py-3">120일</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-3">1년 이상 3년 미만</td>
                  <td className="px-3 py-3">150일</td>
                  <td className="px-3 py-3">180일</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-3">3년 이상 5년 미만</td>
                  <td className="px-3 py-3">180일</td>
                  <td className="px-3 py-3">210일</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-3">5년 이상 10년 미만</td>
                  <td className="px-3 py-3">210일</td>
                  <td className="px-3 py-3">240일</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-3 py-3">10년 이상</td>
                  <td className="px-3 py-3">240일</td>
                  <td className="px-3 py-3">270일</td>
                </tr>
              </tbody>
            </table>
          </div>
        </ToolSection>

        <FAQSection
          items={[
            {
              question: "실업급여는 누구나 받을 수 있나요?",
              answer:
                "비자발적 이직(권고사직·계약만료·정당한 사유의 자진퇴사 등)이면서, 이직 전 18개월 동안 고용보험 피보험단위기간이 180일 이상이어야 합니다. 본인 사정으로 인한 단순 자진퇴사는 원칙적으로 대상이 아닙니다.",
            },
            {
              question: "왜 하한액이 상한액과 비슷한가요?",
              answer:
                "하한액은 최저임금의 80%에 8시간을 곱해 산정되는데, 최저임금이 오르면서 상한액(68,100원)과의 차이가 크게 줄었습니다. 그래서 평균임금이 높지 않으면 대부분 하한액 수준을 받게 됩니다.",
            },
            {
              question: "이 계산 결과가 실제 수급액과 같나요?",
              answer:
                "근사 추정치입니다. 실제 평균임금은 퇴사 전 3개월의 실제 일수와 상여·수당 포함 여부로 달라지고, 반복수급 감액 등도 영향을 줍니다. 정확한 금액은 고용보험 홈페이지의 모의계산을 이용하세요.",
            },
            {
              question: "반복수급하면 금액이 줄어드나요?",
              answer:
                "네. 5년 동안 3회 이상 반복수급하는 경우 횟수에 따라 구직급여가 최대 50%까지 감액되고 대기기간도 길어집니다. 본 계산기는 이 감액을 반영하지 않습니다.",
            },
            {
              question: "실업급여는 언제까지 신청해야 하나요?",
              answer:
                "퇴직 다음 날부터 12개월이 지나면 소정급여일수가 남아 있어도 받을 수 없습니다. 퇴사 후 지체 없이 워크넷 구직등록과 수급자격 신청을 진행하세요.",
            },
          ]}
        />

        <Disclaimer>
          본 계산기는 월급을 30으로 나눠 평균임금일액을 근사한 간이 추정 도구로,
          평균임금 정밀 산정·반복수급 감액·조기재취업수당·수급 요건 판단은
          반영하지 않습니다. 정확한 금액과 수급 자격은 고용보험 모의계산과 거주지
          관할 고용센터(국번 없이 1350)에서 확인하세요.
        </Disclaimer>

        <RelatedTools
          slugs={[
            "severance-pay-calculator",
            "salary-calculator",
            "hourly-wage-calculator",
            "four-insurance-calculator",
          ]}
        />
        <AdSlot position="footer" />
      </ToolLayout>
    </>
  );
}

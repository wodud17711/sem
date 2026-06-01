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
  title: "퍼센트 계산기 (백분율)",
  description:
    "비율, 퍼센트 값, 증감률을 한 번에 계산합니다. A는 B의 몇 %인지, 전체의 몇 %가 얼마인지 즉시 확인하세요.",
  keywords: [
    "퍼센트 계산기",
    "백분율 계산기",
    "비율 계산",
    "증감률 계산",
    "퍼센트 구하기",
  ],
  alternates: { canonical: "/percent-calculator" },
  openGraph: {
    title: "퍼센트 계산기 (백분율) | 셈",
    description: "비율·퍼센트 값·증감률 계산.",
    url: `${site.url}/percent-calculator`,
    type: "website",
  },
};

export default function PercentCalculatorPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "퍼센트 계산기",
    url: `${site.url}/percent-calculator`,
    applicationCategory: "UtilitiesApplication",
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
        title="퍼센트 계산기"
        category="lifestyle"
        description="비율, 퍼센트 값, 증감률을 한 번에 계산합니다."
      >
        <Calculator />
        <AdSlot position="below-tool" />

        <HowToSection
          toolName="퍼센트 계산기"
          steps={[
            {
              title: "계산 종류를 선택합니다",
              description:
                "'비율'은 A가 B의 몇 %인지, '퍼센트 값'은 전체의 A%가 얼마인지, '증감률'은 값이 얼마나 늘거나 줄었는지 계산합니다.",
            },
            {
              title: "두 값을 입력합니다",
              description:
                "선택한 계산에 맞는 두 숫자를 입력하세요. 소수점도 입력할 수 있습니다.",
            },
            {
              title: "결과를 확인합니다",
              description:
                "입력하는 즉시 결과가 표시됩니다. 증감률은 늘면 +, 줄면 -로 표시됩니다.",
            },
          ]}
        />

        <ToolSection title="퍼센트 계산, 이렇게 합니다">
          <ul className="ml-5 list-disc space-y-2 text-foreground/90">
            <li>
              <strong className="font-semibold text-foreground">
                비율 (A는 B의 몇 %)
              </strong>{" "}
              — A ÷ B × 100. 예: 30은 200의 15%입니다.
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                퍼센트 값 (B의 A%)
              </strong>{" "}
              — B × A ÷ 100. 예: 200의 15%는 30입니다.
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                증감률 (A에서 B로)
              </strong>{" "}
              — (B − A) ÷ A × 100. 예: 100에서 120으로 늘면 +20%, 200에서
              150으로 줄면 −25%입니다.
            </li>
          </ul>
          <p className="text-foreground/90">
            할인율, 시험 점수 비율, 매출 증감, 투자 수익률처럼 일상과 업무에서
            자주 쓰는 계산을 한 화면에서 처리할 수 있습니다.
          </p>
        </ToolSection>

        <ToolSection title="활용 예시">
          <ul className="ml-5 list-disc space-y-2 text-foreground/90">
            <li>
              <strong className="font-semibold text-foreground">할인가</strong>{" "}
              — 5만원짜리를 30% 할인하면? ‘퍼센트 값’으로 50,000의 30%(15,000)를
              구해 빼면 35,000원입니다.
            </li>
            <li>
              <strong className="font-semibold text-foreground">정답률</strong>{" "}
              — 50문제 중 42개를 맞혔다면? ‘비율’로 42는 50의 84%입니다.
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                매출 변화
              </strong>{" "}
              — 작년 8,000만원에서 올해 9,200만원이면? ‘증감률’로 +15%입니다.
            </li>
          </ul>
        </ToolSection>

        <FAQSection
          items={[
            {
              question: "30은 200의 몇 %인가요?",
              answer:
                "'비율' 모드에서 부분 값에 30, 전체 값에 200을 입력하면 15%가 나옵니다. 계산식은 30 ÷ 200 × 100입니다.",
            },
            {
              question: "어떤 값을 30% 할인하면 얼마인가요?",
              answer:
                "'퍼센트 값' 모드로 전체 값의 30%를 먼저 구한 뒤, 원래 값에서 빼면 할인가가 됩니다. 예를 들어 50,000원의 30%는 15,000원이므로 할인가는 35,000원입니다.",
            },
            {
              question: "증가율과 증감률은 어떻게 다른가요?",
              answer:
                "증가율은 값이 늘어난 경우만, 증감률은 늘거나 주는 경우를 모두 포함하는 표현입니다. 이 계산기의 '증감률'은 결과가 양수면 증가, 음수면 감소를 의미합니다.",
            },
            {
              question: "퍼센트포인트(%p)와 퍼센트(%)는 같은가요?",
              answer:
                "다릅니다. 금리가 3%에서 5%로 오르면, 차이는 2%포인트이지만 증감률로는 약 +66.7%입니다. 두 수치의 '차이 자체'를 말할 때는 퍼센트포인트, '얼마나 변했는지 비율'을 말할 때는 퍼센트를 씁니다.",
            },
            {
              question: "분모가 0이면 왜 결과가 안 나오나요?",
              answer:
                "전체 값이나 기준 값이 0이면 나눗셈이 성립하지 않아 비율과 증감률을 계산할 수 없습니다. 0이 아닌 값을 입력해 주세요.",
            },
          ]}
        />

        <Disclaimer>
          본 계산기는 표준 백분율 공식을 그대로 적용합니다. 결과는 소수점 둘째
          자리까지 표시되며, 실제 정산·회계에서는 반올림 규칙에 따라 끝자리가
          달라질 수 있습니다.
        </Disclaimer>

        <RelatedTools
          slugs={[
            "unit-converter",
            "loan-interest",
            "deposit-savings-maturity",
            "bmi-calculator",
          ]}
        />
        <AdSlot position="footer" />
      </ToolLayout>
    </>
  );
}

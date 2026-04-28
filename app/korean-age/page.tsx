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
  title: "만 나이 계산기",
  description:
    "생년월일을 입력하면 만 나이, 연 나이, 옛 한국 나이를 한 번에 계산합니다. 2023년 6월부터 행정상 만 나이로 통일.",
  keywords: ["만 나이 계산기", "한국 나이", "만 나이", "연 나이"],
  alternates: { canonical: "/korean-age" },
  openGraph: {
    title: "만 나이 계산기 | 셈",
    description: "생년월일 → 만 나이.",
    url: `${site.url}/korean-age`,
    type: "website",
  },
};

export default function KoreanAgePage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "만 나이 계산기",
    url: `${site.url}/korean-age`,
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
        title="만 나이 계산기"
        category="lifestyle"
        description="생년월일로 만 나이·연 나이·옛 한국 나이를 즉시 계산합니다."
      >
        <Calculator />
        <AdSlot position="below-tool" />

        <HowToSection
          toolName="만 나이 계산기"
          steps={[
            {
              title: "생년월일을 선택합니다",
              description: "달력에서 본인 또는 계산하려는 사람의 생년월일을 선택하세요.",
            },
            {
              title: "기준일을 조정합니다 (선택)",
              description:
                "특정 시점의 나이를 알고 싶으면 기준일을 변경하세요. 기본은 오늘입니다.",
            },
            {
              title: "결과를 확인합니다",
              description:
                "만 나이가 큰 글씨로 표시되며, 참고용으로 연 나이와 옛 한국 나이도 함께 보여 드립니다.",
            },
          ]}
        />

        <ToolSection title="만 나이·연 나이·한국 나이 차이">
          <ul className="ml-5 list-disc space-y-2 text-foreground/90">
            <li>
              <strong className="font-semibold text-foreground">만 나이</strong>{" "}
              — 태어난 날을 기준으로 1년이 지날 때마다 1살씩 늘어납니다. 국제 표준이며,
              2023년 6월 28일부터 한국의 모든 행정·민사상 나이가 만 나이로 통일되었습니다.
            </li>
            <li>
              <strong className="font-semibold text-foreground">연 나이</strong>{" "}
              — 단순히 현재 연도에서 출생 연도를 뺀 값. 병역법, 청소년보호법 등
              일부 법령에서 사용됩니다.
            </li>
            <li>
              <strong className="font-semibold text-foreground">옛 한국 나이</strong>{" "}
              — 태어나면 1살이 되고 매년 1월 1일에 1살 증가하는 전통 셈법.
              2023년 6월 28일 이후 행정·민사상 사용 폐지됐으나 일상 대화에서 여전히
              사용됩니다.
            </li>
          </ul>
        </ToolSection>

        <FAQSection
          items={[
            {
              question: "왜 한국 나이가 폐지됐나요?",
              answer:
                "한 사람이 만 나이·연 나이·한국 나이로 다르게 표현되어 행정·법률·의료 분야에서 혼란이 자주 발생했습니다. 2023년 6월 28일 행정기본법과 민법 개정으로 모든 공식 나이가 만 나이로 통일됐습니다.",
            },
            {
              question: "병역·술·담배는 어떤 나이를 쓰나요?",
              answer:
                "병역법은 연 나이를 사용하므로 만 18세가 되는 해의 1월 1일부터 병역의무가 발생합니다. 청소년보호법(주류·담배 구매)도 연 나이 기준이며, 만 19세가 되는 해의 1월 1일부터 가능합니다.",
            },
            {
              question: "초등학교 입학 연령은?",
              answer:
                "초·중등교육법상 만 6세가 되는 다음 해의 3월 1일에 입학합니다. 즉 2026년에 만 6세가 된 아이는 2027년 3월 입학입니다.",
            },
            {
              question: "보험·의료 분야는 어떤 나이?",
              answer:
                "건강검진, 보험 가입 연령 등은 모두 만 나이입니다. 만 40세, 만 50세 등 검진 대상 연령을 정확히 확인하려면 본 계산기로 확인하세요.",
            },
          ]}
        />

        <Disclaimer>
          본 도구는 행정상 만 나이를 계산합니다. 일부 법령(병역법, 청소년보호법)은
          연 나이를 사용하므로 적용 대상은 해당 법령을 확인하세요.
        </Disclaimer>

        <RelatedTools
          slugs={[
            "bmi-calculator",
            "dday-calculator",
            "drink-driving-time",
            "salary-calculator",
          ]}
        />
        <AdSlot position="footer" />
      </ToolLayout>
    </>
  );
}

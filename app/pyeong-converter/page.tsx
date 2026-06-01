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
  title: "평수 변환기 (평 ↔ ㎡)",
  description:
    "제곱미터(㎡)와 평을 양방향으로 변환합니다. 아파트 전용면적 ㎡를 평으로 바로 환산하세요.",
  keywords: [
    "평수 변환기",
    "평 제곱미터 변환",
    "㎡ 평 계산",
    "평수 계산기",
    "전용면적 평수",
  ],
  alternates: { canonical: "/pyeong-converter" },
  openGraph: {
    title: "평수 변환기 (평 ↔ ㎡) | 셈",
    description: "제곱미터와 평을 양방향 변환.",
    url: `${site.url}/pyeong-converter`,
    type: "website",
  },
};

export default function PyeongConverterPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "평수 변환기",
    url: `${site.url}/pyeong-converter`,
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
        title="평수 변환기"
        category="converter"
        description="제곱미터(㎡)와 평을 양방향으로 변환합니다."
      >
        <Calculator />
        <AdSlot position="below-tool" />

        <HowToSection
          toolName="평수 변환기"
          steps={[
            {
              title: "변환 방향을 선택합니다",
              description:
                "㎡를 평으로 바꿀지, 평을 ㎡로 바꿀지 선택하세요. 부동산 매물은 보통 ㎡로 표시되므로 ㎡ → 평을 자주 씁니다.",
            },
            {
              title: "면적을 입력합니다",
              description:
                "변환할 면적 숫자를 입력하면 즉시 환산 결과가 나타납니다. 소수점도 입력할 수 있습니다.",
            },
            {
              title: "결과를 확인합니다",
              description:
                "환산된 면적이 소수점 둘째 자리까지 표시됩니다. 분양 광고의 '34평형'은 공용면적이 포함된 값이라 전용면적 환산값과 다를 수 있습니다.",
            },
          ]}
        />

        <ToolSection title="평과 제곱미터, 어떻게 환산되나요?">
          <p className="text-foreground/90">
            평은 척관법에서 온 면적 단위로, 한 변이 6자(약 1.818m)인 정사각형
            넓이입니다. 정확한 환산값은 다음과 같아요.
          </p>
          <ul className="ml-5 list-disc space-y-2 text-foreground/90">
            <li>
              <strong className="font-semibold text-foreground">
                1평 = 약 3.3058㎡
              </strong>{" "}
              (정확히는 400 ÷ 121 ㎡)
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                1㎡ = 0.3025평
              </strong>{" "}
              — ㎡에 0.3025를 곱하면 평이 됩니다.
            </li>
          </ul>
          <p className="text-foreground/90">
            2007년부터 부동산 면적 표기는 ㎡로 일원화되어, 등기부와 건축물대장,
            매물 정보 모두 ㎡로 적습니다. 평은 법정 단위가 아니지만 직관적이라
            여전히 일상에서 널리 쓰입니다.
          </p>
        </ToolSection>

        <ToolSection title="자주 쓰는 면적 환산표">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="px-4 py-3 font-medium">전용면적(㎡)</th>
                  <th className="px-4 py-3 font-medium">평 환산</th>
                  <th className="px-4 py-3 font-medium">통상 분양 평형</th>
                </tr>
              </thead>
              <tbody className="text-foreground/90">
                <tr className="border-t border-border">
                  <td className="px-4 py-3">39㎡</td>
                  <td className="px-4 py-3">약 11.8평</td>
                  <td className="px-4 py-3">17평형</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">59㎡</td>
                  <td className="px-4 py-3">약 17.8평</td>
                  <td className="px-4 py-3">24~25평형</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">84㎡</td>
                  <td className="px-4 py-3">약 25.4평</td>
                  <td className="px-4 py-3">33~34평형</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">114㎡</td>
                  <td className="px-4 py-3">약 34.5평</td>
                  <td className="px-4 py-3">45평형</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground">
            ‘분양 평형’은 전용면적에 계단·복도 같은 공용면적을 더한 공급면적을
            평으로 환산한 값이라, 전용면적만 환산한 값보다 큽니다.
          </p>
        </ToolSection>

        <FAQSection
          items={[
            {
              question: "전용면적 84㎡는 몇 평인가요?",
              answer:
                "84㎡를 평으로 환산하면 약 25.4평입니다. 다만 분양 광고에서는 공용면적을 더한 공급면적 기준으로 '33평형' 또는 '34평형'으로 부르는 경우가 많습니다.",
            },
            {
              question: "왜 같은 집인데 평수가 다르게 표시되나요?",
              answer:
                "기준 면적이 다르기 때문입니다. 전용면적(실제 사용 공간)을 환산한 평수와, 공용면적까지 포함한 공급면적을 환산한 평수가 다릅니다. 분양 평형은 보통 공급면적 기준입니다.",
            },
            {
              question: "1평은 정확히 몇 ㎡인가요?",
              answer:
                "1평은 400÷121 ㎡로 약 3.3058㎡입니다. 한 변이 6자(약 1.818m)인 정사각형의 넓이에서 유래했습니다.",
            },
            {
              question: "평으로 표기해도 법적으로 문제 없나요?",
              answer:
                "공식 문서(등기부, 건축물대장, 계약서)는 ㎡로 표기해야 합니다. 평은 법정 계량단위가 아니므로 참고용으로만 사용하고, 정확한 면적은 ㎡ 기준을 확인하세요.",
            },
            {
              question: "토지 면적도 같은 방식으로 환산하나요?",
              answer:
                "네, 아파트든 토지든 1평 = 3.3058㎡로 동일하게 환산합니다. 예전에 토지 면적에 쓰던 '단보·정보' 같은 단위와는 다르니 주의하세요.",
            },
          ]}
        />

        <Disclaimer>
          본 변환기는 1평 = 400÷121㎡(약 3.3058㎡)의 표준 환산 비율을
          사용합니다. 부동산 매물의 ‘평형’ 표기는 공용면적 포함 여부에 따라
          달라질 수 있으니, 정확한 면적은 건축물대장·등기부의 ㎡ 수치를
          확인하세요.
        </Disclaimer>

        <RelatedTools
          slugs={[
            "unit-converter",
            "real-estate-transfer-tax",
            "jeonse-monthly-converter",
            "loan-interest",
          ]}
        />
        <AdSlot position="footer" />
      </ToolLayout>
    </>
  );
}

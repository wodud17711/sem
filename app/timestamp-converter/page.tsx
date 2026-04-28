import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { FAQSection } from "@/components/tools/FAQSection";
import { HowToSection } from "@/components/tools/HowToSection";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Disclaimer, ToolLayout, ToolSection } from "@/components/tools/ToolLayout";
import { site } from "@/lib/site";
import { Calculator } from "./Calculator";

export const metadata: Metadata = {
  title: "타임스탬프 변환기",
  description:
    "Unix 타임스탬프(초·밀리초)와 사람이 읽는 날짜를 양방향으로 변환합니다. ISO 8601, 한국 시간, UTC 동시 표시.",
  keywords: [
    "타임스탬프 변환기",
    "Unix timestamp",
    "ISO 8601",
    "epoch 변환",
    "날짜 변환",
  ],
  alternates: { canonical: "/timestamp-converter" },
  openGraph: {
    title: "타임스탬프 변환기 | 셈",
    description: "Unix epoch ↔ 사람이 읽는 날짜.",
    url: `${site.url}/timestamp-converter`,
    type: "website",
  },
};

export default function TimestampConverterPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "타임스탬프 변환기",
    url: `${site.url}/timestamp-converter`,
    applicationCategory: "DeveloperApplication",
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
        title="타임스탬프 변환기"
        category="productivity"
        description="Unix epoch와 사람이 읽는 날짜를 양방향으로 변환합니다."
      >
        <Calculator />
        <AdSlot position="below-tool" />

        <HowToSection
          toolName="타임스탬프 변환기"
          steps={[
            {
              title: "어느 형식이든 입력하면 나머지가 자동 변환됩니다",
              description:
                "Unix 초, Unix 밀리초, ISO 8601, 한국 시간 중 어느 칸이든 수정하면 나머지 세 형식이 즉시 갱신됩니다.",
            },
            {
              title: "현재 시각 버튼으로 빠르게 채웁니다",
              description:
                "현재 시각을 기준으로 시작하고 싶으면 상단의 '현재 시각' 버튼을 누르세요.",
            },
            {
              title: "복사해서 사용합니다",
              description:
                "각 입력 칸을 선택해 Ctrl/Cmd+C로 복사한 뒤 코드·DB 쿼리 등에 붙여 넣으세요.",
            },
          ]}
        />

        <ToolSection title="형식 안내">
          <ul className="ml-5 list-disc space-y-2 text-foreground/90">
            <li>
              <strong className="font-semibold text-foreground">
                Unix 타임스탬프 (초)
              </strong>{" "}
              — 1970년 1월 1일 UTC 자정부터의 경과 초. 가장 흔한 형식.
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                Unix 타임스탬프 (밀리초)
              </strong>{" "}
              — JavaScript Date.now()의 반환값. 초 단위에 ×1000.
            </li>
            <li>
              <strong className="font-semibold text-foreground">ISO 8601</strong>{" "}
              — 국제 표준 (예: 2026-04-29T10:00:00.000Z). UTC 기준.
            </li>
            <li>
              <strong className="font-semibold text-foreground">한국 시간 (KST)</strong>{" "}
              — UTC+9. 사용자의 브라우저 로컬 시간대로 표시됩니다.
            </li>
          </ul>
        </ToolSection>

        <FAQSection
          items={[
            {
              question: "Unix 타임스탬프란?",
              answer:
                "1970년 1월 1일 0시 0분 0초(UTC)를 기준점(epoch)으로 한 경과 시간입니다. 시스템 시간 표현의 표준이며, 데이터베이스·로그·API 응답에서 자주 사용됩니다.",
            },
            {
              question: "초와 밀리초를 어떻게 구분하나요?",
              answer:
                "현재 시점 기준 Unix 초는 약 17억(10자리), Unix 밀리초는 약 1.7조(13자리)입니다. 자릿수로 구분할 수 있습니다. 본 도구는 두 칸을 분리해 보여 줍니다.",
            },
            {
              question: "왜 ISO 8601 결과 끝에 'Z'가 붙나요?",
              answer:
                "Z는 'Zulu time'의 약자로 UTC를 뜻합니다. 시간대 표시 없이 UTC임을 명시하는 표준 표기입니다. KST는 UTC+9이므로 한국 시간 09:00은 ISO에서 00:00Z로 표시됩니다.",
            },
            {
              question: "한국 시간이 정확하지 않은 것 같아요.",
              answer:
                "본 도구는 사용자의 브라우저 시간대를 사용합니다. 컴퓨터 시간대가 KST(서울)로 설정되어 있는지 확인해 주세요. 다른 시간대에서 사용하면 KST가 아닌 로컬 시간이 표시됩니다.",
            },
            {
              question: "윤초나 윤일은 어떻게 처리되나요?",
              answer:
                "JavaScript Date 객체 기준이며, 윤일(2월 29일)은 정상 처리됩니다. 윤초(leap second)는 OS 시계가 알아서 처리하므로 본 도구에서 별도 신경 쓸 필요는 없습니다.",
            },
          ]}
        />

        <Disclaimer>
          본 도구는 사용자의 브라우저 시계와 시간대 설정을 기준으로 작동합니다.
          서버 시각이 필요하면 별도 API를 사용하세요.
        </Disclaimer>

        <RelatedTools
          slugs={[
            "text-counter",
            "spacing-checker",
            "markdown-to-html",
            "korean-age",
          ]}
        />
        <AdSlot position="footer" />
      </ToolLayout>
    </>
  );
}

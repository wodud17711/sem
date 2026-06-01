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
  title: "마크다운 → HTML 변환기",
  description:
    "마크다운 문서를 안전한 HTML로 변환합니다. 헤더·리스트·링크·코드·인용 등 자주 쓰는 문법 지원.",
  keywords: [
    "마크다운 변환",
    "마크다운 HTML",
    "Markdown to HTML",
    "마크다운 문법",
  ],
  alternates: { canonical: "/markdown-to-html" },
  openGraph: {
    title: "마크다운 → HTML 변환기 | 셈",
    description: "마크다운을 안전하게 HTML로 변환.",
    url: `${site.url}/markdown-to-html`,
    type: "website",
  },
};

export default function MarkdownToHtmlPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "마크다운 → HTML 변환기",
    url: `${site.url}/markdown-to-html`,
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
        title="마크다운 → HTML 변환기"
        category="productivity"
        description="자주 쓰는 마크다운 문법을 안전한 HTML로 변환합니다."
      >
        <Calculator />
        <AdSlot position="below-tool" />

        <HowToSection
          toolName="마크다운 → HTML 변환기"
          steps={[
            {
              title: "왼쪽에 마크다운을 입력합니다",
              description:
                "마크다운 텍스트를 직접 작성하거나 기존 문서를 붙여넣으세요. 입력하는 즉시 오른쪽에 미리보기가 갱신됩니다.",
            },
            {
              title: "변환 결과를 확인합니다",
              description:
                "오른쪽 패널에 렌더링된 HTML 미리보기가 표시됩니다. 'HTML 코드 보기'를 펼치면 원시 HTML도 확인할 수 있습니다.",
            },
            {
              title: "HTML을 복사해 사용합니다",
              description:
                "HTML 복사 버튼으로 변환 결과를 클립보드에 복사한 뒤 블로그·웹사이트 등에 붙여넣으세요.",
            },
          ]}
        />

        <ToolSection title="지원하는 문법">
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">문법</th>
                  <th className="px-4 py-3 text-left font-semibold">예시</th>
                  <th className="px-4 py-3 text-left font-semibold">결과</th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                <tr className="border-t border-border">
                  <td className="px-4 py-3">헤더</td>
                  <td className="px-4 py-3"># 제목</td>
                  <td className="px-4 py-3">&lt;h1&gt;제목&lt;/h1&gt;</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">굵게</td>
                  <td className="px-4 py-3">**굵게**</td>
                  <td className="px-4 py-3">
                    &lt;strong&gt;굵게&lt;/strong&gt;
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">기울임</td>
                  <td className="px-4 py-3">*기울임*</td>
                  <td className="px-4 py-3">&lt;em&gt;기울임&lt;/em&gt;</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">링크</td>
                  <td className="px-4 py-3">[셈](https://semcalc.com)</td>
                  <td className="px-4 py-3">&lt;a href=&quot;...&quot;&gt;셈&lt;/a&gt;</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">인라인 코드</td>
                  <td className="px-4 py-3">`code`</td>
                  <td className="px-4 py-3">&lt;code&gt;code&lt;/code&gt;</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">리스트</td>
                  <td className="px-4 py-3">- 항목</td>
                  <td className="px-4 py-3">&lt;ul&gt;&lt;li&gt;...</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">인용</td>
                  <td className="px-4 py-3">&gt; 인용</td>
                  <td className="px-4 py-3">&lt;blockquote&gt;...</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">가로선</td>
                  <td className="px-4 py-3">---</td>
                  <td className="px-4 py-3">&lt;hr&gt;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </ToolSection>

        <FAQSection
          items={[
            {
              question: "이미지나 표는 지원하지 않나요?",
              answer:
                "본 v1에서는 이미지·표·중첩 리스트·순서 있는 리스트(1. 2. 3.)는 지원하지 않습니다. 자주 쓰는 단순 마크다운 변환에 초점을 맞췄으며, 추후 확장될 수 있습니다.",
            },
            {
              question: "javascript: URL은 왜 변환되지 않나요?",
              answer:
                "XSS(크로스사이트 스크립팅) 공격 방지를 위해 http://, https://로 시작하는 URL만 링크로 변환합니다. javascript:, data:, vbscript: 같은 위험한 스킴은 일반 텍스트로 처리됩니다.",
            },
            {
              question: "HTML 태그를 직접 입력하면?",
              answer:
                "본 도구는 입력된 HTML 태그를 모두 이스케이프 처리합니다. 즉 입력한 &lt;script&gt; 태그는 그대로 텍스트로 표시되고 실행되지 않습니다.",
            },
            {
              question: "GitHub 마크다운과 다른 부분이 있나요?",
              answer:
                "있습니다. 본 도구는 단순 변환에 집중하므로 GitHub Flavored Markdown의 표(table), 작업 목록(- [x]), 체크박스, 자동 링크 등은 지원하지 않습니다. 정밀한 GFM 변환이 필요하면 GitHub의 미리보기를 사용하세요.",
            },
            {
              question: "복사한 HTML을 어디에 사용할 수 있나요?",
              answer:
                "워드프레스, 티스토리, 노션 임포트 등 HTML을 입력으로 받는 거의 모든 블로그·CMS에서 사용할 수 있습니다. 일부 플랫폼은 자체 CSS가 적용되므로 시각 결과는 다를 수 있습니다.",
            },
          ]}
        />

        <Disclaimer>
          본 도구는 자주 쓰는 마크다운 문법만 지원하는 단순 변환기입니다. 복잡한
          문서나 GitHub 호환성이 필요한 경우 marked·markdown-it 같은 전용
          라이브러리를 사용하세요.
        </Disclaimer>

        <RelatedTools
          slugs={[
            "text-counter",
            "spacing-checker",
            "timestamp-converter",
            "color-converter",
          ]}
        />
        <AdSlot position="footer" />
      </ToolLayout>
    </>
  );
}

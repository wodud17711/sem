import type { Metadata } from "next";
import {
  ContentLayout,
  ContentSection,
} from "@/components/layout/ContentLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "연락처",
  description: `${site.name}에 문의하실 일이 있으면 이메일로 연락해 주세요.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <ContentLayout
      title="연락처"
      description="제안·오류 신고·기타 문의는 이메일로 받습니다."
    >
      <ContentSection title="이메일">
        <p>
          <a
            href={`mailto:${site.email}`}
            className="text-lg font-semibold text-foreground underline underline-offset-4"
          >
            {site.email}
          </a>
        </p>
        <p className="text-sm text-muted-foreground">
          개인이 운영하는 사이트라 답변까지 며칠 걸릴 수 있습니다. 양해해
          주세요.
        </p>
      </ContentSection>

      <ContentSection title="이런 문의를 환영합니다">
        <ul className="list-disc space-y-2 pl-5">
          <li>도구 결과가 잘못된 것 같다는 신고</li>
          <li>새로 만들어줬으면 하는 계산기 제안</li>
          <li>사용 중 발견한 버그나 오타</li>
          <li>개인정보·이용약관 관련 문의</li>
          <li>광고·제휴 관련 문의</li>
        </ul>
      </ContentSection>

      <ContentSection title="더 빠른 답을 받으려면">
        <p>이메일을 보내실 때 다음 내용을 함께 남겨 주시면 도움이 됩니다.</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>해당 도구 페이지 주소</li>
          <li>입력한 값과 받은 결과</li>
          <li>예상한 결과와 차이</li>
          <li>사용한 기기·브라우저 (예: 아이폰 사파리)</li>
        </ul>
      </ContentSection>
    </ContentLayout>
  );
}

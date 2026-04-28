import type { Metadata } from "next";
import {
  ContentLayout,
  ContentSection,
} from "@/components/layout/ContentLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "이용약관",
  description: `${site.name} 서비스의 이용 조건과 면책 사항을 안내합니다.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <ContentLayout
      title="이용약관"
      description={`${site.name}을 이용하시기 전 약관을 읽어주세요.`}
      lastUpdated="2026년 4월 29일"
    >
      <ContentSection title="제1조 (목적)">
        <p>
          본 약관은 {site.name}(이하 &ldquo;서비스&rdquo;)의 이용 조건과
          서비스 제공자와 사용자 간의 권리·의무를 정함을 목적으로 합니다.
        </p>
      </ContentSection>

      <ContentSection title="제2조 (서비스의 정의)">
        <p>
          본 서비스는 한국어 사용자를 위한 실용 계산기와 변환기 등을 제공하는
          웹사이트입니다. 사용자는 회원가입 없이 자유롭게 도구를 이용할 수
          있습니다.
        </p>
      </ContentSection>

      <ContentSection title="제3조 (계산 결과의 면책)">
        <p>
          본 서비스가 제공하는 모든 계산 결과는{" "}
          <strong className="font-semibold text-foreground">참고용</strong>이며,
          법적·세무적 효력을 가지지 않습니다. 다음 사항을 유의해 주세요.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            세금·4대보험 등 매년 법령이 바뀌는 항목은 갱신 시점에 따라 실제 값과
            차이가 있을 수 있습니다. 결과 화면의 기준일을 확인하세요.
          </li>
          <li>
            정확한 세액은 국세청 홈택스, 4대 사회보험 정보연계센터 등 공식
            기관의 계산기 또는 세무 전문가에게 확인하시기 바랍니다.
          </li>
          <li>
            의료·법률·금융 자문이 필요한 사안은 반드시 해당 분야 전문가의
            상담을 받으세요.
          </li>
          <li>
            서비스 이용으로 발생한 직간접적 손해에 대해 운영자는 책임을 지지
            않습니다.
          </li>
        </ul>
      </ContentSection>

      <ContentSection title="제4조 (사용자의 의무)">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            정상적인 사이트 운영을 방해하는 자동화 도구 또는 비정상적 트래픽을
            발생시키는 행위
          </li>
          <li>본 서비스의 콘텐츠를 영리 목적으로 무단 복제·배포하는 행위</li>
          <li>관계 법령을 위반하는 일체의 행위</li>
        </ul>
        <p>위 행위가 확인될 경우 접속이 제한될 수 있습니다.</p>
      </ContentSection>

      <ContentSection title="제5조 (지적재산권)">
        <p>
          본 사이트의 디자인, 코드, 텍스트 콘텐츠 등 모든 창작물의 저작권은
          운영자에게 귀속됩니다. 단, 사용자가 본인이 입력한 데이터에 대한
          권리는 사용자 본인에게 있습니다.
        </p>
      </ContentSection>

      <ContentSection title="제6조 (서비스의 변경 및 중단)">
        <p>
          운영자는 사이트의 도구 추가, 변경, 폐지를 사전 고지 없이 진행할 수
          있습니다. 다만 중요한 변경은 가능한 범위에서 사이트 내 공지를 통해
          알립니다.
        </p>
      </ContentSection>

      <ContentSection title="제7조 (약관의 변경)">
        <p>
          본 약관은 법령 변경이나 서비스 정책 변경에 따라 개정될 수 있습니다.
          개정 시점과 내용은 본 페이지를 통해 공지하며, 공지 후 사이트를 계속
          이용하시는 경우 변경된 약관에 동의하신 것으로 간주합니다.
        </p>
      </ContentSection>

      <ContentSection title="제8조 (준거법 및 분쟁 해결)">
        <p>
          본 약관은 대한민국 법령에 따라 해석되며, 서비스 이용으로 발생한
          분쟁은 운영자 주소지 관할 법원을 제1심 관할 법원으로 합니다.
        </p>
      </ContentSection>
    </ContentLayout>
  );
}

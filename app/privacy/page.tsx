import type { Metadata } from "next";
import {
  ContentLayout,
  ContentSection,
} from "@/components/layout/ContentLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: `${site.name}의 개인정보 수집 항목, 사용 목적, 쿠키와 광고 정책을 안내합니다.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <ContentLayout
      title="개인정보처리방침"
      description={`${site.name}이 어떤 정보를 수집하고 어떻게 사용하는지 안내합니다.`}
      lastUpdated="2026년 4월 29일"
    >
      <ContentSection title="1. 직접 수집하는 정보">
        <p>
          {site.name}은 회원가입 절차가 없으며, 이름·전화번호·주민등록번호 등
          개인을 식별할 수 있는 정보를 직접 수집하지 않습니다. 계산기에 입력한
          숫자(연봉, 키, 몸무게 등)는 사용자의 브라우저 안에서만 처리되며
          서버로 전송되거나 저장되지 않습니다.
        </p>
      </ContentSection>

      <ContentSection title="2. 자동으로 수집되는 정보">
        <p>
          서비스 개선과 운영을 위해 다음 정보가 자동으로 수집될 수 있습니다.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            접속 IP, 브라우저 종류와 버전, 운영체제, 화면 크기, 접속 시각,
            방문 페이지, 유입 경로
          </li>
          <li>쿠키 및 유사한 추적 기술이 생성한 식별자</li>
        </ul>
      </ContentSection>

      <ContentSection title="3. 쿠키 및 외부 서비스">
        <p>
          본 사이트는 다음 외부 서비스를 사용하며, 각 서비스는 자체 쿠키를
          사용합니다.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="font-semibold text-foreground">
              Google Analytics 4
            </strong>{" "}
            — 방문자 수, 페이지뷰, 유입 경로 등 익명 통계를 집계합니다.
            개인을 특정할 수 있는 형태로 사용하지 않습니다.
          </li>
          <li>
            <strong className="font-semibold text-foreground">
              Google AdSense
            </strong>{" "}
            — 사이트에 광고를 게재합니다. 사용자의 관심사에 맞춘 광고를
            보여주기 위해 쿠키를 사용할 수 있습니다. 광고 개인화는 아래 링크에서
            끌 수 있습니다.
          </li>
          <li>
            <strong className="font-semibold text-foreground">Vercel</strong> —
            사이트 호스팅 인프라 제공 업체로, 접속 로그가 운영 목적으로 일시
            기록될 수 있습니다.
          </li>
        </ul>
      </ContentSection>

      <ContentSection title="4. 정보의 사용 목적">
        <ul className="list-disc space-y-2 pl-5">
          <li>방문 통계 분석을 통한 서비스 개선</li>
          <li>광고 게재 및 광고 효과 측정</li>
          <li>이상 트래픽·악용 행위 탐지</li>
        </ul>
      </ContentSection>

      <ContentSection title="5. 보유·파기">
        <p>
          Google Analytics의 사용자 수준 데이터는 기본 14개월 이내에 자동
          삭제됩니다. AdSense 관련 데이터는 Google의 정책을 따릅니다.
          {site.name}은 별도로 사용자 식별 정보를 저장하지 않습니다.
        </p>
      </ContentSection>

      <ContentSection title="6. 사용자의 권리">
        <p>
          사용자는 언제든 다음 방법으로 정보 수집을 거부하거나 광고를
          비개인화할 수 있습니다.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            브라우저 설정에서 쿠키를 차단하거나 삭제합니다. 단, 사이트 일부
            기능이 정상 동작하지 않을 수 있습니다.
          </li>
          <li>
            Google Analytics 옵트아웃 부가기능:{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              className="underline underline-offset-2"
              rel="noopener noreferrer"
              target="_blank"
            >
              tools.google.com/dlpage/gaoptout
            </a>
          </li>
          <li>
            Google 광고 개인화 설정:{" "}
            <a
              href="https://adssettings.google.com/"
              className="underline underline-offset-2"
              rel="noopener noreferrer"
              target="_blank"
            >
              adssettings.google.com
            </a>
          </li>
        </ul>
      </ContentSection>

      <ContentSection title="7. 책임자 및 변경">
        <p>
          개인정보 처리에 관한 문의는{" "}
          <a
            href={`mailto:${site.email}`}
            className="underline underline-offset-2"
          >
            {site.email}
          </a>
          으로 연락해 주세요. 본 방침은 법령·서비스 변경에 따라 갱신될 수
          있으며, 변경 사항은 본 페이지를 통해 공지합니다.
        </p>
      </ContentSection>
    </ContentLayout>
  );
}

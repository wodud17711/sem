import type { Metadata } from "next";
import Link from "next/link";
import {
  ContentLayout,
  ContentSection,
} from "@/components/layout/ContentLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "소개",
  description:
    "셈은 한국 직장인과 자영업자를 위한 실용 계산기 모음입니다. 운영 목적과 원칙을 안내합니다.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <ContentLayout
      title={`${site.name} 소개`}
      description="한국어로 빠르고 정확하게 계산할 수 있는 곳을 만들고 있습니다."
    >
      <ContentSection title="무엇을 하는 사이트인가요">
        <p>
          셈은 연봉 실수령액, 퇴직금, 4대보험, 부동산 세금 등 한국 직장인과
          자영업자가 자주 찾는 계산기를 한 곳에 모은 사이트입니다. 회원가입
          없이, 모바일에서도 빠르게 사용할 수 있도록 만들고 있어요.
        </p>
      </ContentSection>

      <ContentSection title="왜 만들었나요">
        <p>
          여러 도구를 찾아 사이트를 옮겨 다니지 않고도, 자주 쓰는 계산을 한
          곳에서 끝낼 수 있으면 좋겠다는 생각에서 출발했습니다. 카테고리를
          나눠 정리하고, 결과의 근거가 되는 법령과 공식을 함께 보여 주어
          "이 숫자가 어떻게 나왔는지" 알 수 있게 만들고 있습니다.
        </p>
      </ContentSection>

      <ContentSection title="운영 원칙">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="font-semibold text-foreground">정확성 우선.</strong>{" "}
            세금·법령 기반 계산기는 매년 갱신하고, 결과 화면에 기준일을 명시합니다.
            국세청 홈택스 등 공식 자료와 결과를 비교하며 검증합니다.
          </li>
          <li>
            <strong className="font-semibold text-foreground">참고용 면책.</strong>{" "}
            모든 계산 결과는 참고용입니다. 세금·법률·의료 등 전문 영역은 반드시
            관련 기관이나 전문가에게 확인하시길 권합니다.
          </li>
          <li>
            <strong className="font-semibold text-foreground">개인정보 최소 수집.</strong>{" "}
            회원가입을 받지 않습니다. 입력하신 숫자는 브라우저 안에서만 처리되며
            서버로 전송되지 않습니다.
          </li>
          <li>
            <strong className="font-semibold text-foreground">사용자 경험 우선.</strong>{" "}
            도구 결과 영역, 콘텐츠 사이, 페이지 하단 등 정해진 자리에만 광고를
            배치하고 사용 흐름을 방해하는 형태는 피합니다.
          </li>
        </ul>
      </ContentSection>

      <ContentSection title="운영자">
        <p>
          개인이 운영하는 사이트입니다. 도구 오류 신고나 새로운 도구 제안은
          언제든 환영합니다.{" "}
          <Link href="/contact" className="underline underline-offset-2">
            연락처 페이지
          </Link>
          에서 이메일을 확인하실 수 있어요.
        </p>
      </ContentSection>

      <ContentSection title="앞으로의 계획">
        <p>
          금융·세금, 업무 효율, 생활·건강, 변환기, 부동산·투자 다섯 카테고리에
          걸쳐 자주 쓰이는 계산기를 차례로 추가하고 있습니다. 출시된 도구는
          홈에서, 출시 예정 도구는 카드에 &ldquo;준비 중&rdquo;으로 표시됩니다.
          요청이 많은 도구부터 우선순위를 조정합니다.
        </p>
      </ContentSection>
    </ContentLayout>
  );
}

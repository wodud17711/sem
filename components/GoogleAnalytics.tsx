import Script from "next/script";

/**
 * Google Analytics 4 스크립트 주입.
 *
 * 다음 두 조건 모두 만족 시에만 렌더됩니다:
 *   1. NEXT_PUBLIC_GA_ID 환경변수가 설정되어 있고,
 *   2. NODE_ENV === "production" (즉 `next build` 결과 — Vercel 배포 또는 로컬 prod 빌드)
 *
 * 따라서 개발 모드(`next dev`)에서는 자동 비활성화되어 본인 방문이 GA에
 * 카운트되지 않습니다. Vercel 프리뷰 환경에서 GA를 끄고 싶다면 Vercel
 * 환경변수에서 NEXT_PUBLIC_GA_ID를 Production 환경에만 등록하세요.
 *
 * Search Console 도메인 소유 확인은 metadata.verification에서 별도 처리.
 */
export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const isProd = process.env.NODE_ENV === "production";
  if (!gaId || !isProd) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}

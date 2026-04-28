import Script from "next/script";

/**
 * Google Analytics 4 스크립트 주입.
 * NEXT_PUBLIC_GA_ID가 설정된 경우에만 렌더되어, 개발 환경에서는 자동으로 비활성화됩니다.
 *
 * Search Console 도메인 소유 확인은 metadata.verification에서 별도 처리.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;

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

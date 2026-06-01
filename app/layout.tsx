import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/site";
import "./globals.css";

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION;
const naverVerification = process.env.NEXT_PUBLIC_NAVER_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.fullName,
    template: "%s | 셈",
  },
  description:
    "연봉 실수령액, 퇴직금, 4대보험, 부동산 세금까지. 한국 직장인과 자영업자를 위한 실용 계산기 모음.",
  applicationName: site.name,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: site.name,
    url: site.url,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: site.fullName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
  },
  verification: {
    ...(googleVerification && { google: googleVerification }),
    ...(naverVerification && {
      other: { "naver-site-verification": [naverVerification] },
    }),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6550769441333665"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body className="bg-background text-foreground min-h-full flex flex-col">
        <GoogleAnalytics />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <VercelAnalytics />
      </body>
    </html>
  );
}

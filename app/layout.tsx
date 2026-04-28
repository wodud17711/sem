import type { Metadata, Viewport } from "next";
import { Analytics } from "@/components/Analytics";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sem.kr";
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION;
const naverVerification = process.env.NEXT_PUBLIC_NAVER_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "셈 - 계산기와 실용 도구 모음",
    template: "%s | 셈",
  },
  description:
    "연봉 실수령액, 퇴직금, 4대보험, 부동산 세금까지. 한국 직장인과 자영업자를 위한 실용 계산기 모음.",
  applicationName: "셈",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "셈",
    url: siteUrl,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "셈 - 계산기와 실용 도구 모음",
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
      <body className="bg-background text-foreground min-h-full flex flex-col">
        <Analytics />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

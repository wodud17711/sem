import type { Metadata } from "next";
import { ToolCatalog } from "@/components/home/ToolCatalog";
import { site } from "@/lib/site";
import { plannedTools, tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: { absolute: site.fullName },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.fullName,
    description: site.description,
    url: site.url,
    type: "website",
  },
};

export default function HomePage() {
  const itemListJsonLd =
    tools.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: site.fullName,
          itemListElement: tools.map((tool, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            url: `${site.url}/${tool.slug}`,
            name: tool.title,
          })),
        }
      : null;

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    inLanguage: "ko-KR",
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      {itemListJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      )}

      <section className="border-b border-border py-16 sm:py-24">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          한국어 실용 계산기, 한 곳에.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          연봉 실수령액부터 부동산 세금까지. 가입 없이, 모바일에서도 빠르게.
        </p>
      </section>

      <ToolCatalog tools={tools} plannedTools={plannedTools} />
    </main>
  );
}

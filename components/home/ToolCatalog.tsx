"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { categories } from "@/lib/categories";
import type { PlannedTool, Tool } from "@/lib/tools";

interface ToolCatalogProps {
  tools: Tool[];
  plannedTools: PlannedTool[];
}

interface CatalogItem {
  slug: string;
  title: string;
  description: string;
  status: "live" | "planned";
}

export function ToolCatalog({ tools, plannedTools }: ToolCatalogProps) {
  const [query, setQuery] = useState("");
  const trimmed = query.trim().toLowerCase();

  const filteredByCategory = useMemo(() => {
    return categories.map((category) => {
      const live: CatalogItem[] = tools
        .filter((t) => t.category === category.id)
        .map((t) => ({
          slug: t.slug,
          title: t.title,
          description: t.description,
          status: "live" as const,
        }));
      const planned: CatalogItem[] = plannedTools
        .filter((t) => t.category === category.id)
        .map((t) => ({
          slug: t.slug,
          title: t.title,
          description: t.description,
          status: "planned" as const,
        }));
      const all = [...live, ...planned];
      const matched = trimmed
        ? all.filter(
            (item) =>
              item.title.toLowerCase().includes(trimmed) ||
              item.description.toLowerCase().includes(trimmed),
          )
        : all;
      return { category, items: matched };
    });
  }, [tools, plannedTools, trimmed]);

  const totalMatched = filteredByCategory.reduce(
    (sum, group) => sum + group.items.length,
    0,
  );

  return (
    <>
      <section className="border-b border-border py-8 sm:py-10">
        <label htmlFor="catalog-search" className="sr-only">
          도구 검색
        </label>
        <Input
          id="catalog-search"
          type="search"
          inputMode="search"
          placeholder="도구 이름이나 설명으로 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
        <p
          className="mt-3 text-xs text-muted-foreground"
          role="status"
          aria-live="polite"
        >
          {trimmed
            ? totalMatched > 0
              ? `${totalMatched}개 도구 일치`
              : "일치하는 도구가 없습니다"
            : `전체 ${tools.length + plannedTools.length}개 도구 (출시 ${tools.length} · 준비 중 ${plannedTools.length})`}
        </p>
      </section>

      {filteredByCategory.map(({ category, items }) => {
        if (items.length === 0) return null;
        return (
          <section
            key={category.id}
            id={category.id}
            className="scroll-mt-20 border-b border-border py-12 last:border-b-0"
          >
            <header className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight">
                {category.label}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {category.description}
              </p>
            </header>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) =>
                item.status === "live" ? (
                  <Link
                    key={item.slug}
                    href={`/${item.slug}`}
                    className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                  >
                    <Card className="h-full">
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </Card>
                  </Link>
                ) : (
                  <Card
                    key={item.slug}
                    className="h-full bg-muted/30 hover:border-border"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="text-muted-foreground">
                        {item.title}
                      </CardTitle>
                      <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                        준비 중
                      </span>
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </Card>
                ),
              )}
            </div>
          </section>
        );
      })}

      {trimmed && totalMatched === 0 && (
        <section className="py-16 text-center">
          <p className="text-muted-foreground">
            &ldquo;{query}&rdquo;에 해당하는 도구가 없어요.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            다른 키워드로 검색하거나, 카테고리에서 둘러보세요.
          </p>
        </section>
      )}
    </>
  );
}

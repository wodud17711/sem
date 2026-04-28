import Link from "next/link";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { plannedTools, tools } from "@/lib/tools";
import { ToolSection } from "./ToolLayout";

interface RelatedToolsProps {
  /** 관련 도구 슬러그 목록 */
  slugs: string[];
}

export function RelatedTools({ slugs }: RelatedToolsProps) {
  const items = slugs
    .map((slug) => {
      const live = tools.find((t) => t.slug === slug);
      if (live) {
        return {
          slug: live.slug,
          title: live.title,
          description: live.description,
          status: "live" as const,
        };
      }
      const planned = plannedTools.find((t) => t.slug === slug);
      if (planned) {
        return {
          slug: planned.slug,
          title: planned.title,
          description: planned.description,
          status: "planned" as const,
        };
      }
      return null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (items.length === 0) return null;

  return (
    <ToolSection title="관련 도구">
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) =>
          item.status === "live" ? (
            <Link key={item.slug} href={`/${item.slug}`} className="block">
              <Card className="h-full">
                <CardTitle className="text-sm">{item.title}</CardTitle>
                <CardDescription className="text-xs">
                  {item.description}
                </CardDescription>
              </Card>
            </Link>
          ) : (
            <Card
              key={item.slug}
              className="h-full bg-muted/30 hover:border-border"
            >
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-sm text-muted-foreground">
                  {item.title}
                </CardTitle>
                <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
                  준비 중
                </span>
              </div>
              <CardDescription className="text-xs">
                {item.description}
              </CardDescription>
            </Card>
          ),
        )}
      </div>
    </ToolSection>
  );
}

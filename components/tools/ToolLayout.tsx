import type { ReactNode } from "react";
import Link from "next/link";
import { categories, type CategoryId } from "@/lib/categories";
import { cn } from "@/lib/utils";

interface ToolLayoutProps {
  title: string;
  category: CategoryId;
  description: string;
  rateBasis?: string;
  children: ReactNode;
}

export function ToolLayout({
  title,
  category,
  description,
  rateBasis,
  children,
}: ToolLayoutProps) {
  const categoryLabel = categories.find((c) => c.id === category)?.label;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <nav aria-label="이동 경로" className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          홈
        </Link>
        <span className="mx-1.5">/</span>
        {categoryLabel && (
          <>
            <Link
              href={`/#${category}`}
              className="hover:text-foreground"
            >
              {categoryLabel}
            </Link>
            <span className="mx-1.5">/</span>
          </>
        )}
        <span className="text-foreground">{title}</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-muted-foreground">{description}</p>
        {rateBasis && (
          <p className="mt-4 inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
            {rateBasis}
          </p>
        )}
      </header>

      <div className="space-y-12">{children}</div>
    </main>
  );
}

export function ToolSection({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("space-y-4", className)}>
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

export function Disclaimer({ children }: { children: ReactNode }) {
  return (
    <aside
      role="note"
      className="rounded-lg border border-border bg-muted/40 p-4 text-sm text-foreground/80"
    >
      <p>
        <strong className="font-semibold text-foreground">참고용 안내:</strong>{" "}
        {children}
      </p>
    </aside>
  );
}

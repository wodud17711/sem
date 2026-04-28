import type { ReactNode } from "react";

interface ContentLayoutProps {
  title: string;
  description?: string;
  lastUpdated?: string;
  children: ReactNode;
}

export function ContentLayout({
  title,
  description,
  lastUpdated,
  children,
}: ContentLayoutProps) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="mb-12 border-b border-border pb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-muted-foreground">{description}</p>
        )}
        {lastUpdated && (
          <p className="mt-4 text-xs text-muted-foreground">
            최종 갱신: {lastUpdated}
          </p>
        )}
      </header>
      <div className="space-y-10 text-[15px] leading-relaxed text-foreground/90">
        {children}
      </div>
    </main>
  );
}

export function ContentSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

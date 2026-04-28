import Link from "next/link";
import { categories } from "@/lib/categories";
import { site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:gap-6 sm:px-6">
        <Link
          href="/"
          className="shrink-0"
          aria-label={`${site.name} 홈으로 이동`}
        >
          <Logo />
        </Link>
        <nav
          aria-label="카테고리"
          className="-mr-4 flex-1 overflow-x-auto pr-4 sm:mr-0 sm:pr-0"
        >
          <ul className="flex items-center gap-1 sm:gap-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/#${category.id}`}
                  className="inline-block whitespace-nowrap rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

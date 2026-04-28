import Link from "next/link";
import { categories } from "@/lib/categories";
import { site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";

const policyLinks = [
  { href: "/about", label: "소개" },
  { href: "/privacy", label: "개인정보처리방침" },
  { href: "/terms", label: "이용약관" },
  { href: "/contact", label: "연락처" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" aria-label={`${site.name} 홈으로 이동`}>
              <Logo />
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              {site.shortBlurb}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-foreground">카테고리</h2>
            <ul className="mt-3 space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/#${category.id}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-foreground">안내</h2>
            <ul className="mt-3 space-y-2">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-foreground">문의</h2>
            <p className="mt-3">
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {site.email}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
          © {year} {site.name}. 모든 계산 결과는 참고용입니다.
        </div>
      </div>
    </footer>
  );
}

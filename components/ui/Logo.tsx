import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

interface LogoProps {
  className?: string;
  /** 텍스트 워드마크를 함께 표시할지. false면 마크만 렌더 */
  withWordmark?: boolean;
  /** 워드마크 글자 크기 (Tailwind 클래스). 기본 text-lg */
  wordmarkClassName?: string;
}

export function Logo({
  className,
  withWordmark = true,
  wordmarkClassName = "text-lg",
}: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <BrandMark className="h-5 w-5 shrink-0" />
      {withWordmark && (
        <span
          className={cn(
            "font-bold tracking-tight text-foreground",
            wordmarkClassName,
          )}
        >
          {site.name}
        </span>
      )}
    </span>
  );
}

interface BrandMarkProps {
  className?: string;
}

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={`${site.name} 로고`}
    >
      <rect x="3" y="3.5" width="18" height="7" rx="1.5" />
      <circle cx="7" cy="16.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="16.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="17" cy="16.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

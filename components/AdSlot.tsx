import { cn } from "@/lib/utils";

type AdSlotPosition = "in-content" | "below-tool" | "footer";

interface AdSlotProps {
  position: AdSlotPosition;
  className?: string;
}

export function AdSlot({ position, className }: AdSlotProps) {
  if (process.env.NEXT_PUBLIC_ADSENSE_ID) {
    return (
      <div
        data-ad-position={position}
        className={cn("my-8 min-h-[100px] w-full", className)}
        aria-hidden="true"
      />
    );
  }
  return null;
}

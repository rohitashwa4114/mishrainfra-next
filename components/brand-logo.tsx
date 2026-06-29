import Image from "next/image"
import { cn } from "@/lib/utils"

interface BrandLogoProps {
  className?: string
  /** controls overall scale of the stacked lockup */
  size?: "sm" | "md" | "lg"
}

const sizes = {
  sm: {
    emblem: "h-8 w-8",
    mishra: "text-base",
    sub: "text-[8px]",
    llp: "text-[7px]",
    gap: "gap-0.5",
  },
  md: {
    emblem: "h-11 w-11",
    mishra: "text-2xl",
    sub: "text-[11px]",
    llp: "text-[9px]",
    gap: "gap-1",
  },
  lg: {
    emblem: "h-20 w-20",
    mishra: "text-5xl",
    sub: "text-lg",
    llp: "text-xs",
    gap: "gap-1.5",
  },
}

export function BrandLogo({ className, size = "md" }: BrandLogoProps) {
  const s = sizes[size]
  return (
    <div className={cn("flex flex-col items-center text-center leading-none", s.gap, className)}>
      <Image
        src="/mishra-emblem.png"
        alt="Mishra Capital Infra Solutions LLP emblem"
        width={160}
        height={160}
        priority
        className={cn("object-contain mix-blend-screen", s.emblem)}
      />
      <span
        className={cn(
          "font-serif font-bold tracking-[0.12em] text-foreground",
          s.mishra,
        )}
      >
        MISHRA
      </span>
      <span className={cn("font-serif font-bold tracking-[0.18em]", s.sub)}>
        <span className="text-crimson">CAPITAL</span>{" "}
        <span className="text-gold">INFRA</span>
      </span>
      <span className="flex w-full items-center justify-center gap-1.5">
        <span className="h-px flex-1 max-w-[24px] bg-gold/60" />
        <span
          className={cn(
            "font-sans font-medium uppercase tracking-[0.35em] text-steel",
            s.llp,
          )}
        >
          Solutions LLP
        </span>
        <span className="h-px flex-1 max-w-[24px] bg-gold/60" />
      </span>
    </div>
  )
}

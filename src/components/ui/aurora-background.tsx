"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode
  showRadialGradient?: boolean
}

export function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          `
          absolute -inset-[10px] opacity-55 will-change-transform
          [--white-gradient:repeating-linear-gradient(100deg,#ffffff_0%,#ffffff_7%,transparent_10%,transparent_12%,#ffffff_16%)]
          [--dark-gradient:repeating-linear-gradient(100deg,#09090b_0%,#09090b_7%,transparent_10%,transparent_12%,#09090b_16%)]
          [--aurora:repeating-linear-gradient(100deg,#3b82f6_10%,#a5b4fc_15%,#93c5fd_20%,#c4b5fd_25%,#60a5fa_30%)]
          [background-image:var(--white-gradient),var(--aurora)]
          dark:[background-image:var(--dark-gradient),var(--aurora)]
          [background-size:300%,_200%]
          [background-position:50%_50%,50%_50%]
          filter blur-[12px] invert dark:invert-0
          after:content-[""] after:absolute after:inset-0
          after:[background-image:var(--white-gradient),var(--aurora)]
          after:dark:[background-image:var(--dark-gradient),var(--aurora)]
          after:[background-size:200%,_100%]
          after:[animation:aurora_60s_linear_infinite]
          `,
          showRadialGradient &&
            "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]",
        )}
      />
      {children ? <div className="pointer-events-auto">{children}</div> : null}
    </div>
  )
}

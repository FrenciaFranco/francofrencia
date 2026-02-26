"use client"

import { cn } from "@/lib/utils"

/**
 * Premium ambient background — ultra-subtle, GPU-composited mesh gradient
 * that drifts slowly like iOS/macOS wallpapers. Pure CSS, zero JS overhead.
 */
export function AmbientBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden",
        className,
      )}
    >
      {/* Base mesh gradient — static, composited once */}
      <div
        className="absolute inset-0 opacity-[0.07] dark:opacity-[0.12]"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 80% 50% at 20% 40%, hsl(220 70% 55%), transparent)",
            "radial-gradient(ellipse 60% 80% at 80% 20%, hsl(270 50% 60%), transparent)",
            "radial-gradient(ellipse 70% 60% at 60% 80%, hsl(200 60% 50%), transparent)",
          ].join(", "),
        }}
      />

      {/* Drifting orb 1 — blue/indigo */}
      <div
        className="absolute h-[650px] w-[650px] rounded-full opacity-[0.09] dark:opacity-[0.14] will-change-transform animate-[drift1_20s_ease-in-out_infinite]"
        style={{
          top: "5%",
          left: "10%",
          background:
            "radial-gradient(circle, hsl(230 85% 62%) 0%, transparent 65%)",
        }}
      />

      {/* Drifting orb 2 — violet/purple */}
      <div
        className="absolute h-[550px] w-[550px] rounded-full opacity-[0.08] dark:opacity-[0.13] will-change-transform animate-[drift2_24s_ease-in-out_infinite]"
        style={{
          top: "45%",
          right: "5%",
          background:
            "radial-gradient(circle, hsl(280 65% 58%) 0%, transparent 65%)",
        }}
      />

      {/* Drifting orb 3 — teal/cyan */}
      <div
        className="absolute h-[500px] w-[500px] rounded-full opacity-[0.07] dark:opacity-[0.11] will-change-transform animate-[drift3_28s_ease-in-out_infinite]"
        style={{
          bottom: "0%",
          left: "35%",
          background:
            "radial-gradient(circle, hsl(190 75% 50%) 0%, transparent 65%)",
        }}
      />

      {/* Top-right shimmer highlight — like a soft light reflection */}
      <div
        className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full opacity-[0.025] dark:opacity-[0.04] animate-[pulse-soft_8s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(circle, hsl(0 0% 100%) 0%, transparent 60%)",
        }}
      />
    </div>
  )
}

"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function BackgroundBeams({ className }: { className?: string }) {
  const glows = React.useMemo(
    () => [
      { x: "15%", y: "10%", size: "500px", color: "var(--primary)", opacity: 0.04, delay: 0, duration: 12 },
      { x: "75%", y: "20%", size: "400px", color: "purple", opacity: 0.03, delay: 3, duration: 15 },
      { x: "50%", y: "60%", size: "600px", color: "var(--primary)", opacity: 0.035, delay: 6, duration: 18 },
      { x: "20%", y: "80%", size: "350px", color: "blue", opacity: 0.025, delay: 2, duration: 14 },
      { x: "85%", y: "70%", size: "450px", color: "purple", opacity: 0.03, delay: 5, duration: 16 },
    ],
    [],
  )

  return (
    <div className={cn("pointer-events-none fixed inset-0 overflow-hidden z-[1]", className)}>
      {glows.map((glow, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: glow.x,
            top: glow.y,
            width: glow.size,
            height: glow.size,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${glow.color} 0%, transparent 70%)`,
            opacity: glow.opacity,
            filter: "blur(40px)",
          }}
          animate={{
            opacity: [glow.opacity * 0.5, glow.opacity * 1.8, glow.opacity * 0.5],
            scale: [0.85, 1.15, 0.85],
          }}
          transition={{
            duration: glow.duration,
            delay: glow.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

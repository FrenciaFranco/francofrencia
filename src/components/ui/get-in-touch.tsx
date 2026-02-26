"use client"

import React, { useEffect, useState } from "react"
import {
  ArrowRight,
  Github,
  Instagram,
  Linkedin,
  MessageCircle,
  Twitter,
  Youtube,
} from "lucide-react"

export const ProfessionalConnect = () => {
  const [, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const isLoaded = true

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const socialPlatforms = [
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-7 w-7" />,
      gradient: "from-blue-600 to-blue-400",
      shadowColor: "rgba(59, 130, 246, 0.5)",
      link: "https://www.linkedin.com",
      description: "Professional Network",
    },
    {
      name: "GitHub",
      icon: <Github className="h-7 w-7" />,
      gradient: "from-gray-700 to-gray-500",
      shadowColor: "rgba(75, 85, 99, 0.5)",
      link: "https://github.com",
      description: "Code Repository",
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-7 w-7" />,
      gradient: "from-slate-800 to-slate-600",
      shadowColor: "rgba(51, 65, 85, 0.5)",
      link: "https://x.com",
      description: "Social Updates",
    },
    {
      name: "Instagram",
      icon: <Instagram className="h-7 w-7" />,
      gradient: "from-purple-600 via-pink-600 to-orange-500",
      shadowColor: "rgba(219, 39, 119, 0.5)",
      link: "https://www.instagram.com",
      description: "Visual Stories",
    },
    {
      name: "Discord",
      icon: <MessageCircle className="h-7 w-7" />,
      gradient: "from-indigo-600 to-purple-600",
      shadowColor: "rgba(99, 102, 241, 0.5)",
      link: "https://discord.com",
      description: "Community Chat",
    },
    {
      name: "YouTube",
      icon: <Youtube className="h-7 w-7" />,
      gradient: "from-red-600 to-red-400",
      shadowColor: "rgba(239, 68, 68, 0.5)",
      link: "https://www.youtube.com",
      description: "Video Content",
    },
  ]

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute left-20 top-20 h-72 w-72 animate-pulse rounded-full bg-blue-600/30 blur-[128px]" />
        <div className="absolute bottom-20 right-20 h-96 w-96 animate-pulse rounded-full bg-purple-600/20 blur-[128px] delay-700" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-8">
        <div className={`mb-16 text-center transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <div className="mb-4 inline-block rounded-full border border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-1.5">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-sm font-medium text-transparent">Connect & Collaborate</span>
          </div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
            <span className="bg-gradient-to-br from-white via-white to-gray-400 bg-clip-text text-transparent">Get In Touch</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl">
            Join our vibrant community across multiple platforms and stay connected with the latest updates
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-3">
          {socialPlatforms.map((platform, index) => (
            <a
              key={platform.name}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative transition-all duration-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:border-slate-600/50">
                <div className={`absolute inset-0 bg-gradient-to-br ${platform.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-10`} />
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${platform.shadowColor}, transparent 70%)`,
                    filter: "blur(40px)",
                  }}
                />

                <div className="relative z-10">
                  <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${platform.gradient} p-3 text-white transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`}>
                    {platform.icon}
                  </div>
                  <h3 className="mb-1 text-lg font-semibold text-white">{platform.name}</h3>
                  <p className="text-sm text-gray-500 transition-colors duration-300 group-hover:text-gray-400">
                    {platform.description}
                  </p>
                  <div className="mt-4 flex items-center text-gray-600 transition-all duration-300 group-hover:text-white">
                    <span className="text-sm font-medium">Connect</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>

                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </div>
            </a>
          ))}
        </div>
      </div>

      <div
        className="pointer-events-none fixed h-96 w-96 rounded-full opacity-20 blur-[100px] transition-all duration-200 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(147, 51, 234, 0.3), transparent)",
          left: `${mousePosition.x - 192}px`,
          top: `${mousePosition.y - 192}px`,
        }}
      />
    </div>
  )
}

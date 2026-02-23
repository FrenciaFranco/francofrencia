"use client"

import React, { useEffect, useRef, useState } from "react"

type Ripple = {
  id: number
  x: number
  y: number
}

const DigitalSerenity = () => {
  const [mouseGradientStyle, setMouseGradientStyle] = useState({
    left: "0px",
    top: "0px",
    opacity: 0,
  })
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [scrolled, setScrolled] = useState(false)
  const floatingElementsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const animateWords = () => {
      const wordElements = document.querySelectorAll<HTMLElement>(".word-animate")
      wordElements.forEach((word) => {
        const delay = Number.parseInt(word.getAttribute("data-delay") ?? "0", 10) || 0
        window.setTimeout(() => {
          word.style.animation = "word-appear 0.8s ease-out forwards"
        }, delay)
      })
    }

    const timeoutId = window.setTimeout(animateWords, 500)
    return () => window.clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouseGradientStyle({
        left: `${event.clientX}px`,
        top: `${event.clientY}px`,
        opacity: 1,
      })
    }

    const handleMouseLeave = () => {
      setMouseGradientStyle((prev) => ({ ...prev, opacity: 0 }))
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const newRipple: Ripple = { id: Date.now(), x: event.clientX, y: event.clientY }
      setRipples((prev) => [...prev, newRipple])
      window.setTimeout(
        () => setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id)),
        1000,
      )
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  useEffect(() => {
    const wordElements = document.querySelectorAll<HTMLElement>(".word-animate")
    const handleMouseEnter = (event: Event) => {
      const target = event.currentTarget as HTMLElement
      target.style.textShadow = "0 0 20px rgba(203, 213, 225, 0.5)"
    }
    const handleMouseLeave = (event: Event) => {
      const target = event.currentTarget as HTMLElement
      target.style.textShadow = "none"
    }

    wordElements.forEach((word) => {
      word.addEventListener("mouseenter", handleMouseEnter)
      word.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      wordElements.forEach((word) => {
        word.removeEventListener("mouseenter", handleMouseEnter)
        word.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLDivElement>(".floating-element-animate")
    floatingElementsRef.current = Array.from(elements)

    const handleScroll = () => {
      if (scrolled) {
        return
      }
      setScrolled(true)
      floatingElementsRef.current.forEach((el, index) => {
        const delay = Number.parseFloat(el.style.animationDelay || "0") * 1000
        window.setTimeout(() => {
          el.style.animationPlayState = "running"
          el.style.opacity = ""
        }, delay + index * 100)
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  const pageStyles = `
    #mouse-gradient-react {
      position: fixed;
      pointer-events: none;
      border-radius: 9999px;
      background-image: radial-gradient(circle, rgba(156, 163, 175, 0.05), rgba(107, 114, 128, 0.05), transparent 70%);
      transform: translate(-50%, -50%);
      will-change: left, top, opacity;
      transition: left 70ms linear, top 70ms linear, opacity 300ms ease-out;
    }
    @keyframes word-appear { 0% { opacity: 0; transform: translateY(30px) scale(0.8); filter: blur(10px); } 50% { opacity: 0.8; transform: translateY(10px) scale(0.95); filter: blur(2px); } 100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); } }
    @keyframes grid-draw { 0% { stroke-dashoffset: 1000; opacity: 0; } 50% { opacity: 0.3; } 100% { stroke-dashoffset: 0; opacity: 0.15; } }
    @keyframes pulse-glow { 0%, 100% { opacity: 0.1; transform: scale(1); } 50% { opacity: 0.3; transform: scale(1.1); } }
    @keyframes underline-grow { to { width: 100%; } }
    @keyframes float { 0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; } 25% { transform: translateY(-10px) translateX(5px); opacity: 0.6; } 50% { transform: translateY(-5px) translateX(-3px); opacity: 0.4; } 75% { transform: translateY(-15px) translateX(7px); opacity: 0.8; } }

    .word-animate { display: inline-block; opacity: 0; margin: 0 0.1em; transition: color 0.3s ease, transform 0.3s ease; }
    .word-animate:hover { color: #cbd5e1; transform: translateY(-2px); }
    .grid-line { stroke: #94a3b8; stroke-width: 0.5; opacity: 0; stroke-dasharray: 5 5; stroke-dashoffset: 1000; animation: grid-draw 2s ease-out forwards; }
    .detail-dot { fill: #cbd5e1; opacity: 0; animation: pulse-glow 3s ease-in-out infinite; }
    .corner-element-animate { position: absolute; width: 40px; height: 40px; border: 1px solid rgba(203, 213, 225, 0.2); opacity: 0; animation: word-appear 1s ease-out forwards; }
    .text-decoration-animate { position: relative; }
    .text-decoration-animate::after { content: ""; position: absolute; bottom: -4px; left: 0; width: 0; height: 1px; background: linear-gradient(90deg, transparent, #cbd5e1, transparent); animation: underline-grow 2s ease-out forwards; animation-delay: 2s; }
    .floating-element-animate { position: absolute; width: 2px; height: 2px; background: #cbd5e1; border-radius: 50%; opacity: 0; animation: float 4s ease-in-out infinite; animation-play-state: paused; }
    .ripple-effect { position: fixed; width: 4px; height: 4px; background: rgba(203, 213, 225, 0.6); border-radius: 50%; transform: translate(-50%, -50%); pointer-events: none; animation: pulse-glow 1s ease-out forwards; z-index: 9999; }
  `

  return (
    <>
      <style>{pageStyles}</style>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-black to-slate-800 text-slate-100">
        <svg className="pointer-events-none absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id="gridReactDarkResponsive" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(100, 116, 139, 0.1)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridReactDarkResponsive)" />
          <line x1="0" y1="20%" x2="100%" y2="20%" className="grid-line" style={{ animationDelay: "0.5s" }} />
          <line x1="0" y1="80%" x2="100%" y2="80%" className="grid-line" style={{ animationDelay: "1s" }} />
          <line x1="20%" y1="0" x2="20%" y2="100%" className="grid-line" style={{ animationDelay: "1.5s" }} />
          <line x1="80%" y1="0" x2="80%" y2="100%" className="grid-line" style={{ animationDelay: "2s" }} />
          <circle cx="20%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: "3s" }} />
          <circle cx="80%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: "3.2s" }} />
        </svg>

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-between px-6 py-10 text-center sm:px-8 sm:py-12 md:px-16 md:py-20">
          <h1 className="max-w-5xl text-3xl font-extralight leading-tight tracking-tight text-slate-50 sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="word-animate" data-delay="700">Find</span>
            <span className="word-animate" data-delay="850"> your</span>
            <span className="word-animate" data-delay="1000"> center,</span>
            <br />
            <span className="word-animate text-slate-300" data-delay="1400">where peace resides.</span>
          </h1>
        </div>

        <div
          id="mouse-gradient-react"
          className="h-60 w-60 blur-xl sm:h-80 sm:w-80 sm:blur-2xl md:h-96 md:w-96 md:blur-3xl"
          style={{
            left: mouseGradientStyle.left,
            top: mouseGradientStyle.top,
            opacity: mouseGradientStyle.opacity,
          }}
        />

        {ripples.map((ripple) => (
          <div key={ripple.id} className="ripple-effect" style={{ left: `${ripple.x}px`, top: `${ripple.y}px` }} />
        ))}
      </div>
    </>
  )
}

export default DigitalSerenity

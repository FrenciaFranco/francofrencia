"use client"

import * as React from "react"
import * as THREE from "three"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

type DottedSurfaceProps = Omit<React.ComponentProps<"div">, "ref">

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const { resolvedTheme } = useTheme()
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    const SEPARATION = 120
    const AMOUNT_X = 52
    const AMOUNT_Y = 72

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0xffffff, 2000, 10000)

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      10000,
    )
    camera.position.set(0, 170, 980)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(scene.fog.color, 0)
    renderer.domElement.style.filter = "brightness(1.35) saturate(1.15)"

    container.appendChild(renderer.domElement)

    const geometry = new THREE.BufferGeometry()
    const positions: number[] = []
    const colors: number[] = []
    const isDark = resolvedTheme === "dark"

    for (let ix = 0; ix < AMOUNT_X; ix++) {
      for (let iy = 0; iy < AMOUNT_Y; iy++) {
        const x = ix * SEPARATION - (AMOUNT_X * SEPARATION) / 2
        const y = 0
        const z = iy * SEPARATION - (AMOUNT_Y * SEPARATION) / 2

        positions.push(x, y, z)
        if (isDark) {
          colors.push(0.85, 0.9, 1)
        } else {
          colors.push(0.08, 0.12, 0.2)
        }
      }
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 10,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    let count = 0
    let animationId = 0

    const animate = () => {
      animationId = window.requestAnimationFrame(animate)

      const positionAttribute = geometry.attributes.position
      const positionArray = positionAttribute.array as Float32Array

      let i = 0
      for (let ix = 0; ix < AMOUNT_X; ix++) {
        for (let iy = 0; iy < AMOUNT_Y; iy++) {
          const index = i * 3
          positionArray[index + 1] =
            Math.sin((ix + count) * 0.26) * 42 +
            Math.sin((iy + count) * 0.42) * 42
          i++
        }
      }

      positionAttribute.needsUpdate = true
      renderer.render(scene, camera)
      count += 0.08
    }

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.cancelAnimationFrame(animationId)
      geometry.dispose()
      material.dispose()
      renderer.dispose()

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [resolvedTheme])

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none fixed inset-0 z-0", className)}
      {...props}
    />
  )
}

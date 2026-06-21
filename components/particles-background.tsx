"use client"

import { useEffect, useMemo, useState } from "react"
import { useTheme } from "next-themes"
import { Particles, ParticlesProvider } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { Engine, ISourceOptions } from "@tsparticles/engine"

export default function ParticlesBackground() {
  const { resolvedTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const isDark = isMounted ? resolvedTheme === "dark" : true

  const options: ISourceOptions = useMemo(() => {
    const dotColors = isDark
      ? ["#e5e5e5", "#e5e5e5", "#e5e5e5", "#818cf8"]
      : ["#3f3f46", "#3f3f46", "#3f3f46", "#4f46e5"]
    const linkColor = isDark ? "#525252" : "#a1a1aa"
    const dotOpacity = isDark ? 0.5 : 0.75
    const linkOpacity = isDark ? 0.3 : 0.4

    return {
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      particles: {
        number: { value: 40 },
        color: { value: dotColors },
        shape: { type: "circle" },
        opacity: { value: dotOpacity },
        size: { value: { min: 1.5, max: 3 } },
        links: {
          enable: true,
          distance: 140,
          color: linkColor,
          opacity: linkOpacity,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.6,
          direction: "none",
          random: false,
          straight: false,
          outModes: { default: "out" },
        },
      },
      detectRetina: true,
    }
  }, [isDark])

  if (!isMounted) return null

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <ParticlesProvider
        init={async (engine: Engine) => {
          await loadSlim(engine)
        }}
      >
        <Particles id="tsparticles" options={options} className="h-full w-full" />
      </ParticlesProvider>
    </div>
  )
}

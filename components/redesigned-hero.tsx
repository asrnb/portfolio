"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { ExternalLink, Github, Linkedin, Instagram } from "lucide-react"
import { useIsClient } from "@/hooks/use-is-client"
import ResumeDownload from "@/components/resume-download"

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  )
}

export default function RedesignedHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isClient = useIsClient()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 60])

  // Typing effect for the subtitle
  const [displayedText, setDisplayedText] = useState("")
  const fullText =
    "Great software isn't about writing every line of code yourself. It's about combining AI with engineering to ship faster and help businesses work smarter."

  useEffect(() => {
    if (!isClient) return

    setDisplayedText("")
    const interval = setInterval(() => {
      setDisplayedText((prev) => {
        if (prev.length >= fullText.length) {
          clearInterval(interval)
          return prev
        }
        return fullText.slice(0, prev.length + 1)
      })
    }, 30)

    return () => clearInterval(interval)
  }, [fullText, isClient])

  return (
    <div className="relative">
      <motion.div
        ref={containerRef}
        style={isClient ? { opacity, y } : {}}
        className="container mx-auto px-4 py-10 md:py-14 flex flex-col items-center text-center max-w-xl"
      >
        <ScrollReveal>
          <motion.div
            className="relative w-28 h-32 sm:w-32 sm:h-36 overflow-hidden rounded-xl border border-border bg-card shadow-xl mb-4"
            animate={{ y: [0, -8, 0], rotate: [-2, 1, -2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.08, rotate: 0, transition: { duration: 0.3, ease: "easeOut" } }}
          >
            <Image
              src="/april.jpg?v=2026-06-21"
              alt="April Suarnaba"
              fill
              className="object-cover object-[50%_65%]"
              priority
            />
          </motion.div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="text-2xl sm:text-3xl font-normal mb-3 tracking-tight text-foreground">
            April G. Suarnaba
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-sm sm:text-base mb-5 leading-relaxed text-muted-foreground">
            {displayedText}
            {isClient && displayedText.length < fullText.length && <span className="animate-pulse">|</span>}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-5">
            <a
              href="https://github.com/asrnb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://ph.linkedin.com/in/aprilsuarnaba"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/azbdps/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://open.spotify.com/user/mfgb6tqaucuuog20d1hsn12em?si=e6dcec00718941a6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <SpotifyIcon className="h-4 w-4" />
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <ResumeDownload />
            <Button variant="outline" className="gap-2" asChild>
              <Link href="/work">
                View Projects
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </motion.div>
    </div>
  )
}

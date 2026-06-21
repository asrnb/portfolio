"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Github, Linkedin, FileDown } from "lucide-react"
import { useIsClient } from "@/hooks/use-is-client"

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
    "I build AI-powered dashboards, automation workflows, and full-stack tools that turn practical ideas into useful digital systems."

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
          <div className="relative w-28 h-32 sm:w-32 sm:h-36 -rotate-2 overflow-hidden rounded-xl border border-border bg-card shadow-xl mb-4">
            <Image
              src="/april.jpg?v=2026-06-21"
              alt="April Suarnaba"
              fill
              className="object-cover object-[50%_65%]"
              priority
            />
          </div>
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
              GitHub
            </a>
            <a
              href="https://ph.linkedin.com/in/aprilsuarnaba"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href="/april-suarnaba-resume.pdf"
              download="April_Suarnaba_Resume.pdf"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <FileDown className="h-4 w-4" />
              Resume
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href="/work">View Projects</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/work-with-me">Work with me</Link>
            </Button>
          </div>
        </ScrollReveal>
      </motion.div>
    </div>
  )
}

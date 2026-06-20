"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Github, Linkedin, Mail, ArrowDown, ExternalLink } from "lucide-react"
import { useIsClient } from "@/hooks/use-is-client"

const tags = ["AI Automation", "Full-Stack Development", "API Integrations"]

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
    <div className="min-h-screen flex items-center">
      <motion.div
        ref={containerRef}
        style={isClient ? { opacity, y } : {}}
        className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-8 md:gap-12 items-center"
      >
        {/* Left column - Text content */}
        <div className="order-2 md:order-1 text-center md:text-left">
          <ScrollReveal>
            <Badge
              variant="outline"
              className="mb-4 border-border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
            >
              AI Engineer
            </Badge>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 tracking-tight">
              April Suarnaba
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 leading-relaxed text-muted-foreground">
              {displayedText}
              {isClient && displayedText.length < fullText.length && <span className="animate-pulse">|</span>}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6 md:mb-8">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-border px-2 py-1 sm:px-3 sm:py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground sm:text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-6 md:mb-8">
              <Button size="lg" asChild>
                <Link href="/work#projects">
                  View Projects
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <Link href="/work-with-me">Work with me</Link>
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="flex gap-2 justify-center md:justify-start">
              <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground">
                <a href="https://github.com/asrnb" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground">
                <a
                  href="https://ph.linkedin.com/in/aprilsuarnaba"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground">
                <a href="mailto:aprilsuarnaba5@gmail.com" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </ScrollReveal>
        </div>

        {/* Right column - Image */}
        <div className="order-1 md:order-2 flex justify-center mb-6 md:mb-0">
          <ScrollReveal direction="left">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border border-border">
              <Image src="/april.jpg?v=2026-05-10" alt="April Suarnaba" fill className="object-cover" priority />
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll indicator */}
        {isClient && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border border-border text-muted-foreground hover:text-foreground"
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              aria-label="Scroll to about section"
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  )
}

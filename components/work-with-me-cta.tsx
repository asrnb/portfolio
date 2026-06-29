"use client"

import Link from "next/link"
import { ExternalLink, Heart, Mail, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionContainer } from "@/components/ui/section-container"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export default function WorkWithMeCta() {
  return (
    <SectionContainer id="contact">
      <div className="mx-auto max-w-2xl text-center">
        <ScrollReveal>
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-primary">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-primary">
              <Mail className="h-5 w-5" />
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-primary">
              <Heart className="h-4 w-4" />
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Work with me</h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground md:text-lg">
            Got a project, automation, or workflow idea? I&apos;d love to hear about it.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <a
            href="mailto:aprilsuarnaba5@gmail.com"
            className="mt-6 inline-block text-xl font-medium underline underline-offset-4 transition-colors hover:text-primary md:text-2xl"
          >
            aprilsuarnaba5@gmail.com
          </a>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-7">
            <Button size="lg" className="gap-2" asChild>
              <Link href="/work-with-me">
                Get in touch
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </SectionContainer>
  )
}

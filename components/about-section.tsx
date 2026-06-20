"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, GraduationCap, Heart, Layers, Linkedin, Mail, MapPin, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SectionContainer } from "@/components/ui/section-container"
import { ScrollReveal, StaggeredContainer, StaggerItem } from "@/components/ui/scroll-reveal"
import ResumeDownload from "@/components/resume-download"

const highlights = [
  {
    label: "Degree",
    value: "BS Computer Science",
    detail: "Major in Artificial Intelligence",
    icon: GraduationCap,
  },
  {
    label: "Location",
    value: "Iloilo City",
    detail: "Philippines",
    icon: MapPin,
  },
  {
    label: "Focus",
    value: "AI Automation",
    detail: "Dashboards, CRM workflows, APIs",
    icon: Sparkles,
  },
]

export default function AboutSection() {
  return (
    <SectionContainer id="about" className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <ScrollReveal>
          <Card className="overflow-hidden bg-card shadow-sm">
            <CardContent className="p-0">
              <div className="relative aspect-[4/5] w-full bg-muted">
                <Image
                  src="/april.jpg?v=2026-05-10"
                  alt="April Suarnaba"
                  fill
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="border-t border-border p-5">
                <p className="text-lg font-semibold">April Suarnaba</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  AI Engineer focused on AI-powered business tooling.
                </p>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        <StaggeredContainer className="space-y-7">
          <StaggerItem>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="gap-1.5 border-border font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
              >
                <Layers className="h-3.5 w-3.5" />
                Full-stack
              </Badge>
              <Badge
                variant="outline"
                className="gap-1.5 border-border font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
              >
                <Sparkles className="h-3.5 w-3.5" />
                AI automation
              </Badge>
              <Badge
                variant="outline"
                className="gap-1.5 border-border font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
              >
                <Heart className="h-3.5 w-3.5" />
                UI/UX
              </Badge>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Hi, I'm April.</h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
                I started coding when I was 13 with simple HTML and CSS pages, mostly out of curiosity. Then JavaScript
                showed me that websites could move, respond, and feel alive - and I was hooked.
              </p>
              <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
              During Senior High School, I explored mobile and web development, and eventually took up
              Computer Science majoring in Artificial Intelligence in college. Since then, I’ve been building
              AI-powered tools, automations, dashboards, and full-stack applications for businesses.
              </p>
              <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
              I’ve been in this industry for most of my life now, and honestly, there’s no Plan B for me —
              this is what I genuinely enjoy doing.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => {
                const Icon = item.icon
                return (
                  <Card key={item.label} className="bg-card">
                    <CardContent className="p-4">
                      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-tile bg-muted text-foreground">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="mt-1 font-semibold">{item.value}</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.detail}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <ResumeDownload />
              <Button className="gap-2" asChild>
                <Link href="/work#projects">
                  View Projects
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </StaggerItem>
        </StaggeredContainer>
      </div>
    </SectionContainer>
  )
}

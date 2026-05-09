"use client"

import Image from "next/image"
import { ExternalLink, GraduationCap, Heart, Layers, MapPin, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SectionContainer, SectionHeader } from "@/components/ui/section-container"
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
    <SectionContainer id="about" className="relative overflow-hidden">
      <SectionHeader
        title="About Me"
        subtitle="Computer Science graduate specializing in artificial intelligence, full-stack development, CRM automation, and practical AI integrations."
      />

      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <ScrollReveal>
          <Card className="overflow-hidden border-border/70 bg-card/70 shadow-lg">
            <CardContent className="p-0">
              <div className="relative aspect-[4/5] w-full bg-muted">
                <Image
                  src="/april.jpg"
                  alt="April Suarnaba"
                  fill
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="border-t border-border/70 p-5">
                <p className="text-lg font-semibold">April Suarnaba</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Software Developer focused on AI-powered business tooling.
                </p>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        <StaggeredContainer className="space-y-7">
          <StaggerItem>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="gap-1.5">
                <Layers className="h-3.5 w-3.5" />
                Full-stack
              </Badge>
              <Badge variant="secondary" className="gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                AI automation
              </Badge>
              <Badge variant="secondary" className="gap-1.5">
                <Heart className="h-3.5 w-3.5" />
                UI/UX
              </Badge>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div>
              <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">Hi, I'm April.</h3>
              <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
                I graduated Cum Laude from West Visayas State University with a Bachelor of Science in
                Computer Science majoring in Artificial Intelligence. My work centers on building AI-powered
                dashboards, CRM automations, API integrations, and full-stack web applications.
              </p>
              <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
                I enjoy turning real business workflows into clear, usable systems. Recently, I have worked
                with HubSpot custom code, LinkedIn automation workflows, Vapi voice AI testing, OpenAI
                integrations, and computer vision projects using YOLOv8 and OpenCV.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => {
                const Icon = item.icon
                return (
                  <Card key={item.label} className="border-border/70 bg-background/55">
                    <CardContent className="p-4">
                      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.label}</p>
                      <p className="mt-1 font-semibold">{item.value}</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.detail}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ResumeDownload />
              <Button variant="outline" className="gap-2" asChild>
                <a href="https://ph.linkedin.com/in/aprilsuarnaba" target="_blank" rel="noopener noreferrer">
                  View LinkedIn
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </StaggerItem>
        </StaggeredContainer>
      </div>
    </SectionContainer>
  )
}

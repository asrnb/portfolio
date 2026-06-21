"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink, GraduationCap, Heart, Layers, MapPin, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SectionContainer } from "@/components/ui/section-container"
import { ScrollReveal, StaggeredContainer, StaggerItem } from "@/components/ui/scroll-reveal"
import ResumeDownload from "@/components/resume-download"

const gallery = [
  {
    src: "/about/hike-3.JPG",
    alt: "April standing on a cliff overlooking the ocean while hiking",
    caption: "I also love to hike — chasing trail views on weekends.",
  },
  {
    src: "/about/hike-1.jpg",
    alt: "April looking at a forest stream on a hiking trail",
    caption: "Quiet trails are where I recharge.",
  },
  {
    src: "/about/hike-2.JPG",
    alt: "April lying on the grass with sunglasses after a hike",
    caption: "Even hikes need a grass-nap break.",
  },
  {
    src: "/about/work-1.JPG",
    alt: "April in uniform at her registrar job",
    caption: "On duty as a registrar at Skynet Aviation Academy.",
  },
  {
    src: "/about/IMG_7553.JPG",
    alt: "April riding a tricycle in Iloilo City",
    caption: "Tricycle rides around Iloilo City.",
  },
  {
    src: "/about/IMG_1.jpg",
    alt: "April wearing a face mask on her way to work",
    caption: "Just another commute, mask on.",
  },
]

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
    <SectionContainer id="about" className="relative">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <ScrollReveal>
          <Card className="overflow-hidden bg-card">
            <CardContent className="p-0">
              <div className="relative aspect-[4/5] w-full bg-muted">
                <Image
                  src="/about/april-graduation.jpg"
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
              <Badge variant="outline" className="gap-1.5">
                <Layers className="h-3.5 w-3.5" />
                Full-stack
              </Badge>
              <Badge variant="outline" className="gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                AI automation
              </Badge>
              <Badge variant="outline" className="gap-1.5">
                <Heart className="h-3.5 w-3.5" />
                UI/UX
              </Badge>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div>
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Hi, I'm April.</h2>
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
                      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-primary">
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
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <ResumeDownload />
              <Button variant="outline" className="gap-2" asChild>
                <Link href="/work">
                  View Projects
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </StaggerItem>
        </StaggeredContainer>
      </div>

      <ScrollReveal delay={0.1}>
        <div className="mx-auto mt-12 max-w-6xl border-t border-border pt-8">
          <h3 className="text-base font-semibold tracking-tight">Beyond the screen</h3>
          <p className="mt-1 text-sm text-muted-foreground">A few snapshots from outside the code editor.</p>

          <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {gallery.map((item) => (
              <div key={item.src}>
                <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted">
                  <Image src={item.src} alt={item.alt} fill sizes="180px" className="object-cover" />
                </div>
                <p className="mt-1.5 text-xs leading-4 text-muted-foreground">{item.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </SectionContainer>
  )
}

"use client"

import type { ElementType } from "react"
import { Bot, Code2, Database, PanelsTopLeft, PenTool, Workflow } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { SectionContainer, SectionHeader } from "@/components/ui/section-container"
import { ScrollReveal, StaggeredContainer, StaggerItem } from "@/components/ui/scroll-reveal"
import { cn } from "@/lib/utils"

interface TechItem {
  name: string
  slug: string
  color?: string
}

interface TechGroup {
  title: string
  description: string
  icon: ElementType
  items: TechItem[]
}

const techGroups: TechGroup[] = [
  {
    title: "AI Tools",
    description: "LLMs, prompt workflows, and AI-assisted development.",
    icon: Bot,
    items: [
      { name: "OpenAI", slug: "openai", color: "412991" },
      { name: "Claude", slug: "anthropic", color: "D97757" },
      { name: "Gemini", slug: "googlegemini", color: "8E75B2" },
      { name: "Cursor", slug: "cursor", color: "ffffff" },
    ],
  },
  {
    title: "Languages",
    description: "Core languages used across web, AI, and automation work.",
    icon: Code2,
    items: [
      { name: "TypeScript", slug: "typescript", color: "3178C6" },
      { name: "Python", slug: "python", color: "3776AB" },
      { name: "Dart", slug: "dart", color: "0175C2" },
      { name: "C++", slug: "cplusplus", color: "00599C" },
      { name: "C#", slug: "csharp", color: "512BD4" },
      { name: "SQL", slug: "sqlite", color: "003B57" },
    ],
  },
  {
    title: "Frameworks",
    description: "Interfaces, dashboards, APIs, and full-stack applications.",
    icon: PanelsTopLeft,
    items: [
      { name: "Next.js", slug: "nextdotjs", color: "ffffff" },
      { name: "Vue", slug: "vuedotjs", color: "4FC08D" },
      { name: "Laravel", slug: "laravel", color: "FF2D20" },
      { name: "Flutter", slug: "flutter", color: "02569B" },
      { name: "Tailwind", slug: "tailwindcss", color: "06B6D4" },
      { name: "Vite", slug: "vite", color: "646CFF" },
    ],
  },
  {
    title: "AI / ML",
    description: "Model experimentation, notebooks, and applied computer vision.",
    icon: Workflow,
    items: [
      { name: "TensorFlow", slug: "tensorflow", color: "FF6F00" },
      { name: "PyTorch", slug: "pytorch", color: "EE4C2C" },
      { name: "scikit-learn", slug: "scikitlearn", color: "F7931E" },
      { name: "Keras", slug: "keras", color: "D00000" },
      { name: "OpenCV", slug: "opencv", color: "5C3EE8" },
      { name: "Jupyter", slug: "jupyter", color: "F37626" },
    ],
  },
  {
    title: "Data / Backend",
    description: "Databases, backend services, and CRM integrations.",
    icon: Database,
    items: [
      { name: "Supabase", slug: "supabase", color: "3FCF8E" },
      { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
      { name: "MySQL", slug: "mysql", color: "4479A1" },
      { name: "Firebase", slug: "firebase", color: "FFCA28" },
      { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
      { name: "HubSpot", slug: "hubspot", color: "FF7A59" },
    ],
  },
  {
    title: "Design / Workflow",
    description: "Design systems, visual assets, automation, and version control.",
    icon: PenTool,
    items: [
      { name: "Figma", slug: "figma", color: "F24E1E" },
      { name: "Canva", slug: "canva", color: "00C4CC" },
      { name: "GitHub", slug: "github", color: "ffffff" },
      { name: "Git", slug: "git", color: "F05032" },
      { name: "N8N", slug: "n8n", color: "EA4B71" },
      { name: "Semrush", slug: "semrush", color: "FF642D" },
    ],
  },
]

function iconUrl({ slug, color = "ffffff" }: TechItem) {
  return `https://cdn.simpleicons.org/${slug}/${color}`
}

export default function RedesignedSkills() {
  return (
    <SectionContainer id="skills" className="bg-gradient-to-b from-background to-background/95">
      <SectionHeader
        title="Tech Stack"
        subtitle="The tools and platforms I use for AI automation, full-stack applications, CRM workflows, and product interfaces."
      />

      <ScrollReveal>
        <StaggeredContainer className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 xl:grid-cols-3">
          {techGroups.map((group) => {
            const Icon = group.icon

            return (
              <StaggerItem key={group.title}>
                <Card className="h-full border-border/70 bg-card/70 transition-colors hover:border-primary/40">
                  <CardContent className="p-5">
                    <div className="mb-5 flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{group.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">{group.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-3">
                      {group.items.map((item) => (
                        <div
                          key={item.name}
                          className={cn(
                            "group flex min-h-[86px] flex-col items-center justify-center gap-2 rounded-lg border border-border/60 bg-background/55 p-3",
                            "transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5",
                          )}
                        >
                          <img
                            src={iconUrl(item)}
                            alt={`${item.name} logo`}
                            className="h-8 w-8 object-contain transition-transform group-hover:scale-110"
                            loading="lazy"
                          />
                          <span className="text-center text-xs font-medium leading-tight">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            )
          })}
        </StaggeredContainer>
      </ScrollReveal>
    </SectionContainer>
  )
}

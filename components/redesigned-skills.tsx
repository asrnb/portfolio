"use client"

import { useState } from "react"
import { Bot, Code2, Database, PanelsTopLeft, PenTool, Workflow } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { SectionContainer, SectionHeader } from "@/components/ui/section-container"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { cn } from "@/lib/utils"

interface TechItem {
  name: string
  slug: string
  fallback?: string
}

const techCategories = [
  { label: "AI Tools", icon: Bot },
  { label: "Languages", icon: Code2 },
  { label: "Frameworks", icon: PanelsTopLeft },
  { label: "AI / ML", icon: Workflow },
  { label: "Data / Backend", icon: Database },
  { label: "Design / Workflow", icon: PenTool },
]

const techStack: TechItem[] = [
  { name: "OpenAI", slug: "openai", fallback: "AI" },
  { name: "Claude", slug: "anthropic" },
  { name: "Gemini", slug: "googlegemini" },
  { name: "Cursor", slug: "cursor" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Python", slug: "python" },
  { name: "Dart", slug: "dart" },
  { name: "C++", slug: "cplusplus" },
  { name: "C#", slug: "csharp", fallback: "C#" },
  { name: "SQL", slug: "sqlite" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "Vue", slug: "vuedotjs" },
  { name: "Laravel", slug: "laravel" },
  { name: "Flutter", slug: "flutter" },
  { name: "Tailwind", slug: "tailwindcss" },
  { name: "Vite", slug: "vite" },
  { name: "TensorFlow", slug: "tensorflow" },
  { name: "PyTorch", slug: "pytorch" },
  { name: "scikit-learn", slug: "scikitlearn" },
  { name: "Keras", slug: "keras" },
  { name: "OpenCV", slug: "opencv" },
  { name: "Jupyter", slug: "jupyter" },
  { name: "Supabase", slug: "supabase" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "MySQL", slug: "mysql" },
  { name: "Firebase", slug: "firebase" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "HubSpot", slug: "hubspot" },
  { name: "Figma", slug: "figma" },
  { name: "Canva", slug: "canva", fallback: "C" },
  { name: "GitHub", slug: "github" },
  { name: "Git", slug: "git" },
  { name: "N8N", slug: "n8n" },
  { name: "Semrush", slug: "semrush" },
]

function iconUrl(slug: string) {
  return `https://cdn.simpleicons.org/${slug}/111111`
}

function TechLogo({ item }: { item: TechItem }) {
  const [hasError, setHasError] = useState(false)

  return (
    <div
      className={cn(
        "group flex h-20 w-20 shrink-0 items-center justify-center rounded-tile border border-border bg-card p-4",
        "transition-colors hover:border-foreground/30",
      )}
      title={item.name}
    >
      {hasError ? (
        <span
          aria-label={`${item.name} logo fallback`}
          className="flex h-10 w-10 items-center justify-center rounded-tile bg-muted font-mono text-xs font-bold text-foreground"
        >
          {item.fallback ?? item.name.slice(0, 2)}
        </span>
      ) : (
        <img
          src={iconUrl(item.slug)}
          alt={`${item.name} logo`}
          className="h-10 w-10 object-contain"
          loading="lazy"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  )
}

function TechMarquee() {
  const rowItems = [...techStack, ...techStack]

  return (
    <Card className="mx-auto max-w-6xl overflow-hidden bg-card">
      <CardContent className="p-0">
        <div className="border-b border-border p-5">
          <div className="flex flex-wrap justify-center gap-2">
            {techCategories.map((category) => {
              const Icon = category.icon
              return (
                <div
                  key={category.label}
                  className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
                >
                  <Icon className="h-3.5 w-3.5 text-foreground" />
                  {category.label}
                </div>
              )
            })}
          </div>
        </div>

        <div className="relative overflow-hidden py-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-card to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-card to-transparent" />
          <div className="flex w-max gap-3 px-5 motion-reduce:animate-none animate-tech-marquee">
            {rowItems.map((item, index) => (
              <TechLogo key={`${item.name}-${index}`} item={item} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function RedesignedSkills() {
  return (
    <SectionContainer id="skills">
      <SectionHeader
        title="Tech Stack"
        subtitle="The tools and platforms I use for AI automation, full-stack applications, CRM workflows, and product interfaces."
      />

      <ScrollReveal>
        <TechMarquee />
      </ScrollReveal>
    </SectionContainer>
  )
}

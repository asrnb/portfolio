"use client"

import { Bot, Code2, Database, PanelsTopLeft, PenTool, Workflow } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { SectionContainer, SectionHeader } from "@/components/ui/section-container"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { cn } from "@/lib/utils"

interface TechItem {
  name: string
  slug: string
  color?: string
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
  { name: "OpenAI", slug: "openai", color: "412991" },
  { name: "Claude", slug: "anthropic", color: "D97757" },
  { name: "Gemini", slug: "googlegemini", color: "8E75B2" },
  { name: "Cursor", slug: "cursor", color: "ffffff" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "Python", slug: "python", color: "3776AB" },
  { name: "Dart", slug: "dart", color: "0175C2" },
  { name: "C++", slug: "cplusplus", color: "00599C" },
  { name: "C#", slug: "csharp", color: "512BD4" },
  { name: "SQL", slug: "sqlite", color: "003B57" },
  { name: "Next.js", slug: "nextdotjs", color: "ffffff" },
  { name: "Vue", slug: "vuedotjs", color: "4FC08D" },
  { name: "Laravel", slug: "laravel", color: "FF2D20" },
  { name: "Flutter", slug: "flutter", color: "02569B" },
  { name: "Tailwind", slug: "tailwindcss", color: "06B6D4" },
  { name: "Vite", slug: "vite", color: "646CFF" },
  { name: "TensorFlow", slug: "tensorflow", color: "FF6F00" },
  { name: "PyTorch", slug: "pytorch", color: "EE4C2C" },
  { name: "scikit-learn", slug: "scikitlearn", color: "F7931E" },
  { name: "Keras", slug: "keras", color: "D00000" },
  { name: "OpenCV", slug: "opencv", color: "5C3EE8" },
  { name: "Jupyter", slug: "jupyter", color: "F37626" },
  { name: "Supabase", slug: "supabase", color: "3FCF8E" },
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  { name: "MySQL", slug: "mysql", color: "4479A1" },
  { name: "Firebase", slug: "firebase", color: "FFCA28" },
  { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
  { name: "HubSpot", slug: "hubspot", color: "FF7A59" },
  { name: "Figma", slug: "figma", color: "F24E1E" },
  { name: "Canva", slug: "canva", color: "00C4CC" },
  { name: "GitHub", slug: "github", color: "ffffff" },
  { name: "Git", slug: "git", color: "F05032" },
  { name: "N8N", slug: "n8n", color: "EA4B71" },
  { name: "Semrush", slug: "semrush", color: "FF642D" },
]

function iconUrl({ slug, color = "ffffff" }: TechItem) {
  return `https://cdn.simpleicons.org/${slug}/${color}`
}

function TechLogo({ item }: { item: TechItem }) {
  return (
    <div
      className={cn(
        "group flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background/70 p-4",
        "transition-colors hover:border-primary/40 hover:bg-primary/5",
      )}
      title={item.name}
    >
      <img
        src={iconUrl(item)}
        alt={`${item.name} logo`}
        className="h-10 w-10 object-contain transition-transform group-hover:scale-110"
        loading="lazy"
      />
    </div>
  )
}

function TechMarquee() {
  const rowItems = [...techStack, ...techStack]

  return (
    <Card className="mx-auto max-w-6xl overflow-hidden border-border/70 bg-card/70">
      <CardContent className="p-0">
        <div className="border-b border-border/70 p-5">
          <div className="flex flex-wrap justify-center gap-2">
            {techCategories.map((category) => {
              const Icon = category.icon
              return (
                <div
                  key={category.label}
                  className="flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  <Icon className="h-3.5 w-3.5 text-primary" />
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
    <SectionContainer id="skills" className="bg-gradient-to-b from-background to-background/95">
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

"use client"

import { motion } from "framer-motion"
import { Camera, ImageIcon, Megaphone, Palette } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { SectionContainer, SectionHeader } from "@/components/ui/section-container"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const designProjects = [
  {
    title: "Social Media Pubmats",
    description: "Campaign-ready graphics for school announcements, events, and promotional posts.",
    tools: ["Canva", "Branding", "Layout"],
    icon: Megaphone,
    accent: "from-rose-500/20 via-orange-400/20 to-amber-300/20",
  },
  {
    title: "Print & Event Materials",
    description: "Posters, tarpaulins, and event visuals made for clear messaging across print formats.",
    tools: ["Print Design", "Typography", "Composition"],
    icon: ImageIcon,
    accent: "from-emerald-500/20 via-teal-400/20 to-sky-300/20",
  },
  {
    title: "Branding Support",
    description: "Visual materials that keep a consistent look across digital, print, and campus communications.",
    tools: ["Canva", "Figma", "Visual Identity"],
    icon: Palette,
    accent: "from-violet-500/20 via-fuchsia-400/20 to-pink-300/20",
  },
  {
    title: "Event Photography",
    description: "Photo documentation and visual coverage for events, activities, and student-facing updates.",
    tools: ["Photography", "Editing", "Documentation"],
    icon: Camera,
    accent: "from-blue-500/20 via-cyan-400/20 to-lime-300/20",
  },
]

export default function GraphicDesignProjects() {
  return (
    <SectionContainer id="graphic-design" className="relative overflow-hidden bg-gradient-to-b from-background to-background/95">
      <motion.div
        className="pointer-events-none absolute left-8 top-24 h-24 w-24 rounded-full bg-primary/10 blur-2xl"
        animate={{ y: [0, 18, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-16 right-10 h-28 w-28 rounded-full bg-secondary/10 blur-2xl"
        animate={{ y: [0, -16, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
      />

      <SectionHeader
        title="Graphic Design Projects"
        subtitle="Selected visual work across social media graphics, event materials, branding support, and photo documentation."
      />

      <ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {designProjects.map((project, index) => {
            const Icon = project.icon

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
              >
                <Card className="group h-full overflow-hidden border-border/70 bg-card/80 shadow-md transition-all duration-300 hover:shadow-xl">
                  <div className={`relative aspect-[4/3] bg-gradient-to-br ${project.accent}`}>
                    <motion.div
                      className="absolute inset-4 rounded-lg border border-white/60 bg-white/55 shadow-sm"
                      animate={{ rotate: [0, 0.8, 0], y: [0, -4, 0] }}
                      transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: index * 0.3 }}
                    />
                    <motion.div
                      className="absolute right-5 top-5 h-14 w-14 rounded-full border border-white/70 bg-white/35"
                      animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: index * 0.25 }}
                    />
                    <motion.div
                      className="absolute left-6 top-6 flex h-11 w-11 items-center justify-center rounded-md bg-background text-primary shadow-sm"
                      whileHover={{ rotate: -8, scale: 1.08 }}
                    >
                      <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    </motion.div>
                    <div className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-white/30 opacity-0 blur-sm transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="h-3 w-2/3 rounded-full bg-foreground/15" />
                      <div className="mt-2 h-3 w-1/2 rounded-full bg-foreground/10" />
                    </div>
                  </div>

                  <CardContent className="flex h-full flex-col p-5">
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tools.map((tool) => (
                        <Badge key={tool} variant="secondary" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </ScrollReveal>
    </SectionContainer>
  )
}

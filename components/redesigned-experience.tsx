"use client"

import { motion } from "framer-motion"
import { SectionContainer, SectionHeader } from "@/components/ui/section-container"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { ErrorBoundary } from "@/components/error-boundary"

const experiences = [
  {
    id: "callbox-junior",
    title: "AI Engineer",
    company: "Callbox Inc.",
    location: "Iloilo City, Philippines",
    period: "October 2025 - Present",
    description:
      "Developing AI-powered dashboards, CRM automations, API integrations, and scalable internal workflow tools.",
  },
  {
    id: "skynet",
    title: "Graphic Designer / Registrar",
    company: "Skynet Aviation Academy Inc.",
    location: "Sta. Barbara, Iloilo",
    period: "June 2025 - May 2026",
    description:
      "Designing promotional materials while supporting registrar operations, event photography, and student record workflows.",
  },
  {
    id: "callbox-intern",
    title: "Software Developer - Intern",
    company: "Callbox Inc.",
    location: "Iloilo City, Philippines",
    period: "January 2025 - April 2025",
    description:
      "Integrated AI-driven features and maintained full-stack web applications for lead management systems.",
  },
]

export default function RedesignedExperience() {
  return (
    <SectionContainer id="experience">
      <div className="mx-auto max-w-2xl">
        <SectionHeader
          title="Experience"
          subtitle="Work across AI automation, CRM workflows, full-stack development, and design support."
        />

        <ScrollReveal>
          <div className="relative border-l border-border pl-6 space-y-8">
            {experiences.map((experience, index) => (
              <ErrorBoundary key={experience.id}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative"
                >
                  <span className="absolute -left-[29px] top-1.5 h-2 w-2 rounded-full bg-primary transition-transform duration-200 group-hover:scale-125" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h3 className="text-sm font-semibold text-primary transition-colors group-hover:text-foreground">{experience.title}</h3>
                    <span className="text-xs text-muted-foreground shrink-0">{experience.period}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {experience.company}, {experience.location}
                  </p>
                  <p className="mt-2 text-sm leading-6">{experience.description}</p>
                </motion.div>
              </ErrorBoundary>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </SectionContainer>
  )
}

"use client"

import { motion } from "framer-motion"
import { SectionContainer, SectionHeader } from "@/components/ui/section-container"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { ErrorBoundary } from "@/components/error-boundary"

const education = [
  {
    school: "West Visayas State University",
    program: "Bachelor of Science in Computer Science, Major in Artificial Intelligence",
    period: "2021 - 2025",
    location: "Iloilo City, Philippines",
    honor: "Cum Laude",
  },
  {
    school: "STI College",
    program: "IT in Mobile App and Web Development",
    period: "2019 - 2021",
    location: "Kalibo, Aklan, Philippines",
    honor: "With Honors",
  },
    {
    school: "Santa Barbara National Comprehensive Highschool",
    program: "Computer System Servicing",
    period: "2015 - 2019",
    location: "Santa Barbara, Iloilo, Philippines",
        honor: "With Honors",

  },

]

export default function Education() {
  return (
    <SectionContainer id="education">
      <div className="mx-auto max-w-2xl">
        <SectionHeader
          title="Education"
          subtitle="Academic foundation in artificial intelligence, computer science, mobile app development, and web development."
        />

        <ScrollReveal>
          <div className="relative border-l border-border pl-6 space-y-8">
            {education.map((item, index) => (
              <ErrorBoundary key={item.school}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative"
                >
                  <span className="absolute -left-[29px] top-1.5 h-2 w-2 rounded-full bg-primary transition-transform duration-200 group-hover:scale-125" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h3 className="text-sm font-semibold text-primary transition-colors group-hover:text-foreground">{item.school}</h3>
                    <span className="text-xs text-muted-foreground shrink-0">{item.period}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.location}</p>
                  <p className="mt-2 text-sm leading-6">
                    {item.program} — <span className="text-muted-foreground">{item.honor}</span>
                  </p>
                </motion.div>
              </ErrorBoundary>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </SectionContainer>
  )
}

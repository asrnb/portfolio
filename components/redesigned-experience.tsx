"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionContainer, SectionHeader } from "@/components/ui/section-container"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ErrorBoundary } from "@/components/error-boundary"
import {
  Calendar,
  MapPin,
  Building,
  ChevronRight,
  ChevronDown,
  Award,
  Briefcase,
  Users,
  Target,
} from "lucide-react"

const experiences = [
  {
    id: "callbox-junior",
    title: "Junior Software Developer",
    company: "Callbox Inc.",
    location: "Iloilo City, Philippines",
    period: "October 2025 - Present",
    type: "work",
    description:
      "Developing AI-powered dashboards, CRM automations, API integrations, and scalable internal workflow tools.",
    responsibilities: [
      "Developed AI-powered dashboards for internal business workflows",
      "Built CRM automations and API integrations",
      "Optimized scalable internal tools and workflow systems",
      "Worked with AI and automation tools to improve operational efficiency",
    ],
    skills: ["AI Automation", "CRM", "API Integrations", "TypeScript", "Node.js", "Dashboards"],
    metrics: [
      { value: "AI", label: "Dashboards" },
      { value: "CRM", label: "Automation" },
      { value: "API", label: "Integrations" },
    ],
  },
  {
    id: "skynet",
    title: "Graphic Designer / Registrar",
    company: "Skynet Aviation Academy Inc.",
    location: "Sta. Barbara, Iloilo",
    period: "June 2025 - Present",
    type: "work",
    description:
      "Designing promotional materials while supporting registrar operations, event photography, and student record workflows.",
    responsibilities: [
      "Designed pubmats, posters, tarpaulins, social media graphics, and branding materials",
      "Provided event photography and photo documentation",
      "Assisted registrar duties including student records and administrative support",
      "Supported marketing and promotional work across digital and print assets",
    ],
    skills: ["Canva", "Figma", "Branding", "Photography", "Administration"],
    metrics: [
      { value: "Print", label: "Design" },
      { value: "Social", label: "Graphics" },
      { value: "Records", label: "Support" },
    ],
  },
  {
    id: "callbox-intern",
    title: "Intern Software Developer",
    company: "Callbox Inc.",
    location: "Iloilo City, Philippines",
    period: "January 2025 - April 2025",
    type: "work",
    description:
      "Integrated AI-driven features and maintained full-stack web applications for lead management systems.",
    responsibilities: [
      "Integrated AI-driven features to enhance automation workflows",
      "Built and maintained full-stack web applications for lead management systems",
      "Supported CRM-related tooling and internal software workflows",
      "Contributed to practical automation features for business operations",
    ],
    skills: ["Full-Stack Development", "AI Features", "Lead Management", "Automation"],
    metrics: [
      { value: "AI", label: "Features" },
      { value: "Full", label: "Stack" },
      { value: "CRM", label: "Systems" },
    ],
  },
]

export default function RedesignedExperience() {
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedExperience(expandedExperience === id ? null : id)
  }

  return (
    <SectionContainer id="experience">
      <SectionHeader
        title="Professional Journey"
        subtitle="Work experience across AI automation, CRM workflows, full-stack development, design support, and technical operations."
      />

      <ScrollReveal>
          <div className="space-y-6">
            {experiences.map((experience, index) => (
              <ErrorBoundary key={experience.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden bg-card">
                    <CardContent className="p-0">
                      <div
                        className={cn(
                          "flex cursor-pointer gap-4 p-4 transition-all duration-300 sm:p-6",
                          expandedExperience === experience.id ? "pb-3" : "",
                        )}
                        onClick={() => toggleExpand(experience.id)}
                      >
                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-tile bg-muted text-foreground">
                          <Briefcase className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="text-xl font-semibold">{experience.title}</h3>
                            <motion.div
                              className="mt-1 flex-shrink-0"
                              animate={{ rotate: expandedExperience === experience.id ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {expandedExperience === experience.id ? (
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              )}
                            </motion.div>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 font-mono text-xs uppercase tracking-[0.05em] text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Building className="h-3.5 w-3.5" />
                              <span>{experience.company}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              <span>{experience.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{experience.period}</span>
                            </div>
                          </div>

                          <p className="mt-3 text-muted-foreground">{experience.description}</p>
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedExperience === experience.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 sm:px-6 pb-6">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t">
                                <div>
                                  <h4 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
                                    <Award className="h-4 w-4" />
                                    Key Responsibilities
                                  </h4>
                                  <ul className="space-y-2">
                                    {experience.responsibilities.map((responsibility, i) => (
                                      <li key={i} className="flex items-start gap-2">
                                        <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-muted">
                                          <span className="text-xs text-foreground">✓</span>
                                        </div>
                                        <span className="text-sm sm:text-base">{responsibility}</span>
                                      </li>
                                    ))}
                                  </ul>

                                  <div className="mt-6">
                                    <h4 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
                                      <Users className="h-4 w-4" />
                                      Skills Applied
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {experience.skills.map((skill, i) => (
                                        <Badge
                                          key={i}
                                          variant="outline"
                                          className="border-border font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
                                        >
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
                                    <Target className="h-4 w-4" />
                                    Key Metrics & Achievements
                                  </h4>

                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                                    {experience.metrics.map((metric, i) => (
                                      <div key={i} className="rounded-tile bg-muted p-3 text-center">
                                        <div className="text-xl sm:text-2xl font-bold">{metric.value}</div>
                                        <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-muted-foreground">
                                          {metric.label}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              </ErrorBoundary>
            ))}
          </div>
      </ScrollReveal>
    </SectionContainer>
  )
}

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { SectionContainer, SectionHeader } from "@/components/ui/section-container"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { useIsClient } from "@/hooks/use-is-client"
import { ErrorBoundary } from "@/components/error-boundary"
import {
  ExternalLink,
  Github,
  Code,
  Calendar,
  Users,
  Star,
  Loader2,
} from "lucide-react"

// Project data
const projects = [
  {
    id: 1,
    title: "SEO & AI Grader",
    category: "ai",
    description:
      "Production full-stack dashboard for SEO and AI scoring workflows.",
    longDescription:
      "A deployed production dashboard built with Vue 3, Vite, Tailwind, and an Express backend. The tool supports SEO and AI grading workflows for evaluating content and surfacing practical optimization signals.",
    technologies: ["Vue 3", "Vite", "Tailwind", "Express", "SEO"],
    imageUrl: "/placeholder.svg?height=600&width=800",
    demoUrl: "",
    githubUrl: "https://github.com/asrnb",
    color: "from-blue-600 to-violet-600",
    featured: true,
    completed: "2025",
    teamSize: 1,
    difficulty: 4,
    achievements: [
      "Built a full-stack dashboard with Vue 3, Vite, Tailwind, and Express",
      "Supported SEO and AI scoring workflows for production use",
      "Designed the interface for clear review and action-taking",
      "Deployed the project in production",
    ],
  },
  {
    id: 2,
    title: "HubSpot LinkedIn Automation Workflows",
    category: "ai",
    description: "CRM automation workflows using HubSpot custom code, APIs, and Lambda.",
    longDescription:
      "Scalable automation workflows for LinkedIn outreach and CRM operations. The system uses HubSpot custom code, HubSpot APIs, Node.js, and Lambda to automate message flows, persona detection, tagging, and contact/deal associations.",
    technologies: ["HubSpot APIs", "Node.js", "Lambda", "CRM Automation", "LinkedIn"],
    imageUrl: "/placeholder.svg?height=600&width=800",
    demoUrl: "",
    githubUrl: "https://github.com/asrnb",
    color: "from-purple-600 to-pink-600",
    featured: false,
    completed: "2025",
    teamSize: 1,
    difficulty: 4,
    achievements: [
      "Developed scalable CRM automation workflows",
      "Built dynamic LinkedIn message automation",
      "Implemented persona detection and tagging logic",
      "Automated deal and contact association systems",
    ],
  },
  {
    id: 3,
    title: "Vapi Voice AI Testing & Integration",
    category: "audio",
    description: "Testing and optimization workflow for AI voice agents.",
    longDescription:
      "Voice AI testing and integration work using Vapi, OpenAI, and ElevenLabs. The project focused on prompt tuning, call-flow validation, and improving the quality and reliability of AI voice responses.",
    technologies: ["Vapi", "OpenAI", "ElevenLabs", "Prompt Engineering", "Voice AI"],
    imageUrl: "/placeholder.svg?height=600&width=800",
    demoUrl: "",
    githubUrl: "https://github.com/asrnb",
    color: "from-green-600 to-teal-600",
    featured: false,
    completed: "2025",
    teamSize: 1,
    difficulty: 4,
    achievements: [
      "Tested and optimized AI voice agents",
      "Tuned prompts for higher-quality voice responses",
      "Validated call flows across voice interactions",
      "Integrated OpenAI and ElevenLabs-powered voice tooling",
    ],
  },
  {
    id: 4,
    title: "Computer Vision Dress Code Compliance",
    category: "ai",
    description: "Computer vision thesis project for detecting dress code violations.",
    longDescription:
      "A computer vision-based system for detecting dress code compliance among WVSU students. The thesis project used Python, Flask, YOLOv8, OpenCV, and SQLite, with April leading ideation, topic selection, and front-end development.",
    technologies: ["Python", "Flask", "YOLOv8", "OpenCV", "SQLite"],
    imageUrl: "/placeholder.svg?height=600&width=800",
    demoUrl: "",
    githubUrl: "https://github.com/asrnb",
    color: "from-amber-600 to-orange-600",
    featured: false,
    completed: "2025",
    teamSize: 4,
    difficulty: 4,
    achievements: [
      "Applied YOLOv8 and OpenCV to a campus compliance use case",
      "Designed a Flask-based web application",
      "Used SQLite for lightweight local data handling",
      "Led ideation and UI/UX direction for the thesis project",
    ],
  },
  {
    id: 5,
    title: "Sentiment Analyzer Web Application",
    category: "ai",
    description: "Real-time NLP web app for sentiment analysis.",
    longDescription:
      "A real-time sentiment analysis web application built with Python, Flask, NLP techniques, HTML, CSS, and JavaScript. The app analyzes text input and returns sentiment insights through a simple web interface.",
    technologies: ["Python", "Flask", "NLP", "HTML", "CSS", "JavaScript"],
    imageUrl: "/placeholder.svg?height=600&width=800",
    demoUrl: "",
    githubUrl: "https://github.com/asrnb",
    color: "from-blue-600 to-cyan-600",
    featured: false,
    completed: "2024",
    teamSize: 1,
    difficulty: 3,
    achievements: [
      "Built a Flask web interface for real-time text analysis",
      "Applied NLP methods to classify sentiment",
      "Designed a lightweight front end with HTML, CSS, and JavaScript",
      "Created a practical demonstration of AI-assisted text understanding",
    ],
  },
  {
    id: 6,
    title: "BizGen GPT",
    category: "ai",
    description: "AI-powered business idea generator for entrepreneurs.",
    longDescription:
      "A Streamlit application using Python and OpenAI GPT to help entrepreneurs generate business ideas tailored to different industries and constraints.",
    technologies: ["Python", "Streamlit", "OpenAI", "Prompt Engineering"],
    imageUrl: "/placeholder.svg?height=600&width=800",
    demoUrl: "",
    githubUrl: "https://github.com/asrnb",
    color: "from-indigo-600 to-blue-600",
    featured: false,
    completed: "2024",
    teamSize: 1,
    difficulty: 3,
    achievements: [
      "Created a business ideation workflow powered by OpenAI GPT",
      "Built an interactive Streamlit interface",
      "Designed prompts for industry-specific idea generation",
      "Focused on practical support for early-stage entrepreneurs",
    ],
  },
]

export default function RedesignedProjects() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const isClient = useIsClient()

  const handleDemoClick = (url: string) => {
    if (!isClient) return
    if (!url) {
      toast({
        title: "Demo unavailable",
        description: "This project does not have a public demo link yet.",
        duration: 3000,
      })
      return
    }
    toast({
      title: "Demo Link",
      description: "Opening demo in a new tab...",
      duration: 3000,
    })
    window.open(url, "_blank")
  }

  // Simulate loading delay
  useEffect(() => {
    if (isClient) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isClient])

  // If not client-side yet, show a loading state
  if (!isClient || isLoading) {
    return (
      <SectionContainer id="projects" className="relative">
        <SectionHeader
          title="Projects"
          subtitle="Explore my portfolio of AI, machine learning, and software development projects."
        />
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
          <span>Loading projects...</span>
        </div>
      </SectionContainer>
    )
  }

  return (
    <SectionContainer id="projects" className="relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10" />

      <SectionHeader
        title="Projects"
        subtitle="Explore my portfolio of AI, automation, and software development projects."
      />

      <ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {projects.map((project, index) => (
              <ErrorBoundary key={project.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProjectCard
                    project={project}
                    onSelect={() => {
                      setSelectedProject(project)
                      setIsDialogOpen(true)
                    }}
                  />
                </motion.div>
              </ErrorBoundary>
            ))}
          </AnimatePresence>
        </div>
      </ScrollReveal>

      {/* Project details dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 w-[95vw]">
          {selectedProject && (
            <div className="flex flex-col h-full">
              <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className="mb-2">Project</Badge>
                    <DialogTitle className="text-xl sm:text-2xl">{selectedProject.title}</DialogTitle>
                    <DialogDescription className="mt-2 text-sm">{selectedProject.description}</DialogDescription>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < selectedProject.difficulty ? "fill-yellow-500 text-yellow-500" : "text-muted"}`}
                      />
                    ))}
                  </div>
                </div>
              </DialogHeader>

              <Tabs defaultValue="overview" className="flex-1 overflow-hidden">
                <div className="px-4 sm:px-6 border-b">
                  <TabsList className="justify-start rounded-none bg-transparent h-10">
                    <TabsTrigger value="overview" className="text-sm">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="details" className="text-sm">
                      Details
                    </TabsTrigger>
                    <TabsTrigger value="gallery" className="text-sm">
                      Gallery
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                  <TabsContent value="overview" className="mt-0 h-full">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <h4 className="text-lg font-semibold mb-3">Project Details</h4>
                        <p className="mb-6 text-sm sm:text-base">{selectedProject.longDescription}</p>

                        <h4 className="text-lg font-semibold mb-3">Key Achievements</h4>
                        <ul className="space-y-2 mb-6">
                          {selectedProject.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                                <span className="text-xs text-primary">✓</span>
                              </div>
                              <span className="text-sm sm:text-base">{achievement}</span>
                            </li>
                          ))}
                        </ul>

                        <h4 className="text-lg font-semibold mb-3">Technologies</h4>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {selectedProject.technologies.map((tech, index) => (
                            <Badge key={index} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-3 mt-6">
                          {selectedProject.demoUrl && (
                            <Button
                              variant="default"
                              className="gap-2"
                              onClick={() => handleDemoClick(selectedProject.demoUrl)}
                            >
                              <ExternalLink className="h-4 w-4" />
                              Live Demo
                            </Button>
                          )}
                          <Button variant="outline" className="gap-2" asChild>
                            <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                              GitHub
                            </a>
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-3">Project Info</h4>
                        <div className="space-y-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Completed</span>
                            <span>{selectedProject.completed}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Team Size</span>
                            <span>{selectedProject.teamSize} people</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Difficulty</span>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < selectedProject.difficulty ? "fill-yellow-500 text-yellow-500" : "text-muted"}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="details" className="mt-0">
                    <div className="relative aspect-video mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={selectedProject.imageUrl || "/placeholder.svg"}
                        alt={selectedProject.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold mb-2">Project Description</h4>
                        <p className="text-sm sm:text-base">{selectedProject.longDescription}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-2">Implementation Details</h4>
                        <p className="text-sm sm:text-base">
                          This project was implemented using {selectedProject.technologies.join(", ")}. The development
                          process involved careful planning, iterative development, and rigorous testing to ensure
                          high-quality results.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-2">Challenges & Solutions</h4>
                        <p className="text-sm sm:text-base">
                          During development, we encountered several challenges including performance optimization,
                          scalability concerns, and integration complexities. These were addressed through innovative
                          approaches and best practices in software engineering.
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="gallery" className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((index) => (
                        <div key={index} className="overflow-hidden rounded-lg">
                          <Image
                            src={`/placeholder.svg?height=400&width=600&text=Screenshot ${index}`}
                            alt={`${selectedProject.title} screenshot ${index}`}
                            width={600}
                            height={400}
                            className="w-full h-auto object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SectionContainer>
  )
}

interface ProjectCardProps {
  project: (typeof projects)[0]
  onSelect: () => void
}

function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isClient = useIsClient()

  return (
    <Card
      className="overflow-hidden h-full flex flex-col border-none shadow-md hover:shadow-lg transition-all duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.imageUrl || "/placeholder.svg"}
          alt={project.title}
          fill
          className={cn(
            "object-cover transition-transform duration-500",
            isClient && isHovered ? "scale-110" : "scale-100",
          )}
        />
        <div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-300 bg-gradient-to-r",
            project.color,
          )}
        />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button variant="outline" className="border-white text-white hover:bg-white/20" onClick={onSelect}>
            View Details
          </Button>
        </div>
      </div>

      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex justify-end mb-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < project.difficulty ? "fill-yellow-500 text-yellow-500" : "text-muted"}`}
              />
            ))}
          </div>
        </div>

        <h3 className="font-bold mb-2 line-clamp-1">{project.title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-1 mb-4 mt-auto">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{project.technologies.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{project.completed}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>Team: {project.teamSize}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

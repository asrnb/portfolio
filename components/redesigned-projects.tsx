"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { SectionContainer } from "@/components/ui/section-container"
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
import { ExternalLink, Github, Calendar, Users, Loader2 } from "lucide-react"
import { projects, hasRealImage } from "@/lib/projects"

function DifficultyLabel({ value }: { value: number }) {
  return <span className="text-xs text-muted-foreground">Difficulty {value}/5</span>
}

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
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-foreground mr-2" />
          <span>Loading projects...</span>
        </div>
      </SectionContainer>
    )
  }

  const selectedHasImage = selectedProject ? hasRealImage(selectedProject.imageUrl) : false

  return (
    <SectionContainer id="projects" className="relative">
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
                    <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight">
                      {selectedProject.title}
                    </DialogTitle>
                    <DialogDescription className="mt-2 text-sm">{selectedProject.description}</DialogDescription>
                  </div>
                  <DifficultyLabel value={selectedProject.difficulty} />
                </div>
              </DialogHeader>

              <Tabs defaultValue="overview" className="flex-1 overflow-hidden">
                <div className="px-4 sm:px-6">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                  <TabsContent value="overview" className="mt-0 h-full">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <h4 className="text-lg font-bold mb-3">Project Details</h4>
                        <p className="mb-6 text-sm sm:text-base text-muted-foreground">
                          {selectedProject.longDescription}
                        </p>

                        <h4 className="text-lg font-bold mb-3">Key Achievements</h4>
                        <ul className="space-y-2 mb-6">
                          {selectedProject.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="h-5 w-5 rounded-full bg-primary/15 flex items-center justify-center mt-0.5 flex-shrink-0">
                                <span className="text-xs text-primary">✓</span>
                              </div>
                              <span className="text-sm sm:text-base">{achievement}</span>
                            </li>
                          ))}
                        </ul>

                        <h4 className="text-lg font-bold mb-3">Technologies</h4>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {selectedProject.technologies.map((tech, index) => (
                            <Badge key={index} variant="outline">
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
                          {selectedProject.githubUrl && (
                            <Button variant="outline" className="gap-2" asChild>
                              <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4" />
                                GitHub
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold mb-3">Project Info</h4>
                        <div className="space-y-4">
                          <div className="flex flex-col">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                              Completed
                            </span>
                            <span>{selectedProject.completed}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                              Team Size
                            </span>
                            <span>{selectedProject.teamSize} people</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                              Difficulty
                            </span>
                            <span>{selectedProject.difficulty}/5</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="details" className="mt-0">
                    {selectedHasImage && (
                      <div className="relative aspect-video mb-6 overflow-hidden rounded-lg border border-border">
                        <Image
                          src={selectedProject.imageUrl}
                          alt={selectedProject.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-bold mb-2">Project Description</h4>
                        <p className="text-sm sm:text-base text-muted-foreground">
                          {selectedProject.longDescription}
                        </p>
                      </div>
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
  const hasImage = hasRealImage(project.imageUrl)

  return (
    <Card
      className="overflow-hidden h-full flex flex-col bg-card transition-all duration-150 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {hasImage && (
        <div className="relative aspect-video overflow-hidden border-b border-border">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className={cn(
              "object-cover transition-transform duration-500",
              isClient && isHovered ? "scale-105" : "scale-100",
            )}
          />

          <div className="absolute inset-0 flex items-center justify-center bg-background/0 opacity-0 transition-opacity duration-200 group-hover:bg-background/70 group-hover:opacity-100">
            <Button variant="secondary" onClick={onSelect}>
              View Details
            </Button>
          </div>
        </div>
      )}

      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex justify-end mb-2">
          <DifficultyLabel value={project.difficulty} />
        </div>

        <h3 className="font-bold mb-2 line-clamp-1">{project.title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-1 mb-4 mt-auto">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <Badge key={i} variant="outline">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 && (
            <Badge variant="outline">+{project.technologies.length - 3} more</Badge>
          )}
        </div>

        <div className="flex justify-between items-center text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{project.completed}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>Team {project.teamSize}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 gap-1.5" onClick={onSelect}>
            Details
          </Button>
          {project.demoUrl && (
            <Button size="sm" className="flex-1 gap-1.5" asChild>
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5" />
                Live Demo
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

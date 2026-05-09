"use client"
import { SectionContainer, SectionHeader } from "@/components/ui/section-container"
import { ScrollReveal, StaggeredContainer, StaggerItem } from "@/components/ui/scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Award, Briefcase, GraduationCap, Heart, ExternalLink } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import ResumeDownload from "@/components/resume-download"


export default function AboutSection() {
  return (
    <SectionContainer id="about" className="relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10" />

      <SectionHeader
        title="About Me"
        subtitle="Computer Science graduate specializing in artificial intelligence, full-stack development, CRM automation, and practical AI integrations."
      />

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <ScrollReveal>
          <div className="relative">
            <div className="relative z-10 rounded-lg overflow-hidden border border-white/10 shadow-xl">
              <Image
                src="/april.jpg"
                alt="April Suarnaba"
                width={600}
                height={800}
                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Add an overlay with a subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <p className="font-medium">April Suarnaba</p>
                  <p className="text-sm text-white/80">Software Engineer</p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 -left-4 w-full h-full border-2 border-primary/50 rounded-lg -z-10" />
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-primary/20 to-transparent rounded-lg -z-10" />
            {/* Stats cards */}
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="absolute -bottom-6 -right-6 w-40 shadow-lg backdrop-blur-sm bg-background/80 border-white/10 rounded-lg overflow-hidden"
            >
              <Card className="border-none bg-transparent">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    <div>
                      {/* <div className="text-sm font-medium">Experience</div>
                      <div className="text-2xl font-bold">5+ Years</div> */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="absolute -top-6 -right-6 w-40 shadow-lg backdrop-blur-sm bg-background/80 border-white/10 rounded-lg overflow-hidden"
            >
              <Card className="border-none bg-transparent">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">Focus</div>
                      <div className="text-2xl font-bold">AI</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </ScrollReveal>

        <div>
          <StaggeredContainer>
            <StaggerItem>
              <h3 className="text-2xl font-bold mb-4">Hi, I’m April!</h3>
            </StaggerItem>

            <StaggerItem>
              <p className="text-muted-foreground mb-6">
                I graduated Cum Laude from West Visayas State University with a Bachelor of Science in Computer Science majoring in Artificial Intelligence. My work centers on building AI-powered dashboards, CRM automations, API integrations, and full-stack web applications.
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="text-muted-foreground mb-6">
                I enjoy turning real business workflows into clear, usable systems. Recently, I have worked with HubSpot custom code, LinkedIn automation workflows, Vapi voice AI testing, OpenAI integrations, and computer vision projects using YOLOv8 and OpenCV.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-wrap gap-3 mb-8">
                <Badge className="px-3 py-1.5 bg-blue-500/20 text-blue-500 border-blue-500/30 hover:bg-blue-500/30 transition-colors">
                  <Briefcase className="h-3.5 w-3.5 mr-1" />
                  Software Development
                </Badge>
                <Badge className="px-3 py-1.5 bg-purple-500/20 text-purple-500 border-purple-500/30 hover:bg-purple-500/30 transition-colors">
                  <GraduationCap className="h-3.5 w-3.5 mr-1" />
                  AI and Automation
                </Badge>
                <Badge className="px-3 py-1.5 bg-green-500/20 text-green-500 border-green-500/30 hover:bg-green-500/30 transition-colors">
                  <Heart className="h-3.5 w-3.5 mr-1" />
                  UI/UX Design
                </Badge>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <ResumeDownload />
                <Button variant="outline" className="gap-2 group" asChild>
                  <a
                    href="https://ph.linkedin.com/in/aprilsuarnaba"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>View LinkedIn</span>
                    <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </StaggerItem>
          </StaggeredContainer>
        </div>
      </div>
    </SectionContainer>
  )
}

import { Suspense } from "react"
import AboutSection from "@/components/about-section"
import RedesignedExperience from "@/components/redesigned-experience"
import RedesignedSkills from "@/components/redesigned-skills"
import RedesignedProjects from "@/components/redesigned-projects"
import Education from "@/components/education"
import ContactForm from "@/components/contact-form"
import EnhancedFooter from "@/components/enhanced-footer"
import FloatingNav from "@/components/floating-nav"
import ScrollProgress from "@/components/scroll-progress"
import { ErrorBoundary } from "@/components/error-boundary"
import { SectionFallback } from "@/components/section-fallback"
import { SectionContainer, SectionHeader } from "@/components/ui/section-container"
import { Loader2 } from "lucide-react"

// Simple loading component
function LoadingSection({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
      <p className="text-muted-foreground">Loading {name} section...</p>
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background pt-16">
      <ScrollProgress />
      <FloatingNav />

      <ErrorBoundary fallback={<SectionFallback title="About" />}>
        <Suspense fallback={<LoadingSection name="About" />}>
          <AboutSection />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<SectionFallback title="Skills" />}>
        <Suspense fallback={<LoadingSection name="Skills" />}>
          <RedesignedSkills />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<SectionFallback title="Experience" />}>
        <Suspense fallback={<LoadingSection name="Experience" />}>
          <RedesignedExperience />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<SectionFallback title="Projects" />}>
        <Suspense fallback={<LoadingSection name="Projects" />}>
          <RedesignedProjects />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<SectionFallback title="Education" />}>
        <Suspense fallback={<LoadingSection name="Education" />}>
          <Education />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<SectionFallback title="Contact" />}>
        <Suspense fallback={<LoadingSection name="Contact" />}>
          <SectionContainer id="contact" className="bg-gradient-to-b from-background to-background/95">
            <SectionHeader
              title="Contact"
              subtitle="For collaborations, AI automation work, dashboards, or full-stack projects, reach out directly."
            />
            <ContactForm />
          </SectionContainer>
        </Suspense>
      </ErrorBoundary>

      <EnhancedFooter />
    </main>
  )
}

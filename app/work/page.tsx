import { Suspense } from "react"
import type { Metadata } from "next"
import RedesignedExperience from "@/components/redesigned-experience"
import RedesignedProjects from "@/components/redesigned-projects"
import Footer from "@/components/footer"
import FloatingNav from "@/components/floating-nav"
import ScrollProgress from "@/components/scroll-progress"
import { ErrorBoundary } from "@/components/error-boundary"
import { SectionFallback } from "@/components/section-fallback"
import { Loader2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Work | April Suarnaba",
  description: "Professional journey and selected projects by April Suarnaba.",
}

function LoadingSection({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="mb-4 h-8 w-8 animate-spin text-primary" />
      <p className="text-muted-foreground">Loading {name} section...</p>
    </div>
  )
}

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-background pt-16">
      <ScrollProgress />
      <FloatingNav />

      <section className="container mx-auto px-4 py-14 text-center md:py-20">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-primary">Selected Work</p>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-normal md:text-5xl">
          Professional Journey & Projects
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          A focused look at my hands-on experience across AI automation, CRM workflows, full-stack development,
          and practical software projects.
        </p>
      </section>

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

      <Footer />
    </main>
  )
}

import { Suspense } from "react"
import type { Metadata } from "next"
import AboutSection from "@/components/about-section"
import Footer from "@/components/footer"
import FloatingNav from "@/components/floating-nav"
import ScrollProgress from "@/components/scroll-progress"
import { ErrorBoundary } from "@/components/error-boundary"
import { SectionFallback } from "@/components/section-fallback"
import { Loader2 } from "lucide-react"

export const metadata: Metadata = {
  title: "About | April Suarnaba",
  description: "Get to know April Suarnaba, an AI Engineer building AI-powered dashboards and full-stack tools.",
}

function LoadingSection({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="h-8 w-8 animate-spin text-foreground mb-4" />
      <p className="text-muted-foreground">Loading {name} section...</p>
    </div>
  )
}

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-16">
      <ScrollProgress />
      <FloatingNav />

      <ErrorBoundary fallback={<SectionFallback title="About" />}>
        <Suspense fallback={<LoadingSection name="About" />}>
          <AboutSection />
        </Suspense>
      </ErrorBoundary>

      <Footer />
    </main>
  )
}

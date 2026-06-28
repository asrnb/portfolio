import { Suspense } from "react"
import type { Metadata } from "next"
import AboutSection from "@/components/about-section"
import AboutFaq from "@/components/about-faq"
import Footer from "@/components/footer"
import FloatingNav from "@/components/floating-nav"
import ScrollProgress from "@/components/scroll-progress"
import { ErrorBoundary } from "@/components/error-boundary"
import { SectionFallback } from "@/components/section-fallback"
import { Loader2 } from "lucide-react"
import { aboutFaq } from "@/lib/about-faq"

export const metadata: Metadata = {
  title: "About | April Suarnaba",
  description: "Get to know April Suarnaba, an AI Engineer building AI-powered dashboards and full-stack tools.",
  alternates: {
    canonical: "/about",
  },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: aboutFaq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ScrollProgress />
      <FloatingNav />

      <ErrorBoundary fallback={<SectionFallback title="About" />}>
        <Suspense fallback={<LoadingSection name="About" />}>
          <AboutSection />
        </Suspense>
      </ErrorBoundary>

      <AboutFaq />

      <Footer />
    </main>
  )
}

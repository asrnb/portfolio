import { Suspense } from "react"
import type { Metadata } from "next"
import RedesignedProjects from "@/components/redesigned-projects"
import Footer from "@/components/footer"
import FloatingNav from "@/components/floating-nav"
import ScrollProgress from "@/components/scroll-progress"
import { ErrorBoundary } from "@/components/error-boundary"
import { SectionFallback } from "@/components/section-fallback"
import { Loader2 } from "lucide-react"
import { projects, hasRealImage } from "@/lib/projects"

const siteUrl = "https://asrnb.vercel.app"

export const metadata: Metadata = {
  title: "Projects | April Suarnaba",
  description: "Selected software, AI automation, and design projects by April Suarnaba.",
  alternates: {
    canonical: "/work",
  },
}

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: projects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "CreativeWork",
      name: project.title,
      description: project.longDescription,
      url: project.demoUrl || project.githubUrl || `${siteUrl}/work`,
      image: hasRealImage(project.imageUrl) ? `${siteUrl}${project.imageUrl}` : undefined,
      dateCreated: project.completed,
      keywords: project.technologies.join(", "),
      creator: {
        "@type": "Person",
        name: "April Suarnaba",
      },
    },
  })),
}

function LoadingSection({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="mb-4 h-8 w-8 animate-spin text-foreground" />
      <p className="text-muted-foreground">Loading {name} section...</p>
    </div>
  )
}

export default function WorkPage() {
  return (
    <main className="min-h-screen pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
      <ScrollProgress />
      <FloatingNav />

      <section className="container mx-auto px-4 py-10 text-center md:py-16">
        <span className="mb-3 inline-block rounded-full bg-primary/15 px-3 py-1.5 text-xs font-medium text-primary">
          Selected Work
        </span>
        <h1 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">Projects</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          A focused look at my software, AI automation, and graphic design work.
        </p>
      </section>

      <ErrorBoundary fallback={<SectionFallback title="Projects" />}>
        <Suspense fallback={<LoadingSection name="Projects" />}>
          <RedesignedProjects />
        </Suspense>
      </ErrorBoundary>

      <Footer />
    </main>
  )
}

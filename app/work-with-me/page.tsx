import type { Metadata } from "next"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"
import WorkWithMeForm from "@/components/work-with-me-form"

export const metadata: Metadata = {
  title: "Work with me | April Suarnaba",
  description: "Hire April Suarnaba for AI automation, dashboards, CRM workflows, and full-stack web projects.",
}

export default function WorkWithMePage() {
  return (
    <main className="min-h-screen pt-16">
      <ScrollProgress />
      <section className="container mx-auto px-4 py-10 md:py-16">
        <WorkWithMeForm />
      </section>
      <Footer />
    </main>
  )
}

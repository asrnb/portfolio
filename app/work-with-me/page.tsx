import type { Metadata } from "next"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"
import WorkWithMeForm from "@/components/work-with-me-form"

export const metadata: Metadata = {
  title: "Work with me | April Suarnaba",
  description: "Send a project or collaboration inquiry to April Suarnaba.",
}

export default function WorkWithMePage() {
  return (
    <main className="min-h-screen bg-background pt-16">
      <ScrollProgress />
      <section className="container mx-auto px-4 py-16 md:py-24">
        <WorkWithMeForm />
      </section>
      <Footer />
    </main>
  )
}

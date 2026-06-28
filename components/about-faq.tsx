import { SectionContainer } from "@/components/ui/section-container"
import { aboutFaq } from "@/lib/about-faq"

export default function AboutFaq() {
  return (
    <SectionContainer className="relative py-6 md:py-10">
      <div className="mx-auto max-w-6xl border-t border-border pt-5">
        <h2 className="text-base font-semibold tracking-tight">Frequently asked</h2>
        <p className="mt-1 text-sm text-muted-foreground">Quick answers about who April is and what she does.</p>

        <dl className="mt-5 grid gap-5 sm:grid-cols-2">
          {aboutFaq.map((item) => (
            <div key={item.question}>
              <dt className="text-sm font-semibold">{item.question}</dt>
              <dd className="mt-1.5 text-sm leading-6 text-muted-foreground">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </SectionContainer>
  )
}

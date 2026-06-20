import { Award, GraduationCap, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionContainer, SectionHeader } from "@/components/ui/section-container"

const education = [
  {
    school: "West Visayas State University",
    program: "Bachelor of Science in Computer Science, Major in Artificial Intelligence",
    period: "2021 - 2025",
    location: "Iloilo City, Philippines",
    honor: "Cum Laude",
  },
  {
    school: "STI College",
    program: "IT in Mobile App and Web Development",
    period: "2019 - 2021",
    location: "Kalibo, Aklan, Philippines",
    honor: "With Honors",
  },
]

export default function Education() {
  return (
    <SectionContainer id="education">
      <SectionHeader
        title="Education"
        subtitle="Academic foundation in artificial intelligence, computer science, mobile app development, and web development."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {education.map((item) => (
          <Card key={item.school} className="bg-card">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-tile bg-muted text-foreground">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <Badge
                  variant="outline"
                  className="border-border font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
                >
                  {item.honor}
                </Badge>
              </div>

              <h3 className="text-xl font-semibold">{item.school}</h3>
              <p className="mt-2 text-muted-foreground">{item.program}</p>

              <div className="mt-5 space-y-2 font-mono text-xs uppercase tracking-[0.05em] text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Award className="h-3.5 w-3.5" />
                  <span>{item.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{item.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionContainer>
  )
}

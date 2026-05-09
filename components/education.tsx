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
    <SectionContainer id="education" className="bg-gradient-to-b from-background/95 to-background">
      <SectionHeader
        title="Education"
        subtitle="Academic foundation in artificial intelligence, computer science, mobile app development, and web development."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {education.map((item) => (
          <Card key={item.school} className="border-border/60 bg-background/70">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <Badge className="bg-primary/15 text-primary hover:bg-primary/20">{item.honor}</Badge>
              </div>

              <h3 className="text-xl font-semibold">{item.school}</h3>
              <p className="mt-2 text-muted-foreground">{item.program}</p>

              <div className="mt-5 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  <span>{item.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
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

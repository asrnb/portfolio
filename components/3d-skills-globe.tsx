"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const skillGroups = [
  {
    title: "AI Tools",
    skills: ["OpenAI", "Anthropic", "Gemini", "LLaMA", "Claude Code", "Cursor"],
  },
  {
    title: "Machine Learning",
    skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "Google Colab", "Jupyter"],
  },
  {
    title: "Full Stack",
    skills: ["Next.js", "Vue", "Laravel", "Flutter", "TypeScript", "Python"],
  },
  {
    title: "Data and Automation",
    skills: ["Supabase", "PostgreSQL", "Firebase", "HubSpot APIs", "N8N", "API Integrations"],
  },
]

export default function SkillsGlobe() {
  return (
    <Card className="w-full max-w-3xl border-border/50 bg-background/70">
      <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-3 font-semibold">{group.title}</h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

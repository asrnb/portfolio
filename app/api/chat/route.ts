import { NextResponse } from "next/server"
import { z } from "zod"

const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2000),
      }),
    )
    .min(1)
    .max(20),
})

const systemPrompt = `You are the portfolio chatbot for April Suarnaba, an AI Engineer based in Iloilo City, Philippines.

About April:
- BS Computer Science, major in Artificial Intelligence.
- Works at Callbox Inc. Background also includes work as a registrar at Skynet Aviation Academy.
- Started coding at 13 with HTML/CSS, then JavaScript, then explored mobile and web development in senior high.
- Focuses on AI-powered business tooling: AI automations/agents, dashboards, CRM workflows (e.g. HubSpot), API integrations, and full-stack web apps.
- Open to hire for: AI automation, dashboards, CRM workflows, API integrations, full-stack websites.
- Contact: aprilsuarnaba5@gmail.com, GitHub github.com/asrnb, LinkedIn ph.linkedin.com/in/aprilsuarnaba.

Answer visitor questions about April's background, skills, and projects in a friendly, concise way. If asked something unrelated to April or her work, politely decline and steer the conversation back to her portfolio. Keep replies short (a few sentences).`

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null)
  const parsed = chatSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json({ error: "Please send a valid message." }, { status: 400 })
  }

  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: "The chatbot is not configured yet. Add GROQ_API_KEY in Vercel to enable it." },
      { status: 503 },
    )
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "system", content: systemPrompt }, ...parsed.data.messages],
      temperature: 0.5,
      max_tokens: 300,
    }),
  })

  if (!response.ok) {
    return NextResponse.json({ error: "The chatbot could not respond right now." }, { status: 502 })
  }

  const data = await response.json()
  const reply = data?.choices?.[0]?.message?.content

  if (!reply) {
    return NextResponse.json({ error: "The chatbot could not respond right now." }, { status: 502 })
  }

  return NextResponse.json({ reply })
}

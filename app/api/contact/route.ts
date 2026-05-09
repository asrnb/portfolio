import { NextResponse } from "next/server"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(180),
  subject: z.string().min(5).max(160),
  message: z.string().min(10).max(4000),
})

const contactEmail = "aprilsuarnaba5@gmail.com"

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null)
  const parsed = contactSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json({ error: "Please complete the form with valid details." }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Email sending is not configured yet. Add RESEND_API_KEY in Vercel to send messages automatically.",
      },
      { status: 503 },
    )
  }

  const { name, email, subject, message } = parsed.data
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>"
  const toEmail = process.env.CONTACT_TO_EMAIL || contactEmail

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject: `Portfolio inquiry: ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        "",
        message,
      ].join("\n"),
    }),
  })

  if (!response.ok) {
    return NextResponse.json(
      { error: "The email provider could not send the message right now." },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}

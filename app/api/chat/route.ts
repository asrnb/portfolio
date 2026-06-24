import { NextResponse } from "next/server"
import { z } from "zod"
import crypto from "crypto"

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

const checkAvailabilityArgsSchema = z.object({
  date: z.string(),
})

const bookAppointmentArgsSchema = z.object({
  date: z.string(),
  time: z.string(),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(180),
  topic: z.string().trim().min(1).max(300),
})

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 10
const rateLimitState = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string) {
  const now = Date.now()
  const entry = rateLimitState.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitState.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  entry.count += 1
  return entry.count > RATE_LIMIT_MAX_REQUESTS
}

const TIMEZONE = "Asia/Manila"
const TIMEZONE_OFFSET = "+08:00"
const BUSINESS_START_HOUR = 9
const BUSINESS_END_HOUR = 18
const MEETING_MINUTES = 30
const WEEKDAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const tools = [
  {
    type: "function",
    function: {
      name: "check_availability",
      description:
        "Check available 30-minute meeting slots with April on a given weekday (weekdays only, 9am-6pm Asia/Manila time). Returns a list of open start times.",
      parameters: {
        type: "object",
        properties: {
          date: { type: "string", description: "Date in YYYY-MM-DD format" },
        },
        required: ["date"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "book_appointment",
      description:
        "Book a 30-minute call with April at a specific date and time. Only call this after the visitor has confirmed an exact available slot, their name, and their email.",
      parameters: {
        type: "object",
        properties: {
          date: { type: "string", description: "YYYY-MM-DD" },
          time: { type: "string", description: "24-hour HH:mm, Asia/Manila time, must be a slot returned by check_availability" },
          name: { type: "string", description: "Visitor's full name" },
          email: { type: "string", description: "Visitor's email address" },
          topic: { type: "string", description: "Short topic or reason for the call" },
        },
        required: ["date", "time", "name", "email", "topic"],
      },
    },
  },
]

function buildSystemPrompt() {
  const manilaNow = new Date(Date.now() + 8 * 60 * 60 * 1000)
  const today = manilaNow.toISOString().slice(0, 10)
  const todayWeekday = WEEKDAY_NAMES[manilaNow.getUTCDay()]

  return `You are the portfolio chatbot for April Suarnaba, an AI Engineer based in Iloilo City, Philippines.

Today's date is ${today} (${todayWeekday}), timezone Asia/Manila.

Bio:
- Started coding at 13 with HTML/CSS, then JavaScript, then explored mobile and web development in senior high.
- Focuses on AI-powered business tooling: AI automations/agents, dashboards, CRM workflows (e.g. HubSpot), API integrations, and full-stack web apps.
- Open to hire for: AI automation, dashboards, CRM workflows, API integrations, full-stack websites.
- Contact: aprilsuarnaba5@gmail.com, GitHub github.com/asrnb, LinkedIn ph.linkedin.com/in/aprilsuarnaba, Instagram @azbdps, Spotify (link in the hero section of the site).

Education (most recent first):
- West Visayas State University, Iloilo City (2021-2025) — BS Computer Science, Major in Artificial Intelligence. Cum Laude.
- STI College, Kalibo, Aklan (2019-2021) — IT in Mobile App and Web Development. With Honors.
- Santa Barbara National Comprehensive Highschool, Santa Barbara, Iloilo (2015-2019) — Computer System Servicing. With Honors.

Experience (most recent first):
- AI Engineer, Callbox Inc., Iloilo City (October 2025 - Present) — Developing AI-powered dashboards, CRM automations, API integrations, and scalable internal workflow tools.
- Graphic Designer / Registrar, Skynet Aviation Academy Inc., Sta. Barbara, Iloilo (June 2025 - May 2026) — Designing promotional materials while supporting registrar operations, event photography, and student record workflows.
- Software Developer Intern, Callbox Inc., Iloilo City (January 2025 - April 2025) — Integrated AI-driven features and maintained full-stack web applications for lead management systems.

Tech stack:
- AI tools: OpenAI, Claude, Gemini, Cursor
- Languages: TypeScript, Python, Dart, C++, C#, SQL
- Frameworks: Next.js, Vue, Laravel, Flutter, Tailwind, Vite
- AI / ML: TensorFlow, PyTorch, scikit-learn, Keras, OpenCV, Jupyter
- Backend / data: Supabase, PostgreSQL, MySQL, Firebase, Node.js, HubSpot
- Design / workflow: Figma, Canva, GitHub, Git, n8n, Semrush

Projects:
- SEO & AI Grader — full-stack SEO dashboard (Vue 3, Vite, Tailwind, Express) pulling live data from GA4, Search Console, and Ahrefs with PDF export.
- HubSpot LinkedIn Automation Workflows — CRM automation using HubSpot APIs, Node.js, and Lambda for LinkedIn outreach, persona detection, and tagging.
- Computer Vision Dress Code Compliance — thesis project detecting dress code violations using Python, Flask, YOLOv8, OpenCV, SQLite.
- Sentiment Analyzer Web Application — real-time NLP sentiment analysis app (Python, Flask, NLP, HTML/CSS/JS).
- BizGen GPT — Streamlit app using OpenAI GPT to generate business ideas for entrepreneurs.
- Luminance, Sa-kai, TuklaSEEn — UI/UX app design projects with interactive Figma prototypes.

Answer visitor questions about April's background, education, experience, skills, and projects in a friendly, concise way. Stay strictly on topics about April, her work, or booking time with her. If asked something unrelated (general knowledge, coding help, unrelated trivia, etc.), politely decline — do not answer the unrelated question even partially — and steer the conversation back to April's portfolio. Keep replies short (a few sentences).

You can also book a 30-minute call with April for visitors who want to talk to her (e.g. about hiring her, a project, or just a chat). Treat any message expressing intent to meet, talk, schedule, or book time with April — such as "I want to schedule a meeting", "can we set up a call", "I'd like to book April", or similar — as a booking request, even if the visitor hasn't mentioned a specific date yet. In that case, proactively ask which day works for them (or suggest the next few weekdays) instead of waiting for them to ask about availability first.

Meetings are only available on weekdays, 9am-6pm Asia/Manila time. Once you have a candidate date, use check_availability before proposing times — never guess open slots. Before calling book_appointment, make sure you have the visitor's name, email, a short topic, and an exact slot they've confirmed from check_availability. If booking tools report that scheduling isn't configured, apologize and direct the visitor to email April directly instead.

Never mention tool or function names (like check_availability or book_appointment), JSON, or any internal implementation details in your replies — the visitor should never see how you work under the hood. Speak naturally, as April's assistant, not as a system narrating its own steps. For example, instead of "I'll use the book_appointment function to finalize the booking," just say "Once you send those over, I'll get it booked."`
}

function base64url(input: Buffer | string) {
  const buffer = typeof input === "string" ? Buffer.from(input) : input
  return buffer.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

async function getGoogleAccessToken(): Promise<string | null> {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")

  if (!clientEmail || !privateKey) return null

  const now = Math.floor(Date.now() / 1000)
  const header = { alg: "RS256", typ: "JWT" }
  const claims = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/calendar",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  }

  const unsigned = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claims))}`
  const signer = crypto.createSign("RSA-SHA256")
  signer.update(unsigned)
  const signature = base64url(signer.sign(privateKey))
  const assertion = `${unsigned}.${signature}`

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  })

  if (!response.ok) return null

  const data = await response.json()
  return data.access_token as string
}

function getWeekday(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number)
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay()
}

function manilaIso(dateStr: string, hour: number, minute: number) {
  const hh = String(hour).padStart(2, "0")
  const mm = String(minute).padStart(2, "0")
  return `${dateStr}T${hh}:${mm}:00${TIMEZONE_OFFSET}`
}

async function checkAvailability(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return { error: "Date must be in YYYY-MM-DD format." }
  }

  const weekday = getWeekday(date)
  if (weekday === 0 || weekday === 6) {
    return { available: [], note: "That date is a weekend. April only takes calls on weekdays." }
  }

  const accessToken = await getGoogleAccessToken()
  const calendarId = process.env.GOOGLE_CALENDAR_ID

  if (!accessToken || !calendarId) {
    return { error: "Scheduling is not configured yet. Direct the visitor to email April directly." }
  }

  const response = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      timeMin: manilaIso(date, 0, 0),
      timeMax: manilaIso(date, 23, 59),
      timeZone: TIMEZONE,
      items: [{ id: calendarId }],
    }),
  })

  if (!response.ok) {
    return { error: "Could not reach the calendar right now." }
  }

  const data = await response.json()
  const busy: { start: string; end: string }[] = data?.calendars?.[calendarId]?.busy ?? []

  const available: string[] = []
  for (let hour = BUSINESS_START_HOUR; hour < BUSINESS_END_HOUR; hour++) {
    for (const minute of [0, 30]) {
      const slotStart = new Date(manilaIso(date, hour, minute))
      const slotEnd = new Date(slotStart.getTime() + MEETING_MINUTES * 60 * 1000)

      const overlaps = busy.some((b) => slotStart < new Date(b.end) && slotEnd > new Date(b.start))
      if (!overlaps) {
        available.push(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`)
      }
    }
  }

  return { date, available }
}

async function sendConfirmationEmail(args: { name: string; email: string; date: string; time: string; topic: string }) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return

  const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>"
  const toEmail = process.env.CONTACT_TO_EMAIL || "aprilsuarnaba5@gmail.com"

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: args.email,
      subject: `Call booked: ${args.name} on ${args.date} at ${args.time}`,
      text: [
        `A call was booked through the portfolio chatbot.`,
        "",
        `Name: ${args.name}`,
        `Email: ${args.email}`,
        `Date: ${args.date}`,
        `Time: ${args.time} (Asia/Manila)`,
        `Topic: ${args.topic}`,
      ].join("\n"),
    }),
  }).catch((error) => {
    console.error("Resend confirmation email failed:", error)
    return null
  })

  if (response && !response.ok) {
    console.error("Resend confirmation email rejected:", response.status, await response.text())
  }
}

async function bookAppointment(args: { date: string; time: string; name: string; email: string; topic: string }) {
  const { date, time, name, email, topic } = args

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) {
    return { error: "Invalid date or time format." }
  }

  const accessToken = await getGoogleAccessToken()
  const calendarId = process.env.GOOGLE_CALENDAR_ID

  if (!accessToken || !calendarId) {
    return { error: "Scheduling is not configured yet. Direct the visitor to email April directly." }
  }

  const [hour, minute] = time.split(":").map(Number)
  const startIso = manilaIso(date, hour, minute)
  const endIso = new Date(new Date(startIso).getTime() + MEETING_MINUTES * 60 * 1000).toISOString()

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        summary: `Call with ${name}`,
        description: `Booked via portfolio chatbot.\nTopic: ${topic}\nVisitor email: ${email}`,
        start: { dateTime: startIso, timeZone: TIMEZONE },
        end: { dateTime: endIso, timeZone: TIMEZONE },
      }),
    },
  )

  if (!response.ok) {
    return { error: "Could not create the calendar event." }
  }

  await sendConfirmationEmail({ name, email, date, time, topic })

  return { confirmed: true, date, time, timezone: TIMEZONE }
}

async function runTool(name: string, args: Record<string, unknown>) {
  if (name === "check_availability") {
    const parsed = checkAvailabilityArgsSchema.safeParse(args)
    if (!parsed.success) return { error: "Invalid arguments for check_availability." }
    return checkAvailability(parsed.data.date)
  }

  if (name === "book_appointment") {
    const parsed = bookAppointmentArgsSchema.safeParse(args)
    if (!parsed.success) return { error: "Invalid or missing booking details. Ask the visitor for a valid name, email, and topic." }
    return bookAppointment(parsed.data)
  }

  return { error: "Unknown tool." }
}

async function callGroq(apiKey: string, messages: unknown[]) {
  return fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages,
      tools,
      temperature: 0.5,
      max_tokens: 300,
    }),
  })
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many messages. Please wait a moment and try again." }, { status: 429 })
  }

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

  const conversation: unknown[] = [{ role: "system", content: buildSystemPrompt() }, ...parsed.data.messages]

  for (let iteration = 0; iteration < 4; iteration++) {
    const response = await callGroq(apiKey, conversation)

    if (!response.ok) {
      return NextResponse.json({ error: "The chatbot could not respond right now." }, { status: 502 })
    }

    const data = await response.json()
    const message = data?.choices?.[0]?.message

    if (!message) {
      return NextResponse.json({ error: "The chatbot could not respond right now." }, { status: 502 })
    }

    if (!message.tool_calls?.length) {
      if (!message.content) {
        return NextResponse.json({ error: "The chatbot could not respond right now." }, { status: 502 })
      }
      return NextResponse.json({ reply: message.content })
    }

    conversation.push(message)

    for (const toolCall of message.tool_calls) {
      const args = JSON.parse(toolCall.function.arguments || "{}")
      const result = await runTool(toolCall.function.name, args)
      conversation.push({
        role: "tool",
        tool_call_id: toolCall.id,
        content: JSON.stringify(result),
      })
    }
  }

  return NextResponse.json({ error: "The chatbot could not respond right now." }, { status: 502 })
}

# April Suarnaba

Personal portfolio site for April Suarnaba, an AI engineer. It showcases experience, projects, a contact form, and an AI chatbot that can answer visitor questions and book a call directly on April's calendar, built as a modern, animated, single-page-style Next.js site.

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) (via shadcn/ui-style components)
- [Framer Motion](https://www.framer.com/motion/) for animation
- [Resend](https://resend.com/) for transactional email on the contact form and chatbot booking confirmations
- [Groq](https://groq.com/) (Llama 3.3 70B) with tool/function calling for the portfolio chatbot
- [Google Calendar API](https://developers.google.com/calendar) (service account auth) for the chatbot's appointment booking

## Features

- **Chatbot** (`components/chatbot.tsx`, `app/api/chat/route.ts`) — floating assistant that answers visitor questions about April's background, education, experience, skills, and projects.
- **Appointment booking** — the chatbot can check April's real Google Calendar availability and book a 30-minute call (weekdays, 9am-6pm Asia/Manila) via Groq tool calling, then emails a confirmation through Resend. Falls back to "email April directly" if Google Calendar isn't configured.
- **Contact form** (`app/work-with-me`) — sends inquiries via Resend.

## Local Setup

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

Other useful scripts:

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # lint the project
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `RESEND_API_KEY` | Yes | none | Resend API key. Without it, the contact form returns a 503 and email sending is disabled. |
| `CONTACT_FROM_EMAIL` | No | `Portfolio Contact <onboarding@resend.dev>` | The "from" address used for contact form and booking confirmation emails. |
| `CONTACT_TO_EMAIL` | No | `aprilsuarnaba5@gmail.com` | The inbox that receives contact form submissions and booking confirmations. |
| `GROQ_API_KEY` | Yes | none | Groq API key powering the chatbot. Without it, `/api/chat` returns a 503. |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | No | none | Service account email (from a Google Cloud service account JSON key) used for the chatbot's calendar booking. |
| `GOOGLE_PRIVATE_KEY` | No | none | The matching `private_key` from the same JSON key, including the `-----BEGIN/END PRIVATE KEY-----` lines. |
| `GOOGLE_CALENDAR_ID` | No | none | The calendar to check/book against (usually April's Gmail address). Must be shared with the service account email with "Make changes to events" permission. |

The three `GOOGLE_*` variables are optional as a set — without them, the chatbot still answers questions but tells visitors to email April directly instead of booking.

## Deployment

The site is built to deploy on [Vercel](https://vercel.com/) with zero extra configuration beyond setting the environment variables above in the project settings.

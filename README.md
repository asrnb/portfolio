# April Suarnaba Portfolio

Personal portfolio site for April Suarnaba, an AI engineer. It showcases experience, projects, and a contact form, built as a modern, animated, single-page-style Next.js site.

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) (via shadcn/ui-style components)
- [Framer Motion](https://www.framer.com/motion/) for animation
- [Resend](https://resend.com/) for transactional email on the contact form

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

The contact form (`app/api/contact/route.ts`) sends email via Resend. Copy `.env.example` to `.env.local` and fill in:

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `RESEND_API_KEY` | Yes | none | Resend API key. Without it, the contact form returns a 503 and email sending is disabled. |
| `CONTACT_FROM_EMAIL` | No | `Portfolio Contact <onboarding@resend.dev>` | The "from" address used when sending contact form emails. |
| `CONTACT_TO_EMAIL` | No | `aprilsuarnaba5@gmail.com` | The inbox that receives contact form submissions. |

## Deployment

The site is built to deploy on [Vercel](https://vercel.com/) with zero extra configuration beyond setting the environment variables above in the project settings.

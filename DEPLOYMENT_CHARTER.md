# Portfolio Vercel Deployment Charter

Spun off from `CLEANUP_DEPLOYMENT_CHARTER.md` now that the cleanup/redesign work is done. This charter covers what's left to get the live site on Vercel with a working contact form.

## Mission

Deploy the `asrnb/portfolio` repo to Vercel on the free tier, with the "Work with me" contact form actually delivering email via Resend.

## Current State

- Git repo root **is** the Next.js app root (no nested-folder root override needed in Vercel).
- Single lockfile (`package-lock.json`) — no package manager ambiguity.
- Build script: `next build`. No `vercel.json` exists; defaults are sufficient.
- `app/api/contact/route.ts` posts to Resend and returns a 503 with a clear message if `RESEND_API_KEY` is unset — this is the only hard blocker for a fully working contact form.
- `public/sample.pdf` is a leftover unused file from the original template; safe to delete whenever, not a deploy blocker.

## Why Vercel (not another free host)

Next.js App Router + serverless API routes (`/api/contact`, `/api/download`) need a host that runs server functions, not just static files. Vercel is built by the Next.js team, auto-detects this repo with zero config, and its free **Hobby** tier covers a personal portfolio's traffic, custom domain, HTTPS, and serverless functions at no cost. Netlify/Cloudflare Pages can run Next.js too but need more manual adapter config for this app's API routes — Vercel is the right default here.

## Work Phases

### Phase 1: Resend Setup (your action — needs your account/login)

1. Sign up at resend.com and verify your email.
2. Grab an API key from the Resend dashboard (Hobby/free plan supports this).
3. Decide the "from" address:
   - Quick start: leave `CONTACT_FROM_EMAIL` unset — code defaults to `Portfolio Contact <onboarding@resend.dev>`, which works without domain verification but looks less polished to recipients.
   - Polished: verify your own domain in Resend, then set `CONTACT_FROM_EMAIL` to an address on it (e.g. `April <contact@aprilsuarnaba.com>`).
4. `CONTACT_TO_EMAIL` is optional — defaults to `aprilsuarnaba5@gmail.com` already.

Acceptance: you have a `RESEND_API_KEY` value ready to paste into Vercel.

### Phase 2: Vercel Project Setup (your action — needs your login)

1. Go to vercel.com, sign in with GitHub, "Add New Project," import `asrnb/portfolio`.
2. Framework preset should auto-detect as Next.js — leave build/install commands default.
3. Before first deploy, add Environment Variables (Project Settings → Environment Variables, or the import screen):
   - `RESEND_API_KEY` = (from Phase 1)
   - `CONTACT_FROM_EMAIL` = (optional, from Phase 1)
   - `CONTACT_TO_EMAIL` = (optional)
4. Deploy.

Acceptance: Vercel build succeeds; you get a `*.vercel.app` production URL.

### Phase 3: Production Smoke Test (can do together)

- [ ] Homepage loads, hero photo and tagline render.
- [ ] Nav links (Home, About, Projects, Work with me) all resolve.
- [ ] Resume download button serves the correct PDF.
- [ ] Submit the "Work with me" form with real-ish test data → confirm the email arrives at the inbox set in `CONTACT_TO_EMAIL`.
- [ ] Check mobile width (DevTools or real phone) for the hero, about gallery, and skills marquee.
- [ ] Toggle through nav on a slow connection / check for layout shift on image-heavy `/about`.

### Phase 4: Optional polish (not deploy blockers)

- Delete unused `public/sample.pdf` and `portfolio-website.zip`.
- Point a custom domain at the Vercel project if you own one (`aprilsuarnaba.com` is already set as `metadataBase` in `app/layout.tsx`, so DNS + Vercel domain binding would just need to match).

## Decisions Needed From You

- Use the default `onboarding@resend.dev` sender for now, or verify a custom domain in Resend first?
- Do you own `aprilsuarnaba.com` already (it's referenced in metadata) or should that be swapped to the `.vercel.app` URL until a domain is bought?

## What I Can Help With Once You Have Credentials

- Reviewing your Vercel build logs if something fails.
- Adjusting `app/api/contact/route.ts` if you want a different email provider or template.
- Wiring up a custom domain in `next.config.mjs`/metadata once you've bound it in Vercel.

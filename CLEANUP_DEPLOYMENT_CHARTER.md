# Portfolio Cleanup and Vercel Deployment Charter

## Mission

Clean, verify, and deploy April Suarnaba's portfolio website to Vercel with production-ready content, stable navigation, healthy build checks, and a polished first impression.

Primary content source: `April Suarnaba_resume.pdf` in the project root.

## Definition of Done

The mission is complete when:

- The app builds successfully with `npm.cmd run build`.
- TypeScript and lint checks are either passing or intentionally configured with clear rationale.
- All visible homepage links point to rendered sections or valid external destinations.
- Placeholder content, wrong profile links, lorem ipsum, and broken/demo-only URLs are removed or replaced.
- Visible encoding artifacts are fixed.
- Resume download works with the intended PDF and filename.
- Vercel deployment succeeds and the production URL is smoke-tested on desktop and mobile widths.
- The cleaned project is published to GitHub so future work can happen from version control.
- The final site presents April's actual profile, skills, projects, contact details, and resume without unfinished debug UI.

## Current Baseline

The real app lives in the nested `portfolio/` directory. It is a Next.js 15, React 19, TypeScript, Tailwind, shadcn-style portfolio site.

Cleanup progress as of this pass:

- Production build passes with linting and type validation enabled.
- Resume PDF is copied to `public/april-suarnaba-resume.pdf`.
- Homepage renders real sections for Skills, Experience, Projects, Education, and Contact.
- Navigation links now match rendered sections.
- Major visible placeholder project content has been replaced with resume-based content.
- The production diagnostic overlay has been removed from the layout.
- Unused stale template components with old placeholder profile content have been removed.

Known issues from the first audit:

- `next/font/google` blocks production build in restricted/offline environments because it fetches Inter from Google Fonts.
- `app/layout.tsx` contains a duplicate `import './globals.css'` after the component export.
- `next.config.mjs` suppresses ESLint and TypeScript build failures.
- Header/footer/floating nav link to sections that are not currently rendered, especially `#skills`, `#contact`, and `#publications`.
- `components/education.tsx` currently returns `null`.
- `components/3d-skills-globe.tsx` is entirely commented out, but `redesigned-skills.tsx` dynamically imports it.
- Project data contains lorem ipsum, placeholder images, demo URLs, and incorrect GitHub links.
- Some visible text has mojibake/encoding artifacts such as `Iâ€™m`, `Â©`, and `âœ“`.
- Footer email social link is missing `mailto:`.
- Diagnostic/debug UI is mounted in production layout.
- Resume source has been added as `April Suarnaba_resume.pdf` and should replace the old `public/sample.pdf` download flow.

## Work Phases

### Phase 1: Stabilize the Build

Goal: make the app buildable and remove hidden failure masks.

Tasks:

- Remove duplicate import in `app/layout.tsx`.
- Replace remote Google font dependency with a local-safe option or system font fallback.
- Run `npm.cmd run build` and capture real errors.
- Run TypeScript checking after clearing any stale `.next` type references if needed.
- Decide whether to re-enable TypeScript and ESLint build failures in `next.config.mjs`.
- Add or configure ESLint non-interactively if we want lint enforcement before deployment.

Acceptance criteria:

- `npm.cmd run build` completes locally.
- Any remaining ignored checks are documented and intentional.

### Phase 2: Fix Navigation and Page Composition

Goal: every visible navigation item lands somewhere real.

Tasks:

- Decide which homepage sections are part of v1 deployment.
- Either render `Skills`, `Contact`, and other linked sections or remove their nav/footer links.
- Fix `FloatingNav` so it renders useful controls or remove it from the page.
- Implement or remove the empty Education section.
- Confirm section ids match nav hrefs.

Acceptance criteria:

- No nav item triggers a missing-section toast.
- Footer quick links scroll to real sections.
- The homepage has a coherent flow from hero to footer.

### Phase 3: Replace Placeholder Content

Goal: make the portfolio authentic and deployable.

Tasks:

- Replace lorem ipsum project entries.
- Replace incorrect GitHub profile links.
- Replace `demoUrl: "#"` with real URLs or hide live-demo buttons when no demo exists.
- Replace placeholder project images where possible.
- Update About, Skills, Education, Resume Preview, and Footer copy to match April.
- Remove unused imports caused by disabled or deleted content.

Acceptance criteria:

- No visible lorem ipsum.
- No visible placeholder project claims unless intentionally marked as coming soon.
- External links point to April's real destinations.

### Phase 4: Polish UX and Production Surface

Goal: make the deployed site feel finished.

Tasks:

- Fix encoding artifacts in visible copy.
- Fix footer email link with `mailto:`.
- Decide whether newsletter subscription should be removed, disabled, or wired to a real endpoint.
- Remove or gate `ClientDiagnosticWrapper` so debug UI is not shown in production.
- Review mobile layout for header, hero, project cards, footer, and dialogs.
- Check accessibility basics: alt text, aria labels, button/link intent, keyboard reachable dialogs.

Acceptance criteria:

- No debug overlay appears on the public production site.
- Primary workflows work: view projects, open links, download resume, contact April.
- Desktop and mobile screenshots look presentable.

### Phase 5: Vercel Deployment

Goal: deploy cleanly and verify production behavior.

Tasks:

- Confirm Vercel project root should be `portfolio/`, not the outer folder.
- Confirm package manager strategy. Prefer one lockfile; currently both `package-lock.json` and `pnpm-lock.yaml` exist.
- Configure Vercel build command: `npm run build`.
- Configure install command only if needed.
- Deploy to Vercel.
- Smoke-test production URL.

Acceptance criteria:

- Vercel deployment succeeds.
- Production URL loads without console-breaking runtime errors.
- Resume, nav, theme switching, external links, and key sections work in production.

### Phase 6: GitHub Publishing

Goal: put the cleaned project under GitHub version control so iteration and deployment are smoother.

Tasks:

- Initialize a Git repository if one does not exist.
- Commit the cleaned project without committing generated folders such as `.next` or `node_modules`.
- Create or select a GitHub repository for the portfolio.
- Push the working branch to GitHub.
- Confirm Vercel is connected to the GitHub repository, or connect it after the first push.

Acceptance criteria:

- GitHub repository contains the cleaned app source.
- Future edits can be made through normal branch, commit, push, and deploy workflow.
- Vercel deployment is connected to the GitHub repo where possible.

## Verification Checklist

Before deployment:

- `npm.cmd run build`
- TypeScript check, if separate from build
- Lint check, if configured
- Manual local smoke test

After deployment:

- Open production URL.
- Check desktop viewport.
- Check mobile viewport.
- Click header nav links.
- Click footer quick links.
- Click GitHub, LinkedIn, and email links.
- Download resume.
- Open project details dialog.
- Toggle theme and color theme.
- Confirm GitHub repository opens and contains the current source.

## Decisions Needed

- Which sections should ship in v1: Skills, Experience, Education, Contact, Publications, Blog, Testimonials?
- Should the newsletter form be removed, kept as a mock, or connected to a service?
- Should the 3D skills globe be restored, replaced with chart-only skills, or removed?
- Which project entries and images are real enough for deployment?
- What exact resume PDF should ship as `public/sample.pdf` or under a better filename?
- What GitHub repository name should be used if creating a new repo?

## Suggested First Sprint

1. Fix build blockers and obvious source defects.
2. Align nav with rendered sections.
3. Remove production debug UI.
4. Replace broken links and placeholder project content.
5. Run build and local smoke test.
6. Deploy to Vercel with root set to `portfolio/`.
7. Publish the cleaned source to GitHub and connect it to Vercel.

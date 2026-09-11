# HighTech company website

A design-led software-studio site built with React, TypeScript and Vite. The seven-page structure is retained: Home, About, Services, Industries, Projects, Careers and Contact. Real browser routes support direct links, refresh, back/forward navigation and an in-app not-found page.

## Local development

Use Node.js 22 (`nvm use`).

```sh
npm ci
npm run dev
```

## Quality checks

```sh
npm test
npm run typecheck
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

Playwright serves the **production build**, checks every route on desktop and narrow mobile widths, runs axe accessibility checks, tests navigation, and verifies that the star canvas moves and actually stops when paused. Reports are in `playwright-report/` (gitignored). To test a deployed site: `PLAYWRIGHT_BASE_URL=https://your-site.example npm run test:e2e`.

## Structure

```text
public/                 Local avatars, favicon, sharing image, sitemap
src/
  components/
    layout/             Header, footer, brand
    motion/             Canvas star cloud, reveal, motion control
    shared/             Page masthead and contact CTA
    team/               JSON-driven team presentation
    contact/            Contact flow components
    ui/                 Existing shadcn primitives (retained)
  data/                 Site settings and editable content
  hooks/                Reusable hooks
  lib/                  Validation and pure helpers
  pages/                Seven primary pages
  styles/               Page-specific styles
  test/                 Component and behavior tests
  App.tsx               Routes and page metadata
  App.css               Shared layout and motion styles
  index.css             Fonts, tokens, base styles
  main.tsx              BrowserRouter entry point
e2e/                    Production-browser acceptance tests
docs/                   Content editing notes
```

## Content editing

- **Team:** edit `src/data/team.json`. Six sample members, including Founder & Team Lead, Full Stack Engineer, and QA Engineer, are deliberately marked as examples. Replace names, roles, biographies, skills and avatar paths with approved real information, then update the sample flags. See `docs/team-content.md`.
- **Contact details / calendar / GitHub:** edit `src/data/site.ts`. Existing footer contact details were preserved and centralized; check that these are your preferred public details.
- **Project lab:** concept explorations are explicitly not client case studies. Do not remove disclosures until you replace them with verified work and have permission to publish. See `docs/projects-content.md`.
- **Careers:** invitations to connect, not invented vacancies or employment benefits.
- **Design:** composition and component conventions are in `DESIGN.md`. Fonts are self-hosted through Fontsource; no external font service or image host is required.

## Contact workflow

There is no mail backend or email-provider credential in this repository. The form prepares a validated email draft; visitors use **Open email app** and send it in their mail client. The copy fallback makes the briefing usable without a configured mail app. The site never displays a fake “sent” confirmation. No message contents are saved to browser storage. Calendar and direct email remain available. See `docs/contact.md`.

## Motion and accessibility

- Perspective-projected, slowly shifting star cloud replaces the old circular hero animation.
- Canvas is decorative, uses a capped pixel ratio and frame rate, and suspends its loop offscreen or in background tabs.
- IntersectionObserver reveals, staggered entrances, hover feedback, and CSS 3D layered artwork.
- The header **Motion** button pauses decorative animation and remembers only this preference locally.
- System `prefers-reduced-motion` is always respected. Content remains readable while animation is disabled. Native scrolling is never intercepted.
- Visible keyboard focus, skip link, accessible mobile menu, labeled forms and native disclosure controls.

## Deployment

The existing Vercel integration builds the `master` branch. `vercel.json` defines the Vite build/output, browser-route rewrites and response security headers. No Vercel secret is required for Git-triggered deployment.

```sh
npm run build
# After tests and review:
git add <changed-files>
git commit -m "feat: update studio website"
git push origin master
```

After publishing, check the **Vercel status on the exact commit** and the live URL. A successful push is not proof of a successful deployment.

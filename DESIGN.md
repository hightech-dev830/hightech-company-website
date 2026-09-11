# HighTech — independent software studio

Primary surface: Decide / Learn. Keep all seven pages: Home, About, Services, Industries, Projects, Careers, Contact.

## Visual direction

Charcoal #111310, warm paper #f4f4ed, lime #d5ff70. Muted ink #a5aca0 on dark; #565e50 on paper. Manrope variable (self-hosted), IBM Plex Mono for labels. Thin rules, square/editorial panels, restrained radius 4–12px, generous spacing. Strong asymmetry. No blue-purple gradients, icon-topper card grids, client logos, fake metrics or testimonials. Hero is a right-weighted canvas star cloud with 3D perspective and atmospheric fading; no orbiting circles.

## Shared component contracts

Parent implements these; parallel contributors may import but must not edit them:

- `@/components/motion/Reveal`: default export. Props children, className?, delay? (milliseconds). Renders div with viewport reveal, reduced-motion support.
- `@/components/shared/PageHero`: default export. Props eyebrow: string, title: ReactNode, description: string, children?: ReactNode. Produces section with h1 (NOT main).
- `@/components/shared/ContactCTA`: default export. No required props; optional title, description. Renders call-to-action section with /contact link.
- `@/data/site`: named `site` export. Fields name, email (contact@hightech.fit), phone (+1 (540) 952-9270), phoneHref, address, calendly (existing link), github (actual account).

Pages default export, no required props. App owns main landmark; pages render fragments. Use real React Router Link hrefs (react-router-dom), not onNavigate callbacks. Internal paths /, /about, /services, /industries, /projects, /careers, /contact.

## Shared CSS classes

Parent owns src/index.css and src/App.css. Contributors create and import their own src/styles/{scope}.css for specialized layout.
Available classes: shell (max-width 1280px, fluid gutter), section (vertical padding), paper-section (light surface), section-label (mono uppercase), section-heading (large h2), section-intro (muted body), section-heading-row (flex heading + secondary), button button-primary (lime), button button-outline, text-link (underlined arrow link), tags (wrap), tag, rule-list, split-layout (2 cols collapse), editorial-card, muted, eyebrow, notice.
Base h2/h3 and body styles globally. On paper text is dark. Use var(--ink), var(--muted), var(--line), var(--surface), var(--accent) inheriting per surface. All decorative loops must respect reduced motion and global html[data-motion="paused"]. 44px interactive minimums. Focus-visible states. Avoid horizontal overflow at 320px.

## Content integrity

No verified project portfolio supplied. Replace invented client case studies with clearly marked concept explorations, no metrics or fake clients. No actual job openings supplied: talent-network invitation, NOT fabricated vacancies/benefits. Six team profiles, explicit sample badges and optional real social links omitted when blank. Preserve existing footer contact data over dummy contact-page data. Contact form must NOT fake sent status; prepare a draft and visibly explain email app still requires Send. Do not install backend providers or add secrets.

## Testing and ownership

Vitest + Testing Library installed. Each contributor must write a minimal failing test, run to confirm missing behavior, implement, run green. Tests go alongside own components or src/test/<scope>.test.tsx. Run `npx vitest run path/to/test` (root config installed). Don't edit package/config/shared files or commit/push. Parent handles integration, build, browser QA, independent review, commit/push.

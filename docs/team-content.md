# Editing the six-person team

The homepage and About page share **`src/data/team.json`**. Exactly six profiles are required, including a `Founder & Team Lead`, a `Full Stack Engineer`, and a `QA Engineer`. Array order determines the display rhythm: one, one, two, two.

## Replace samples with your actual team

1. Edit each member’s `name`, `role`, `bio`, and `skills` in the JSON. Use approved, truthful details.
2. Add their approved portrait to `public/avatars/`, and set `avatar` to `/avatars/their-name.webp` (SVG, WebP, AVIF, PNG, JPG and JPEG are supported). Use lowercase, hyphenated filenames.
3. Once a profile’s name, biography and image are real and approved, set **`isSample: false`**. Its sample badge disappears automatically; when all six are real, the section-wide sample notice disappears too. Leave fictional profiles marked `true`.
4. Optionally add approved social links, or omit `socials` completely. Blank URLs render nothing. Nonblank URLs must be credential-free `https://` URLs.
5. Run `npm test`, `npm run typecheck`, and `npm run build`; commit and push to redeploy.

```json
{
  "id": "founder",
  "name": "Your approved public name",
  "role": "Founder & Team Lead",
  "bio": "A short, factual description of your focus and responsibilities.",
  "skills": ["Team leadership", "Solution architecture"],
  "avatar": "/avatars/founder.webp",
  "isSample": false,
  "socials": [{ "label": "GitHub", "url": "" }]
}
```

Keep six objects in the top-level array. IDs must be unique lowercase hyphenated identifiers. Do not add invented employers, awards, education, years of experience, clients or performance metrics.

## Validation

`src/lib/team.ts` validates JSON with Zod when imported. Names/roles are nonblank strings up to 80 characters; bios up to 500; skills 1–6 strings up to 52 characters. Unknown fields, unsafe social URLs and parent-directory image paths are rejected. There must be exactly six members and at least one role each spelled `Founder & Team Lead`, `Full Stack Engineer`, and `QA Engineer`.

Local image paths must point to an existing file in `public/avatars/`. Changing JSON requires a build/deployment; this is not a remote CMS. Tests validate the content boundary, so run them before publishing. A Vite build alone does not execute runtime validation.

## Components

```tsx
import TeamSection from '@/components/team/TeamSection';
<TeamSection />         // Full layout: one, one, two, two
<TeamSection compact /> // Homepage composition with the same rhythm
```

Both variants include role, biography, skills, avatar, optional social links, staggered reveal motion, conditional sample labeling, and accessible unique IDs.

import { z } from 'zod';
import teamData from '@/data/team.json';

/** Only explicit, credential-free HTTPS URLs may become social links. */
export function isHttpsUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      value.startsWith('https://') &&
      value === value.trim() &&
      url.protocol === 'https:' &&
      Boolean(url.hostname) &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}

const contentText = (max: number) =>
  z
    .string()
    .min(1)
    .max(max)
    .refine((value) => value.trim().length > 0, 'Text cannot be blank.');

const socialSchema = z
  .object({
    label: contentText(32),
    url: z.union([
      z.literal(''),
      z.string().url().refine(isHttpsUrl, 'Social URLs must use HTTPS without credentials.'),
    ]),
  })
  .strict();

export const teamMemberSchema = z
  .object({
    id: z
      .string()
      .min(1)
      .max(64)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a lowercase hyphenated identifier.'),
    name: contentText(80),
    role: contentText(80),
    bio: contentText(500),
    skills: z.array(contentText(52)).min(1).max(6),
    avatar: z
      .string()
      .regex(
        /^\/avatars\/[a-z0-9]+(?:-[a-z0-9]+)*\.(?:svg|webp|avif|png|jpg|jpeg)$/,
        'Use a local image path inside /avatars/.',
      ),
    isSample: z.boolean(),
    socials: z.array(socialSchema).max(3).optional(),
  })
  .strict();

export const teamSchema = z
  .array(teamMemberSchema)
  .length(6, 'The team must contain exactly six members.')
  .refine(
    (members) => new Set(members.map((member) => member.id)).size === members.length,
    'Member identifiers must be unique.',
  )
  .refine(
    (members) => members.some((member) => member.role === 'Founder & Team Lead'),
    'Include a Founder & Team Lead.',
  )
  .refine(
    (members) => members.some((member) => member.role === 'Full Stack Engineer'),
    'Include a Full Stack Engineer.',
  )
  .refine(
    (members) => members.some((member) => member.role === 'QA Engineer'),
    'Include a QA Engineer.',
  );

export type TeamMember = z.infer<typeof teamMemberSchema>;

// Validate the JSON at the content boundary. Invalid edits fail visibly, never silently.
export const teamMembers: TeamMember[] = teamSchema.parse(teamData);

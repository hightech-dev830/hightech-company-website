import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen, within } from '@testing-library/react';
import TeamSection from '@/components/team/TeamSection';
import team from '@/data/team.json';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import AboutPage from '@/pages/AboutPage';
import { teamMembers, teamSchema } from '@/lib/team';
import TeamCard from '@/components/team/TeamCard';

it('renders only populated HTTPS social links with descriptive accessible names', () => {
  render(
    <TeamCard
      member={{
        ...teamMembers[0],
        socials: [
          { label: 'Website', url: 'https://example.com/rowan' },
          { label: 'LinkedIn', url: '' },
          { label: 'Unsafe', url: 'javascript:alert(1)' },
          { label: 'Insecure', url: 'http://example.com/rowan' },
        ],
      }}
    />,
  );
  expect(screen.queryAllByRole('link')).toHaveLength(1);
  const link = screen.getByRole('link', {
    name: `${teamMembers[0].name} on Website (opens in a new tab)`,
  });
  expect(link).toHaveAttribute('href', 'https://example.com/rowan');
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', 'noopener noreferrer');
});

const invalidMemberEdits: [string, Record<string, unknown>][] = [
  ['blank name', { name: '   ' }],
  ['missing role', { role: undefined }],
  ['blank biography', { bio: '' }],
  ['unsafe identifier', { id: '../person' }],
  ['empty skills', { skills: [] }],
  ['blank skill', { skills: [' '] }],
  ['remote avatar', { avatar: 'https://example.com/person.jpg' }],
  ['traversal avatar', { avatar: '/avatars/../person.svg' }],
  ['missing sample flag', { isSample: undefined }],
  ['unknown field', { employer: 'Unverified company' }],
  ['insecure social link', { socials: [{ label: 'Website', url: 'http://example.com' }] }],
  ['executable social link', { socials: [{ label: 'Website', url: 'javascript:alert(1)' }] }],
  [
    'credential-bearing social link',
    { socials: [{ label: 'Website', url: 'https://user:password@example.com' }] },
  ],
];

describe('Team JSON validation', () => {
  it.each(invalidMemberEdits)('rejects %s', (_name, edit) => {
    expect(teamSchema.safeParse([{ ...team[0], ...edit }, ...team.slice(1)]).success).toBe(false);
  });

  it('rejects duplicate member identifiers', () => {
    expect(
      teamSchema.safeParse([team[0], { ...team[1], id: team[0].id }, ...team.slice(2)]).success,
    ).toBe(false);
  });

  it('requires a Founder & Team Lead in the six-person team', () => {
    expect(teamSchema.safeParse([{ ...team[0], role: 'Engineer' }, ...team.slice(1)]).success).toBe(
      false,
    );
  });

  it('requires Full Stack and QA roles', () => {
    expect(
      teamSchema.safeParse([{ ...team[1], role: 'Engineer' }, team[0], ...team.slice(2)]).success,
    ).toBe(false);
    expect(
      teamSchema.safeParse([...team.slice(0, 5), { ...team[5], role: 'Engineer' }]).success,
    ).toBe(false);
  });

  it('accepts the configured six profiles', () => {
    expect(teamSchema.safeParse(team).success).toBe(true);
    expect(team.every((member) => typeof member.isSample === 'boolean')).toBe(true);
  });
});

describe('About page', () => {
  it('offers an editorial introduction with real service, careers, and contact routes', () => {
    const { container } = render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );
    expect(
      screen.queryAllByRole('heading', { level: 1, name: /Small team\. Serious craft\./i }),
    ).toHaveLength(1);
    expect(screen.getByRole('heading', { name: 'Software should earn its place.' })).toBeVisible();
    expect(
      screen.getByRole('heading', { name: /Less ceremony\. More shared understanding\./i }),
    ).toBeVisible();
    expect(screen.getByRole('link', { name: /Explore our capabilities/i })).toHaveAttribute(
      'href',
      '/services',
    );
    expect(screen.getByRole('link', { name: /Connect with the team/i })).toHaveAttribute(
      'href',
      '/careers',
    );
    expect(screen.getByRole('link', { name: /Start a conversation/i })).toHaveAttribute(
      'href',
      '/contact',
    );
    expect(container.querySelector('main')).toBeNull();
    expect(
      screen.queryByText(/Company Timeline|120\+|500\+|Fortune 500|Former Google|MIT|Wharton/),
    ).not.toBeInTheDocument();
  });
});

describe('About team', () => {
  it('keeps accessible heading references unique when reused on the same page', () => {
    const { container } = render(
      <MemoryRouter>
        <TeamSection />
        <TeamSection compact />
      </MemoryRouter>,
    );
    const ids = Array.from(container.querySelectorAll('[id]'), (element) => element.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  afterEach(() => {
    vi.doUnmock('@/data/team.json');
    vi.resetModules();
  });

  it('rejects a JSON edit that removes one of the required six members', async () => {
    vi.resetModules();
    vi.doMock('@/data/team.json', () => ({ default: team.slice(0, 4) }));
    await expect(import('@/components/team/TeamSection')).rejects.toThrow(/exactly six/i);
  });

  it.each([false, true])('renders all six complete JSON profiles (compact=%s)', (compact) => {
    render(
      <MemoryRouter>
        <TeamSection compact={compact} />
      </MemoryRouter>,
    );
    expect(screen.getAllByRole('article')).toHaveLength(6);
    expect(screen.getByText('Founder & Team Lead')).toBeVisible();
    expect(screen.getByText('Full Stack Engineer')).toBeVisible();
    expect(screen.getByText('QA Engineer')).toBeVisible();
    for (const member of team) {
      const card = within(screen.getByRole('article', { name: member.name }));
      expect(card.getByText(member.bio)).toBeVisible();
      for (const skill of member.skills) expect(card.getByText(skill)).toBeVisible();
      const avatar = card.getByRole('img', {
        name: member.isSample
          ? `Abstract illustrated avatar for ${member.name} (sample profile)`
          : `${member.name} — ${member.role}`,
      });
      expect(avatar).toHaveAttribute('src', member.avatar);
      expect(avatar).toHaveAttribute('loading', 'lazy');
      expect(member.avatar).toMatch(/^\/avatars\/[a-z0-9-]+\.(svg|webp|avif|png|jpg|jpeg)$/);
      const avatarPath = resolve(process.cwd(), 'public', member.avatar.slice(1));
      expect(existsSync(avatarPath)).toBe(true);
      if (member.avatar.endsWith('.svg'))
        expect(readFileSync(avatarPath, 'utf8')).toContain('<svg');
      expect(card.queryAllByRole('link')).toHaveLength(
        teamMembers.find((item) => item.id === member.id)?.socials?.filter((item) => item.url)
          .length ?? 0,
      );
    }
  });

  it('labels only the configured sample profiles', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );
    expect(screen.queryAllByText('Sample profile')).toHaveLength(
      team.filter((member) => member.isSample).length,
    );
  });

  it('uses a one-one-two-two layout rhythm', () => {
    const { container } = render(
      <MemoryRouter>
        <TeamSection />
      </MemoryRouter>,
    );
    const cards = container.querySelectorAll('.team-grid > .team-card');
    expect(cards).toHaveLength(6);
  });
});

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import HomePage from '@/pages/HomePage';
import team from '@/data/team.json';

describe('studio homepage', () => {
  it('introduces the studio with an accessible project link and starfield', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Good ideas.');
    expect(screen.getByRole('link', { name: /start a project/i })).toHaveAttribute(
      'href',
      '/contact',
    );
    expect(document.querySelector('canvas[data-starfield]')).toHaveAttribute('aria-hidden', 'true');
    expect(document.querySelector('.tech-sphere')).not.toBeInTheDocument();
    expect(document.querySelectorAll('.team-card')).toHaveLength(6);
    expect(screen.queryAllByText('Sample profile')).toHaveLength(
      team.filter((member) => member.isSample).length,
    );
  });
});

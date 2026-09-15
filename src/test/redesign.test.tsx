import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import HomePage from '@/pages/HomePage';
import team from '@/data/team.json';

function renderHome() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );
}

describe('company homepage preview', () => {
  it('connects a clear offer to services, work and a real project inquiry', () => {
    const { container } = renderHome();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Digital products built around your business.',
    );
    expect(screen.getByRole('link', { name: 'Discuss your project' })).toHaveAttribute(
      'href',
      '/contact',
    );
    expect(screen.getByRole('link', { name: 'Explore our work' })).toHaveAttribute(
      'href',
      '/projects',
    );
    const services = screen.getByRole('region', {
      name: 'From the first idea to the next release.',
    });
    expect(within(services).getByRole('link', { name: /Web development/ })).toHaveAttribute(
      'href',
      '/services/web-development',
    );
    expect(within(services).getAllByRole('link')).toHaveLength(6);
    expect(screen.getByRole('heading', { name: 'A clear process. No black box.' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'A few things worth knowing.' })).toBeVisible();
    expect(container.querySelector('canvas[data-starfield]')).toBeNull();
  });

  it('keeps illustrative work and sample profiles clearly labelled', () => {
    const { container } = renderHome();
    const work = screen.getByRole('region', { name: 'A closer look at what could be next.' });
    expect(within(work).getByText(/concept explorations, not client case studies/i)).toBeVisible();
    expect(within(work).getByRole('link', { name: /Explore Fieldnote/ })).toHaveAttribute(
      'href',
      '/projects',
    );
    expect(within(work).getByRole('link', { name: /Explore Shelf/ })).toHaveAttribute(
      'href',
      '/projects',
    );
    expect(container.querySelectorAll('.team-card')).toHaveLength(team.length);
    expect(screen.queryAllByText('Sample profile')).toHaveLength(
      team.filter((member) => member.isSample).length,
    );
    expect(screen.queryByText(/award-winning|1000\+|500\+|trusted by/i)).not.toBeInTheDocument();
  });
});

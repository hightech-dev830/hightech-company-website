import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Header from '@/components/layout/Header';

describe('site navigation', () => {
  it('opens a keyboard-operable services disclosure and returns focus on Escape', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const trigger = screen.getByRole('button', { name: 'Explore services' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const menu = screen.getByRole('region', { name: 'Service navigation' });
    expect(within(menu).getByRole('link', { name: /Web development/ })).toHaveAttribute(
      'href',
      '/services/web-development',
    );
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('region', { name: 'Service navigation' })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('dismisses desktop disclosures on outside click and exposes company destinations', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Header />
        <button>Outside the header</button>
      </MemoryRouter>,
    );
    await user.click(screen.getByRole('button', { name: 'Company pages' }));
    const menu = screen.getByRole('region', { name: 'Company navigation' });
    expect(within(menu).getByRole('link', { name: /Careers/ })).toHaveAttribute('href', '/careers');
    await user.click(screen.getByRole('button', { name: 'Outside the header' }));
    expect(screen.queryByRole('region', { name: 'Company navigation' })).not.toBeInTheDocument();
  });

  it('provides mobile service links and closes the mobile panel after navigation', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    await user.click(screen.getByRole('button', { name: 'Open navigation' }));
    const menu = screen.getByRole('navigation', { name: 'Mobile navigation' });
    await user.click(within(menu).getByText('Services'));
    await user.click(within(menu).getByRole('link', { name: 'Web development' }));
    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument();
  });

  it('provides real page URLs and a persistent motion pause control', async () => {
    localStorage.clear();
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '/services');
    await userEvent.click(screen.getByRole('button', { name: 'Pause animations' }));
    expect(document.documentElement).toHaveAttribute('data-motion', 'paused');
    expect(localStorage.getItem('hightech-motion')).toBe('paused');
    await userEvent.click(screen.getByRole('button', { name: 'Play animations' }));
    expect(document.documentElement).toHaveAttribute('data-motion', 'playing');
  });
});

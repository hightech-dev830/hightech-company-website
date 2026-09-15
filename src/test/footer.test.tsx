import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { expect, it } from 'vitest';
import Footer from '@/components/layout/Footer';
import { site } from '@/data/site';

it('organizes live service, company and contact destinations without placeholder links', () => {
  const { container } = render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  );
  const services = screen.getByRole('navigation', { name: 'Footer services' });
  expect(within(services).getByRole('link', { name: 'Web development' })).toHaveAttribute(
    'href',
    '/services/web-development',
  );
  expect(within(services).getAllByRole('link')).toHaveLength(6);
  const company = screen.getByRole('navigation', { name: 'Footer company' });
  expect(within(company).getByRole('link', { name: 'Careers' })).toHaveAttribute(
    'href',
    '/careers',
  );
  expect(screen.getByRole('link', { name: site.email })).toHaveAttribute(
    'href',
    `mailto:${site.email}`,
  );
  expect(screen.getByText(site.address)).toBeVisible();
  expect(container.querySelector('a[href="#"], a[href="#!"]')).toBeNull();
  expect(screen.queryByText(/offices worldwide|award-winning/i)).not.toBeInTheDocument();
});

import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import WebDevelopmentPage from '@/pages/WebDevelopmentPage';
import projects from '@/data/projects.json';
import userEvent from '@testing-library/user-event';
import { site } from '@/data/site';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/services/web-development']}>
      <WebDevelopmentPage />
    </MemoryRouter>,
  );
}

describe('Web development service detail', () => {
  it('explains the application layers with an explicitly illustrative diagram', () => {
    renderPage();
    const diagram = screen.getByRole('figure', { name: 'Illustrative application structure' });
    for (const layer of ['Interface', 'Application logic', 'Connected systems']) {
      expect(within(diagram).getByText(layer)).toBeInTheDocument();
    }
    expect(
      within(diagram).getByText(/not a live product or client screenshot/i),
    ).toBeInTheDocument();
    expect(within(diagram).getByText(/Permissions, workflows & validation/)).toBeInTheDocument();
  });

  it('offers working inquiry and scope destinations instead of placeholder links', () => {
    renderPage();
    expect(screen.getByRole('link', { name: /Discuss your web project/ })).toHaveAttribute(
      'href',
      '/contact',
    );
    expect(screen.getByRole('link', { name: 'Start a conversation' })).toHaveAttribute(
      'href',
      '/contact',
    );
    expect(
      screen.getByRole('heading', { name: 'What should your application make possible?' }),
    ).toBeInTheDocument();
    const scopeLink = screen.getByRole('link', { name: /Explore the scope/ });
    expect(scopeLink).toHaveAttribute('href', '#web-scope');
    expect(document.getElementById('web-scope')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: site.email })).toHaveAttribute(
      'href',
      `mailto:${site.email}`,
    );
    expect(screen.getByRole('link', { name: /Schedule a conversation/ })).toHaveAttribute(
      'href',
      site.calendly,
    );
    const destinations = [
      '/',
      '/services',
      '/contact',
      '/projects',
      '#web-scope',
      `mailto:${site.email}`,
      site.calendly,
    ];
    for (const link of screen.getAllByRole('link')) {
      expect(destinations).toContain(link.getAttribute('href'));
    }
  });

  it('reveals honest project answers through native FAQ disclosures', async () => {
    const user = userEvent.setup();
    renderPage();
    const faqs = screen.getByRole('region', { name: 'Before we start.' });
    const answers = [
      ['What does a first release include?', /agree the essential user journeys/i],
      [
        'Can you work with our existing systems?',
        /review API access, documentation, and data quality/i,
      ],
      ['How long will it take, and what will it cost?', /estimate follows discovery/i],
      ['Who owns the source code?', /ownership and licensing in the project agreement/i],
      ['How do you approach security and accessibility?', /not a blanket compliance guarantee/i],
      ['What happens after launch?', /support is not automatically included/i],
    ] as const;
    expect(faqs.querySelectorAll('details')).toHaveLength(answers.length);
    for (const [question, answer] of answers) {
      const summary = within(faqs).getByText(question);
      expect(summary.tagName).toBe('SUMMARY');
      const disclosure = summary.closest('details')!;
      const content = within(disclosure).getByText(answer);
      expect(disclosure).not.toHaveAttribute('open');
      expect(content).not.toBeVisible();
      await user.click(summary);
      expect(disclosure).toHaveAttribute('open');
      expect(content).toBeVisible();
      await user.click(summary);
      expect(content).not.toBeVisible();
    }
  });

  it('presents existing web concepts without implying shipped client work', () => {
    renderPage();
    const related = screen.getByRole('region', {
      name: 'Ideas to build on. Not claims to borrow.',
    });
    expect(
      within(related).getByText(/not client case studies or shipped products/),
    ).toBeInTheDocument();
    const webConcepts = projects.filter((project) => project.category === 'Web apps');
    expect(within(related).getAllByRole('article')).toHaveLength(webConcepts.length);
    for (const project of webConcepts) {
      const concept = within(related).getByRole('article', { name: project.title });
      expect(within(concept).getByText('Concept exploration')).toBeInTheDocument();
      expect(within(concept).getByText(project.description)).toBeInTheDocument();
      expect(within(concept).getByText(project.question)).toBeInTheDocument();
      expect(within(concept).getByText(project.domain)).toBeInTheDocument();
    }
    expect(
      within(related).getByRole('link', { name: /Explore the concept collection/ }),
    ).toHaveAttribute('href', '/projects');
    expect(related.textContent).not.toMatch(
      /clients served|shipped for|conversion increased|trusted by/i,
    );
  });

  it('sets out a sequenced delivery process with reviewable outputs', () => {
    renderPage();
    const process = screen.getByRole('list', { name: 'Web application delivery process' });
    expect(process.tagName).toBe('OL');
    expect(
      within(process)
        .getAllByRole('heading')
        .map((heading) => heading.textContent),
    ).toEqual([
      'Discover the workflow',
      'Design the experience',
      'Build & review',
      'Test, release & hand over',
    ]);
    for (const output of [
      'Scope & technical plan',
      'Clickable prototype',
      'Working software',
      'Source code & documentation',
    ]) {
      expect(within(process).getByText(output)).toBeInTheDocument();
    }
    expect(within(process).getByText(/support arrangements before release/i)).toBeInTheDocument();
  });

  it('explains the four application scopes with concrete deliverables and boundaries', () => {
    renderPage();
    const scope = screen.getByRole('region', { name: 'Built for the work you need to do.' });
    const expected = [
      ['Customer portals', 'Role-based access'],
      ['Internal tools', 'Approval workflows'],
      ['SaaS products', 'Account & workspace flows'],
      ['APIs & integrations', 'Data mapping & validation'],
    ];
    expect(within(scope).getAllByRole('article')).toHaveLength(expected.length);
    for (const [name, deliverable] of expected) {
      const area = within(scope).getByRole('article', { name });
      expect(within(area).getByRole('heading', { name })).toBeInTheDocument();
      expect(within(area).getByText(deliverable)).toBeInTheDocument();
    }
    expect(
      within(scope).getByText(
        /Hosting, third-party fees, data migration, and ongoing support are scoped separately/,
      ),
    ).toBeInTheDocument();
  });

  it('orients visitors to the specific service with a heading and breadcrumb', () => {
    renderPage();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Web applications. Built around your business.',
    );
    const breadcrumb = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(within(breadcrumb).getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(within(breadcrumb).getByRole('link', { name: 'Services' })).toHaveAttribute(
      'href',
      '/services',
    );
    expect(within(breadcrumb).getByText('Web development')).toHaveAttribute('aria-current', 'page');
    expect(screen.queryByRole('main')).not.toBeInTheDocument();
  });
});

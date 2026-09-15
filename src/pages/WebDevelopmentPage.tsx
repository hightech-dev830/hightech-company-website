import { Link } from 'react-router-dom';
import { ArrowUpRight, Database, Layers3, PanelsTopLeft } from 'lucide-react';
import projects from '@/data/projects.json';
import { site } from '@/data/site';
import ContactCTA from '@/components/shared/ContactCTA';
import '@/styles/web-development.css';

const webConcepts = projects.filter((project) => project.category === 'Web apps');

const scopes = [
  {
    id: 'portals',
    title: 'Customer portals',
    description:
      'Give customers a clear place to manage their relationship with your business, without another email thread.',
    deliverables: [
      'Role-based access',
      'Requests, documents & account views',
      'Notifications & status updates',
    ],
  },
  {
    id: 'tools',
    title: 'Internal tools',
    description:
      'Replace the spreadsheet handoffs and repeated admin with an interface that follows how your team actually works.',
    deliverables: [
      'Approval workflows',
      'Search, filters & operational views',
      'Permission-aware records & exports',
    ],
  },
  {
    id: 'saas',
    title: 'SaaS products',
    description:
      'Shape a focused first release around a real user need. Make room for onboarding, administration, and the next iteration.',
    deliverables: [
      'Account & workspace flows',
      'Core product features & onboarding',
      'Subscription integration planning',
    ],
  },
  {
    id: 'integrations',
    title: 'APIs & integrations',
    description:
      'Connect the application to the systems you already rely on, with explicit rules for data, access, and failure.',
    deliverables: [
      'Data mapping & validation',
      'API connections & webhooks',
      'Error handling & recovery paths',
    ],
  },
];

const processSteps = [
  {
    title: 'Discover the workflow',
    description:
      'Map the users, everyday tasks, permissions, and existing systems. Agree the first release and identify what needs a technical experiment.',
    output: 'Scope & technical plan',
  },
  {
    title: 'Design the experience',
    description:
      'Make the key journeys tangible before the build. Review responsive screens, content, empty states, and keyboard navigation together.',
    output: 'Clickable prototype',
  },
  {
    title: 'Build & review',
    description:
      'Develop the interface, application logic, and integrations in reviewable increments. Keep testing and feedback close to each decision.',
    output: 'Working software',
  },
  {
    title: 'Test, release & hand over',
    description:
      'Check critical journeys, access rules, and failure cases. Agree deployment, documentation, and support arrangements before release.',
    output: 'Source code & documentation',
  },
];

const faqs = [
  {
    question: 'What does a first release include?',
    answer:
      'Start by solving one useful problem well. We agree the essential user journeys, integrations, and acceptance criteria before building. Additional features can be considered separately rather than quietly expanding the first release.',
  },
  {
    question: 'Can you work with our existing systems?',
    answer:
      'An integration starts with understanding the system on the other side. We review API access, documentation, and data quality before recommending an approach. Vendor restrictions, licensing, and legacy constraints may affect what is possible.',
  },
  {
    question: 'How long will it take, and what will it cost?',
    answer:
      'An estimate follows discovery, not a generic package price. The number of workflows, integration complexity, available content, and review needs all influence the scope. Share your constraints so the first conversation can focus on a realistic starting point.',
  },
  {
    question: 'Who owns the source code?',
    answer:
      'Source code and documentation are part of handover planning. Confirm ownership and licensing in the project agreement, including third-party components, repository access, and any existing intellectual property. Do not assume the same terms apply to every engagement.',
  },
  {
    question: 'How do you approach security and accessibility?',
    answer:
      'Plan for permissions, data handling, keyboard access, and understandable interfaces from the outset. Agree the testing scope and any independent assessment the application needs. This is not a blanket compliance guarantee; regulated requirements need specialist review.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'Agree hosting responsibilities, monitoring, updates, and a support plan before release. Ongoing support is not automatically included. The handover should make it clear who owns each operational task and how future changes will be handled.',
  },
];

export default function WebDevelopmentPage() {
  return (
    <div className="web-service">
      <header className="web-hero">
        <div className="shell">
          <nav className="web-breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <span aria-current="page">Web development</span>
              </li>
            </ol>
          </nav>
          <div className="web-hero-layout">
            <div className="web-hero-copy">
              <p className="section-label">Web application development</p>
              <h1>
                Web applications. <span>Built around your business.</span>
              </h1>
              <p className="web-lead">
                A customer portal. A better internal tool. Your next software product. Turn the way
                your business works into a web experience people can actually use.
              </p>
              <div className="web-hero-actions">
                <Link className="button button-primary" to="/contact">
                  Discuss your web project <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
                <a className="text-link" href="#web-scope">
                  Explore the scope <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
            <figure className="web-architecture" aria-labelledby="web-architecture-caption">
              <div className="web-architecture-top">
                <span>
                  One application.
                  <br />
                  Connected layers.
                </span>
                <span className="web-architecture-mark" aria-hidden="true">
                  ↙
                </span>
              </div>
              <ol className="web-architecture-layers" aria-label="Application layers">
                <li>
                  <PanelsTopLeft size={24} strokeWidth={1.5} aria-hidden="true" />
                  <div>
                    <strong>Interface</strong>
                    <p>Customer & team experiences</p>
                  </div>
                  <span className="web-layer-number" aria-hidden="true">
                    01
                  </span>
                </li>
                <li>
                  <Layers3 size={24} strokeWidth={1.5} aria-hidden="true" />
                  <div>
                    <strong>Application logic</strong>
                    <p>Permissions, workflows & validation</p>
                  </div>
                  <span className="web-layer-number" aria-hidden="true">
                    02
                  </span>
                </li>
                <li>
                  <Database size={24} strokeWidth={1.5} aria-hidden="true" />
                  <div>
                    <strong>Connected systems</strong>
                    <p>Your data, APIs & existing tools</p>
                  </div>
                  <span className="web-layer-number" aria-hidden="true">
                    03
                  </span>
                </li>
              </ol>
              <figcaption>
                <span id="web-architecture-caption">Illustrative application structure</span>
                <span>Not a live product or client screenshot.</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </header>
      <section
        className="web-scope section paper-section"
        aria-labelledby="web-scope-heading"
        id="web-scope"
      >
        <div className="shell">
          <div className="web-section-top">
            <div>
              <p className="section-label">01 / What we build</p>
              <h2 className="section-heading" id="web-scope-heading">
                Built for the work you need to do.
              </h2>
            </div>
            <p className="web-section-copy">
              When off-the-shelf tools stop fitting, start with the workflow—not a longer feature
              list. These are possible scopes, shaped around your users and existing systems.
            </p>
          </div>
          <div className="web-scope-list">
            {scopes.map((scope, index) => (
              <article
                className="web-scope-row"
                key={scope.id}
                aria-labelledby={`web-${scope.id}-heading`}
              >
                <span className="web-index" aria-hidden="true">
                  0{index + 1}
                </span>
                <div>
                  <h3 id={`web-${scope.id}-heading`}>{scope.title}</h3>
                  <p>{scope.description}</p>
                </div>
                <ul aria-label={`${scope.title} deliverables`}>
                  {scope.deliverables.map((deliverable) => (
                    <li key={deliverable}>{deliverable}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="web-scope-note">
            <strong>A clear scope, not a blank cheque.</strong>
            <p>
              Hosting, third-party fees, data migration, and ongoing support are scoped separately.
              Security and accessibility requirements belong in the brief; compliance claims need
              the appropriate review.
            </p>
          </div>
        </div>
      </section>
      <section className="web-process section" aria-labelledby="web-process-heading">
        <div className="shell web-process-layout">
          <div className="web-process-intro">
            <p className="section-label">02 / From brief to browser</p>
            <h2 className="section-heading" id="web-process-heading">
              A clear next step.
              <br />
              At every stage.
            </h2>
            <p className="web-section-copy">
              The build is only part of the work. Good decisions start with a shared understanding
              of what the application needs to do—and what it does not.
            </p>
            <p className="web-process-principle">
              Test the assumptions.
              <br />
              Review the actual software.
              <br />
              <span>Keep the handover in sight.</span>
            </p>
          </div>
          <ol className="web-process-list" aria-label="Web application delivery process">
            {processSteps.map((step, index) => (
              <li key={step.title}>
                <span className="web-index" aria-hidden="true">
                  0{index + 1}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <span className="web-process-output">{step.output}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="web-work section paper-section" aria-labelledby="web-work-heading">
        <div className="shell">
          <div className="web-section-top">
            <div>
              <p className="section-label">03 / Related explorations</p>
              <h2 className="section-heading" id="web-work-heading">
                Ideas to build on. <span>Not claims to borrow.</span>
              </h2>
            </div>
            <p className="web-section-copy">
              These are illustrative concepts, not client case studies or shipped products. They
              explore possible web experiences; no client results are claimed.
            </p>
          </div>
          <div className="web-concept-grid">
            {webConcepts.map((project) => (
              <article
                className="web-concept"
                aria-labelledby={`web-concept-${project.id}`}
                key={project.id}
              >
                <div className="web-concept-question">
                  <span className="web-concept-label">Concept exploration</span>
                  <p>{project.question}</p>
                  <span className="web-concept-domain">{project.domain}</span>
                </div>
                <div className="web-concept-copy">
                  <h3 id={`web-concept-${project.id}`}>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul className="web-concept-tags" aria-label={`${project.title} focus areas`}>
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <Link className="text-link web-work-link" to="/projects">
            Explore the concept collection <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section className="web-faq section" aria-labelledby="web-faq-heading">
        <div className="shell web-faq-layout">
          <div>
            <p className="section-label">04 / Practical questions</p>
            <h2 className="section-heading" id="web-faq-heading">
              Before we start.
            </h2>
            <p className="web-section-copy">
              A few useful answers before the first conversation. The details of your engagement
              belong in an agreed scope, not the small print of a website.
            </p>
            <div className="web-faq-contact">
              <a className="text-link" href={`mailto:${site.email}`}>
                {site.email} <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a className="text-link" href={site.calendly}>
                Schedule a conversation <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="web-faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <ContactCTA
        title="What should your application make possible?"
        description="Tell us who it is for, what is getting in the way, and which systems it needs to work with. Start with the problem; the brief can come next."
      />
    </div>
  );
}

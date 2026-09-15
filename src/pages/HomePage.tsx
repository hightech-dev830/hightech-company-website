import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, CornerDownRight } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import ContactCTA from '@/components/shared/ContactCTA';
import TeamSection from '@/components/team/TeamSection';
import { companyServices, deliverySteps } from '@/data/company';
import '@/styles/company-preview.css';

const questions = [
  [
    'Can you help shape an idea before development?',
    'Yes. Discovery and prototyping help clarify the users, scope and technical constraints before committing to a full build. You do not need a finished specification to start a conversation.',
  ],
  [
    'Can you work with an existing product or team?',
    'We can discuss focused improvements, integrations or a new part of an existing product. The starting point is understanding your codebase, delivery process and the people who will maintain the work.',
  ],
  [
    'How are scope, timing and cost agreed?',
    'These depend on the problem, the current systems and the work involved. We agree the scope, milestones and commercial terms before starting; the website does not provide a fixed quote or reserve a start date.',
  ],
  [
    'Are the projects shown here client work?',
    'The featured projects are labelled concept explorations. They show possible product directions, not client engagements, delivered products or measured business results.',
  ],
];

export default function HomePage() {
  return (
    <div className="company-home">
      <section className="company-hero">
        <div className="shell company-hero-grid">
          <div className="company-hero-copy entrance">
            <p className="company-kicker">
              <span /> Design. Development. Applied AI.
            </p>
            <h1>
              Digital products <br />
              built around <br />
              <em>your business.</em>
            </h1>
            <p className="company-lead">
              Web applications, mobile experiences and practical AI tools. We bring design and
              engineering together to turn complex workflows into software people can use with
              confidence.
            </p>
            <div className="company-actions">
              <Link className="button button-primary" to="/contact">
                Discuss your project <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <Link className="text-link" to="/projects">
                Explore our work <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="company-hero-note">
              <span>HighTech</span>
              <span>From the first question to the next release.</span>
            </div>
          </div>
          <aside
            className="company-starting-point entrance entrance-2"
            aria-labelledby="starting-point-heading"
          >
            <div className="company-panel-top">
              <span>Find your starting point</span>
              <CornerDownRight size={22} aria-hidden="true" />
            </div>
            <h2 id="starting-point-heading">
              What needs to
              <br />
              work better?
            </h2>
            <div className="company-starting-links">
              <Link to="/services/web-development">
                <span>
                  <strong>Your customer experience</strong>
                  <small>Portals, platforms & web applications</small>
                </span>
                <ArrowUpRight size={22} aria-hidden="true" />
              </Link>
              <a href="/services#service-web">
                <span>
                  <strong>Your day-to-day operations</strong>
                  <small>Internal tools & connected workflows</small>
                </span>
                <ArrowUpRight size={22} aria-hidden="true" />
              </a>
              <a href="/services#service-ai">
                <span>
                  <strong>How your team uses knowledge</strong>
                  <small>Applied AI & information access</small>
                </span>
                <ArrowUpRight size={22} aria-hidden="true" />
              </a>
            </div>
            <div className="company-panel-bottom">
              <span>Not sure yet?</span>
              <Link to="/contact">
                Let’s work it out together <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <div className="company-principles-band">
        <div className="shell">
          <span>Good software starts with good decisions.</span>
          <ul>
            <li>
              <Check size={15} aria-hidden="true" /> Clear scope
            </li>
            <li>
              <Check size={15} aria-hidden="true" /> Direct collaboration
            </li>
            <li>
              <Check size={15} aria-hidden="true" /> Maintainable delivery
            </li>
          </ul>
        </div>
      </div>

      <section
        className="section paper-section company-services"
        aria-labelledby="company-services-heading"
      >
        <div className="shell">
          <Reveal className="company-section-intro">
            <div>
              <p className="section-label">Our services</p>
              <h2 id="company-services-heading">
                From the first idea
                <br />
                to the next release.
              </h2>
            </div>
            <p>
              A connected set of capabilities, shaped around the work you need to do. Start with one
              problem. Build the right thing around it.
            </p>
          </Reveal>
          <div className="company-service-grid">
            {companyServices.map((service, i) => (
              <a key={service.title} className="company-service-card" href={service.href}>
                <div className="company-card-top">
                  <span>0{i + 1}</span>
                  <ArrowUpRight size={23} aria-hidden="true" />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="company-card-caption">{service.category}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section company-work" aria-labelledby="company-work-heading">
        <div className="shell">
          <Reveal className="company-section-intro">
            <div>
              <p className="section-label">Inside the project lab</p>
              <h2 id="company-work-heading">
                A closer look at
                <br />
                what could be next.
              </h2>
            </div>
            <div>
              <p>
                Thoughtful interfaces start with useful questions. These are concept explorations,
                not client case studies.
              </p>
              <Link className="text-link" to="/projects">
                View the concept collection <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
          <div className="company-work-grid">
            <article className="company-work-card company-work-fieldnote">
              <div className="company-work-visual">
                <span className="company-work-label">Concept exploration / Knowledge systems</span>
                <div className="company-work-word">
                  Fieldnote<span>↗</span>
                </div>
                <p>
                  Connect the question.
                  <br />
                  Keep the source.
                </p>
                <div className="company-work-flow" aria-label="Concept workflow">
                  <span>Ask</span>
                  <ArrowRight size={18} aria-hidden="true" />
                  <span>Find the source</span>
                  <ArrowRight size={18} aria-hidden="true" />
                  <span>Review</span>
                </div>
              </div>
              <div className="company-work-description">
                <div>
                  <h3>Knowledge that keeps its context.</h3>
                  <p>A source-aware document workspace, with people in control of the answer.</p>
                </div>
                <Link className="company-round-link" to="/projects" aria-label="Explore Fieldnote">
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>
            </article>
            <article className="company-work-card company-work-shelf">
              <div className="company-work-visual">
                <span className="company-work-label">Concept exploration / Digital commerce</span>
                <div className="company-work-word">
                  Shelf<span>↗</span>
                </div>
                <p>
                  Less searching.
                  <br />
                  More finding.
                </p>
                <div className="company-shelf-index" aria-label="Concept focus">
                  <span>01 / Discover</span>
                  <span>02 / Compare</span>
                  <span>03 / Choose</span>
                </div>
              </div>
              <div className="company-work-description">
                <div>
                  <h3>A clearer path through the catalogue.</h3>
                  <p>Exploring product discovery without hiding the details that matter.</p>
                </div>
                <Link className="company-round-link" to="/projects" aria-label="Explore Shelf">
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section
        id="solutions"
        className="section paper-section company-solutions"
        aria-labelledby="company-solutions-heading"
      >
        <div className="shell company-solutions-grid">
          <Reveal>
            <p className="section-label">Built around the work</p>
            <h2 id="company-solutions-heading">
              Your challenge.
              <br />
              Our starting point.
            </h2>
            <p className="company-body-copy">
              The right solution is more than a list of features. It connects the people doing the
              work with the information and tools they need.
            </p>
            <Link className="text-link" to="/services">
              Explore our capabilities <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </Reveal>
          <div className="company-solution-list">
            {[
              [
                'Customer self-service',
                'Give customers a clear place to manage requests, find information and take their next step.',
                '/services/web-development',
              ],
              [
                'Connected operations',
                'Bring scattered information and manual handovers into a workflow your team can follow.',
                '/services#service-web',
              ],
              [
                'Knowledge & AI assistance',
                'Make source information easier to find and review, without hiding uncertainty or removing human oversight.',
                '/services#service-ai',
              ],
              [
                'Work beyond the desk',
                'Design mobile experiences around field conditions, devices and connectivity.',
                '/services#service-mobile',
              ],
            ].map(([title, text, href]) => (
              <a key={title} href={href}>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                <ArrowUpRight size={23} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section company-industries" aria-labelledby="company-industries-heading">
        <div className="shell">
          <Reveal className="company-section-intro">
            <div>
              <p className="section-label">Different industries. Specific questions.</p>
              <h2 id="company-industries-heading">
                Understand the context.
                <br />
                Then build the solution.
              </h2>
            </div>
            <div>
              <p>
                Explore where software can help, from customer-facing experiences to the operations
                behind them. Domain requirements guide the scope.
              </p>
              <Link className="text-link" to="/industries">
                Explore application areas <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
          <div className="company-industry-links">
            {[
              'Healthcare',
              'Commerce & retail',
              'Finance & operations',
              'Education',
              'Manufacturing',
              'Logistics',
            ].map((name) => (
              <Link to="/industries" key={name}>
                {name}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section paper-section company-process"
        aria-labelledby="company-process-heading"
      >
        <div className="shell">
          <Reveal className="company-section-intro">
            <div>
              <p className="section-label">How we work</p>
              <h2 id="company-process-heading">
                A clear process.
                <br />
                No black box.
              </h2>
            </div>
            <p>
              Know what we’re working toward, see progress as it happens and make the important
              decisions together.
            </p>
          </Reveal>
          <ol className="company-process-grid">
            {deliverySteps.map((step, i) => (
              <li key={step.title}>
                <span className="company-step-number">0{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <span className="company-step-output">
                  <Check size={15} aria-hidden="true" />
                  {step.output}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="section company-partnership"
        aria-labelledby="company-partnership-heading"
      >
        <Reveal className="shell company-partnership-grid">
          <div>
            <p className="section-label">Why HighTech</p>
            <h2 id="company-partnership-heading">
              Design and engineering.
              <br />
              <em>At the same table.</em>
            </h2>
          </div>
          <div>
            <p>
              Good software needs both a clear experience and a dependable foundation. We bring
              those conversations together—from the first product decision through testing and
              handover.
            </p>
            <ul>
              <li>Direct conversations with the people doing the work.</li>
              <li>Prototypes to test assumptions before bigger commitments.</li>
              <li>Readable code and documentation for the next person.</li>
            </ul>
            <Link className="text-link" to="/about">
              Get to know HighTech <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </section>
      <TeamSection compact />

      <section className="section company-faq" aria-labelledby="company-faq-heading">
        <div className="shell company-faq-grid">
          <div>
            <p className="section-label">Before we get started</p>
            <h2 id="company-faq-heading">
              A few things
              <br />
              worth knowing.
            </h2>
            <p className="company-body-copy">
              Have a different question?
              <br />
              <Link className="text-link" to="/contact">
                Let’s talk about it <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </p>
          </div>
          <div>
            {questions.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <ContactCTA
        title="Let’s build what’s next for your business."
        description="Tell us what you want to improve, who it’s for and where you are today. A clear conversation is the first step."
      />
    </div>
  );
}

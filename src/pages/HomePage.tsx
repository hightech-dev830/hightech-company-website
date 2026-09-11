import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, Asterisk } from 'lucide-react';
import Starfield from '@/components/motion/Starfield';
import Reveal from '@/components/motion/Reveal';
import ContactCTA from '@/components/shared/ContactCTA';
import TeamSection from '@/components/team/TeamSection';

const capabilities = [
  {
    n: '01',
    title: 'Digital products',
    detail:
      'Web platforms, mobile apps, and the systems behind them. Designed for the people who use them.',
    tags: 'Web · Mobile · Product design',
  },
  {
    n: '02',
    title: 'Applied intelligence',
    detail:
      'AI that does useful work. Knowledge assistants, thoughtful automation, and data-driven experiences.',
    tags: 'AI integration · RAG · Automation',
  },
  {
    n: '03',
    title: 'Engineering partnerships',
    detail:
      'From the first technical decision to a considered launch. A small team that stays close to your product.',
    tags: 'Architecture · Cloud · Delivery',
  },
];
const process = [
  [
    'Understand',
    'We ask the difficult questions early. Together, we define the problem, the constraints, and what success looks like.',
  ],
  [
    'Make it tangible',
    'Prototypes turn assumptions into something you can see, use, and challenge before the build.',
  ],
  [
    'Build with care',
    'Clear milestones, frequent demos, and maintainable code. You’re part of the process, not waiting outside it.',
  ],
  [
    'Launch & evolve',
    'We test the details, document the decisions, and plan what comes after the first release.',
  ],
];

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-art" aria-hidden="true">
          <div className="star-glow" />
          <Starfield />
          <div className="art-coordinate coordinate-top">FIG. 01 — POSSIBILITIES, IN MOTION</div>
          <div className="art-coordinate coordinate-bottom">
            <span className="crosshair">+</span> INDEPENDENT MINDS. SHARED ORBIT.
          </div>
        </div>
        <div className="shell hero-content">
          <div className="eyebrow entrance">
            <span className="status-dot" /> Independent software studio
          </div>
          <h1 className="hero-title">
            <span className="hero-line entrance entrance-1">Good ideas.</span>
            <span className="hero-line entrance entrance-2">Built into</span>
            <span className="hero-line hero-accent entrance entrance-3">
              great software<span className="hero-period">.</span>
            </span>
          </h1>
          <div className="hero-description entrance entrance-3">
            <p>
              We’re HighTech. A six-person software team turning ambitious ideas into thoughtful
              digital products—with a human touch and serious engineering.
            </p>
          </div>
          <div className="hero-actions entrance entrance-4">
            <Link to="/contact" className="button button-primary">
              Start a project <ArrowUpRight size={19} />
            </Link>
            <Link to="/services" className="text-link">
              Explore our capabilities <ArrowRight size={17} />
            </Link>
          </div>
          <div className="hero-bottom entrance entrance-4">
            <span>Design-led. Engineering-minded.</span>
            <a href="#studio" className="scroll-cue">
              Scroll to explore <ArrowDown size={15} />
            </a>
          </div>
        </div>
      </section>
      <div className="expertise-strip" aria-label="Our focus">
        <div className="shell">
          <span>From what if to what’s next.</span>
          <div>
            <span>Product design</span>
            <Asterisk />
            <span>Web & mobile</span>
            <Asterisk />
            <span>Applied AI</span>
          </div>
        </div>
      </div>
      <section className="section paper-section" id="studio">
        <div className="shell">
          <Reveal className="studio-intro">
            <span className="section-label">01 / The studio</span>
            <div>
              <h2 className="section-heading">
                Not another vendor.
                <br />
                Your people for <span className="subtle-ink">the hard part.</span>
              </h2>
              <div className="studio-intro-bottom">
                <p>
                  Good software takes more than a stack of technologies. It takes people who listen
                  closely, think clearly, and care about the details. That’s how we work.
                </p>
                <Link to="/about" className="text-link">
                  Get to know HighTech <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>
          </Reveal>
          <div className="capability-rows">
            {capabilities.map((item) => (
              <Reveal key={item.n}>
                <Link to="/services" className="capability-row">
                  <span className="row-number">{item.n}</span>
                  <h3>{item.title}</h3>
                  <div>
                    <p>{item.detail}</p>
                    <span className="row-tags">{item.tags}</span>
                  </div>
                  <ArrowUpRight className="row-arrow" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section explorations">
        <div className="shell">
          <Reveal className="section-heading-row">
            <div>
              <span className="section-label">02 / Possibilities</span>
              <h2 className="section-heading">
                A little less ordinary.
                <br />
                <span className="muted">A lot more considered.</span>
              </h2>
            </div>
            <Link to="/projects" className="text-link">
              Explore the project lab <ArrowUpRight size={18} />
            </Link>
          </Reveal>
          <div className="exploration-grid">
            <Reveal>
              <Link to="/projects" className="exploration-card exploration-ai">
                <div className="concept-art" aria-hidden="true">
                  <div className="intelligence-core">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="concept-art-label">CONTEXT → CLARITY</span>
                  <div className="concept-brackets">
                    <span>[</span>
                    <span>]</span>
                  </div>
                </div>
                <div className="exploration-meta">
                  <div>
                    <span className="section-label">Concept exploration / Applied AI</span>
                    <h3>Knowledge, connected.</h3>
                  </div>
                  <ArrowUpRight />
                </div>
                <p>
                  Exploring how a source-aware assistant can make complex information feel
                  approachable.
                </p>
              </Link>
            </Reveal>
            <Reveal delay={100}>
              <Link to="/projects" className="exploration-card exploration-product">
                <div className="concept-art" aria-hidden="true">
                  <div className="product-sculpture">
                    <div className="sculpture-slab slab-one" />
                    <div className="sculpture-slab slab-two" />
                    <div className="sculpture-slab slab-three" />
                    <div className="sculpture-slab slab-four" />
                  </div>
                  <span className="concept-art-label">LESS FRICTION. MORE FLOW.</span>
                </div>
                <div className="exploration-meta">
                  <div>
                    <span className="section-label">Concept exploration / Digital products</span>
                    <h3>Complexity, simplified.</h3>
                  </div>
                  <ArrowUpRight />
                </div>
                <p>
                  Thinking through focused interfaces for the work that happens behind the scenes.
                </p>
              </Link>
            </Reveal>
          </div>
          <p className="concept-disclaimer">
            Design explorations, not client case studies. A glimpse into the kinds of problems we
            like to solve.
          </p>
        </div>
      </section>
      <section className="section paper-section">
        <div className="shell process-layout">
          <Reveal>
            <span className="section-label">03 / How we work</span>
            <h2 className="section-heading">
              Good chemistry.
              <br />
              Clear process.
            </h2>
            <p className="section-intro">
              No black box. No disappearing act.
              <br />
              Just a shared goal and a considered path to it.
            </p>
            <Link to="/services" className="text-link">
              How we build <ArrowUpRight size={18} />
            </Link>
          </Reveal>
          <div className="process-list">
            {process.map(([title, description], i) => (
              <Reveal key={title} delay={i * 50}>
                <article className="process-row">
                  <span className="process-number">0{i + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section team-teaser">
        <Reveal className="shell split-layout">
          <div>
            <span className="section-label">04 / The people</span>
            <h2 className="section-heading">
              Six minds.
              <br />
              One shared standard.
            </h2>
          </div>
          <div>
            <p className="section-intro">
              A deliberately small team, with design and engineering at the same table. You work
              directly with the people doing the work.
            </p>
            <Link to="/about" className="button button-outline">
              Meet the team <ArrowUpRight size={18} />
            </Link>
          </div>
        </Reveal>
      </section>
      <TeamSection compact />
      <ContactCTA />
    </>
  );
}

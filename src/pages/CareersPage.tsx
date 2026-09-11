import { Link } from 'react-router-dom';
import PageHero from '@/components/shared/PageHero';
import Reveal from '@/components/motion/Reveal';
import { site } from '@/data/site';
import '@/styles/capabilities.css';

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers / Stay in the conversation"
        title={
          <>
            Good work starts
            <br />
            with good people.
          </>
        }
        description="We’re a six-person software studio. If you care about thoughtful products and the details that make them work, we’d like to know what you’re building."
      >
        <Link className="text-link" to="/about">
          Meet the studio <span aria-hidden="true">↗</span>
        </Link>
      </PageHero>
      <section className="section paper-section" aria-labelledby="talent-heading">
        <Reveal className="shell talent-layout">
          <div className="talent-letter">
            <p className="section-label">01 / An open invitation</p>
            <h2 id="talent-heading" className="section-heading">
              A conversation,
              <br />
              not a job posting.
            </h2>
            <p className="talent-lead">No open roles are currently listed.</p>
            <p>
              This is an invitation to introduce yourself for future conversations, not an
              application for a vacancy. We are not advertising specific roles, compensation, or
              benefits here.
            </p>
            <p>
              Engineers, designers, and people who work between the two: send a little context about
              your craft and the work you want to do next. A thoughtful project is a better starting
              point than a polished pitch.
            </p>
            <p className="muted">
              An introduction does not guarantee a role or a response. If there is a potential fit,
              any scope, availability, and terms would be discussed directly.
            </p>
          </div>
          <aside className="talent-note" aria-labelledby="introduction-heading">
            <span className="section-label">To / HighTech studio</span>
            <div className="talent-note-mark" aria-hidden="true">
              ↗
            </div>
            <h3 id="introduction-heading">
              A few words.
              <br />A link to your work.
            </h3>
            <p>
              Tell us what you enjoy making, what you contributed to a project, and what kind of
              collaboration you have in mind.
            </p>
            <a
              className="button button-primary"
              href={`mailto:${site.email}?subject=Talent%20network%20introduction`}
            >
              Introduce yourself <span aria-hidden="true">↗</span>
            </a>
            <span className="talent-email">{site.email}</span>
            <p className="talent-note-small">
              Opens your email app. Please share only information you are comfortable sending by
              email; no sensitive personal documents are needed.
            </p>
          </aside>
        </Reveal>
      </section>
      <section className="section" aria-labelledby="intro-guide-heading">
        <Reveal className="shell split-layout">
          <div>
            <p className="section-label">02 / A useful introduction</p>
            <h2 className="section-heading" id="intro-guide-heading">
              Show us how
              <br />
              you think.
            </h2>
            <p className="section-intro">
              A short note is enough. No application portal, no invented hiring funnel.
            </p>
          </div>
          <ol className="delivery-process" aria-label="What to include in your introduction">
            <li>
              <span className="cap-index" aria-hidden="true">
                01
              </span>
              <div>
                <h3>Show the work</h3>
                <p>
                  A portfolio, a repository, or a short write-up. Please only share work you have
                  permission to show.
                </p>
              </div>
            </li>
            <li>
              <span className="cap-index" aria-hidden="true">
                02
              </span>
              <div>
                <h3>Explain a decision</h3>
                <p>
                  What was difficult? What did you try? Tell us about your part in making it better.
                </p>
              </div>
            </li>
            <li>
              <span className="cap-index" aria-hidden="true">
                03
              </span>
              <div>
                <h3>Tell us what suits you</h3>
                <p>
                  Your interests, availability, and preferred kind of collaboration help give a
                  future conversation some context.
                </p>
              </div>
            </li>
          </ol>
        </Reveal>
      </section>
    </>
  );
}

import { useId } from 'react';
import Reveal from '@/components/motion/Reveal';
import { teamMembers as team } from '@/lib/team';
import TeamCard from './TeamCard';
import '@/styles/team.css';

export default function TeamSection({ compact = false }: { compact?: boolean }) {
  const headingId = useId();
  const hasSamples = team.some((member) => member.isSample);
  return (
    <section
      className={`section paper-section team-section${compact ? ' team-section--compact' : ''}`}
      aria-labelledby={headingId}
    >
      <div className="shell">
        <Reveal className="team-section__heading">
          <div>
            <p className="section-label">The team{hasSamples ? ' / Sample profiles' : ''}</p>
            <h2 className="section-heading" id={headingId}>
              The people behind
              <br />
              the process.
            </h2>
          </div>
          <p className="section-intro">
            A six-person software team. Different disciplines, one shared attention to the details
            that make products work for people.
          </p>
        </Reveal>
        <div className="team-grid">
          {team.map((member, index) => (
            <TeamCard key={member.id} member={member} delay={80 + index * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}

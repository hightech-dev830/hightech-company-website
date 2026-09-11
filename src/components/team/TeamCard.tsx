import { useId } from 'react';
import Reveal from '@/components/motion/Reveal';
import { isHttpsUrl, type TeamMember } from '@/lib/team';

type TeamCardProps = { member: TeamMember; delay?: number };

export default function TeamCard({ member, delay = 0 }: TeamCardProps) {
  const nameId = useId();
  const socials = member.socials?.filter((social) => isHttpsUrl(social.url)) ?? [];
  return (
    <Reveal className="team-card" delay={delay}>
      <article aria-labelledby={nameId}>
        <div className="team-card__portrait">
          <img
            src={member.avatar}
            alt={
              member.isSample
                ? `Abstract illustrated avatar for ${member.name} (sample profile)`
                : `${member.name} — ${member.role}`
            }
            width={640}
            height={480}
            loading="lazy"
            decoding="async"
          />
          {member.isSample && <span className="team-card__sample">{member.name}</span>}
        </div>
        <div className="team-card__content">
          <p className="team-card__role">{member.role}</p>
          <h3 id={nameId}>{member.name}</h3>
          <p className="team-card__bio">{member.bio}</p>
          <ul className="tags team-card__skills" aria-label={`${member.name}'s skills`}>
            {member.skills.map((skill) => (
              <li className="tag" key={skill}>
                {skill}
              </li>
            ))}
          </ul>
          {socials.length > 0 && (
            <div className="team-card__socials">
              {socials.map((social) => (
                <a
                  key={`${social.label}-${social.url}`}
                  className="text-link"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on ${social.label} (opens in a new tab)`}
                >
                  {social.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}

import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Brand from './Brand';
import { site } from '@/data/site';
import { companyServices } from '@/data/company';
import '@/styles/company-preview.css';

export default function Footer() {
  return (
    <footer className="site-footer company-footer">
      <div className="shell">
        <div className="company-footer-top">
          <div>
            <Brand />
            <p>
              Design, development and practical AI.
              <br />
              Built around your business.
            </p>
          </div>
          <div className="company-footer-prompt">
            <span>Have a project in mind?</span>
            <Link to="/contact">
              Let’s start a conversation <ArrowUpRight size={24} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="company-footer-columns">
          <nav aria-label="Footer services">
            <h2>Services</h2>
            <ul>
              {companyServices.map((service) => (
                <li key={service.title}>
                  <Link to={service.href} reloadDocument={service.href.includes('#')}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Footer explore">
            <h2>Explore</h2>
            <ul>
              <li>
                <Link to="/services">All capabilities</Link>
              </li>
              <li>
                <a href="/#solutions">Business solutions</a>
              </li>
              <li>
                <Link to="/industries">Industries</Link>
              </li>
              <li>
                <Link to="/projects">Work & concepts</Link>
              </li>
            </ul>
          </nav>
          <nav aria-label="Footer company">
            <h2>Company</h2>
            <ul>
              <li>
                <Link to="/about">About HighTech</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <a href={site.github} target="_blank" rel="noopener noreferrer">
                  GitHub <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </nav>
          <div>
            <h2>Get in touch</h2>
            <ul>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a href={site.phoneHref}>{site.phone}</a>
              </li>
              <li>
                <a href={site.calendly} target="_blank" rel="noopener noreferrer">
                  Book a conversation <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </li>
            </ul>
            <address>{site.address}</address>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} HighTech. All rights reserved.</span>
          <span>Thoughtful products. Clear collaboration.</span>
          <Link to="/contact">
            Contact & privacy information <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import Brand from './Brand';
import MotionControl from '@/components/motion/MotionControl';
import { companyServices } from '@/data/company';
import '@/styles/company-preview.css';

const companyLinks = [
  {
    title: 'About HighTech',
    href: '/about',
    description: 'Our approach and the people behind the work.',
  },
  {
    title: 'Careers & collaboration',
    href: '/careers',
    description: 'Connect with the team and explore future conversations.',
  },
  {
    title: 'Contact',
    href: '/contact',
    description: 'Tell us about your project or technical question.',
  },
];

type MenuName = 'services' | 'company';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuName | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const serviceToggle = useRef<HTMLButtonElement>(null);
  const companyToggle = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [location.key]);
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 961px)');
    const onResize = () => {
      setOpen(false);
      setMenu(null);
    };
    desktop.addEventListener('change', onResize);
    return () => desktop.removeEventListener('change', onResize);
  }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (menu) {
        setMenu(null);
        (menu === 'services' ? serviceToggle : companyToggle).current?.focus();
      } else if (open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onOutside = (event: Event) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) {
        setMenu(null);
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onOutside);
    document.addEventListener('focusin', onOutside);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onOutside);
      document.removeEventListener('focusin', onOutside);
    };
  }, [menu, open]);

  function openWithKeyboard(name: MenuName) {
    setMenu(name);
    requestAnimationFrame(() =>
      document.querySelector<HTMLAnchorElement>(`#${name}-navigation a`)?.focus(),
    );
  }

  return (
    <header
      ref={header}
      className={`site-header company-header ${scrolled ? 'is-scrolled' : ''}`}
      onClick={(event) => {
        if ((event.target as Element).closest('a')) {
          setOpen(false);
          setMenu(null);
        }
      }}
    >
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="shell header-inner">
        <Brand />
        <nav aria-label="Main navigation" className="company-nav">
          <div
            className="company-nav-item"
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget))
                setMenu((current) => (current === 'services' ? null : current));
            }}
          >
            <NavLink to="/services">Services</NavLink>
            <button
              ref={serviceToggle}
              className="company-nav-toggle"
              type="button"
              aria-label="Explore services"
              aria-expanded={menu === 'services'}
              aria-controls="services-navigation"
              onClick={() => setMenu(menu === 'services' ? null : 'services')}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown') {
                  event.preventDefault();
                  openWithKeyboard('services');
                }
              }}
            >
              <ChevronDown size={14} aria-hidden="true" />
            </button>
            {menu === 'services' && (
              <section
                id="services-navigation"
                className="company-dropdown"
                aria-label="Service navigation"
              >
                <div className="shell company-dropdown-content">
                  <div className="company-dropdown-intro">
                    <h2>
                      Built around
                      <br />
                      your business.
                    </h2>
                    <p>Design, development and practical AI for the work that matters.</p>
                  </div>
                  <div className="company-dropdown-links">
                    {companyServices.map((service) => (
                      <Link
                        key={service.title}
                        to={service.href}
                        reloadDocument={service.href.includes('#')}
                      >
                        <strong>
                          {service.title}
                          <ArrowUpRight size={15} aria-hidden="true" />
                        </strong>
                        <small>{service.description}</small>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>
          <a href="/#solutions">Solutions</a>
          <NavLink to="/industries">Industries</NavLink>
          <NavLink to="/projects">Work</NavLink>
          <div
            className="company-nav-item"
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget))
                setMenu((current) => (current === 'company' ? null : current));
            }}
          >
            <NavLink to="/about">Company</NavLink>
            <button
              ref={companyToggle}
              className="company-nav-toggle"
              type="button"
              aria-label="Company pages"
              aria-expanded={menu === 'company'}
              aria-controls="company-navigation"
              onClick={() => setMenu(menu === 'company' ? null : 'company')}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown') {
                  event.preventDefault();
                  openWithKeyboard('company');
                }
              }}
            >
              <ChevronDown size={14} aria-hidden="true" />
            </button>
            {menu === 'company' && (
              <section
                id="company-navigation"
                className="company-dropdown"
                aria-label="Company navigation"
              >
                <div className="shell company-dropdown-content">
                  <div className="company-dropdown-intro">
                    <h2>Meet HighTech.</h2>
                    <p>Product thinking, design and engineering in the same conversation.</p>
                  </div>
                  <div className="company-dropdown-links">
                    {companyLinks.map((link) => (
                      <Link to={link.href} key={link.href}>
                        <strong>
                          {link.title}
                          <ArrowUpRight size={15} aria-hidden="true" />
                        </strong>
                        <small>{link.description}</small>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>
        </nav>
        <div className="header-actions">
          <MotionControl />
          <Link to="/contact" className="header-cta">
            Let’s talk <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
          <button
            ref={toggle}
            type="button"
            className="menu-toggle"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => {
              setOpen(!open);
              setMenu(null);
            }}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-navigation" className="company-mobile" aria-label="Mobile navigation">
          <div className="shell">
            <NavLink to="/" end>
              Home
            </NavLink>
            <details>
              <summary>
                Services <ChevronDown size={17} aria-hidden="true" />
              </summary>
              <div className="company-mobile-group">
                <NavLink to="/services" end>
                  All services
                </NavLink>
                {companyServices.map((service) => (
                  <Link
                    to={service.href}
                    reloadDocument={service.href.includes('#')}
                    key={service.title}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </details>
            <a href="/#solutions">Solutions</a>
            <NavLink to="/industries">Industries</NavLink>
            <NavLink to="/projects">Work</NavLink>
            <NavLink to="/about">About HighTech</NavLink>
            <NavLink to="/careers">Careers</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
        </nav>
      )}
    </header>
  );
}

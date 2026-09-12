import { lazy, Suspense, useEffect, useRef, type ReactElement } from 'react';
import { Link, matchRoutes, Route, Routes, useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import PageHero from '@/components/shared/PageHero';
import { applyDocumentSeo, routesSeo } from '@/lib/seo';

const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const IndustriesPage = lazy(() => import('@/pages/IndustriesPage'));
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'));
const CareersPage = lazy(() => import('@/pages/CareersPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));

const pageElements: Record<string, ReactElement> = {
  '/': <HomePage />,
  '/about': <AboutPage />,
  '/services': <ServicesPage />,
  '/industries': <IndustriesPage />,
  '/projects': <ProjectsPage />,
  '/careers': <CareersPage />,
  '/contact': <ContactPage />,
};

const pages = routesSeo.map((route) => ({
  path: route.path,
  title: route.title,
  element: pageElements[route.path],
}));

export default function App() {
  const { pathname, hash } = useLocation();
  const matchedPage = matchRoutes(pages, pathname)?.[0]?.route;
  const previousPath = useRef(pathname);

  useEffect(() => {
    applyDocumentSeo(matchedPage?.path ?? pathname);
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' });
    if (previousPath.current !== pathname)
      document.getElementById('main-content')?.focus({ preventScroll: true });
    previousPath.current = pathname;
  }, [pathname, hash, matchedPage]);

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <div key={pathname} className="page-transition">
          <Suspense
            fallback={
              <div className="shell route-loading" role="status">
                Opening the next chapter…
              </div>
            }
          >
            <Routes>
              {pages.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
              <Route
                path="*"
                element={
                  <div className="not-found">
                    <PageHero
                      eyebrow="404 / Off the map"
                      title="This page took a different path."
                      description="The page you’re looking for isn’t here. Let’s get you back to something good."
                    >
                      <Link to="/" className="button button-primary">
                        Back to the studio
                      </Link>
                    </PageHero>
                  </div>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}

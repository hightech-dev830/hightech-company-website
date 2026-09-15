import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Mounted inside Suspense so fragment targets exist before positioning. */
export default function HashScroll() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    let id: string;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      return;
    }
    let cancelled = false;
    let frame = 0;
    let target: HTMLElement | null = null;
    let addedTabIndex = false;
    const position = () => {
      if (cancelled) return;
      target = document.getElementById(id);
      if (!target) return;
      addedTabIndex = !target.hasAttribute('tabindex');
      if (addedTabIndex) target.setAttribute('tabindex', '-1');
      // Focus also lets Reveal remove its entry transform before measurement.
      target.focus({ preventScroll: true });
      frame = requestAnimationFrame(() => {
        if (!cancelled) target?.scrollIntoView({ block: 'start', behavior: 'instant' });
      });
    };
    if (document.fonts?.ready) void document.fonts.ready.then(position, position);
    else position();
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      if (addedTabIndex) target?.removeAttribute('tabindex');
    };
  }, [pathname, hash]);
  return null;
}

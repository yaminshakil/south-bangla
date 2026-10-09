import { useEffect, useRef, useState } from 'react';

export const reduceMotion = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
export const tel = (p) => p.replace(/[^+\d]/g, '');
export const html = (s) => ({ __html: s });
export const initial = (n) => n.replace(/^(Engr\.|Md\.?|SK\.?)\s*(\(BUET\)\s*)?/, '')[0] || '•';

const ICONS = {
  wheat: <path d="M12 22V8M12 8c-2-1-3-3-3-5 2 1 3 3 3 5zm0 0c2-1 3-3 3-5-2 1-3 3-3 5zm0 5c-2-1-3-3-3-5 2 1 3 3 3 5zm0 0c2-1 3-3 3-5-2 1-3 3-3 5zm0 5c-2-1-3-3-3-5 2 1 3 3 3 5zm0 0c2-1 3-3 3-5-2 1-3 3-3 5z" />,
  thread: <><circle cx="12" cy="12" r="8" /><path d="M4 12c4-3 12-3 16 0M5 17c4-3 10-3 14 0M5 7c4 3 10 3 14 0" /></>,
  jute: <><path d="M6 4h12l1 4-2 12H7L5 8z" /><path d="M5 8h14M9 4v4M15 4v4M9 12h6" /></>,
  building: <path d="M4 21V8l8-5 8 5v13zM9 21v-6h6v6M8 11h2M14 11h2" />,
  palm: <path d="M12 21V11M12 11c-1-4-4-5-7-4 2 0 4 1 5 3M12 11c1-4 4-5 7-4-2 0-4 1-5 3M12 11c-3-2-4-5-3-8 1 2 2 4 3 8zm0 0c3-2 4-5 3-8-1 2-2 4-3 8zM4 21h16" />,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
  pin: <><path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>
};
export const Icon = ({ name }) => <svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[name]}</svg>;

/* Adds "in" to every .reveal inside the page as it scrolls into view. Runs after every render. */
let io;
export function useReveal() {
  useEffect(() => {
    if (!io) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    }
    document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el));
  });
}

/* Animated number that counts up once it scrolls into view. */
export function CountUp({ end, prefix = '', suffix = '', plus = false }) {
  const ref = useRef(null);
  const dec = String(end).includes('.') ? 1 : 0;
  const fmt = (n) => n.toLocaleString(undefined, { minimumFractionDigits: dec, maximumFractionDigits: dec });
  const [text, setText] = useState(prefix + fmt(0) + suffix);
  useEffect(() => {
    const el = ref.current;
    let raf;
    const run = () => {
      if (reduceMotion()) { setText(prefix + fmt(end) + suffix + (plus ? '+' : '')); return; }
      const t0 = performance.now(), dur = 1800;
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
        setText(prefix + fmt(dec ? +(end * e).toFixed(1) : Math.round(end * e)) + suffix + (p === 1 && plus ? '+' : ''));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const obs = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { run(); obs.disconnect(); } }), { threshold: 0.5 });
    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end, prefix, suffix, plus]);
  return <b ref={ref}>{text}</b>;
}

/* Renders a trusted markup string (a few translated strings contain <br> / <em>). */
export function Html({ as: Tag = 'span', s, ...rest }) {
  return <Tag {...rest} dangerouslySetInnerHTML={{ __html: s }} />;
}

import { useEffect, useRef } from 'react';
import { reduceMotion } from '../lib.jsx';

/* Slowly rising golden particles behind the hero. */
export default function Dust() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv || reduceMotion()) return undefined;
    const ctx = cv.getContext('2d');
    let w, h, pts, run = true, raf;
    const resize = () => {
      const r = cv.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.width = r.width * dpr; h = cv.height = r.height * dpr;
      pts = Array.from({ length: Math.round(r.width / 16) }, () => ({ x: Math.random() * w, y: Math.random() * h, r: (Math.random() * 1.8 + 0.4) * dpr, v: (Math.random() * 0.35 + 0.08) * dpr, a: Math.random() * 0.6 + 0.2, p: Math.random() * 6 }));
    };
    const loop = () => {
      if (!run) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.y -= p.v; p.p += 0.02; p.x += Math.sin(p.p) * 0.25;
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.fillStyle = `rgba(232,203,133,${p.a * (0.6 + 0.4 * Math.sin(p.p * 2))})`; ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    resize();
    addEventListener('resize', resize);
    const obs = new IntersectionObserver((e) => { const was = run; run = e[0].isIntersecting; if (run && !was) loop(); });
    obs.observe(cv);
    loop();
    return () => { run = false; cancelAnimationFrame(raf); obs.disconnect(); removeEventListener('resize', resize); };
  }, []);
  return <canvas id="dust" ref={ref} aria-hidden="true" />;
}

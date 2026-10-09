import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useApp } from '../AppContext.jsx';

export default function Lightbox() {
  const { lb, setLb } = useApp();
  const closeRef = useRef(null);
  const n = lb ? lb.list.length : 0;
  const step = (d) => setLb((s) => ({ ...s, i: (s.i + d + n) % n }));

  useEffect(() => {
    if (!lb) return undefined;
    closeRef.current && closeRef.current.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') { setLb(null); e.stopPropagation(); e.preventDefault(); }
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!lb, n]);

  if (!lb) return null;
  // A modal <dialog> lives in the browser's top layer, so the lightbox goes inside it when it is open.
  const host = document.querySelector('dialog[open]') || document.body;
  return createPortal(
    <div className="lightbox" onClick={(e) => { if (e.target === e.currentTarget) setLb(null); }}>
      <button className="lb-x" ref={closeRef} aria-label="Close" onClick={() => setLb(null)}>×</button>
      <button className="lb-prev" aria-label="Previous" onClick={() => step(-1)}>‹</button>
      <img alt="" src={lb.list[lb.i]} />
      <button className="lb-next" aria-label="Next" onClick={() => step(1)}>›</button>
    </div>,
    host
  );
}

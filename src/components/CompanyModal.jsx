import { Fragment, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../AppContext.jsx';
import { COMPANIES } from '../data/data.js';
import { ContactLine, LeaderChip, Pills, Tags } from './shared.jsx';

function Body({ id }) {
  const { C, ui, sectorOf, openLightbox } = useApp();
  const c = C(id);
  const ex = c.extra || {};
  return (
    <>
      <div className={`m-hero ${c.cover ? '' : 'logo-hero'}`}>
        <img src={c.cover || c.logo} alt="" style={c.cover ? { objectPosition: c.position || 'center' } : undefined} />
        <div className="m-hero-text">
          <p className="eyebrow" style={{ color: 'var(--gold-2)' }}>{sectorOf(c.sector).label}</p>
          <h2 id="mTitle">{c.name}</h2>
          <p>{c.tag}</p>
        </div>
      </div>
      <div className="m-content">
        <div className="m-grid">
          <div className="m-about">{c.about.map((p, i) => <p key={i}>{p}</p>)}<Tags items={c.highlights} /></div>
          <dl className="m-facts">{c.facts.map(([k, v]) => <Fragment key={k}><dt>{k}</dt><dd>{v}</dd></Fragment>)}</dl>
        </div>
        {c.gallery.length > 0 && (
          <div><h3 className="m-title">{ui('m.gallery', 'Photo gallery')}</h3>
            <div className="gallery">{c.gallery.map((g, i) => (
              <button key={g} aria-label={i + 1} onClick={() => openLightbox(c.gallery, i)}><img src={g} alt={`${c.short} ${i + 1}`} loading="lazy" /></button>
            ))}</div>
          </div>
        )}
        {ex.buyers && (
          <div><h3 className="m-title">{ex.title}</h3><Pills items={ex.buyers} />
            <h3 className="m-title" style={{ marginTop: 22 }}>{ui('m.certs', 'Certifications & standards')}</h3><Pills items={ex.certs} gold /></div>
        )}
        {ex.siblings && <div><h3 className="m-title">{ex.siblingsTitle}</h3><Pills items={ex.siblings} /></div>}
        {c.leaders.length > 0 && (
          <div><h3 className="m-title">{ui('m.leaders', 'Leadership')}</h3><div className="m-leaders">{c.leaders.map((l) => <LeaderChip key={l.name + l.role} l={l} />)}</div></div>
        )}
        <div><h3 className="m-title">{ui('m.contact', 'Contact & locations')}</h3>
          <dl className="m-contacts">{c.contacts.map(([k, v]) => <ContactLine key={k + v} k={k} v={v} />)}</dl></div>
        <div className="m-cta">
          <Link className="btn btn-gold" to="/contact">{ui('m.cta1', 'Contact the group')}</Link>
          <button className="btn btn-ghost" data-close type="button">{ui('m.cta2', 'Back to all companies')}</button>
        </div>
      </div>
    </>
  );
}

export default function CompanyModal() {
  const { openId, closeCompany } = useApp();
  const ref = useRef(null);
  const lastFocus = useRef(null);

  useEffect(() => {
    const d = ref.current;
    if (openId && !d.open) {
      lastFocus.current = document.activeElement;
      d.showModal();
      d.scrollTop = 0;
      document.documentElement.style.overflow = 'hidden';
      history.replaceState(history.state, '', '#' + openId);
    } else if (!openId && d.open) {
      d.close();
    }
  }, [openId]);

  const onClose = () => {
    closeCompany();
    document.documentElement.style.overflow = '';
    if (COMPANIES.some((c) => '#' + c.id === location.hash)) history.replaceState(history.state, '', location.pathname + location.search);
    const f = lastFocus.current;
    if (f && f.focus) f.focus({ preventScroll: true });
  };

  return (
    <dialog className="modal" id="modal" ref={ref} aria-labelledby="mTitle" onClose={onClose}
      onClick={(e) => { if (e.target === ref.current || e.target.closest('[data-close]')) ref.current.close(); }}>
      <button className="modal-x" id="modalX" aria-label="Close" onClick={() => ref.current.close()}>×</button>
      <div className="modal-body" id="modalBody">{openId && <Body id={openId} />}</div>
    </dialog>
  );
}

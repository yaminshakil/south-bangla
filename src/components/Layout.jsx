import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../AppContext.jsx';
import CompanyModal from './CompanyModal.jsx';
import Lightbox from './Lightbox.jsx';

const LOGO = `${import.meta.env.BASE_URL}assets/img/logo-sbg.jpg`;
export { LOGO };

const LINKS = [
  ['/about', 'nav.about', 'About'],
  ['/what-we-do', 'nav.what', 'What we do'],
  ['/companies', 'nav.companies', 'Our companies'],
  ['/leadership', 'nav.leadership', 'Leadership']
];

function Nav({ solidAlways }) {
  const { ui, bn, toggleLang } = useApp();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(scrollY > 40);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);
  const close = () => setOpen(false);
  return (
    <header className={`nav${solid || solidAlways ? ' solid' : ''}`} id="nav">
      <Link className="brand" to="/" aria-label="South Bangla Group — home" onClick={close}>
        <span className="brand-mark"><img src={LOGO} alt="" /></span>
        <span className="brand-text">South Bangla <em>Group</em></span>
      </Link>
      <nav className={`nav-links${open ? ' open' : ''}`} id="navLinks" aria-label="Main" onClick={(e) => { if (e.target.closest('a')) close(); }}>
        {LINKS.map(([to, k, en]) => <NavLink key={to} to={to}>{ui(k, en)}</NavLink>)}
        <NavLink to="/contact" className="btn btn-gold btn-sm">{ui('nav.contact', 'Contact')}</NavLink>
        <button className="lang" id="lang" type="button" aria-label="Switch language / ভাষা পরিবর্তন" aria-pressed={bn} onClick={toggleLang}>
          <span className={!bn ? 'on' : ''}>EN</span><i></i><span className={bn ? 'on' : ''}>বাং</span>
        </button>
      </nav>
      <button className="burger" id="burger" aria-label="Open menu" aria-expanded={open} aria-controls="navLinks" onClick={() => setOpen((o) => !o)}><span></span><span></span><span></span></button>
    </header>
  );
}

function Footer() {
  const { ui } = useApp();
  return (
    <footer className="footer">
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <span className="brand-mark big"><img src={LOGO} alt="" /></span>
          <div><b>South Bangla Group</b><small>{ui('foot.tag', 'Rooted in the land. Growing across industries.')}</small></div>
        </div>
        <nav aria-label="Footer">
          {LINKS.map(([to, k, en]) => <NavLink key={to} to={to}>{ui(k, en)}</NavLink>)}
          <NavLink to="/contact">{ui('nav.contact', 'Contact')}</NavLink>
        </nav>
      </div>
      <p className="copy">© {new Date().getFullYear()} South Bangla Group. <span>{ui('foot.copy', 'All rights reserved.')}</span></p>
    </footer>
  );
}

/* Scroll to top on page change, or to the #anchor if there is one. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) { scrollTo(0, 0); return; }
    const id = decodeURIComponent(hash.slice(1));
    const timer = setTimeout(() => { const el = document.getElementById(id); if (el) el.scrollIntoView(); }, 80);
    return () => clearTimeout(timer);
  }, [pathname, hash]);
  return null;
}

export default function Layout({ children, solid = false, titleEn, titleBn }) {
  const { bn, ui } = useApp();
  useEffect(() => { document.title = (bn && titleBn) || titleEn; }, [bn, titleEn, titleBn]);
  return (
    <>
      <a className="skip" href="#main">{ui('skip', 'Skip to content')}</a>
      <ScrollManager />
      <Nav solidAlways={solid} />
      <main id="main">{children}</main>
      <Footer />
      <CompanyModal />
      <Lightbox />
    </>
  );
}


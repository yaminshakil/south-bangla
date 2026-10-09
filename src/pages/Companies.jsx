import { useEffect, useRef, useState } from 'react';
import { useApp } from '../AppContext.jsx';
import { COMPANIES, GROUP_CONTACT } from '../data/data.js';
import Layout from '../components/Layout.jsx';
import { ContactLine, Pills, Tags, NoPhoto } from '../components/shared.jsx';
import { Html, tel, useReveal } from '../lib.jsx';
import { contactOf, regionName, regionsOf } from './helpers.js';
import { Link, useLocation } from 'react-router-dom';

function Detail({ c, tab, setTab }) {
  const { t, role, sectorOf, openLightbox } = useApp();
  const ex = c.extra || {};
  const tabs = [['overview', t('Overview', 'সারসংক্ষেপ')], ['photos', t('Photos', 'ছবি')], ['people', t('People', 'মানুষ')], ['contact', t('Contact', 'যোগাযোগ')]]
    .filter(([k]) => k !== 'photos' || c.gallery.length);
  const active = tabs.some(([k]) => k === tab) ? tab : 'overview';
  const em = contactOf(c, 'Email');

  return (
    <article className="cx-detail">
      <div className={`cx-banner ${c.cover ? '' : 'logo'}`}>
        <img src={c.cover || c.logo} alt="" style={{ objectPosition: c.position || 'center' }} />
        <div><p className="eyebrow">{sectorOf(c.sector).label}</p><h2>{c.name}</h2><p>{c.tag}</p></div>
      </div>
      <div className="cx-tabs" role="tablist">
        {tabs.map(([k, l]) => <button type="button" role="tab" key={k} aria-selected={k === active} onClick={() => setTab(k)}>{l}</button>)}
      </div>
      <div className="cx-body">
        {active === 'overview' && (
          <>
            <div className="cx-ov">
              <div className="cx-about">{c.about.map((p, i) => <p key={i}>{p}</p>)}<Tags items={c.highlights} /></div>
              <dl className="cx-facts">{c.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            </div>
            {ex.buyers && <><h3>{ex.title}</h3><Pills items={ex.buyers} /><h3>{t('Certifications & standards', 'সনদ ও মান')}</h3><Pills items={ex.certs} gold /></>}
            {ex.siblings && <><h3>{ex.siblingsTitle}</h3><ol className="sib">{ex.siblings.map((b) => <li key={b}>{b}</li>)}</ol></>}
          </>
        )}
        {active === 'photos' && (
          <div className="gallery">{c.gallery.map((g, i) => (
            <button type="button" key={g} aria-label={i + 1} onClick={() => openLightbox(c.gallery, i)}><img src={g} alt={`${c.short} ${i + 1}`} loading="lazy" /></button>
          ))}</div>
        )}
        {active === 'people' && (
          <div className="cx-people">{c.leaders.map((l) => (
            <div className="cx-person" key={l.name + l.role}>
              {l.photo ? <img src={l.photo} alt={l.name} loading="lazy" /> : <NoPhoto name={l.name} big />}
              <b>{l.name}</b><small>{role(l.role)}</small>
            </div>
          ))}</div>
        )}
        {active === 'contact' && (
          <>
            <dl className="m-contacts">{c.contacts.map(([k, v]) => <ContactLine key={k + v} k={k} v={v} />)}</dl>
            <p className="cx-cta">
              <a className="btn btn-gold" href={`mailto:${em || GROUP_CONTACT.email}?subject=${encodeURIComponent('Enquiry — ' + c.name)}`}>{t('Write to this company', 'এই প্রতিষ্ঠানকে লিখুন')}</a>{' '}
              <Link className="btn btn-ghost-dk" to="/contact">{t("Use the contact page", "যোগাযোগ পেজ")}</Link>
            </p>
          </>
        )}
      </div>
    </article>
  );
}

export default function Companies() {
  useReveal();
  const app = useApp();
  const { t, co, sectors, sectorOf, inSector } = app;
  const { hash } = useLocation();
  const initialId = () => { const h = hash.slice(1); return COMPANIES.some((c) => c.id === h) ? h : COMPANIES[0].id; };
  const [id, setId] = useState(initialId);
  const [tab, setTab] = useState('overview');
  const [sector, setSector] = useState('all');
  const [q, setQ] = useState('');
  const wrapRef = useRef(null);

  useEffect(() => { setId(initialId()); setTab('overview'); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [hash]);

  const match = (c) => {
    if (sector !== 'all' && !inSector(c, sector)) return false;
    const needle = q.trim().toLowerCase();
    return !needle || [c.name, c.tag, c.summary, c.highlights.join(' '), c.about.join(' '), c.contacts.map((x) => x[1]).join(' ')].join(' ').toLowerCase().includes(needle);
  };
  const list = COMPANIES.map(co).filter(match);
  const pick = (cid) => {
    setId(cid); setTab('overview');
    history.replaceState(history.state, '', '#' + cid);
    wrapRef.current && wrapRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout solid titleEn="Our companies — South Bangla Group" titleBn="আমাদের প্রতিষ্ঠান — সাউথ বাংলা গ্রুপ">
      <header className="cx-hero">
        <div className="wrap">
          <p className="eyebrow reveal">{t('Company explorer', 'প্রতিষ্ঠান এক্সপ্লোরার')}</p>
          <Html as="h1" className="reveal" s={t('Eight companies.<br>Find the one you need.', 'আটটি প্রতিষ্ঠান।<br>আপনার দরকারিটি খুঁজে নিন।')} />
          <div className="cx-tools reveal">
            <label className="cx-search"><span className="sr">{t('Search companies', 'প্রতিষ্ঠান খুঁজুন')}</span>
              <input type="search" placeholder={t('Search by name, product or place…', 'নাম, পণ্য বা স্থান দিয়ে খুঁজুন…')} value={q} onChange={(e) => setQ(e.target.value)} /></label>
            <div className="filters">
              {[{ id: 'all', label: t('All', 'সব') }, ...sectors()].map((s) => (
                <button type="button" className="chip" key={s.id} aria-pressed={s.id === sector} onClick={() => setSector(s.id)}>{s.label}</button>
              ))}
            </div>
          </div>
        </div>
      </header>
      <div className="wrap cx-wrap" ref={wrapRef}>
        <nav className="cx-list" aria-label={t('Companies', 'প্রতিষ্ঠান')}>
          {list.length ? list.map((c) => (
            <button type="button" key={c.id} className={`cx-row ${c.id === id ? 'on' : ''}`} onClick={() => pick(c.id)}>
              <span className={`th ${c.cover ? '' : 'logo'}`}><img src={c.cover || c.logo} alt="" loading="lazy" /></span>
              <span className="tx"><b>{c.name}</b><small>{sectorOf(c.sector).label}</small></span>
            </button>
          )) : <p className="empty">{t('No company matches. Try a different word.', 'কোনো প্রতিষ্ঠান মেলেনি। অন্য শব্দ চেষ্টা করুন।')}</p>}
        </nav>
        <Detail c={app.C(id)} tab={tab} setTab={setTab} />
      </div>
      <section className="cx-compare">
        <div className="wrap">
          <h2>{t('Compare the companies', 'প্রতিষ্ঠানগুলোর তুলনা')}</h2>
          <div className="tbl-wrap"><table>
            <thead><tr><th>{t('Company', 'প্রতিষ্ঠান')}</th><th>{t('Industry', 'শিল্প')}</th><th>{t('Founded', 'প্রতিষ্ঠা')}</th><th>{t('Where', 'কোথায়')}</th><th>{t('Led by', 'নেতৃত্বে')}</th><th>{t('Phone', 'ফোন')}</th></tr></thead>
            <tbody>{COMPANIES.map((b) => {
              const c = co(b), f = c.facts.find(([k]) => k === 'Founded' || k === 'প্রতিষ্ঠা');
              const lead = c.leaders.filter((l) => /Chairman|Managing Director$|Leads/.test(l.role) && !/Deputy/.test(l.role)).slice(0, 2).map((l) => l.name).join(', ');
              const ph = contactOf(c, 'Phone').split(',')[0];
              return (
                <tr key={c.id} onClick={() => pick(c.id)}>
                  <th><button type="button" className="linkish">{c.name}</button></th>
                  <td>{sectorOf(c.sector).label}</td>
                  <td>{f ? f[1] : '—'}</td>
                  <td>{regionsOf(c.id, app).map((r) => regionName(r, app.bn)).join(' · ')}</td>
                  <td>{lead}</td>
                  <td>{ph ? <a href={`tel:${tel(ph)}`} onClick={(e) => e.stopPropagation()}>{ph.trim()}</a> : '—'}</td>
                </tr>
              );
            })}</tbody>
          </table></div>
        </div>
      </section>
    </Layout>
  );
}

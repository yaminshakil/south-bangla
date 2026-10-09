import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext.jsx';
import { COMPANIES, GROUP_CONTACT, PEOPLE, SECTORS as BASE_SECTORS } from '../data/data.js';
import Dust from '../components/Dust.jsx';
import EnquiryForm from '../components/EnquiryForm.jsx';
import Layout, { LOGO } from '../components/Layout.jsx';
import { I18n } from '../components/shared.jsx';
import { CountUp, Icon, reduceMotion, tel, useReveal } from '../lib.jsx';

const RIBBON = ['kfl-sew', 'lake-pool', 'son-loom', 'prem-b7', 'sb-onion1', 'delta-sew', 'arjs-dairy', 'lake-pine1', 'kfl-ship', 'prem-stone', 'son-rolls', 'sb-turmeric', 'delta-spin', 'lake-poultry2', 'kfl-print', 'prem-b3'];
const img = (n) => `${import.meta.env.BASE_URL}assets/img/${n}.jpg`;
const more = <I18n k="more" en="See the full page →" />;

function SectorTile({ s, i }) {
  const { inSector } = useApp();
  const navigate = useNavigate();
  const names = COMPANIES.filter((c) => inSector(c, s.id)).map((c) => c.short).join(' · ');
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', e.clientX - r.left + 'px');
    e.currentTarget.style.setProperty('--my', e.clientY - r.top + 'px');
  };
  return (
    <button className="sector reveal" style={{ '--d': `${i * 0.07}s` }} onPointerMove={onMove} onClick={() => navigate('/what-we-do#' + s.id)}>
      <Icon name={s.icon} /><h3>{s.label}</h3><p>{s.blurb}</p><span className="who">{names}</span>
    </button>
  );
}

function CompanyCard({ base, i, hidden }) {
  const { co, ui, sectorOf, openCompany } = useApp();
  const c = co(base);
  const onMove = (e) => {
    if (reduceMotion() || !matchMedia('(hover:hover)').matches) return;
    const el = e.currentTarget, r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-6px)`;
  };
  return (
    <button className={`card reveal${hidden ? ' hide' : ''}`} style={{ '--d': `${(i % 4) * 0.08}s` }} aria-label={c.name}
      onClick={() => openCompany(c.id)} onPointerMove={onMove} onPointerLeave={(e) => { e.currentTarget.style.transform = ''; }}>
      <div className="card-img">
        {c.cover ? <img src={c.cover} alt="" loading="lazy" style={{ objectPosition: c.position || 'center' }} />
          : <div className="logo-fill"><img src={c.logo} alt={c.name} loading="lazy" /></div>}
        <span className="badge">{sectorOf(c.sector).label}</span>
      </div>
      <div className="card-body"><h3>{c.name}</h3><p>{c.summary}</p><span className="more">{ui('co.explore', 'Explore')} <i>→</i></span></div>
    </button>
  );
}

export default function Home() {
  useReveal();
  const { bn, ui, t, sectors, inSector, role, openCompany } = useApp();
  const { hash } = useLocation();
  const [filter, setFilter] = useState('all');

  // Old-style deep links: /#agro filters the cards, /#arjs opens that company.
  useEffect(() => {
    const id = hash.slice(1);
    if (BASE_SECTORS.some((x) => x.id === id)) { setFilter(id); return undefined; }
    if (COMPANIES.some((c) => c.id === id)) { const timer = setTimeout(() => openCompany(id), 300); return () => clearTimeout(timer); }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const secs = sectors();
  const hd = (i) => ({ '--d': `${i * 0.12}s` });
  return (
    <Layout titleEn="South Bangla Group — Rooted in Bangladesh, Growing Across Industries" titleBn="সাউথ বাংলা গ্রুপ — মাটির সাথে শিকড়, শিল্পে শিল্পে প্রসার">
      <section className="hero">
        <Dust />
        <div className="hero-inner">
          <div className="hero-copy">
            <I18n as="p" className="eyebrow reveal" style={hd(0)} k="hero.eyebrow" en="A family of companies · Bangladesh" />
            <I18n as="h1" className="reveal" style={hd(1)} k="hero.h1" en={'Rooted in the land.<br><span class="gold-text">Growing across industries.</span>'} />
            <I18n as="p" className="lead reveal" style={hd(2)} k="hero.lead" en="South Bangla Group brings together farms, food mills, garment factories, a jute mill, real estate, a nature resort and a trading house — all built on quality, trust and honest work." />
            <div className="hero-cta reveal" style={hd(3)}>
              <Link to="/companies" className="btn btn-gold">{ui('hero.cta1', 'Meet our companies')}</Link>
              <Link to="/about" className="btn btn-ghost">{ui('hero.cta2', 'Who we are')}</Link>
            </div>
          </div>
          <div className="hero-logo reveal">
            <div className="ring ring-a"></div><div className="ring ring-b"></div>
            <div className="logo-disc"><img src={LOGO} alt="South Bangla Group logo — leaves, wheat and water in a circle" /></div>
          </div>
        </div>
        <div className="stats">
          <div className="stat"><CountUp end={8} /><span>{ui('stat.1', 'Group companies')}</span></div>
          <div className="stat"><CountUp end={6} /><span>{ui('stat.2', 'Industries')}</span></div>
          <div className="stat"><CountUp end={9000} plus /><span>{ui('stat.3', 'People working at Delta Group')}</span></div>
          <div className="stat"><CountUp end={30} prefix="US$ " suffix="M" /><span>{ui('stat.4', 'Yearly exports, Khantex Fashions')}</span></div>
        </div>
        <a className="scroll-cue" href="#about" aria-label="Scroll down"><span></span></a>
      </section>

      <div className="ribbon" aria-hidden="true"><div className="ribbon-track">
        {[...RIBBON, ...RIBBON].map((n, i) => <img key={i} src={img(n)} alt="" loading="lazy" />)}
      </div></div>

      <section className="section" id="about">
        <div className="wrap about-grid">
          <div className="about-text">
            <I18n as="p" className="eyebrow reveal" k="about.eyebrow" en="About the group" />
            <I18n as="h2" className="reveal" k="about.h2" en="One family. Many companies. One standard of quality." />
            <I18n as="p" className="reveal" k="about.p1" en="South Bangla Group owns and runs a growing set of companies. Some grow food, some make clothes, some spin jute, some build homes, and one welcomes guests to a green resort. Each company has its own team and its own work — and all of them carry the same promise." />
            <I18n as="p" className="reveal" k="about.p2" en="That promise is in the group’s own words: <em>sustainable growth, innovation and quality</em> — connecting modern business with nature, and being a good partner to every client, supplier and employee." />
            <ul className="values reveal">
              {[['1', 'Quality first', 'Careful checks at every step, from raw material to finished product.'],
                ['2', 'Promises kept', 'On-time delivery and honest dealings with every customer.'],
                ['3', 'Respect for nature', 'Green factories, farm waste reused, eco-friendly methods.'],
                ['4', 'People matter', 'Thousands of jobs, training, and safe workplaces.']].map(([n, h, d]) => (
                <li key={n}><span className="vi">✦</span><div><I18n as="b" k={`val.${n}`} en={h} /><I18n as="small" k={`val.${n}s`} en={d} /></div></li>
              ))}
            </ul>
            <p className="more-link reveal"><Link className="btn btn-dark" to="/about">{more}</Link></p>
          </div>
          <div className="about-visual reveal">
            <div className="frame frame-tall"><img src={img('delta-bld')} alt="Delta Group industrial park" loading="lazy" /></div>
            <div className="frame frame-sm a"><img src={img('lake-pool')} alt="Lake View resort pool" loading="lazy" /></div>
            <div className="frame frame-sm b"><img src={img('son-loom')} alt="Jute mill looms" loading="lazy" /></div>
          </div>
        </div>
      </section>

      <section className="section dark" id="sectors">
        <div className="wrap">
          <div className="section-head center">
            <I18n as="p" className="eyebrow reveal" k="sec.eyebrow" en="What we do" />
            <I18n as="h2" className="reveal" k="sec.h2" en="Six industries, one group" />
            <I18n as="p" className="reveal sub" k="sec.sub" en="Tap any industry to see the companies that work in it." />
          </div>
          <div className="sector-grid">{secs.map((s, i) => <SectorTile key={s.id} s={s} i={i} />)}</div>
          <p className="more-link reveal"><Link className="btn btn-gold" to="/what-we-do">{more}</Link></p>
        </div>
      </section>

      <section className="section" id="companies">
        <div className="wrap">
          <div className="section-head">
            <I18n as="p" className="eyebrow reveal" k="co.eyebrow" en="Our companies" />
            <I18n as="h2" className="reveal" k="co.h2" en="Eight companies. Choose one to explore." />
            <I18n as="p" className="reveal sub" k="co.sub" en="Every company below is part of South Bangla Group. Use the filters to narrow by industry, then press a card to see photos, leaders and contact details." />
          </div>
          <div className="filters reveal" role="tablist" aria-label="Filter by industry">
            {[{ id: 'all', label: ui('co.all', 'All companies') }, ...secs].map((s) => (
              <button key={s.id} className="chip" role="tab" aria-selected={s.id === filter} onClick={() => setFilter(s.id)}>{s.label}</button>
            ))}
          </div>
          <div className="cards">
            {COMPANIES.map((c, i) => <CompanyCard key={c.id} base={c} i={i} hidden={filter !== 'all' && !inSector(c, filter)} />)}
          </div>
          <p className="more-link reveal"><Link className="btn btn-gold" to="/companies">{more}</Link></p>
        </div>
      </section>

      <section className="section tint" id="structure">
        <div className="wrap">
          <div className="section-head center">
            <I18n as="p" className="eyebrow reveal" k="tree.eyebrow" en="How it fits together" />
            <I18n as="h2" className="reveal" k="tree.h2" en="The group at a glance" />
          </div>
          <div className="tree reveal">
            <div className="tree-root"><span className="brand-mark"><img src={LOGO} alt="" /></span>{bn ? 'সাউথ বাংলা গ্রুপ' : 'South Bangla Group'}</div>
            <div className="tree-stem"></div>
            <div className="tree-cols">
              {secs.map((s) => (
                <div className="tree-col" key={s.id}>
                  <div className="tree-sector">{s.label}</div>
                  {COMPANIES.filter((c) => c.sector === s.id).map((c) => <button key={c.id} className="tree-co" onClick={() => openCompany(c.id)}>{c.short}</button>)}
                </div>
              ))}
            </div>
          </div>
          <I18n as="p" className="note reveal" k="tree.note" en="Delta Group and KFL Group each include several associated units of their own — open their company pages to see the full list." />
        </div>
      </section>

      <section className="section" id="leadership">
        <div className="wrap">
          <div className="section-head center">
            <I18n as="p" className="eyebrow reveal" k="lead.eyebrow" en="Leadership" />
            <I18n as="h2" className="reveal" k="lead.h2" en="The people behind the companies" />
            <I18n as="p" className="reveal sub" k="lead.sub" en="Several leaders serve on more than one board — a sign of how closely the companies work together." />
          </div>
          <div className="people">
            {PEOPLE.map((p, i) => (
              <article className="person reveal" style={{ '--d': `${(i % 5) * 0.07}s` }} key={p.name}>
                <img src={p.photo} alt={p.name} loading="lazy" />
                <div className="person-body"><h3>{p.name}</h3>
                  {p.roles.map(([c, r]) => <div className="role" key={c + r}><b>{role(r)}</b> · {c}</div>)}
                </div>
              </article>
            ))}
          </div>
          <p className="more-link reveal"><Link className="btn btn-gold" to="/leadership">{more}</Link></p>
        </div>
      </section>

      <section className="section dark" id="contact">
        <div className="wrap contact-grid">
          <div>
            <I18n as="p" className="eyebrow reveal" k="ct.eyebrow" en="Get in touch" />
            <I18n as="h2" className="reveal" k="ct.h2" en="Let’s talk business." />
            <I18n as="p" className="reveal" k="ct.p" en="Whether you want to buy, partner, visit a farm, or ask about any company in the group — send us a message and the right team will reply." />
            <ul className="contact-list reveal">
              <li><span className="ci"><Icon name="pin" /></span><div><small>{ui('ct.office', 'Group office')}</small>{GROUP_CONTACT.address}</div></li>
              <li><span className="ci"><Icon name="phone" /></span><div><small>{ui('ct.phone', 'Phone')}</small><a href={`tel:${tel(GROUP_CONTACT.phone)}`}>{GROUP_CONTACT.phone}</a></div></li>
              <li><span className="ci"><Icon name="mail" /></span><div><small>{ui('ct.email', 'Email')}</small><a href={`mailto:${GROUP_CONTACT.email}`}>{GROUP_CONTACT.email}</a></div></li>
            </ul>
          </div>
          <EnquiryForm className="form reveal" text={{
            name: ui('f.name', 'Your name'), from: ui('f.from', 'Phone or email'), company: ui('f.company', 'Which company?'),
            any: ui('f.any', 'Not sure / whole group'), wholeGroup: ui('f.any', 'Whole group'), msg: ui('f.msg', 'Message'), send: ui('f.send', 'Send message'),
            note: ui('f.note', 'This opens your email app with the message ready to send.'),
            bad: ui('f.bad', 'Please fill in your name, how to reach you, and a message.'),
            ok: ui('f.ok', 'Thank you! Your email app should now open with the message ready to send.')
          }} />
        </div>
      </section>
    </Layout>
  );
}

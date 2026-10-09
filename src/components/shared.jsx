import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../AppContext.jsx';
import { COMPANIES, GROUP_CONTACT } from '../data/data.js';
import { initial, tel } from '../lib.jsx';

export function ContactLine({ k, v }) {
  const { bn, label } = useApp();
  let val = v;
  if (k === 'Email') val = <a href={`mailto:${v}`}>{v}</a>;
  else if (k === 'Phone') val = v.split(',').map((p, i) => <span key={i}>{i > 0 && ', '}<a href={`tel:${tel(p)}`}>{p.trim()}</a></span>);
  else if (k === 'Group desk' && bn) val = 'অনুগ্রহ করে গ্রুপের যোগাযোগের তথ্য ব্যবহার করুন';
  return <div><dt>{label(k)}</dt><dd>{val}</dd></div>;
}

export function Phones({ value }) {
  return value.split(',').map((p, i) => <span key={i}>{i > 0 && ', '}<a href={`tel:${tel(p)}`}>{p.trim()}</a></span>);
}

export function NoPhoto({ name, big }) {
  return <span className={`noph${big ? ' big' : ''}`}>{initial(name)}</span>;
}

export function LeaderChip({ l }) {
  const { role } = useApp();
  return (
    <div className="leader">
      {l.photo ? <img src={l.photo} alt="" loading="lazy" /> : <NoPhoto name={l.name} />}
      <div><b>{l.name}</b><small>{role(l.role)}</small></div>
    </div>
  );
}

export function NextBand({ links, heading }) {
  return (
    <section className="next-band"><div className="wrap">
      <h2>{heading}</h2>
      <p>{links.map(([u, l]) => <Link key={u} className="btn btn-gold" to={u}>{l} →</Link>)}</p>
    </div></section>
  );
}

export function Pills({ items, gold }) {
  return <div className="pillrow">{items.map((b) => <span key={b} className={`pill${gold ? ' gold' : ''}`}>{b}</span>)}</div>;
}

export function Tags({ items }) {
  return <div className="tags">{items.map((h) => <span key={h} className="tag">{h}</span>)}</div>;
}

/* An element whose text comes from the language table (some entries contain <br>, <em> etc.). */
export function I18n({ k, en, as: Tag = 'span', ...rest }) {
  const { ui } = useApp();
  return <Tag {...rest} dangerouslySetInnerHTML={{ __html: ui(k, en) }} />;
}


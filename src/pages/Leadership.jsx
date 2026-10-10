import { useApp } from '../AppContext.jsx';
import { COMPANIES, GROUP_LEADERS } from '../data/data.js';
import Layout from '../components/Layout.jsx';
import { NextBand, NoPhoto } from '../components/shared.jsx';
import { Html, useReveal } from '../lib.jsx';
import { allPeople } from './helpers.js';

const code = (r) => (/Chairman &/.test(r) ? 'C·MD' : /Chairman/.test(r) ? 'C' : /Deputy/.test(r) ? 'DMD' : /Managing/.test(r) || /^Leads/.test(r) ? 'MD' : 'D');

export default function Leadership() {
  useReveal();
  const { t, role, C, openCompany } = useApp();
  const ppl = allPeople().sort((a, b) => a.rank - b.rank);
  const multi = ppl.filter((p) => p.roles.length > 1).sort((a, b) => b.roles.length - a.roles.length);
  const tiers = [[1, t('Chairmen', 'চেয়ারম্যান'), 'tier-c'], [2, t('Managing directors', 'ব্যবস্থাপনা পরিচালক'), 'tier-m'], [3, t('Directors', 'পরিচালক'), 'tier-d']];
  const stats = [[ppl.length, t('leaders', 'নেতা')], [COMPANIES.length, t('boards', 'বোর্ড')], [multi.length, t('serve on several boards', 'একাধিক বোর্ডে আছেন')]];

  return (
    <Layout solid titleEn="Leadership — South Bangla Group" titleBn="নেতৃত্ব — সাউথ বাংলা গ্রুপ">
      <header className="ld-hero">
        <div className="wrap">
          <p className="eyebrow reveal">{t('Leadership', 'নেতৃত্ব')}</p>
          <Html as="h1" className="reveal" s={t('The people who<br>steer the group', 'যাঁরা গ্রুপকে<br>পথ দেখান')} />
          <div className="ld-stats reveal">{stats.map(([n, l]) => <div key={l}><b>{n}</b><span>{l}</span></div>)}</div>
        </div>
      </header>

      <section className="ld-tier tier-c"><div className="wrap"><h2 className="reveal">{t('South Bangla Group', 'সাউথ বাংলা গ্রুপ')}</h2>
        <div className="ld-cards">{GROUP_LEADERS.map((p) => (
          <article className="ld-card reveal" key={p.name}>
            <div className="ph"><img src={p.photo} alt={p.name} loading="lazy" /></div>
            <div className="in"><h3>{p.name}</h3>
              <div className="rps"><span className="rp"><b>{role(p.role)}</b> · {t('South Bangla Group', 'সাউথ বাংলা গ্রুপ')}</span></div>
            </div>
          </article>
        ))}</div>
      </div></section>

      {tiers.map(([r, h, cls]) => (
        <section className={`ld-tier ${cls}`} key={r}><div className="wrap"><h2 className="reveal">{h}</h2>
          <div className="ld-cards">{ppl.filter((p) => p.rank === r).map((p) => (
            <article className="ld-card reveal" key={p.name}>
              <div className="ph">{p.photo ? <img src={p.photo} alt={p.name} loading="lazy" /> : <NoPhoto name={p.name} big />}</div>
              <div className="in"><h3>{p.name}</h3>
                <div className="rps">{p.roles.map((x) => <span className="rp" key={x.id + x.role}><b>{role(x.role)}</b> · {C(x.id).short}</span>)}</div>
              </div>
            </article>
          ))}</div>
        </div></section>
      ))}

      <section className="ld-matrix">
        <div className="wrap">
          <p className="eyebrow">{t('Board matrix', 'বোর্ড ম্যাট্রিক্স')}</p>
          <h2>{t('Who sits where', 'কে কোথায় আছেন')}</h2>
          <p className="sub">{t('C = Chairman · MD = Managing Director · DMD = Deputy Managing Director · D = Director', 'C = চেয়ারম্যান · MD = ব্যবস্থাপনা পরিচালক · DMD = উপ-ব্যবস্থাপনা পরিচালক · D = পরিচালক')}</p>
          <div className="tbl-wrap"><table className="mx">
            <thead><tr><th></th>{COMPANIES.map((c) => <th key={c.id}><button type="button" className="linkish" onClick={() => openCompany(c.id)}>{c.short}</button></th>)}</tr></thead>
            <tbody>{ppl.map((p) => (
              <tr key={p.name}>
                <th><span className="mp">{p.photo ? <img src={p.photo} alt="" loading="lazy" /> : <NoPhoto name={p.name} />}{p.name}</span></th>
                {COMPANIES.map((c) => {
                  const r = p.roles.find((x) => x.id === c.id);
                  return <td key={c.id}>{r && <span className={`rc r-${code(r.role).replace('·', '')}`} title={role(r.role)}>{code(r.role)}</span>}</td>;
                })}
              </tr>
            ))}</tbody>
          </table></div>
        </div>
      </section>

      <section className="ld-shared">
        <div className="wrap">
          <p className="eyebrow">{t('Shared boards', 'যৌথ বোর্ড')}</p>
          <h2>{t('Leaders who connect the companies', 'যে নেতারা প্রতিষ্ঠানগুলোকে জুড়ে রাখেন')}</h2>
          <div className="shared">{multi.map((p) => (
            <article className="reveal" key={p.name}>
              <div className="sh-head">{p.photo && <img src={p.photo} alt="" loading="lazy" />}<div><h3>{p.name}</h3><small>{p.roles.length} {t('boards', 'বোর্ড')}</small></div></div>
              <ul>{p.roles.map((r) => <li key={r.id + r.role}><b>{role(r.role)}</b><button type="button" className="linkish" onClick={() => openCompany(r.id)}>{C(r.id).name}</button></li>)}</ul>
            </article>
          ))}</div>
        </div>
      </section>
      <NextBand heading={t('Want to reach a company directly?', 'সরাসরি কোনো প্রতিষ্ঠানে যোগাযোগ করতে চান?')} links={[['/companies', t('See the companies', 'প্রতিষ্ঠানগুলো দেখুন')], ['/contact', t('Contact the group', 'গ্রুপে যোগাযোগ করুন')]]} />
    </Layout>
  );
}

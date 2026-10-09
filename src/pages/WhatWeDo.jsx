import { Fragment } from 'react';
import { useApp } from '../AppContext.jsx';
import { COMPANIES } from '../data/data.js';
import Layout from '../components/Layout.jsx';
import { NextBand, Pills, Tags } from '../components/shared.jsx';
import { Html, Icon, useReveal } from '../lib.jsx';

export default function WhatWeDo() {
  useReveal();
  const { t, sectors, inSector, co, openCompany, openLightbox } = useApp();
  const all = sectors();
  const inSec = (s) => COMPANIES.filter((c) => inSector(c, s.id)).map(co);
  const capsOf = (list) => [...new Set(list.flatMap((c) => c.highlights))];

  return (
    <Layout titleEn="What we do — South Bangla Group" titleBn="আমরা যা করি — সাউথ বাংলা গ্রুপ">
      <header className="wd-hero">
        <div className="wrap center">
          <p className="eyebrow reveal">{t('What we do', 'আমরা যা করি')}</p>
          <Html as="h1" className="reveal" s={t('Six industries.<br><span class="gold-text">One group.</span>', 'ছয়টি শিল্প।<br><span class="gold-text">একটি গ্রুপ।</span>')} />
          <p className="sub reveal">{t('From the field to the finished garment — pick an industry to see what its companies grow, make and build.', 'মাঠ থেকে তৈরি পোশাক পর্যন্ত — একটি শিল্প বেছে নিয়ে দেখুন তার প্রতিষ্ঠানগুলো কী ফলায়, কী বানায়, কী গড়ে।')}</p>
          <div className="wd-tiles">
            {all.map((s, i) => (
              <a className="wd-tile reveal" key={s.id} href={`#${s.id}`} style={{ '--d': `${i * 0.06}s` }}>
                <Icon name={s.icon} /><b>{s.label}</b><small>{inSec(s).length} {t('companies', 'প্রতিষ্ঠান')}</small>
              </a>
            ))}
          </div>
        </div>
      </header>

      {all.map((s, i) => {
        const list = inSec(s);
        return (
          <section className="wd-panel" id={s.id} key={s.id} style={{ '--bg': `url('${list[0].cover || ''}')` }}>
            <div className="wrap wd-grid">
              <div className="wd-side">
                <span className="wd-no">0{i + 1}</span>
                <span className="wd-ico"><Icon name={s.icon} /></span>
                <h2>{s.label}</h2>
                <p>{s.blurb}</p>
                <h4>{t('Capabilities', 'সক্ষমতা')}</h4>
                <Tags items={capsOf(list)} />
              </div>
              <div className="wd-cos">
                {list.map((c) => (
                  <article className="wd-co" key={c.id}>
                    <header>
                      <div><h3>{c.name}</h3><p className="tg">{c.tag}</p></div>
                      <button className="btn btn-gold btn-sm" type="button" onClick={() => openCompany(c.id)}>{t('Full profile', 'পূর্ণ প্রোফাইল')}</button>
                    </header>
                    {c.about.slice(0, 2).map((p, n) => <p key={n}>{p}</p>)}
                    <dl className="wd-facts">{c.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
                    {c.extra && c.extra.certs && <><h4>{t('Certifications', 'সনদ')}</h4><Pills items={c.extra.certs} gold /></>}
                    {c.gallery.length > 0 && (
                      <div className="wd-strip">{c.gallery.slice(0, 4).map((g, n) => (
                        <button type="button" key={g} aria-label={`${c.short} ${n + 1}`} onClick={() => openLightbox(c.gallery, n)}><img src={g} alt="" loading="lazy" /></button>
                      ))}</div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="wd-table">
        <div className="wrap">
          <h2>{t('Industry at a glance', 'এক নজরে শিল্প খাত')}</h2>
          <div className="tbl-wrap"><table>
            <thead><tr><th>{t('Industry', 'শিল্প')}</th><th>{t('Companies', 'প্রতিষ্ঠান')}</th><th>{t('What they do', 'যা করে')}</th></tr></thead>
            <tbody>{all.map((s) => {
              const l = inSec(s);
              return (
                <tr key={s.id}>
                  <th><a href={`#${s.id}`}>{s.label}</a></th>
                  <td>{l.map((c, n) => <Fragment key={c.id}>{n > 0 && <br />}<button type="button" className="linkish" onClick={() => openCompany(c.id)}>{c.short}</button></Fragment>)}</td>
                  <td>{capsOf(l).join(' · ')}</td>
                </tr>
              );
            })}</tbody>
          </table></div>
        </div>
      </section>
      <NextBand heading={t('Interested in one of our industries?', 'আমাদের কোনো শিল্পে আগ্রহী?')} links={[['/companies', t('Explore the companies', 'প্রতিষ্ঠানগুলো দেখুন')], ['/contact', t('Find the right team', 'সঠিক দল খুঁজুন')]]} />
    </Layout>
  );
}

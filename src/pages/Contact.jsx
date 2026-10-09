import { useState } from 'react';
import { useApp } from '../AppContext.jsx';
import { COMPANIES, GROUP_CONTACT } from '../data/data.js';
import EnquiryForm from '../components/EnquiryForm.jsx';
import Layout from '../components/Layout.jsx';
import { Phones } from '../components/shared.jsx';
import { Html, Icon, tel, useReveal } from '../lib.jsx';
import { REGIONS, contactOf, regionName, regionSites } from './helpers.js';

function Router() {
  const { t, C, openCompany } = useApp();
  const [topic, setTopic] = useState(0);
  const topics = [
    [t('Grains, spices, pulses, onion, mustard oil or feed', 'শস্য, মসলা, ডাল, পেঁয়াজ, সরিষার তেল বা ফিড'), ['sbagro']],
    [t('Garments, knitwear or denim orders', 'পোশাক, নিটওয়্যার বা ডেনিমের অর্ডার'), ['khantex', 'delta']],
    [t('Jute yarn, hessian or jute products', 'পাটের সুতা, হেসিয়ান বা পাটজাত পণ্য'), ['sonali']],
    [t('Land, apartments, sand or stone', 'জমি, ফ্ল্যাট, বালু বা পাথর'), ['premio']],
    [t('Visit the resort or the farm', 'রিসোর্ট বা খামার পরিদর্শন'), ['lakeview']],
    [t('Dairy, poultry, fish, dredging or contracting', 'ডেইরি, পোলট্রি, মাছ, ড্রেজিং বা ঠিকাদারি'), ['arjs']],
    [t('Trading and partnerships', 'ট্রেডিং ও অংশীদারিত্ব'), ['accessworld']],
    [t('Something else / the whole group', 'অন্য কিছু / পুরো গ্রুপ'), []]
  ];
  const [label, ids] = topics[topic];
  return (
    <div className="ct-router reveal">
      <h2>{t('Find the right team', 'সঠিক দল খুঁজুন')}</h2>
      <p>{t('What do you need help with?', 'কী নিয়ে সাহায্য চান?')}</p>
      <div className="topics">{topics.map(([l], i) => <button type="button" className="chip" key={i} aria-pressed={i === topic} onClick={() => setTopic(i)}>{l}</button>)}</div>
      <div className="route" aria-live="polite">
        <p className="rt-h">{t('Best team for:', 'সবচেয়ে উপযুক্ত দল:')} <b>{label}</b></p>
        {ids.length ? ids.map((id) => {
          const c = C(id), ph = contactOf(c, 'Phone'), em = contactOf(c, 'Email') || GROUP_CONTACT.email;
          const off = c.contacts.find(([k]) => !['Phone', 'Email', 'Group desk'].includes(k));
          return (
            <div className="rt-card" key={id}>
              <h3>{c.name}</h3>{off && <p>{off[1]}</p>}
              <p><Phones value={ph || GROUP_CONTACT.phone} /></p>
              <p><a href={`mailto:${em}?subject=${encodeURIComponent('Enquiry — ' + c.name)}`}>{em}</a></p>
              <button type="button" className="btn btn-gold btn-sm" onClick={() => openCompany(c.id)}>{t('Company profile', 'প্রতিষ্ঠানের প্রোফাইল')}</button>
            </div>
          );
        }) : (
          <div className="rt-card"><h3>{t('Group office', 'গ্রুপ অফিস')}</h3><p>{GROUP_CONTACT.address}</p><p><Phones value={GROUP_CONTACT.phone} /></p><p><a href={`mailto:${GROUP_CONTACT.email}`}>{GROUP_CONTACT.email}</a></p></div>
        )}
      </div>
    </div>
  );
}

function Regions() {
  const app = useApp();
  const { t, bn, label } = app;
  const [region, setRegion] = useState('dhaka');
  const sites = regionSites(app);
  const r = REGIONS.find((x) => x.id === region);
  return (
    <>
      <div className="rtabs" role="tablist">
        {REGIONS.map((x) => <button type="button" role="tab" key={x.id} aria-selected={x.id === region} onClick={() => setRegion(x.id)}>{regionName(x, bn)} <i>{sites[x.id].length}</i></button>)}
      </div>
      <div className="rpanel">
        <p className="rn">{t(r.note[0], r.note[1])}</p>
        <div className="sites">{sites[r.id].map(({ c, k, v }) => (
          <article className="site" key={c.id + k + v}>
            <small>{label(k)}</small><h3>{c.short}</h3><p>{v}</p>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v)}`} target="_blank" rel="noopener noreferrer">{t('Open in maps', 'ম্যাপে দেখুন')} ↗</a>
          </article>
        ))}</div>
      </div>
    </>
  );
}

export default function Contact() {
  useReveal();
  const { t, co } = useApp();
  return (
    <Layout solid titleEn="Contact — South Bangla Group" titleBn="যোগাযোগ — সাউথ বাংলা গ্রুপ">
      <header className="ct-hero">
        <div className="wrap ct-hero-grid">
          <div>
            <p className="eyebrow reveal">{t('Contact', 'যোগাযোগ')}</p>
            <Html as="h1" className="reveal" s={t('Let’s talk<br>business.', 'চলুন ব্যবসা<br>নিয়ে কথা বলি।')} />
            <p className="ct-lead reveal">{t('Whether you want to buy, partner, visit a farm, or ask about any company in the group — tell us what you need and the right team will reply.', 'কেনা, অংশীদারিত্ব, খামার পরিদর্শন, বা গ্রুপের যেকোনো প্রতিষ্ঠান সম্পর্কে জানতে চাইলে — আপনার প্রয়োজন জানান, সঠিক দল উত্তর দেবে।')}</p>
            <ul className="ct-quick reveal">
              <li><span><Icon name="phone" /></span><a href={`tel:${tel(GROUP_CONTACT.phone)}`}>{GROUP_CONTACT.phone}</a></li>
              <li><span><Icon name="mail" /></span><a href={`mailto:${GROUP_CONTACT.email}`}>{GROUP_CONTACT.email}</a></li>
              <li><span><Icon name="pin" /></span>{GROUP_CONTACT.address}</li>
            </ul>
          </div>
          <Router />
        </div>
      </header>

      <section className="ct-regions">
        <div className="wrap">
          <p className="eyebrow">{t('Visit us', 'আমাদের ঠিকানা')}</p>
          <h2>{t('Offices, factories & farms by region', 'অঞ্চল অনুযায়ী অফিস, কারখানা ও খামার')}</h2>
          <Regions />
        </div>
      </section>

      <section className="ct-form-sec">
        <div className="wrap ct-form-grid">
          <div><p className="eyebrow">{t('Write to us', 'আমাদের লিখুন')}</p><h2>{t('Send a message', 'বার্তা পাঠান')}</h2>
            <p>{t('Pick the company you are writing about and we will pass your note to the right team.', 'যে প্রতিষ্ঠান সম্পর্কে লিখছেন সেটি বেছে নিন — আমরা বার্তাটি সঠিক দলের কাছে পৌঁছে দেব।')}</p>
            <p className="hint">{t('Sending opens your email app with the message ready to go.', 'পাঠাতে চাপলে আপনার ইমেইল অ্যাপ বার্তাসহ খুলবে।')}</p></div>
          <EnquiryForm className="ct-form" companyBy="id" rows={5} text={{
            name: t('Your name', 'আপনার নাম'), from: t('Phone or email', 'ফোন বা ইমেইল'), company: t('Which company?', 'কোন প্রতিষ্ঠান?'),
            any: t('Not sure / whole group', 'নিশ্চিত নই / পুরো গ্রুপ'), wholeGroup: 'Whole group', msg: t('Message', 'বার্তা'), send: t('Send message', 'বার্তা পাঠান'),
            note: '',
            bad: t('Please fill in your name, how to reach you, and a message.', 'অনুগ্রহ করে নাম, যোগাযোগের মাধ্যম ও বার্তা লিখুন।'),
            ok: t('Thank you! Your email app should now open with the message ready to send.', 'ধন্যবাদ! আপনার ইমেইল অ্যাপে বার্তাটি তৈরি অবস্থায় খুলবে।')
          }} />
        </div>
      </section>

      <section className="ct-dir">
        <div className="wrap">
          <h2>{t('Phone & email directory', 'ফোন ও ইমেইল ডিরেক্টরি')}</h2>
          <div className="tbl-wrap"><table>
            <thead><tr><th>{t('Company', 'প্রতিষ্ঠান')}</th><th>{t('Phone', 'ফোন')}</th><th>{t('Email', 'ইমেইল')}</th></tr></thead>
            <tbody>{COMPANIES.map((b) => {
              const c = co(b), ph = contactOf(c, 'Phone'), em = contactOf(c, 'Email');
              return (
                <tr key={c.id}>
                  <th>{c.name}</th>
                  <td>{ph ? <Phones value={ph} /> : <span className="dim">{t('Use the group number', 'গ্রুপের নম্বর ব্যবহার করুন')}</span>}</td>
                  <td><a href={`mailto:${em || GROUP_CONTACT.email}`}>{em || GROUP_CONTACT.email}</a></td>
                </tr>
              );
            })}</tbody>
          </table></div>
        </div>
      </section>
    </Layout>
  );
}

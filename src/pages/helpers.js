import { COMPANIES, PEOPLE } from '../data/data.js';

/* Regions, worked out from the address text in each company's contacts. */
export const REGIONS = [
  { id: 'dhaka', en: 'Dhaka', bn: 'ঢাকা', re: /Dhaka/, note: ['Head offices, corporate desks and the group office', 'প্রধান কার্যালয়, কর্পোরেট ডেস্ক ও গ্রুপ অফিস'] },
  { id: 'gazipur', en: 'Gazipur', bn: 'গাজীপুর', re: /Gazipur/, note: ['Garment factories and the Delta industrial park', 'পোশাক কারখানা ও ডেল্টা শিল্প পার্ক'] },
  { id: 'mymensingh', en: 'Mymensingh', bn: 'ময়মনসিংহ', re: /Mymensingh|Bhaluka/, note: ['The jute mill and the feed & mustard-oil mills at Satenga, Bhaluka', 'ভালুকার সাতেঙ্গায় পাটকল এবং ফিড ও সরিষার তেল মিল'] },
  { id: 'sylhet', en: 'Sylhet', bn: 'সিলেট', re: /Sylhet/, note: ['The Lake View farm and resort project site at Golapganj', 'গোলাপগঞ্জে লেক ভিউ খামার ও রিসোর্ট প্রকল্প এলাকা'] },
  { id: 'ctg', en: 'Chattogram', bn: 'চট্টগ্রাম', re: /Chattogram/, note: ['ARJS Agro’s port-city office', 'এআরজেএস এগ্রোর বন্দর-নগরীর অফিস'] }
];

export const regionName = (r, bn) => (bn && r.bn) || r.en;

export function regionSites({ co, C, bn }) {
  const out = Object.fromEntries(REGIONS.map((r) => [r.id, []]));
  COMPANIES.forEach((base) => {
    const c = co(base);
    c.contacts.forEach(([k, v]) => {
      if (['Phone', 'Email', 'Group desk'].includes(k)) return;
      const r = /Chattogram/.test(v) ? REGIONS[4] : REGIONS.find((x) => x.re.test(v));
      if (r) out[r.id].push({ c, k, v });
    });
  });
  out.sylhet.push({ c: C('lakeview'), k: bn ? 'প্রকল্প এলাকা' : 'Project site', v: 'Golapganj, Sylhet' });
  return out;
}

export function regionsOf(id, app) {
  const s = regionSites(app);
  const r = REGIONS.filter((x) => s[x.id].some((y) => y.c.id === id));
  return r.length ? r : [REGIONS[0]];
}

export const contactOf = (c, k) => ((c.contacts.find(([key]) => key === k) || [])[1]) || '';

/* People, merged across boards. */
const PREFIX = [['ARJS', 'arjs'], ['South Bangla Agro', 'sbagro'], ['Sonali', 'sonali'], ['Premio', 'premio'], ['Lake View', 'lakeview'], ['Access', 'accessworld'], ['Khantex', 'khantex'], ['Delta', 'delta']];
const idOf = (n) => (PREFIX.find(([p]) => n.startsWith(p)) || [])[1];
const rank = (r) => (/Chairman/.test(r) ? 1 : /Managing Director$|^Leads/.test(r) && !/Deputy/.test(r) ? 2 : 3);

export function allPeople() {
  const list = PEOPLE.map((p) => ({ name: p.name, photo: p.photo, roles: p.roles.map(([cn, r]) => ({ id: idOf(cn), role: r })) }));
  COMPANIES.forEach((c) => c.leaders.filter((l) => !l.photo).forEach((l) => list.push({ name: l.name, photo: null, roles: [{ id: c.id, role: l.role }] })));
  list.forEach((p) => { p.rank = Math.min(...p.roles.map((r) => rank(r.role))); });
  return list;
}

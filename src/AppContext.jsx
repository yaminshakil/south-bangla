import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { BN } from './data/bn.js';
import { COMPANIES, SECTORS as BASE_SECTORS } from './data/data.js';

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

const readLang = () => {
  try { const s = localStorage.getItem('sbg-lang'); if (s === 'bn' || s === 'en') return s; } catch (e) { /* ignore */ }
  return 'en';
};

export function AppProvider({ children }) {
  const [L, setL] = useState(readLang);
  const [openId, setOpenId] = useState(null);
  const [lb, setLb] = useState(null); // { list, i }
  const bn = L === 'bn';

  useEffect(() => {
    document.documentElement.lang = bn ? 'bn' : 'en';
    document.documentElement.classList.toggle('bn', bn);
  }, [bn]);

  const toggleLang = useCallback(() => {
    setL((cur) => {
      const next = cur === 'bn' ? 'en' : 'bn';
      try { localStorage.setItem('sbg-lang', next); } catch (e) { /* ignore */ }
      return next;
    });
  }, []);

  const value = useMemo(() => {
    const t = (en, b) => (bn && b) || en;
    const ui = (k, en) => (bn && BN.ui[k]) || en;
    const role = (r) => (bn && BN.roles[r]) || r;
    const label = (k) => (bn && BN.labels[k]) || k;
    const co = (c) => {
      if (!bn) return c;
      const o = BN.companies[c.id] || {};
      return { ...c, ...o, extra: c.extra ? { ...c.extra, ...(o.extra || {}) } : c.extra };
    };
    const sectorOf = (id) => {
      const s = BASE_SECTORS.find((x) => x.id === id);
      const o = bn && BN.sectors[id];
      return o ? { ...s, label: o[0], blurb: o[1] } : s;
    };
    const sectors = () => BASE_SECTORS.map((s) => sectorOf(s.id));
    const inSector = (c, id) => c.sector === id || (c.also || []).includes(id);
    const C = (id) => co(COMPANIES.find((c) => c.id === id));
    return {
      L, bn, toggleLang, t, ui, role, label, co, C, sectorOf, sectors, inSector,
      openId,
      openCompany: (id) => { if (COMPANIES.some((c) => c.id === id)) setOpenId(id); },
      closeCompany: () => setOpenId(null),
      lb,
      openLightbox: (list, i) => setLb({ list, i }),
      setLb
    };
  }, [L, bn, toggleLang, openId, lb]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

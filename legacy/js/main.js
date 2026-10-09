(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const { COMPANIES: BASE, SECTORS: BASE_SECTORS, PEOPLE, GROUP_CONTACT, BN } = window;
  const esc = (s) => String(s).replace(/[&<>"]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));

  /* ---------- language ---------- */
  let L = 'en';
  try { const s = localStorage.getItem('sbg-lang'); if (s === 'bn' || s === 'en') L = s; } catch (e) {}
  const bn = () => L === 'bn';
  const ui = (k, en) => (bn() && BN.ui[k]) || en;
  const role = (r) => (bn() && BN.roles[r]) || r;
  const label = (k) => (bn() && BN.labels[k]) || k;

  // company/sector views with Bangla overlays
  const co = (c) => {
    if (!bn()) return c;
    const o = BN.companies[c.id] || {};
    return { ...c, ...o, extra: c.extra ? { ...c.extra, ...(o.extra || {}) } : c.extra };
  };
  const COMPANIES = BASE;
  const sectorOf = (id) => {
    const s = BASE_SECTORS.find((x) => x.id === id);
    const o = bn() && BN.sectors[id];
    return o ? { ...s, label: o[0], blurb: o[1] } : s;
  };
  const SECTORS = () => BASE_SECTORS.map((s) => sectorOf(s.id));
  const inSector = (c, id) => c.sector === id || (c.also || []).includes(id);

  const ICONS = {
    wheat: '<path d="M12 22V8M12 8c-2-1-3-3-3-5 2 1 3 3 3 5zm0 0c2-1 3-3 3-5-2 1-3 3-3 5zm0 5c-2-1-3-3-3-5 2 1 3 3 3 5zm0 0c2-1 3-3 3-5-2 1-3 3-3 5zm0 5c-2-1-3-3-3-5 2 1 3 3 3 5zm0 0c2-1 3-3 3-5-2 1-3 3-3 5z"/>',
    thread: '<circle cx="12" cy="12" r="8"/><path d="M4 12c4-3 12-3 16 0M5 17c4-3 10-3 14 0M5 7c4 3 10 3 14 0"/>',
    jute: '<path d="M6 4h12l1 4-2 12H7L5 8z"/><path d="M5 8h14M9 4v4M15 4v4M9 12h6"/>',
    building: '<path d="M4 21V8l8-5 8 5v13zM9 21v-6h6v6M8 11h2M14 11h2"/>',
    palm: '<path d="M12 21V11M12 11c-1-4-4-5-7-4 2 0 4 1 5 3M12 11c1-4 4-5 7-4-2 0-4 1-5 3M12 11c-3-2-4-5-3-8 1 2 2 4 3 8zm0 0c3-2 4-5 3-8-1 2-2 4-3 8zM4 21h16"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'
  };
  const svg = (n) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[n]}</svg>`;

  const TITLE_EN = document.title;
  const has = (sel) => !!$(sel);
  let filter = 'all';
  let openId = null;
  const inClass = () => 'in'; // dynamic content is shown immediately

  /* ---------- static text ---------- */
  const statics = $$('[data-i18n]');
  statics.forEach((el) => (el.dataset.en = el.innerHTML));
  function applyStatic() {
    document.documentElement.lang = bn() ? 'bn' : 'en';
    document.documentElement.classList.toggle('bn', bn());
    statics.forEach((el) => {
      const k = el.dataset.i18n;
      if (el.id === 'formNote' && el.dataset.state) return;
      el.innerHTML = bn() && BN.ui[k] ? BN.ui[k] : el.dataset.en;
    });
    $('#lang').setAttribute('aria-pressed', bn());
    $$('#lang [data-l]').forEach((s) => s.classList.toggle('on', s.dataset.l === L));
    document.title = (bn() && document.documentElement.dataset.titleBn) || TITLE_EN;
  }

  /* ---------- sectors ---------- */
  function renderSectors(first) {
    if (!has('#sectorGrid')) return;
    $('#sectorGrid').innerHTML = SECTORS().map((s, i) => {
      const names = COMPANIES.filter((c) => inSector(c, s.id)).map((c) => c.short).join(' · ');
      return `<button class="sector reveal ${first ? '' : 'in'}" style="--d:${i * .07}s" data-sector="${s.id}">
        ${svg(s.icon)}<h3>${esc(s.label)}</h3><p>${esc(s.blurb)}</p><span class="who">${esc(names)}</span></button>`;
    }).join('');
    $$('.sector').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', e.clientX - r.left + 'px');
        el.style.setProperty('--my', e.clientY - r.top + 'px');
      });
      el.addEventListener('click', () => { location.href = 'what-we-do.html#' + el.dataset.sector; });
    });
    if (first) observeReveals($$('.sector'));
  }

  /* ---------- filters + cards ---------- */
  const filters = $('#filters'), cards = $('#cards');
  function renderFilters() {
    if (!filters) return;
    filters.innerHTML = [{ id: 'all', label: ui('co.all', 'All companies') }, ...SECTORS()].map((s) =>
      `<button class="chip" role="tab" data-f="${s.id}" aria-selected="${s.id === filter}">${esc(s.label)}</button>`).join('');
  }
  function renderCards(first) {
    if (!cards) return;
    cards.innerHTML = COMPANIES.map((base, i) => {
      const c = co(base);
      return `<button class="card reveal ${first ? '' : 'in'}" style="--d:${(i % 4) * .08}s" data-id="${c.id}" aria-label="${esc(c.name)}">
        <div class="card-img">
          ${c.cover ? `<img src="${c.cover}" alt="" loading="lazy" style="object-position:${c.position || 'center'}">`
                    : `<div class="logo-fill"><img src="${c.logo}" alt="${esc(c.name)}" loading="lazy"></div>`}
          <span class="badge">${esc(sectorOf(c.sector).label)}</span>
        </div>
        <div class="card-body"><h3>${esc(c.name)}</h3><p>${esc(c.summary)}</p><span class="more">${ui('co.explore', 'Explore')} <i>→</i></span></div>
      </button>`;
    }).join('');
    applyFilter();
    if (first) observeReveals($$('.card'));
    bindTilt();
  }
  function applyFilter() {
    if (!cards) return;
    $$('.card', cards).forEach((el) => {
      const c = COMPANIES.find((x) => x.id === el.dataset.id);
      el.classList.toggle('hide', filter !== 'all' && !inSector(c, filter));
    });
  }
  function setFilter(id) { filter = id; renderFilters(); applyFilter(); }
  if (filters) filters.addEventListener('click', (e) => { const b = e.target.closest('.chip'); if (b) setFilter(b.dataset.f); });
  if (cards) cards.addEventListener('click', (e) => { const b = e.target.closest('.card'); if (b) openCompany(b.dataset.id); });

  function bindTilt() {
    if (reduce || !matchMedia('(hover:hover)').matches) return;
    $$('.card').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        el.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-6px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- tree ---------- */
  function renderTree() {
    if (!has('#tree')) return;
    const cols = SECTORS().map((s) => {
      const list = COMPANIES.filter((c) => c.sector === s.id);
      return `<div class="tree-col"><div class="tree-sector">${esc(s.label)}</div>${list.map((c) => `<button class="tree-co" data-id="${c.id}">${esc(c.short)}</button>`).join('')}</div>`;
    }).join('');
    $('#tree').innerHTML = `<div class="tree-root"><span class="brand-mark"><img src="assets/img/logo-sbg.jpg" alt=""></span>${bn() ? 'সাউথ বাংলা গ্রুপ' : 'South Bangla Group'}</div><div class="tree-stem"></div><div class="tree-cols">${cols}</div>`;
  }
  if (has('#tree')) $('#tree').addEventListener('click', (e) => { const b = e.target.closest('.tree-co'); if (b) openCompany(b.dataset.id); });

  /* ---------- people ---------- */
  function renderPeople(first) {
    if (!has('#people')) return;
    $('#people').innerHTML = PEOPLE.map((p, i) => `
      <article class="person reveal ${first ? '' : 'in'}" style="--d:${(i % 5) * .07}s">
        <img src="${p.photo}" alt="${esc(p.name)}" loading="lazy">
        <div class="person-body"><h3>${esc(p.name)}</h3>
        ${p.roles.map(([c, r]) => `<div class="role"><b>${esc(role(r))}</b> · ${esc(bnShort(c))}</div>`).join('')}</div>
      </article>`).join('');
    if (first) observeReveals($$('.person'));
  }
  const bnShort = (s) => s;

  /* ---------- ribbon ---------- */
  const ribbonImgs = ['kfl-sew', 'lake-pool', 'son-loom', 'prem-b7', 'sb-onion1', 'delta-sew', 'arjs-dairy', 'lake-pine1', 'kfl-ship', 'prem-stone', 'son-rolls', 'sb-turmeric', 'delta-spin', 'lake-poultry2', 'kfl-print', 'prem-b3'];
  const strip = ribbonImgs.map((n) => `<img src="assets/img/${n}.jpg" alt="" loading="lazy">`).join('');
  if (has('#ribbon')) $('#ribbon').innerHTML = strip + strip;

  /* ---------- contact ---------- */
  function renderContact() {
    if (!has('#contactList')) return;
    $('#contactList').innerHTML = `
      <li><span class="ci">${svg('pin')}</span><div><small>${ui('ct.office', 'Group office')}</small>${esc(GROUP_CONTACT.address)}</div></li>
      <li><span class="ci">${svg('phone')}</span><div><small>${ui('ct.phone', 'Phone')}</small><a href="tel:${GROUP_CONTACT.phone.replace(/[^+\d]/g, '')}">${GROUP_CONTACT.phone}</a></div></li>
      <li><span class="ci">${svg('mail')}</span><div><small>${ui('ct.email', 'Email')}</small><a href="mailto:${GROUP_CONTACT.email}">${GROUP_CONTACT.email}</a></div></li>`;
    const sel = $('#formCompany'), keep = sel.selectedIndex;
    sel.innerHTML = `<option value="">${ui('f.any', 'Not sure / whole group')}</option>` + COMPANIES.map((c) => `<option value="${esc(c.name)}">${esc(c.name)}</option>`).join('');
    sel.selectedIndex = Math.max(keep, 0);
  }
  if (has('#form')) $('#form').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = e.target, note = $('#formNote'); let ok = true;
    ['name', 'from', 'msg'].forEach((n) => { const bad = !f[n].value.trim(); f[n].classList.toggle('bad', bad); if (bad) ok = false; });
    note.dataset.state = '1';
    if (!ok) { note.textContent = ui('f.bad', 'Please fill in your name, how to reach you, and a message.'); return; }
    const who = f.company.value || ui('f.any', 'Whole group');
    const body = `${f.msg.value}\n\nFrom: ${f.name.value}\nContact: ${f.from.value}\nRegarding: ${who}`;
    location.href = `mailto:${GROUP_CONTACT.email}?subject=${encodeURIComponent('Enquiry — ' + who)}&body=${encodeURIComponent(body)}`;
    note.textContent = ui('f.ok', 'Thank you! Your email app should now open with the message ready to send.');
  });

  /* ---------- shared helpers ---------- */
  const contactLine = ([k, v]) => {
    let val = esc(v);
    if (k === 'Email') val = `<a href="mailto:${esc(v)}">${esc(v)}</a>`;
    else if (k === 'Phone') val = v.split(',').map((p) => `<a href="tel:${p.replace(/[^+\d]/g, '')}">${esc(p.trim())}</a>`).join(', ');
    else if (k === 'Group desk' && bn()) val = 'অনুগ্রহ করে গ্রুপের যোগাযোগের তথ্য ব্যবহার করুন';
    return `<div><dt>${esc(label(k))}</dt><dd>${val}</dd></div>`;
  };
  const initial = (n) => esc(n.replace(/^(Engr\.|Md\.?|SK\.?)\s*(\(BUET\)\s*)?/, '')[0] || '•');
  const leaderChip = (l) => `<div class="leader">${l.photo ? `<img src="${l.photo}" alt="" loading="lazy">` : `<span class="noph">${initial(l.name)}</span>`}<div><b>${esc(l.name)}</b><small>${esc(role(l.role))}</small></div></div>`;

  /* ---------- company dialog ---------- */
  const modal = $('#modal'), mBody = $('#modalBody');
  let lastFocus = null;
  function renderModal(id) {
    const c = co(COMPANIES.find((x) => x.id === id));
    const ex = c.extra || {};
    mBody.innerHTML = `
      <div class="m-hero ${c.cover ? '' : 'logo-hero'}">
        <img src="${c.cover || c.logo}" alt="" ${c.cover ? `style="object-position:${c.position || 'center'}"` : ''}>
        <div class="m-hero-text"><p class="eyebrow" style="color:var(--gold-2)">${esc(sectorOf(c.sector).label)}</p><h2 id="mTitle">${esc(c.name)}</h2><p>${esc(c.tag)}</p></div>
      </div>
      <div class="m-content">
        <div class="m-grid">
          <div class="m-about">${c.about.map((p) => `<p>${esc(p)}</p>`).join('')}
            <div class="tags">${c.highlights.map((h) => `<span class="tag">${esc(h)}</span>`).join('')}</div></div>
          <dl class="m-facts">${c.facts.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>
        </div>
        ${c.gallery.length ? `<div><h3 class="m-title">${ui('m.gallery', 'Photo gallery')}</h3><div class="gallery">${c.gallery.map((g, i) => `<button data-i="${i}" aria-label="${i + 1}"><img src="${g}" alt="${esc(c.short)} ${i + 1}" loading="lazy"></button>`).join('')}</div></div>` : ''}
        ${ex.buyers ? `<div><h3 class="m-title">${esc(ex.title)}</h3><div class="pillrow">${ex.buyers.map((b) => `<span class="pill">${esc(b)}</span>`).join('')}</div>
           <h3 class="m-title" style="margin-top:22px">${ui('m.certs', 'Certifications & standards')}</h3><div class="pillrow">${ex.certs.map((b) => `<span class="pill gold">${esc(b)}</span>`).join('')}</div></div>` : ''}
        ${ex.siblings ? `<div><h3 class="m-title">${esc(ex.siblingsTitle)}</h3><div class="pillrow">${ex.siblings.map((b) => `<span class="pill">${esc(b)}</span>`).join('')}</div></div>` : ''}
        ${c.leaders.length ? `<div><h3 class="m-title">${ui('m.leaders', 'Leadership')}</h3><div class="m-leaders">${c.leaders.map(leaderChip).join('')}</div></div>` : ''}
        <div><h3 class="m-title">${ui('m.contact', 'Contact & locations')}</h3><dl class="m-contacts">${c.contacts.map(contactLine).join('')}</dl></div>
        <div class="m-cta"><a class="btn btn-gold" href="contact.html">${ui('m.cta1', 'Contact the group')}</a><button class="btn btn-ghost" data-close type="button">${ui('m.cta2', 'Back to all companies')}</button></div>
      </div>`;
    const imgs = c.gallery;
    $$('.gallery button', mBody).forEach((b) => b.addEventListener('click', () => lightbox(imgs, +b.dataset.i)));
  }
  function openCompany(id) {
    if (!COMPANIES.some((c) => c.id === id)) return;
    lastFocus = document.activeElement;
    openId = id;
    renderModal(id);
    modal.showModal();
    modal.scrollTop = 0;
    document.documentElement.style.overflow = 'hidden';
    history.replaceState(null, '', '#' + id);
  }
  function closeModal() { if (modal.open) modal.close(); }
  modal.addEventListener('close', () => {
    openId = null;
    document.documentElement.style.overflow = '';
    if (COMPANIES.some((c) => '#' + c.id === location.hash)) history.replaceState(null, '', location.pathname);
    lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true });
  });
  $('#modalX').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.closest('[data-close]')) closeModal();
  });

  /* ---------- lightbox ---------- */
  const lb = $('#lightbox'), lbImg = $('img', lb);
  let lbList = [], lbI = 0;
  function lightbox(list, i) { lbList = list; lbI = i; show(); lb.hidden = false; lb.querySelector('.lb-x').focus(); }
  function show() { lbImg.src = lbList[lbI]; }
  const step = (d) => { lbI = (lbI + d + lbList.length) % lbList.length; show(); };
  $('.lb-prev', lb).onclick = () => step(-1);
  $('.lb-next', lb).onclick = () => step(1);
  $('.lb-x', lb).onclick = () => (lb.hidden = true);
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.hidden = true; });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') { lb.hidden = true; e.stopPropagation(); e.preventDefault(); }
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  }, true);

  /* ---------- nav ---------- */
  const nav = $('#nav'), burger = $('#burger'), links = $('#navLinks');
  const onScroll = () => nav.classList.toggle('solid', scrollY > 40 || document.body.hasAttribute('data-solid'));
  onScroll(); addEventListener('scroll', onScroll, { passive: true });
  burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  links.addEventListener('click', (e) => { if (e.target.closest('a')) { links.classList.remove('open'); burger.setAttribute('aria-expanded', false); } });
  $('#yr').textContent = new Date().getFullYear();

  /* ---------- reveal + counters ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  function observeReveals(list) { list.forEach((el) => io.observe(el)); }
  $$('.reveal').forEach((el, i) => { if (el.closest('.hero-copy')) el.style.setProperty('--d', (i % 4) * .12 + 's'); });

  function countUp(el) {
    const end = +el.dataset.count, pre = el.dataset.prefix || '', suf = el.dataset.suffix || '', plus = el.dataset.plus ? '+' : '';
    const dec = String(end).includes('.') ? 1 : 0, fmt = (n) => n.toLocaleString(undefined, { minimumFractionDigits: dec, maximumFractionDigits: dec });
    if (reduce) { el.textContent = pre + fmt(end) + suf + plus; return; }
    const t0 = performance.now(), dur = 1800;
    (function tick(t) {
      const p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + fmt(dec ? +(end * e).toFixed(1) : Math.round(end * e)) + suf + (p === 1 ? plus : '');
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }
  const cio = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { countUp(x.target); cio.unobserve(x.target); } }), { threshold: .6 });
  $$('[data-count]').forEach((el) => cio.observe(el));

  /* ---------- hero dust (golden particles) ---------- */
  const cv = $('#dust');
  if (cv && !reduce) {
    const ctx = cv.getContext('2d'); let w, h, pts;
    const resize = () => {
      const r = cv.getBoundingClientRect(); const dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.width = r.width * dpr; h = cv.height = r.height * dpr;
      pts = Array.from({ length: Math.round(r.width / 16) }, () => ({ x: Math.random() * w, y: Math.random() * h, r: (Math.random() * 1.8 + .4) * dpr, v: (Math.random() * .35 + .08) * dpr, a: Math.random() * .6 + .2, p: Math.random() * 6 }));
    };
    resize(); addEventListener('resize', resize);
    let run = true;
    new IntersectionObserver((e) => { run = e[0].isIntersecting; if (run) loop(); }).observe(cv);
    function loop() {
      if (!run) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.y -= p.v; p.p += .02; p.x += Math.sin(p.p) * .25;
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.fillStyle = `rgba(232,203,133,${p.a * (.6 + .4 * Math.sin(p.p * 2))})`; ctx.fill();
      }
      requestAnimationFrame(loop);
    }
    loop();
  }

  /* ---------- nav: mark current page ---------- */
  const here = document.body.dataset.page;
  $$('.nav-links a[data-page], .footer nav a[data-page]').forEach((a) => { if (a.dataset.page === here) a.setAttribute('aria-current', 'page'); });

  /* ---------- hooks for the page-specific renderers (js/pages.js) ---------- */
  window.SBG = { $, $$, esc, svg, bn, ui, role, label, co, sectorOf, inSector, COMPANIES, SECTORS, PEOPLE, GROUP_CONTACT, BASE_SECTORS,
    openCompany, lightbox, contactLine, leaderChip, initial, observeReveals, countUp, setLang: null };
  const extra = (window.PAGE_RENDERERS || []).map((f) => f(window.SBG));

  /* ---------- language toggle ---------- */
  function renderAll(first) {
    applyStatic();
    renderSectors(first); renderFilters(); renderCards(first); renderTree(); renderPeople(first); renderContact();
    extra.forEach((f) => f(first));
    if (openId) renderModal(openId);
  }
  $('#lang').addEventListener('click', () => {
    L = bn() ? 'en' : 'bn';
    try { localStorage.setItem('sbg-lang', L); } catch (e) {}
    const f = $('#formNote'); if (f) delete f.dataset.state;
    renderAll(false);
  });

  renderAll(true);
  if (has('#cards') && BASE_SECTORS.some((x) => '#' + x.id === location.hash)) setFilter(location.hash.slice(1));
  else if (has('#sectorDetail') && location.hash) setTimeout(() => { const t = $(location.hash); t && t.scrollIntoView(); }, 50);
  if (document.body.dataset.page !== 'companies' && COMPANIES.some((c) => '#' + c.id === location.hash)) setTimeout(() => openCompany(location.hash.slice(1)), 300);
  $$('.reveal').filter((el) => !el.classList.contains('in')).forEach((el) => io.observe(el));
})();

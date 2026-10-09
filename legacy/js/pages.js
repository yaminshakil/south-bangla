/* Page-specific designs for About, What we do, Our companies, Leadership and Contact.
   Each page is built from the same company data (js/data.js) but laid out differently.
   English / Bangla pairs are written inline as t('English', 'বাংলা'). */
window.PAGE_RENDERERS = window.PAGE_RENDERERS || [];
window.PAGE_RENDERERS.push((S) => {
  const { $, $$, esc, svg, role, co, sectorOf, inSector, COMPANIES, PEOPLE, GROUP_CONTACT } = S;
  const root = document.getElementById('pg');
  if (!root) return () => {};
  const page = document.body.dataset.page;
  const t = (en, b) => (S.bn() && b) || en;
  const IMG = (n) => `assets/img/${n}.jpg`;
  const C = (id) => co(COMPANIES.find((c) => c.id === id));
  const tel = (p) => p.replace(/[^+\d]/g, '');
  const phones = (v) => v.split(',').map((p) => `<a href="tel:${tel(p)}">${esc(p.trim())}</a>`).join(', ');
  const sectors = () => S.SECTORS();
  const contactOf = (c, k) => ((c.contacts.find(([key]) => key === k) || [])[1]) || '';

  /* ---- regions, worked out from the address text in each company's contacts ---- */
  const REGIONS = [
    { id: 'dhaka', en: 'Dhaka', bn: 'ঢাকা', re: /Dhaka/, note: ['Head offices, corporate desks and the group office', 'প্রধান কার্যালয়, কর্পোরেট ডেস্ক ও গ্রুপ অফিস'] },
    { id: 'gazipur', en: 'Gazipur', bn: 'গাজীপুর', re: /Gazipur/, note: ['Garment factories and the Delta industrial park', 'পোশাক কারখানা ও ডেল্টা শিল্প পার্ক'] },
    { id: 'mymensingh', en: 'Mymensingh', bn: 'ময়মনসিংহ', re: /Mymensingh|Bhaluka/, note: ['The jute mill and the feed & mustard-oil mills at Satenga, Bhaluka', 'ভালুকার সাতেঙ্গায় পাটকল এবং ফিড ও সরিষার তেল মিল'] },
    { id: 'sylhet', en: 'Sylhet', bn: 'সিলেট', re: /Sylhet/, note: ['The Lake View farm and resort project site at Golapganj', 'গোলাপগঞ্জে লেক ভিউ খামার ও রিসোর্ট প্রকল্প এলাকা'] },
    { id: 'ctg', en: 'Chattogram', bn: 'চট্টগ্রাম', re: /Chattogram/, note: ['ARJS Agro’s port-city office', 'এআরজেএস এগ্রোর বন্দর-নগরীর অফিস'] }
  ];
  const regionSites = () => {
    const out = Object.fromEntries(REGIONS.map((r) => [r.id, []]));
    COMPANIES.forEach((base) => {
      const c = co(base);
      c.contacts.forEach(([k, v]) => {
        if (['Phone', 'Email', 'Group desk'].includes(k)) return;
        const r = (/Chattogram/.test(v) ? REGIONS[4] : REGIONS.find((x) => x.re.test(v)));
        if (r) out[r.id].push({ c, k, v });
      });
    });
    const lv = C('lakeview');
    out.sylhet.push({ c: lv, k: S.bn() ? 'প্রকল্প এলাকা' : 'Project site', v: 'Golapganj, Sylhet' });
    return out;
  };
  const regionsOf = (id) => { const s = regionSites(); const r = REGIONS.filter((x) => s[x.id].some((y) => y.c.id === id)); return r.length ? r : [REGIONS[0]]; };
  const rname = (r) => t(r.en, r.bn);

  /* ---- people, merged across boards ---- */
  const PREFIX = [['ARJS', 'arjs'], ['South Bangla Agro', 'sbagro'], ['Sonali', 'sonali'], ['Premio', 'premio'], ['Lake View', 'lakeview'], ['Access', 'accessworld'], ['Khantex', 'khantex'], ['Delta', 'delta']];
  const idOf = (n) => (PREFIX.find(([p]) => n.startsWith(p)) || [])[1];
  const rank = (r) => (/Chairman/.test(r) ? 1 : /Managing Director$|^Leads/.test(r) && !/Deputy/.test(r) ? 2 : 3);
  const people = () => {
    const list = PEOPLE.map((p) => ({ name: p.name, photo: p.photo, roles: p.roles.map(([cn, r]) => ({ id: idOf(cn), role: r })) }));
    COMPANIES.forEach((c) => c.leaders.filter((l) => !l.photo).forEach((l) => list.push({ name: l.name, photo: null, roles: [{ id: c.id, role: l.role }] })));
    list.forEach((p) => { p.rank = Math.min(...p.roles.map((r) => rank(r.role))); });
    return list;
  };
  const pPhoto = (p) => (p.photo ? `<img src="${p.photo}" alt="${esc(p.name)}" loading="lazy">` : `<span class="noph big">${S.initial(p.name)}</span>`);
  const rolePills = (p) => p.roles.map((r) => `<span class="rp"><b>${esc(role(r.role))}</b> · ${esc(C(r.id).short)}</span>`).join('');

  const hero3 = (a) => a.map(([n, l]) => `<div><b>${n}</b><span>${l}</span></div>`).join('');

  /* ============================ ABOUT ============================ */
  function about() {
    const ex = C('khantex').extra, de = C('delta');
    const nums = [
      [8, '', '', t('Group companies', 'গ্রুপের প্রতিষ্ঠান')], [6, '', '', t('Industries', 'শিল্প খাত')], [5, '', '', t('Regions with our sites', 'অঞ্চলে আমাদের উপস্থিতি')],
      [14, '', '', t('Units in The Delta Group', 'ডেল্টা গ্রুপের ইউনিট')], [105, '', t(' bigha', ' বিঘা'), t('Delta campus', 'ডেল্টা ক্যাম্পাস')], [9000, '', '+', t('People at Delta (20,000 planned)', 'ডেল্টায় কর্মী (পরিকল্পনা ২০,০০০)')],
      [22.5, '', ' MW', t('Delta’s own gas power', 'ডেল্টার নিজস্ব গ্যাস বিদ্যুৎ')], [24, '', '', t('Sewing lines at Khantex', 'খানটেক্সে সেলাই লাইন')], [30, 'US$ ', 'M', t('Khantex yearly exports', 'খানটেক্সের বার্ষিক রপ্তানি')],
      [ex.certs.length, '', '', t('Certifications held by Khantex', 'খানটেক্সের সনদ')], [ex.buyers.length, '', '', t('Global buyers served by Khantex', 'খানটেক্সের বিশ্বব্যাপী ক্রেতা')], [3, '', '', t('Production units at Sonali Jute', 'সোনালী জুটের উৎপাদন ইউনিট')]
    ];
    const sites = regionSites();
    return `
    <header class="ab-hero">
      <div class="wrap ab-hero-grid">
        <div>
          <p class="eyebrow reveal">${t('About South Bangla Group', 'সাউথ বাংলা গ্রুপ সম্পর্কে')}</p>
          <h1 class="reveal">${t('Rooted in the land.<br><em>Growing across industries.</em>', 'মাটির সাথে শিকড়।<br><em>শিল্পে শিল্পে প্রসার।</em>')}</h1>
          <p class="ab-lead reveal">${t('A family of eight companies in Bangladesh — farms, food mills, garment factories, a jute mill, builders, a lakeside resort and a trading house — held together by one promise: sustainable growth, innovation and quality.', 'বাংলাদেশে আটটি প্রতিষ্ঠানের একটি পরিবার — খামার, খাদ্য মিল, পোশাক কারখানা, পাটকল, নির্মাতা, লেকপাড়ের রিসোর্ট ও একটি ট্রেডিং হাউস — একটি প্রতিশ্রুতিতে বাঁধা: টেকসই প্রবৃদ্ধি, উদ্ভাবন ও মান।')}</p>
          <div class="ab-meta reveal">${hero3([['8', t('companies', 'প্রতিষ্ঠান')], ['6', t('industries', 'শিল্প')], ['5', t('regions', 'অঞ্চল')]])}</div>
        </div>
        <div class="ab-collage reveal">
          <img class="c1" src="${IMG('delta-bld')}" alt="" loading="lazy"><img class="c2" src="${IMG('lake-pool')}" alt="" loading="lazy"><img class="c3" src="${IMG('son-loom')}" alt="" loading="lazy"><img class="c4" src="${IMG('kfl-green')}" alt="" loading="lazy">
          <span class="seal"><img src="${IMG('logo-sbg')}" alt=""></span>
        </div>
      </div>
    </header>

    <div class="wrap ab-layout">
      <aside class="ab-toc" aria-label="${t('On this page', 'এই পেজে')}">
        <b>${t('On this page', 'এই পেজে')}</b>
        ${[['story', t('Our story', 'আমাদের গল্প')], ['values', t('What we stand for', 'আমরা যা বিশ্বাস করি')], ['milestones', t('Milestones', 'মাইলফলক')], ['regions', t('Where we work', 'আমরা যেখানে কাজ করি')], ['numbers', t('By the numbers', 'সংখ্যায়')], ['voices', t('In our own words', 'আমাদের নিজের কথায়')]].map(([id, l], i) => `<a href="#${id}"><i>0${i + 1}</i>${l}</a>`).join('')}
      </aside>
      <div class="ab-body">

        <section id="story" class="ab-sec">
          <h2 class="reveal">${t('One family. Many companies.<br>One standard of quality.', 'একটি পরিবার। অনেক প্রতিষ্ঠান।<br>মানের একই মানদণ্ড।')}</h2>
          <div class="ab-cols">
            <p class="dropcap reveal">${t('South Bangla Group owns and runs a growing set of companies. Some grow food, some make clothes, some spin jute, some build homes, and one welcomes guests to a green resort. Each company has its own team and its own work — and all of them carry the same promise.', 'সাউথ বাংলা গ্রুপ একাধিক প্রতিষ্ঠানের মালিক ও পরিচালক। কেউ ফসল ও খাদ্য উৎপাদন করে, কেউ পোশাক বানায়, কেউ পাট প্রক্রিয়া করে, কেউ ঘরবাড়ি নির্মাণ করে, আর একটি অতিথিদের স্বাগত জানায় সবুজ রিসোর্টে। প্রতিটি প্রতিষ্ঠানের নিজস্ব দল ও নিজস্ব কাজ আছে — কিন্তু সবার প্রতিশ্রুতি এক।')}</p>
            <p class="reveal">${t('That promise is in the group’s own words: <em>sustainable growth, innovation and quality</em> — connecting modern business with nature, and being a good partner to every client, supplier and employee.', 'সেই প্রতিশ্রুতি গ্রুপের নিজের ভাষায়: <em>টেকসই প্রবৃদ্ধি, উদ্ভাবন ও মান</em> — আধুনিক ব্যবসাকে প্রকৃতির সাথে যুক্ত করা এবং প্রতিটি ক্লায়েন্ট, সরবরাহকারী ও কর্মীর ভালো সহযোগী হওয়া।')}</p>
            <p class="reveal">${t('Today the eight companies cover a wide stretch of the economy: dairy sheds, poultry farms and fish ponds; grain silos and spice warehouses; a LEED-certified garment factory and a 14-unit knitwear and denim park; a jute mill; apartment buildings with their own sand and stone; and a resort set inside a working farm.', 'আজ আটটি প্রতিষ্ঠান অর্থনীতির বিস্তৃত অংশ জুড়ে কাজ করছে: ডেইরি শেড, পোলট্রি খামার ও মাছের পুকুর; শস্য সাইলো ও মসলার গুদাম; লিড-সনদপ্রাপ্ত পোশাক কারখানা ও ১৪ ইউনিটের নিটওয়্যার-ডেনিম পার্ক; একটি পাটকল; নিজস্ব বালু-পাথরসহ আবাসিক ভবন; এবং চালু খামারের ভেতরে একটি রিসোর্ট।')}</p>
          </div>
          <figure class="ab-fig reveal"><img src="${IMG('arjs-dairy')}" alt="" loading="lazy"><img src="${IMG('sb-silo')}" alt="" loading="lazy"><img src="${IMG('kfl-sew')}" alt="" loading="lazy"><figcaption>${t('Dairy sheds at ARJS Agro · grain silos at South Bangla Agro Food · the sewing floor at Khantex Fashions', 'এআরজেএস এগ্রোর ডেইরি শেড · সাউথ বাংলা এগ্রো ফুডের শস্য সাইলো · খানটেক্স ফ্যাশনসের সেলাই ফ্লোর')}</figcaption></figure>
        </section>

        <section id="values" class="ab-sec">
          <p class="eyebrow reveal">${t('What we stand for', 'আমরা যা বিশ্বাস করি')}</p>
          <h2 class="reveal">${t('Four values, and where you can see them', 'চারটি মূল্যবোধ — এবং কোথায় তা দেখা যায়')}</h2>
          ${[
            [t('Quality first', 'মান সবার আগে'), t('Careful checks at every step, from raw material to finished product.', 'কাঁচামাল থেকে তৈরি পণ্য পর্যন্ত প্রতিটি ধাপে সতর্ক যাচাই।'), t('Seen at Khantex, where buyer quality checks come before every shipment, and at Sonali Jute Mills, which has its own quality-control section.', 'খানটেক্সে প্রতিটি চালানের আগে ক্রেতার মান পরীক্ষা হয়, আর সোনালী জুট মিলসের আছে নিজস্ব মান-নিয়ন্ত্রণ বিভাগ।')],
            [t('Promises kept', 'প্রতিশ্রুতি রক্ষা'), t('On-time delivery and honest dealings with every customer.', 'সময়মতো সরবরাহ এবং প্রতিটি গ্রাহকের সাথে সৎ আচরণ।'), t('Sonali Jute Mills puts it simply: “make promises, keep promises.” South Bangla Agro Food promises “Purity, Quality & Trust in Every Product.”', 'সোনালী জুট মিলসের কথা সরল: “প্রতিশ্রুতি দাও, প্রতিশ্রুতি রাখো।” সাউথ বাংলা এগ্রো ফুডের প্রতিশ্রুতি “প্রতিটি পণ্যে বিশুদ্ধতা, মান ও বিশ্বাস।”')],
            [t('Respect for nature', 'প্রকৃতির প্রতি শ্রদ্ধা'), t('Green factories, farm waste reused, eco-friendly methods.', 'সবুজ কারখানা, খামারের বর্জ্যের পুনর্ব্যবহার, পরিবেশবান্ধব পদ্ধতি।'), t('Khantex is a LEED-certified factory with solar power and rain-water harvesting; Delta runs two biological effluent-treatment plants; Lake View turns waste from one part of its farm into feed or fertiliser for another.', 'খানটেক্স সৌরবিদ্যুৎ ও বৃষ্টির পানি সংরক্ষণসহ লিড-সনদপ্রাপ্ত কারখানা; ডেল্টায় দুটি জৈবিক বর্জ্য শোধনাগার; লেক ভিউ খামারের এক অংশের বর্জ্য অন্য অংশের খাদ্য বা সার বানায়।')],
            [t('People matter', 'মানুষই মূল'), t('Thousands of jobs, training, and safe workplaces.', 'হাজারো কর্মসংস্থান, প্রশিক্ষণ ও নিরাপদ কর্মস্থল।'), t('About 9,000 people work at Delta, with 20,000 planned. Khantex has an HR & compliance team, a medical room, training and fire-safety drills.', 'ডেল্টায় প্রায় ৯,০০০ মানুষ কাজ করেন, পরিকল্পনা ২০,০০০। খানটেক্সে আছে এইচআর ও কমপ্লায়েন্স দল, মেডিকেল রুম, প্রশিক্ষণ ও অগ্নি-নিরাপত্তা মহড়া।')]
          ].map(([h, d, ev], i) => `<article class="ab-value reveal"><span class="num">0${i + 1}</span><div><h3>${h}</h3><p>${d}</p><p class="ev">${ev}</p></div></article>`).join('')}
        </section>

        <section id="milestones" class="ab-sec">
          <p class="eyebrow reveal">${t('Milestones', 'মাইলফলক')}</p>
          <h2 class="reveal">${t('How the group has taken shape', 'গ্রুপ যেভাবে গড়ে উঠেছে')}</h2>
          <ol class="timeline">
            ${[
              ['2000', t('The Delta Group is founded', 'দ্য ডেল্টা গ্রুপের প্রতিষ্ঠা'), t('An industrial park for knitted and denim garments at Kashimpur, Gazipur — spinning to sewing on one 105-bigha campus.', 'গাজীপুরের কাশিমপুরে নিট ও ডেনিম পোশাকের শিল্প পার্ক — ১০৫ বিঘা ক্যাম্পাসে সুতা কাটা থেকে সেলাই পর্যন্ত।'), 'delta-bld'],
              ['2018', t('Sonali Jute Mills begins', 'সোনালী জুট মিলসের যাত্রা'), t('A jute mill at Satenga, Bhaluka, with three production units, a lamination plant and its own quality-control section.', 'ভালুকার সাতেঙ্গায় পাটকল — তিনটি উৎপাদন ইউনিট, ল্যামিনেশন প্ল্যান্ট ও নিজস্ব মান-নিয়ন্ত্রণ বিভাগসহ।'), 'son-hall'],
              ['2018', t('Khantex Fashions is set up', 'খানটেক্স ফ্যাশনস প্রতিষ্ঠিত'), t('A LEED-certified green garment factory at Sreepur, Gazipur — flagship of KFL Group, exporting about US$ 30 million a year.', 'গাজীপুরের শ্রীপুরে লিড-সনদপ্রাপ্ত সবুজ পোশাক কারখানা — কেএফএল গ্রুপের ফ্ল্যাগশিপ, বছরে প্রায় ৩ কোটি মার্কিন ডলার রপ্তানি।'), 'kfl-factory'],
              [t('Today', 'আজ'), t('Eight companies, six industries', 'আটটি প্রতিষ্ঠান, ছয়টি শিল্প'), t('From dairy and spices to garments, jute, real estate, a resort and trading — with sites in Dhaka, Gazipur, Mymensingh, Sylhet and Chattogram.', 'ডেইরি ও মসলা থেকে পোশাক, পাট, রিয়েল এস্টেট, রিসোর্ট ও ট্রেডিং — ঢাকা, গাজীপুর, ময়মনসিংহ, সিলেট ও চট্টগ্রামজুড়ে।'), 'lake-cover'],
              [t('Next', 'পরবর্তী'), t('Projects in planning', 'পরিকল্পনাধীন প্রকল্প'), t('ARJS Agro has prepared plans for an integrated layer farm with its own feed mill and organic-fertiliser plant, and for a dairy production and processing line.', 'এআরজেএস এগ্রো নিজস্ব ফিড মিল ও জৈব সার কারখানাসহ সমন্বিত লেয়ার ফার্ম এবং ডেইরি উৎপাদন ও প্রক্রিয়াজাতকরণ লাইনের পরিকল্পনা তৈরি করেছে।'), 'arjs-poultry']
            ].map(([y, h, d, im]) => `<li class="reveal"><span class="yr">${y}</span><div class="tl-card"><img src="${IMG(im)}" alt="" loading="lazy"><div><h3>${h}</h3><p>${d}</p></div></div></li>`).join('')}
          </ol>
        </section>

        <section id="regions" class="ab-sec">
          <p class="eyebrow reveal">${t('Where we work', 'আমরা যেখানে কাজ করি')}</p>
          <h2 class="reveal">${t('Five regions of Bangladesh', 'বাংলাদেশের পাঁচটি অঞ্চল')}</h2>
          <div class="region-grid">
            ${REGIONS.map((r) => `<article class="region reveal"><h3>${rname(r)}</h3><p class="rn">${t(r.note[0], r.note[1])}</p><ul>${[...new Map(sites[r.id].map((x) => [x.c.id, x.c])).values()].map((c) => `<li><button type="button" data-open="${c.id}">${esc(c.short)}</button></li>`).join('')}</ul></article>`).join('')}
          </div>
        </section>

        <section id="numbers" class="ab-sec">
          <p class="eyebrow reveal">${t('By the numbers', 'সংখ্যায়')}</p>
          <h2 class="reveal">${t('The group in figures', 'সংখ্যায় গ্রুপ')}</h2>
          <div class="numgrid">${nums.map(([n, pre, suf, l]) => `<div class="num reveal"><b data-count="${n}" data-prefix="${pre}" data-suffix="${suf}">0</b><span>${l}</span></div>`).join('')}
            <div class="num wide reveal"><b class="txt">BDT 1,200+ crore</b><span>${t('Yearly turnover of The Delta Group of Industries', 'দ্য ডেল্টা গ্রুপ অব ইন্ডাস্ট্রিজের বার্ষিক টার্নওভার')}</span></div>
          </div>
          <p class="src reveal">${t('Figures are as printed in each company’s own profile.', 'সংখ্যাগুলো প্রতিটি প্রতিষ্ঠানের নিজস্ব প্রোফাইল থেকে নেওয়া।')}</p>
        </section>

        <section id="voices" class="ab-sec">
          <p class="eyebrow reveal">${t('In our own words', 'আমাদের নিজের কথায়')}</p>
          <h2 class="reveal">${t('What the companies say about themselves', 'প্রতিষ্ঠানগুলো নিজেদের সম্পর্কে যা বলে')}</h2>
          <div class="quotes">
            <blockquote class="reveal"><p>${t('“Reliability, quality in the service, corporate culture of team work… customer satisfaction are our prime concerns.”', '“নির্ভরযোগ্যতা, সেবার মান, দলগত কর্মসংস্কৃতি… গ্রাহক সন্তুষ্টিই আমাদের প্রধান বিবেচনা।”')}</p><cite>— Engr. A.K.M. Faruque Ahamed, Chairman &amp; Managing Director, The Delta Group</cite></blockquote>
            <blockquote class="reveal"><p>${t('“Our agro projects, fish feed production, and integrated farms work together to ensure high standards and eco-friendly practices.”', '“আমাদের কৃষি প্রকল্প, ফিশ ফিড উৎপাদন ও সমন্বিত খামার একসাথে কাজ করে উচ্চমান ও পরিবেশবান্ধব পদ্ধতি নিশ্চিত করে।”')}</p><cite>— ${t('Chairman &amp; Managing Director, Lake View Garden City', 'চেয়ারম্যান ও ব্যবস্থাপনা পরিচালক, লেক ভিউ গার্ডেন সিটি')}</cite></blockquote>
          </div>
          <div class="mottos reveal">${['Purity, Quality & Trust in Every Product', 'Make promises, keep promises', 'Connecting Markets, Creating Opportunities', 'প্রকৃতির মাঝে আধুনিকতার ছোঁয়া'].map((m) => `<span>${esc(m)}</span>`).join('')}</div>
        </section>
      </div>
    </div>
    ${nextBand([['what-we-do.html', t('What we do', 'আমরা যা করি')], ['companies.html', t('Our companies', 'আমাদের প্রতিষ্ঠান')], ['leadership.html', t('Leadership', 'নেতৃত্ব')]], t('Keep exploring', 'আরও জানুন'))}`;
  }
  const nextBand = (links, h) => `<section class="next-band"><div class="wrap"><h2>${h}</h2><p>${links.map(([u, l]) => `<a class="btn btn-gold" href="${u}">${l} →</a>`).join('')}</p></div></section>`;

  /* ============================ WHAT WE DO ============================ */
  function what() {
    const all = sectors();
    return `
    <header class="wd-hero">
      <div class="wrap center">
        <p class="eyebrow reveal">${t('What we do', 'আমরা যা করি')}</p>
        <h1 class="reveal">${t('Six industries.<br><span class="gold-text">One group.</span>', 'ছয়টি শিল্প।<br><span class="gold-text">একটি গ্রুপ।</span>')}</h1>
        <p class="sub reveal">${t('From the field to the finished garment — pick an industry to see what its companies grow, make and build.', 'মাঠ থেকে তৈরি পোশাক পর্যন্ত — একটি শিল্প বেছে নিয়ে দেখুন তার প্রতিষ্ঠানগুলো কী ফলায়, কী বানায়, কী গড়ে।')}</p>
        <div class="wd-tiles">${all.map((s, i) => `<a class="wd-tile reveal" href="#${s.id}" style="--d:${i * .06}s">${svg(s.icon)}<b>${esc(s.label)}</b><small>${COMPANIES.filter((c) => inSector(c, s.id)).length} ${t('companies', 'প্রতিষ্ঠান')}</small></a>`).join('')}</div>
      </div>
    </header>

    ${all.map((s, i) => {
      const list = COMPANIES.filter((c) => inSector(c, s.id)).map(co);
      const first = list[0];
      const caps = [...new Set(list.flatMap((c) => c.highlights))];
      return `<section class="wd-panel" id="${s.id}" style="--bg:url('${first.cover || ''}')">
        <div class="wrap wd-grid">
          <div class="wd-side">
            <span class="wd-no">0${i + 1}</span>
            <span class="wd-ico">${svg(s.icon)}</span>
            <h2>${esc(s.label)}</h2>
            <p>${esc(s.blurb)}</p>
            <h4>${t('Capabilities', 'সক্ষমতা')}</h4>
            <div class="tags">${caps.map((h) => `<span class="tag">${esc(h)}</span>`).join('')}</div>
          </div>
          <div class="wd-cos">
            ${list.map((c) => `<article class="wd-co">
              <header><div><h3>${esc(c.name)}</h3><p class="tg">${esc(c.tag)}</p></div><button class="btn btn-gold btn-sm" type="button" data-open="${c.id}">${t('Full profile', 'পূর্ণ প্রোফাইল')}</button></header>
              ${c.about.slice(0, 2).map((p) => `<p>${esc(p)}</p>`).join('')}
              <dl class="wd-facts">${c.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
              ${c.extra && c.extra.certs ? `<h4>${t('Certifications', 'সনদ')}</h4><div class="pillrow">${c.extra.certs.map((x) => `<span class="pill gold">${esc(x)}</span>`).join('')}</div>` : ''}
              ${c.gallery.length ? `<div class="wd-strip">${c.gallery.slice(0, 4).map((g, n) => `<button type="button" data-g="${c.id}" data-i="${n}" aria-label="${esc(c.short)} ${n + 1}"><img src="${g}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}
            </article>`).join('')}
          </div>
        </div>
      </section>`;
    }).join('')}

    <section class="wd-table">
      <div class="wrap">
        <h2>${t('Industry at a glance', 'এক নজরে শিল্প খাত')}</h2>
        <div class="tbl-wrap"><table>
          <thead><tr><th>${t('Industry', 'শিল্প')}</th><th>${t('Companies', 'প্রতিষ্ঠান')}</th><th>${t('What they do', 'যা করে')}</th></tr></thead>
          <tbody>${all.map((s) => { const l = COMPANIES.filter((c) => inSector(c, s.id)).map(co); return `<tr><th><a href="#${s.id}">${esc(s.label)}</a></th><td>${l.map((c) => `<button type="button" class="linkish" data-open="${c.id}">${esc(c.short)}</button>`).join('<br>')}</td><td>${esc([...new Set(l.flatMap((c) => c.highlights))].join(' · '))}</td></tr>`; }).join('')}</tbody>
        </table></div>
      </div>
    </section>
    ${nextBand([['companies.html', t('Explore the companies', 'প্রতিষ্ঠানগুলো দেখুন')], ['contact.html', t('Find the right team', 'সঠিক দল খুঁজুন')]], t('Interested in one of our industries?', 'আমাদের কোনো শিল্পে আগ্রহী?'))}`;
  }

  /* ============================ COMPANIES (explorer) ============================ */
  const X = { id: null, tab: 'overview', sector: 'all', q: '' };
  function companies() {
    return `
    <header class="cx-hero">
      <div class="wrap">
        <p class="eyebrow reveal">${t('Company explorer', 'প্রতিষ্ঠান এক্সপ্লোরার')}</p>
        <h1 class="reveal">${t('Eight companies.<br>Find the one you need.', 'আটটি প্রতিষ্ঠান।<br>আপনার দরকারিটি খুঁজে নিন।')}</h1>
        <div class="cx-tools reveal">
          <label class="cx-search"><span class="sr">${t('Search companies', 'প্রতিষ্ঠান খুঁজুন')}</span><input id="cxQ" type="search" placeholder="${t('Search by name, product or place…', 'নাম, পণ্য বা স্থান দিয়ে খুঁজুন…')}" value="${esc(X.q)}"></label>
          <div class="filters" id="cxSec"></div>
        </div>
      </div>
    </header>
    <div class="wrap cx-wrap">
      <nav class="cx-list" id="cxList" aria-label="${t('Companies', 'প্রতিষ্ঠান')}"></nav>
      <article class="cx-detail" id="cxDetail"></article>
    </div>
    <section class="cx-compare">
      <div class="wrap">
        <h2>${t('Compare the companies', 'প্রতিষ্ঠানগুলোর তুলনা')}</h2>
        <div class="tbl-wrap"><table>
          <thead><tr><th>${t('Company', 'প্রতিষ্ঠান')}</th><th>${t('Industry', 'শিল্প')}</th><th>${t('Founded', 'প্রতিষ্ঠা')}</th><th>${t('Where', 'কোথায়')}</th><th>${t('Led by', 'নেতৃত্বে')}</th><th>${t('Phone', 'ফোন')}</th></tr></thead>
          <tbody>${COMPANIES.map((b) => {
            const c = co(b), f = c.facts.find(([k]) => k === 'Founded' || k === 'প্রতিষ্ঠা');
            const lead = c.leaders.filter((l) => /Chairman|Managing Director$|Leads/.test(l.role) && !/Deputy/.test(l.role)).slice(0, 2).map((l) => l.name).join(', ');
            const ph = contactOf(c, 'Phone').split(',')[0];
            return `<tr data-pick="${c.id}"><th><button type="button" class="linkish" data-pick="${c.id}">${esc(c.name)}</button></th><td>${esc(sectorOf(c.sector).label)}</td><td>${f ? esc(f[1]) : '—'}</td><td>${regionsOf(c.id).map(rname).join(' · ')}</td><td>${esc(lead)}</td><td>${ph ? `<a href="tel:${tel(ph)}">${esc(ph.trim())}</a>` : '—'}</td></tr>`;
          }).join('')}</tbody>
        </table></div>
      </div>
    </section>`;
  }
  const cxMatch = (c) => {
    if (X.sector !== 'all' && !inSector(c, X.sector)) return false;
    const q = X.q.trim().toLowerCase();
    return !q || [c.name, c.tag, c.summary, c.highlights.join(' '), c.about.join(' '), c.contacts.map((x) => x[1]).join(' ')].join(' ').toLowerCase().includes(q);
  };
  function cxList() {
    $('#cxSec').innerHTML = [{ id: 'all', label: t('All', 'সব') }, ...sectors()].map((s) => `<button type="button" class="chip" data-sec="${s.id}" aria-pressed="${s.id === X.sector}">${esc(s.label)}</button>`).join('');
    const list = COMPANIES.map(co).filter(cxMatch);
    $('#cxList').innerHTML = list.length ? list.map((c) => `<button type="button" class="cx-row ${c.id === X.id ? 'on' : ''}" data-pick="${c.id}">
      <span class="th ${c.cover ? '' : 'logo'}"><img src="${c.cover || c.logo}" alt="" loading="lazy"></span>
      <span class="tx"><b>${esc(c.name)}</b><small>${esc(sectorOf(c.sector).label)}</small></span></button>`).join('') : `<p class="empty">${t('No company matches. Try a different word.', 'কোনো প্রতিষ্ঠান মেলেনি। অন্য শব্দ চেষ্টা করুন।')}</p>`;
  }
  function cxDetail() {
    const c = C(X.id), ex = c.extra || {};
    const tabs = [['overview', t('Overview', 'সারসংক্ষেপ')], ['photos', t('Photos', 'ছবি')], ['people', t('People', 'মানুষ')], ['contact', t('Contact', 'যোগাযোগ')]].filter(([k]) => k !== 'photos' || c.gallery.length);
    if (!tabs.some(([k]) => k === X.tab)) X.tab = 'overview';
    let body = '';
    if (X.tab === 'overview') body = `<div class="cx-ov"><div class="cx-about">${c.about.map((p) => `<p>${esc(p)}</p>`).join('')}<div class="tags">${c.highlights.map((h) => `<span class="tag">${esc(h)}</span>`).join('')}</div></div>
      <dl class="cx-facts">${c.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl></div>
      ${ex.buyers ? `<h3>${esc(ex.title)}</h3><div class="pillrow">${ex.buyers.map((b) => `<span class="pill">${esc(b)}</span>`).join('')}</div><h3>${t('Certifications & standards', 'সনদ ও মান')}</h3><div class="pillrow">${ex.certs.map((b) => `<span class="pill gold">${esc(b)}</span>`).join('')}</div>` : ''}
      ${ex.siblings ? `<h3>${esc(ex.siblingsTitle)}</h3><ol class="sib">${ex.siblings.map((b) => `<li>${esc(b)}</li>`).join('')}</ol>` : ''}`;
    if (X.tab === 'photos') body = `<div class="gallery">${c.gallery.map((g, i) => `<button type="button" data-g="${c.id}" data-i="${i}" aria-label="${i + 1}"><img src="${g}" alt="${esc(c.short)} ${i + 1}" loading="lazy"></button>`).join('')}</div>`;
    if (X.tab === 'people') body = `<div class="cx-people">${c.leaders.map((l) => `<div class="cx-person">${l.photo ? `<img src="${l.photo}" alt="${esc(l.name)}" loading="lazy">` : `<span class="noph big">${S.initial(l.name)}</span>`}<b>${esc(l.name)}</b><small>${esc(role(l.role))}</small></div>`).join('')}</div>`;
    if (X.tab === 'contact') {
      const em = contactOf(c, 'Email');
      body = `<dl class="m-contacts">${c.contacts.map(S.contactLine).join('')}</dl><p class="cx-cta"><a class="btn btn-gold" href="mailto:${em || GROUP_CONTACT.email}?subject=${encodeURIComponent('Enquiry — ' + c.name)}">${t('Write to this company', 'এই প্রতিষ্ঠানকে লিখুন')}</a> <a class="btn btn-ghost-dk" href="contact.html">${t('Use the contact page', 'যোগাযোগ পেজ')}</a></p>`;
    }
    $('#cxDetail').innerHTML = `<div class="cx-banner ${c.cover ? '' : 'logo'}"><img src="${c.cover || c.logo}" alt="" style="object-position:${c.position || 'center'}"><div><p class="eyebrow">${esc(sectorOf(c.sector).label)}</p><h2>${esc(c.name)}</h2><p>${esc(c.tag)}</p></div></div>
      <div class="cx-tabs" role="tablist">${tabs.map(([k, l]) => `<button type="button" role="tab" data-tab="${k}" aria-selected="${k === X.tab}">${l}</button>`).join('')}</div><div class="cx-body">${body}</div>`;
  }
  function cxInit() {
    if (!X.id || !COMPANIES.some((c) => c.id === X.id)) {
      const h = location.hash.slice(1);
      X.id = COMPANIES.some((c) => c.id === h) ? h : COMPANIES[0].id;
    }
    cxList(); cxDetail();
  }

  /* ============================ LEADERSHIP ============================ */
  function leadership() {
    const ppl = people().sort((a, b) => a.rank - b.rank);
    const tiers = [[1, t('Chairmen', 'চেয়ারম্যান'), 'tier-c'], [2, t('Managing directors', 'ব্যবস্থাপনা পরিচালক'), 'tier-m'], [3, t('Directors', 'পরিচালক'), 'tier-d']];
    const multi = ppl.filter((p) => p.roles.length > 1).sort((a, b) => b.roles.length - a.roles.length);
    const code = (r) => (/Chairman &/.test(r) ? 'C·MD' : /Chairman/.test(r) ? 'C' : /Deputy/.test(r) ? 'DMD' : /Managing/.test(r) || /^Leads/.test(r) ? 'MD' : 'D');
    return `
    <header class="ld-hero">
      <div class="wrap">
        <p class="eyebrow reveal">${t('Leadership', 'নেতৃত্ব')}</p>
        <h1 class="reveal">${t('The people who<br>steer the group', 'যাঁরা গ্রুপকে<br>পথ দেখান')}</h1>
        <div class="ld-stats reveal">${hero3([[ppl.length, t('leaders', 'নেতা')], [COMPANIES.length, t('boards', 'বোর্ড')], [multi.length, t('serve on several boards', 'একাধিক বোর্ডে আছেন')]])}</div>
      </div>
    </header>

    ${tiers.map(([r, h, cls]) => `<section class="ld-tier ${cls}"><div class="wrap"><h2 class="reveal">${h}</h2>
      <div class="ld-cards">${ppl.filter((p) => p.rank === r).map((p) => `<article class="ld-card reveal"><div class="ph">${pPhoto(p)}</div><div class="in"><h3>${esc(p.name)}</h3><div class="rps">${rolePills(p)}</div></div></article>`).join('')}</div></div></section>`).join('')}

    <section class="ld-matrix">
      <div class="wrap">
        <p class="eyebrow">${t('Board matrix', 'বোর্ড ম্যাট্রিক্স')}</p>
        <h2>${t('Who sits where', 'কে কোথায় আছেন')}</h2>
        <p class="sub">${t('C = Chairman · MD = Managing Director · DMD = Deputy Managing Director · D = Director', 'C = চেয়ারম্যান · MD = ব্যবস্থাপনা পরিচালক · DMD = উপ-ব্যবস্থাপনা পরিচালক · D = পরিচালক')}</p>
        <div class="tbl-wrap"><table class="mx">
          <thead><tr><th></th>${COMPANIES.map((c) => `<th><button type="button" class="linkish" data-open="${c.id}">${esc(c.short)}</button></th>`).join('')}</tr></thead>
          <tbody>${ppl.map((p) => `<tr><th><span class="mp">${p.photo ? `<img src="${p.photo}" alt="" loading="lazy">` : `<span class="noph">${S.initial(p.name)}</span>`}${esc(p.name)}</span></th>${COMPANIES.map((c) => { const r = p.roles.find((x) => x.id === c.id); return `<td>${r ? `<span class="rc r-${code(r.role).replace('·', '')}" title="${esc(role(r.role))}">${code(r.role)}</span>` : ''}</td>`; }).join('')}</tr>`).join('')}</tbody>
        </table></div>
      </div>
    </section>

    <section class="ld-shared">
      <div class="wrap">
        <p class="eyebrow">${t('Shared boards', 'যৌথ বোর্ড')}</p>
        <h2>${t('Leaders who connect the companies', 'যে নেতারা প্রতিষ্ঠানগুলোকে জুড়ে রাখেন')}</h2>
        <div class="shared">${multi.map((p) => `<article class="reveal"><div class="sh-head">${p.photo ? `<img src="${p.photo}" alt="" loading="lazy">` : ''}<div><h3>${esc(p.name)}</h3><small>${p.roles.length} ${t('boards', 'বোর্ড')}</small></div></div>
          <ul>${p.roles.map((r) => `<li><b>${esc(role(r.role))}</b><button type="button" class="linkish" data-open="${r.id}">${esc(C(r.id).name)}</button></li>`).join('')}</ul></article>`).join('')}</div>
      </div>
    </section>
    ${nextBand([['companies.html', t('See the companies', 'প্রতিষ্ঠানগুলো দেখুন')], ['contact.html', t('Contact the group', 'গ্রুপে যোগাযোগ করুন')]], t('Want to reach a company directly?', 'সরাসরি কোনো প্রতিষ্ঠানে যোগাযোগ করতে চান?'))}`;
  }

  /* ============================ CONTACT ============================ */
  const TOPICS = () => [
    [t('Grains, spices, pulses, onion, mustard oil or feed', 'শস্য, মসলা, ডাল, পেঁয়াজ, সরিষার তেল বা ফিড'), ['sbagro']],
    [t('Garments, knitwear or denim orders', 'পোশাক, নিটওয়্যার বা ডেনিমের অর্ডার'), ['khantex', 'delta']],
    [t('Jute yarn, hessian or jute products', 'পাটের সুতা, হেসিয়ান বা পাটজাত পণ্য'), ['sonali']],
    [t('Land, apartments, sand or stone', 'জমি, ফ্ল্যাট, বালু বা পাথর'), ['premio']],
    [t('Visit the resort or the farm', 'রিসোর্ট বা খামার পরিদর্শন'), ['lakeview']],
    [t('Dairy, poultry, fish, dredging or contracting', 'ডেইরি, পোলট্রি, মাছ, ড্রেজিং বা ঠিকাদারি'), ['arjs']],
    [t('Trading and partnerships', 'ট্রেডিং ও অংশীদারিত্ব'), ['accessworld']],
    [t('Something else / the whole group', 'অন্য কিছু / পুরো গ্রুপ'), []]
  ];
  let K = { topic: 0, region: 'dhaka' };
  function contact() {
    return `
    <header class="ct-hero">
      <div class="wrap ct-hero-grid">
        <div>
          <p class="eyebrow reveal">${t('Contact', 'যোগাযোগ')}</p>
          <h1 class="reveal">${t('Let’s talk<br>business.', 'চলুন ব্যবসা<br>নিয়ে কথা বলি।')}</h1>
          <p class="ct-lead reveal">${t('Whether you want to buy, partner, visit a farm, or ask about any company in the group — tell us what you need and the right team will reply.', 'কেনা, অংশীদারিত্ব, খামার পরিদর্শন, বা গ্রুপের যেকোনো প্রতিষ্ঠান সম্পর্কে জানতে চাইলে — আপনার প্রয়োজন জানান, সঠিক দল উত্তর দেবে।')}</p>
          <ul class="ct-quick reveal">
            <li><span>${svg('phone')}</span><a href="tel:${tel(GROUP_CONTACT.phone)}">${GROUP_CONTACT.phone}</a></li>
            <li><span>${svg('mail')}</span><a href="mailto:${GROUP_CONTACT.email}">${GROUP_CONTACT.email}</a></li>
            <li><span>${svg('pin')}</span>${esc(GROUP_CONTACT.address)}</li>
          </ul>
        </div>
        <div class="ct-router reveal">
          <h2>${t('Find the right team', 'সঠিক দল খুঁজুন')}</h2>
          <p>${t('What do you need help with?', 'কী নিয়ে সাহায্য চান?')}</p>
          <div class="topics" id="ctTopics"></div>
          <div class="route" id="ctRoute" aria-live="polite"></div>
        </div>
      </div>
    </header>

    <section class="ct-regions">
      <div class="wrap">
        <p class="eyebrow">${t('Visit us', 'আমাদের ঠিকানা')}</p>
        <h2>${t('Offices, factories & farms by region', 'অঞ্চল অনুযায়ী অফিস, কারখানা ও খামার')}</h2>
        <div class="rtabs" id="ctTabs" role="tablist"></div>
        <div class="rpanel" id="ctPanel"></div>
      </div>
    </section>

    <section class="ct-form-sec">
      <div class="wrap ct-form-grid">
        <div><p class="eyebrow">${t('Write to us', 'আমাদের লিখুন')}</p><h2>${t('Send a message', 'বার্তা পাঠান')}</h2>
          <p>${t('Pick the company you are writing about and we will pass your note to the right team.', 'যে প্রতিষ্ঠান সম্পর্কে লিখছেন সেটি বেছে নিন — আমরা বার্তাটি সঠিক দলের কাছে পৌঁছে দেব।')}</p>
          <p class="hint">${t('Sending opens your email app with the message ready to go.', 'পাঠাতে চাপলে আপনার ইমেইল অ্যাপ বার্তাসহ খুলবে।')}</p></div>
        <form class="ct-form" id="ctForm" novalidate>
          <label><span>${t('Your name', 'আপনার নাম')}</span><input name="name" required autocomplete="name"></label>
          <label><span>${t('Phone or email', 'ফোন বা ইমেইল')}</span><input name="from" required autocomplete="off"></label>
          <label><span>${t('Which company?', 'কোন প্রতিষ্ঠান?')}</span><select name="company"><option value="">${t('Not sure / whole group', 'নিশ্চিত নই / পুরো গ্রুপ')}</option>${COMPANIES.map((c) => `<option value="${esc(c.id)}">${esc(c.name)}</option>`).join('')}</select></label>
          <label><span>${t('Message', 'বার্তা')}</span><textarea name="msg" rows="5" required></textarea></label>
          <button class="btn btn-gold" type="submit">${t('Send message', 'বার্তা পাঠান')}</button>
          <p class="form-note" id="ctNote" aria-live="polite"></p>
        </form>
      </div>
    </section>

    <section class="ct-dir">
      <div class="wrap">
        <h2>${t('Phone & email directory', 'ফোন ও ইমেইল ডিরেক্টরি')}</h2>
        <div class="tbl-wrap"><table>
          <thead><tr><th>${t('Company', 'প্রতিষ্ঠান')}</th><th>${t('Phone', 'ফোন')}</th><th>${t('Email', 'ইমেইল')}</th></tr></thead>
          <tbody>${COMPANIES.map((b) => { const c = co(b), ph = contactOf(c, 'Phone'), em = contactOf(c, 'Email'); return `<tr><th>${esc(c.name)}</th><td>${ph ? phones(ph) : `<span class="dim">${t('Use the group number', 'গ্রুপের নম্বর ব্যবহার করুন')}</span>`}</td><td>${em ? `<a href="mailto:${esc(em)}">${esc(em)}</a>` : `<a href="mailto:${GROUP_CONTACT.email}">${GROUP_CONTACT.email}</a>`}</td></tr>`; }).join('')}</tbody>
        </table></div>
      </div>
    </section>`;
  }
  function ctRoute() {
    const [label, ids] = TOPICS()[K.topic];
    $('#ctTopics').innerHTML = TOPICS().map(([l], i) => `<button type="button" class="chip" data-topic="${i}" aria-pressed="${i === K.topic}">${l}</button>`).join('');
    const cards = ids.length ? ids.map((id) => {
      const c = C(id), ph = contactOf(c, 'Phone'), em = contactOf(c, 'Email') || GROUP_CONTACT.email;
      const off = c.contacts.find(([k]) => !['Phone', 'Email', 'Group desk'].includes(k));
      return `<div class="rt-card"><h3>${esc(c.name)}</h3>${off ? `<p>${esc(off[1])}</p>` : ''}<p>${ph ? phones(ph) : phones(GROUP_CONTACT.phone)}</p><p><a href="mailto:${esc(em)}?subject=${encodeURIComponent('Enquiry — ' + c.name)}">${esc(em)}</a></p><button type="button" class="btn btn-gold btn-sm" data-open="${c.id}">${t('Company profile', 'প্রতিষ্ঠানের প্রোফাইল')}</button></div>`;
    }).join('') : `<div class="rt-card"><h3>${t('Group office', 'গ্রুপ অফিস')}</h3><p>${esc(GROUP_CONTACT.address)}</p><p>${phones(GROUP_CONTACT.phone)}</p><p><a href="mailto:${GROUP_CONTACT.email}">${GROUP_CONTACT.email}</a></p></div>`;
    $('#ctRoute').innerHTML = `<p class="rt-h">${t('Best team for:', 'সবচেয়ে উপযুক্ত দল:')} <b>${label}</b></p>${cards}`;
  }
  function ctRegions() {
    const sites = regionSites();
    $('#ctTabs').innerHTML = REGIONS.map((r) => `<button type="button" role="tab" data-region="${r.id}" aria-selected="${r.id === K.region}">${rname(r)} <i>${sites[r.id].length}</i></button>`).join('');
    const r = REGIONS.find((x) => x.id === K.region);
    $('#ctPanel').innerHTML = `<p class="rn">${t(r.note[0], r.note[1])}</p><div class="sites">${sites[r.id].map(({ c, k, v }) => `<article class="site"><small>${esc(S.label(k))}</small><h3>${esc(c.short)}</h3><p>${esc(v)}</p><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v)}" target="_blank" rel="noopener">${t('Open in maps', 'ম্যাপে দেখুন')} ↗</a></article>`).join('')}</div>`;
  }

  /* ============================ wiring ============================ */
  const BUILD = { about, 'what': what, companies, leadership, contact };

  root.addEventListener('click', (e) => {
    const g = e.target.closest('[data-g]');
    if (g) { S.lightbox(C(g.dataset.g).gallery, +g.dataset.i); return; }
    const o = e.target.closest('[data-open]');
    if (o) { S.openCompany(o.dataset.open); return; }
    const pk = e.target.closest('[data-pick]');
    if (pk && page === 'companies') {
      X.id = pk.dataset.pick; X.tab = 'overview'; history.replaceState(null, '', '#' + X.id);
      cxList(); cxDetail(); $('.cx-wrap').scrollIntoView({ behavior: 'smooth' }); return;
    }
    const sc = e.target.closest('[data-sec]'); if (sc) { X.sector = sc.dataset.sec; cxList(); return; }
    const tb = e.target.closest('[data-tab]'); if (tb) { X.tab = tb.dataset.tab; cxDetail(); return; }
    const tp = e.target.closest('[data-topic]'); if (tp) { K.topic = +tp.dataset.topic; ctRoute(); return; }
    const rg = e.target.closest('[data-region]'); if (rg) { K.region = rg.dataset.region; ctRegions(); }
  });
  root.addEventListener('input', (e) => { if (e.target.id === 'cxQ') { X.q = e.target.value; cxList(); } });
  root.addEventListener('submit', (e) => {
    if (e.target.id !== 'ctForm') return;
    e.preventDefault();
    const f = e.target, note = $('#ctNote'); let ok = true;
    ['name', 'from', 'msg'].forEach((n) => { const bad = !f[n].value.trim(); f[n].classList.toggle('bad', bad); if (bad) ok = false; });
    if (!ok) { note.textContent = t('Please fill in your name, how to reach you, and a message.', 'অনুগ্রহ করে নাম, যোগাযোগের মাধ্যম ও বার্তা লিখুন।'); return; }
    const comp = COMPANIES.find((c) => c.id === f.company.value);
    const who = comp ? comp.name : 'Whole group';
    const to = comp && contactOf(comp, 'Email') ? contactOf(comp, 'Email') : GROUP_CONTACT.email;
    const body = `${f.msg.value}\n\nFrom: ${f.name.value}\nContact: ${f.from.value}\nRegarding: ${who}`;
    location.href = `mailto:${to}?subject=${encodeURIComponent('Enquiry — ' + who)}&body=${encodeURIComponent(body)}`;
    note.textContent = t('Thank you! Your email app should now open with the message ready to send.', 'ধন্যবাদ! আপনার ইমেইল অ্যাপে বার্তাটি তৈরি অবস্থায় খুলবে।');
  });

  const cio = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { S.countUp(x.target); cio.unobserve(x.target); } }), { threshold: .5 });

  return (first) => {
    const build = BUILD[page];
    if (!build) return;
    root.innerHTML = build();
    if (page === 'companies') cxInit();
    if (page === 'contact') { ctRoute(); ctRegions(); }
    const rv = $$('.reveal', root);
    if (first) S.observeReveals(rv); else rv.forEach((el) => el.classList.add('in'));
    $$('[data-count]', root).forEach((el) => cio.observe(el));
    if (first && location.hash && page !== 'companies') setTimeout(() => { const el = document.getElementById(location.hash.slice(1)); el && el.scrollIntoView(); }, 80);
  };
});

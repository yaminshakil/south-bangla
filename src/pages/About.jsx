import { useApp } from '../AppContext.jsx';
import Layout, { LOGO } from '../components/Layout.jsx';
import { NextBand } from '../components/shared.jsx';
import { CountUp, Html, useReveal } from '../lib.jsx';
import { REGIONS, regionName, regionSites } from './helpers.js';

const IMG = (n) => `${import.meta.env.BASE_URL}assets/img/${n}.jpg`;

export default function About() {
  useReveal();
  const app = useApp();
  const { t, C, openCompany, bn } = app;
  const ex = C('khantex').extra;
  const nums = [
    [8, '', '', t('Group companies', 'গ্রুপের প্রতিষ্ঠান')], [6, '', '', t('Industries', 'শিল্প খাত')], [5, '', '', t('Regions with our sites', 'অঞ্চলে আমাদের উপস্থিতি')],
    [14, '', '', t('Units in The Delta Group', 'ডেল্টা গ্রুপের ইউনিট')], [105, '', t(' bigha', ' বিঘা'), t('Delta campus', 'ডেল্টা ক্যাম্পাস')], [9000, '', '+', t('People at Delta (20,000 planned)', 'ডেল্টায় কর্মী (পরিকল্পনা ২০,০০০)')],
    [22.5, '', ' MW', t('Delta’s own gas power', 'ডেল্টার নিজস্ব গ্যাস বিদ্যুৎ')], [24, '', '', t('Sewing lines at Khantex', 'খানটেক্সে সেলাই লাইন')], [30, 'US$ ', 'M', t('Khantex yearly exports', 'খানটেক্সের বার্ষিক রপ্তানি')],
    [ex.certs.length, '', '', t('Certifications held by Khantex', 'খানটেক্সের সনদ')], [ex.buyers.length, '', '', t('Global buyers served by Khantex', 'খানটেক্সের বিশ্বব্যাপী ক্রেতা')], [3, '', '', t('Production units at Sonali Jute', 'সোনালী জুটের উৎপাদন ইউনিট')]
  ];
  const sites = regionSites(app);
  const toc = [['story', t('Our story', 'আমাদের গল্প')], ['values', t('What we stand for', 'আমরা যা বিশ্বাস করি')], ['milestones', t('Milestones', 'মাইলফলক')], ['regions', t('Where we work', 'আমরা যেখানে কাজ করি')], ['numbers', t('By the numbers', 'সংখ্যায়')], ['voices', t('In our own words', 'আমাদের নিজের কথায়')]];
  const values = [
    [t('Quality first', 'মান সবার আগে'), t('Careful checks at every step, from raw material to finished product.', 'কাঁচামাল থেকে তৈরি পণ্য পর্যন্ত প্রতিটি ধাপে সতর্ক যাচাই।'), t('Seen at Khantex, where buyer quality checks come before every shipment, and at Sonali Jute Mills, which has its own quality-control section.', 'খানটেক্সে প্রতিটি চালানের আগে ক্রেতার মান পরীক্ষা হয়, আর সোনালী জুট মিলসের আছে নিজস্ব মান-নিয়ন্ত্রণ বিভাগ।')],
    [t('Promises kept', 'প্রতিশ্রুতি রক্ষা'), t('On-time delivery and honest dealings with every customer.', 'সময়মতো সরবরাহ এবং প্রতিটি গ্রাহকের সাথে সৎ আচরণ।'), t('Sonali Jute Mills puts it simply: “make promises, keep promises.” South Bangla Agro Food promises “Purity, Quality & Trust in Every Product.”', 'সোনালী জুট মিলসের কথা সরল: “প্রতিশ্রুতি দাও, প্রতিশ্রুতি রাখো।” সাউথ বাংলা এগ্রো ফুডের প্রতিশ্রুতি “প্রতিটি পণ্যে বিশুদ্ধতা, মান ও বিশ্বাস।”')],
    [t('Respect for nature', 'প্রকৃতির প্রতি শ্রদ্ধা'), t('Green factories, farm waste reused, eco-friendly methods.', 'সবুজ কারখানা, খামারের বর্জ্যের পুনর্ব্যবহার, পরিবেশবান্ধব পদ্ধতি।'), t('Khantex is a LEED-certified factory with solar power and rain-water harvesting; Delta runs two biological effluent-treatment plants; Lake View turns waste from one part of its farm into feed or fertiliser for another.', 'খানটেক্স সৌরবিদ্যুৎ ও বৃষ্টির পানি সংরক্ষণসহ লিড-সনদপ্রাপ্ত কারখানা; ডেল্টায় দুটি জৈবিক বর্জ্য শোধনাগার; লেক ভিউ খামারের এক অংশের বর্জ্য অন্য অংশের খাদ্য বা সার বানায়।')],
    [t('People matter', 'মানুষই মূল'), t('Thousands of jobs, training, and safe workplaces.', 'হাজারো কর্মসংস্থান, প্রশিক্ষণ ও নিরাপদ কর্মস্থল।'), t('About 9,000 people work at Delta, with 20,000 planned. Khantex has an HR & compliance team, a medical room, training and fire-safety drills.', 'ডেল্টায় প্রায় ৯,০০০ মানুষ কাজ করেন, পরিকল্পনা ২০,০০০। খানটেক্সে আছে এইচআর ও কমপ্লায়েন্স দল, মেডিকেল রুম, প্রশিক্ষণ ও অগ্নি-নিরাপত্তা মহড়া।')]
  ];
  const milestones = [
    ['2000', t('The Delta Group is founded', 'দ্য ডেল্টা গ্রুপের প্রতিষ্ঠা'), t('An industrial park for knitted and denim garments at Kashimpur, Gazipur — spinning to sewing on one 105-bigha campus.', 'গাজীপুরের কাশিমপুরে নিট ও ডেনিম পোশাকের শিল্প পার্ক — ১০৫ বিঘা ক্যাম্পাসে সুতা কাটা থেকে সেলাই পর্যন্ত।'), 'delta-bld'],
    ['2018', t('Sonali Jute Mills begins', 'সোনালী জুট মিলসের যাত্রা'), t('A jute mill at Satenga, Bhaluka, with three production units, a lamination plant and its own quality-control section.', 'ভালুকার সাতেঙ্গায় পাটকল — তিনটি উৎপাদন ইউনিট, ল্যামিনেশন প্ল্যান্ট ও নিজস্ব মান-নিয়ন্ত্রণ বিভাগসহ।'), 'son-hall'],
    ['2018', t('Khantex Fashions is set up', 'খানটেক্স ফ্যাশনস প্রতিষ্ঠিত'), t('A LEED-certified green garment factory at Sreepur, Gazipur — flagship of KFL Group, exporting about US$ 30 million a year.', 'গাজীপুরের শ্রীপুরে লিড-সনদপ্রাপ্ত সবুজ পোশাক কারখানা — কেএফএল গ্রুপের ফ্ল্যাগশিপ, বছরে প্রায় ৩ কোটি মার্কিন ডলার রপ্তানি।'), 'kfl-factory'],
    [t('Today', 'আজ'), t('Eight companies, six industries', 'আটটি প্রতিষ্ঠান, ছয়টি শিল্প'), t('From dairy and spices to garments, jute, real estate, a resort and trading — with sites in Dhaka, Gazipur, Mymensingh, Sylhet and Chattogram.', 'ডেইরি ও মসলা থেকে পোশাক, পাট, রিয়েল এস্টেট, রিসোর্ট ও ট্রেডিং — ঢাকা, গাজীপুর, ময়মনসিংহ, সিলেট ও চট্টগ্রামজুড়ে।'), 'lake-cover'],
    [t('Next', 'পরবর্তী'), t('Projects in planning', 'পরিকল্পনাধীন প্রকল্প'), t('ARJS Agro has prepared plans for an integrated layer farm with its own feed mill and organic-fertiliser plant, and for a dairy production and processing line.', 'এআরজেএস এগ্রো নিজস্ব ফিড মিল ও জৈব সার কারখানাসহ সমন্বিত লেয়ার ফার্ম এবং ডেইরি উৎপাদন ও প্রক্রিয়াজাতকরণ লাইনের পরিকল্পনা তৈরি করেছে।'), 'arjs-poultry']
  ];
  const onThisPage = t('On this page', 'এই পেজে');

  return (
    <Layout solid titleEn="About — South Bangla Group" titleBn="সাউথ বাংলা গ্রুপ সম্পর্কে">
      <header className="ab-hero">
        <div className="wrap ab-hero-grid">
          <div>
            <p className="eyebrow reveal">{t('About South Bangla Group', 'সাউথ বাংলা গ্রুপ সম্পর্কে')}</p>
            <Html as="h1" className="reveal" s={t('Rooted in the land.<br><em>Growing across industries.</em>', 'মাটির সাথে শিকড়।<br><em>শিল্পে শিল্পে প্রসার।</em>')} />
            <p className="ab-lead reveal">{t('A family of eight companies in Bangladesh — farms, food mills, garment factories, a jute mill, builders, a lakeside resort and a trading house — held together by one promise: sustainable growth, innovation and quality.', 'বাংলাদেশে আটটি প্রতিষ্ঠানের একটি পরিবার — খামার, খাদ্য মিল, পোশাক কারখানা, পাটকল, নির্মাতা, লেকপাড়ের রিসোর্ট ও একটি ট্রেডিং হাউস — একটি প্রতিশ্রুতিতে বাঁধা: টেকসই প্রবৃদ্ধি, উদ্ভাবন ও মান।')}</p>
            <div className="ab-meta reveal">
              {[['8', t('companies', 'প্রতিষ্ঠান')], ['6', t('industries', 'শিল্প')], ['5', t('regions', 'অঞ্চল')]].map(([n, l]) => <div key={l}><b>{n}</b><span>{l}</span></div>)}
            </div>
          </div>
          <div className="ab-collage reveal">
            <img className="c1" src={IMG('delta-bld')} alt="" loading="lazy" /><img className="c2" src={IMG('lake-pool')} alt="" loading="lazy" /><img className="c3" src={IMG('son-loom')} alt="" loading="lazy" /><img className="c4" src={IMG('kfl-green')} alt="" loading="lazy" />
            <span className="seal"><img src={LOGO} alt="" /></span>
          </div>
        </div>
      </header>

      <div className="wrap ab-layout">
        <aside className="ab-toc" aria-label={onThisPage}>
          <b>{onThisPage}</b>
          {toc.map(([id, l], i) => <a key={id} href={`#${id}`}><i>0{i + 1}</i>{l}</a>)}
        </aside>
        <div className="ab-body">

          <section id="story" className="ab-sec">
            <Html as="h2" className="reveal" s={t('One family. Many companies.<br>One standard of quality.', 'একটি পরিবার। অনেক প্রতিষ্ঠান।<br>মানের একই মানদণ্ড।')} />
            <div className="ab-cols">
              <p className="dropcap reveal">{t('South Bangla Group owns and runs a growing set of companies. Some grow food, some make clothes, some spin jute, some build homes, and one welcomes guests to a green resort. Each company has its own team and its own work — and all of them carry the same promise.', 'সাউথ বাংলা গ্রুপ একাধিক প্রতিষ্ঠানের মালিক ও পরিচালক। কেউ ফসল ও খাদ্য উৎপাদন করে, কেউ পোশাক বানায়, কেউ পাট প্রক্রিয়া করে, কেউ ঘরবাড়ি নির্মাণ করে, আর একটি অতিথিদের স্বাগত জানায় সবুজ রিসোর্টে। প্রতিটি প্রতিষ্ঠানের নিজস্ব দল ও নিজস্ব কাজ আছে — কিন্তু সবার প্রতিশ্রুতি এক।')}</p>
              <Html as="p" className="reveal" s={t('That promise is in the group’s own words: <em>sustainable growth, innovation and quality</em> — connecting modern business with nature, and being a good partner to every client, supplier and employee.', 'সেই প্রতিশ্রুতি গ্রুপের নিজের ভাষায়: <em>টেকসই প্রবৃদ্ধি, উদ্ভাবন ও মান</em> — আধুনিক ব্যবসাকে প্রকৃতির সাথে যুক্ত করা এবং প্রতিটি ক্লায়েন্ট, সরবরাহকারী ও কর্মীর ভালো সহযোগী হওয়া।')} />
              <p className="reveal">{t('Today the eight companies cover a wide stretch of the economy: dairy sheds, poultry farms and fish ponds; grain silos and spice warehouses; a LEED-certified garment factory and a 14-unit knitwear and denim park; a jute mill; apartment buildings with their own sand and stone; and a resort set inside a working farm.', 'আজ আটটি প্রতিষ্ঠান অর্থনীতির বিস্তৃত অংশ জুড়ে কাজ করছে: ডেইরি শেড, পোলট্রি খামার ও মাছের পুকুর; শস্য সাইলো ও মসলার গুদাম; লিড-সনদপ্রাপ্ত পোশাক কারখানা ও ১৪ ইউনিটের নিটওয়্যার-ডেনিম পার্ক; একটি পাটকল; নিজস্ব বালু-পাথরসহ আবাসিক ভবন; এবং চালু খামারের ভেতরে একটি রিসোর্ট।')}</p>
            </div>
            <figure className="ab-fig reveal"><img src={IMG('arjs-dairy')} alt="" loading="lazy" /><img src={IMG('sb-silo')} alt="" loading="lazy" /><img src={IMG('kfl-sew')} alt="" loading="lazy" /><figcaption>{t('Dairy sheds at ARJS Agro · grain silos at South Bangla Agro Food · the sewing floor at Khantex Fashions', 'এআরজেএস এগ্রোর ডেইরি শেড · সাউথ বাংলা এগ্রো ফুডের শস্য সাইলো · খানটেক্স ফ্যাশনসের সেলাই ফ্লোর')}</figcaption></figure>
          </section>

          <section id="values" className="ab-sec">
            <p className="eyebrow reveal">{t('What we stand for', 'আমরা যা বিশ্বাস করি')}</p>
            <h2 className="reveal">{t('Four values, and where you can see them', 'চারটি মূল্যবোধ — এবং কোথায় তা দেখা যায়')}</h2>
            {values.map(([h, d, evidence], i) => (
              <article className="ab-value reveal" key={i}><span className="num">0{i + 1}</span><div><h3>{h}</h3><p>{d}</p><p className="ev">{evidence}</p></div></article>
            ))}
          </section>

          <section id="milestones" className="ab-sec">
            <p className="eyebrow reveal">{t('Milestones', 'মাইলফলক')}</p>
            <h2 className="reveal">{t('How the group has taken shape', 'গ্রুপ যেভাবে গড়ে উঠেছে')}</h2>
            <ol className="timeline">
              {milestones.map(([y, h, d, im], i) => (
                <li className="reveal" key={i}><span className="yr">{y}</span><div className="tl-card"><img src={IMG(im)} alt="" loading="lazy" /><div><h3>{h}</h3><p>{d}</p></div></div></li>
              ))}
            </ol>
          </section>

          <section id="regions" className="ab-sec">
            <p className="eyebrow reveal">{t('Where we work', 'আমরা যেখানে কাজ করি')}</p>
            <h2 className="reveal">{t('Five regions of Bangladesh', 'বাংলাদেশের পাঁচটি অঞ্চল')}</h2>
            <div className="region-grid">
              {REGIONS.map((r) => (
                <article className="region reveal" key={r.id}>
                  <h3>{regionName(r, bn)}</h3><p className="rn">{t(r.note[0], r.note[1])}</p>
                  <ul>{[...new Map(sites[r.id].map((x) => [x.c.id, x.c])).values()].map((c) => (
                    <li key={c.id}><button type="button" onClick={() => openCompany(c.id)}>{c.short}</button></li>
                  ))}</ul>
                </article>
              ))}
            </div>
          </section>

          <section id="numbers" className="ab-sec">
            <p className="eyebrow reveal">{t('By the numbers', 'সংখ্যায়')}</p>
            <h2 className="reveal">{t('The group in figures', 'সংখ্যায় গ্রুপ')}</h2>
            <div className="numgrid">
              {nums.map(([n, pre, suf, l]) => <div className="num reveal" key={l}><CountUp end={n} prefix={pre} suffix={suf} /><span>{l}</span></div>)}
              <div className="num wide reveal"><b className="txt">BDT 1,200+ crore</b><span>{t('Yearly turnover of The Delta Group of Industries', 'দ্য ডেল্টা গ্রুপ অব ইন্ডাস্ট্রিজের বার্ষিক টার্নওভার')}</span></div>
            </div>
            <p className="src reveal">{t('Figures are as printed in each company’s own profile.', 'সংখ্যাগুলো প্রতিটি প্রতিষ্ঠানের নিজস্ব প্রোফাইল থেকে নেওয়া।')}</p>
          </section>

          <section id="voices" className="ab-sec">
            <p className="eyebrow reveal">{t('In our own words', 'আমাদের নিজের কথায়')}</p>
            <h2 className="reveal">{t('What the companies say about themselves', 'প্রতিষ্ঠানগুলো নিজেদের সম্পর্কে যা বলে')}</h2>
            <div className="quotes">
              <blockquote className="reveal"><p>{t('“Reliability, quality in the service, corporate culture of team work… customer satisfaction are our prime concerns.”', '“নির্ভরযোগ্যতা, সেবার মান, দলগত কর্মসংস্কৃতি… গ্রাহক সন্তুষ্টিই আমাদের প্রধান বিবেচনা।”')}</p><cite>— Engr. A.K.M. Faruque Ahamed, Chairman &amp; Managing Director, The Delta Group</cite></blockquote>
              <blockquote className="reveal"><p>{t('“Our agro projects, fish feed production, and integrated farms work together to ensure high standards and eco-friendly practices.”', '“আমাদের কৃষি প্রকল্প, ফিশ ফিড উৎপাদন ও সমন্বিত খামার একসাথে কাজ করে উচ্চমান ও পরিবেশবান্ধব পদ্ধতি নিশ্চিত করে।”')}</p><cite>— {t('Chairman & Managing Director, Lake View Garden City', 'চেয়ারম্যান ও ব্যবস্থাপনা পরিচালক, লেক ভিউ গার্ডেন সিটি')}</cite></blockquote>
            </div>
            <div className="mottos reveal">{['Purity, Quality & Trust in Every Product', 'Make promises, keep promises', 'Connecting Markets, Creating Opportunities', 'প্রকৃতির মাঝে আধুনিকতার ছোঁয়া'].map((m) => <span key={m}>{m}</span>)}</div>
          </section>
        </div>
      </div>
      <NextBand heading={t('Keep exploring', 'আরও জানুন')} links={[['/what-we-do', t('What we do', 'আমরা যা করি')], ['/companies', t('Our companies', 'আমাদের প্রতিষ্ঠান')], ['/leadership', t('Leadership', 'নেতৃত্ব')]]} />
    </Layout>
  );
}

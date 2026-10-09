import { useEffect, useState } from 'react';
import { useApp } from '../AppContext.jsx';
import { COMPANIES, GROUP_CONTACT } from '../data/data.js';

/* Name / contact / message form that hands the message to the visitor's email app.
   `text` holds the already-translated labels; `companyBy` picks whether the select's value is the company name or id. */
export default function EnquiryForm({ className, text, companyBy = 'name', rows = 4 }) {
  const { co, bn } = useApp();
  const [status, setStatus] = useState(null); // null | 'bad' | 'ok'
  const [bad, setBad] = useState({});
  useEffect(() => setStatus(null), [bn]);

  const onSubmit = (e) => {
    e.preventDefault();
    const f = e.currentTarget.elements;
    const flags = {};
    ['name', 'from', 'msg'].forEach((n) => { flags[n] = !f[n].value.trim(); });
    setBad(flags);
    if (Object.values(flags).some(Boolean)) { setStatus('bad'); return; }
    const comp = COMPANIES.find((c) => (companyBy === 'id' ? c.id : c.name) === f.company.value);
    const who = comp ? comp.name : text.wholeGroup;
    const to = (comp && (comp.contacts.find(([k]) => k === 'Email') || [])[1]) || GROUP_CONTACT.email;
    const body = `${f.msg.value}\n\nFrom: ${f.name.value}\nContact: ${f.from.value}\nRegarding: ${who}`;
    location.href = `mailto:${to}?subject=${encodeURIComponent('Enquiry — ' + who)}&body=${encodeURIComponent(body)}`;
    setStatus('ok');
  };

  const note = status === 'bad' ? text.bad : status === 'ok' ? text.ok : text.note;
  return (
    <form className={className} noValidate onSubmit={onSubmit}>
      <label><span>{text.name}</span><input name="name" required autoComplete="name" className={bad.name ? 'bad' : ''} /></label>
      <label><span>{text.from}</span><input name="from" required autoComplete="off" className={bad.from ? 'bad' : ''} /></label>
      <label><span>{text.company}</span> <select name="company">
        <option value="">{text.any}</option>
        {COMPANIES.map((c) => <option key={c.id} value={companyBy === 'id' ? c.id : c.name}>{co(c).name}</option>)}
      </select></label>
      <label><span>{text.msg}</span><textarea name="msg" rows={rows} required className={bad.msg ? 'bad' : ''} /></label>
      <button className="btn btn-gold" type="submit">{text.send}</button>
      <p className="form-note" aria-live="polite">{note}</p>
    </form>
  );
}

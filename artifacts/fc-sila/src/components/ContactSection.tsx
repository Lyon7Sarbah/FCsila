import { useState } from 'react';
import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/i18n';
import PageBanner from '@/components/PageBanner';
import gallery2 from '@/assets/gallery-2.png';

const API_BASE = '/api';

export default function ContactSection() {
  const { lang } = useLang();
  const t = translations[lang].contact;

  const [form, setForm] = useState({
    parent_name: '', phone: '', email: '', child_name: '',
    child_age: '', group: '', experience: '', medical: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang }),
      });
      if (!res.ok) throw new Error('Send failed');
      setSubmitted(true);
    } catch {
      setError(lang === 'en'
        ? 'Could not send. Please email us directly at fcsilamoscow@gmail.com'
        : 'Ошибка отправки. Напишите нам напрямую: fcsilamoscow@gmail.com');
    } finally {
      setSending(false);
    }
  };

  const inputBase: React.CSSProperties = { background: '#111', border: '1px solid #222', color: '#fff', outline: 'none' };
  const onFocus = (e: React.FocusEvent<any>) => { e.target.style.borderColor = '#FDE100'; };
  const onBlur = (e: React.FocusEvent<any>) => { e.target.style.borderColor = '#222'; };

  return (
    <section id="contact" className="py-24 min-h-screen" style={{ background: '#030303' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight section-title" style={{ color: '#ffffff' }}>
            {t.title}
          </h2>
        </div>

        <PageBanner
          imageSrc={gallery2}
          overlayText={lang === 'en' ? 'Join the FC SILA Academy Family' : 'Вступайте в семью Академии ФК Сила'}
        />

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl p-8 border" style={{ background: '#0d0d0d', borderColor: '#1a1a1a' }}>
              <h3 className="font-black text-xl text-white mb-6">{t.form_title}</h3>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-14 text-center gap-4">
                  <div className="text-6xl">✅</div>
                  <div className="text-xl font-black text-white">{t.form.success}</div>
                  <p className="text-sm text-gray-400">{lang === 'en' ? 'We will contact you within 24 hours.' : 'Мы свяжемся с вами в течение 24 часов.'}</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ parent_name: '', phone: '', email: '', child_name: '', child_age: '', group: '', experience: '', medical: '' }); }}
                    className="mt-2 px-6 py-2 rounded-full text-xs font-black uppercase tracking-wider border"
                    style={{ borderColor: '#FDE100', color: '#FDE100' }}
                  >
                    {lang === 'en' ? 'Submit Another' : 'Отправить ещё'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { key: 'parent_name', type: 'text', label: t.form.parent_name, ph: t.form.parent_name, req: true },
                      { key: 'phone', type: 'tel', label: t.form.phone, ph: '+7 (___) ___-__-__', req: true },
                    ].map(({ key, type, label, ph, req }) => (
                      <div key={key}>
                        <label className="block text-[11px] font-black uppercase tracking-wider mb-1.5" style={{ color: '#FDE100' }}>{label} {req && '*'}</label>
                        <input type={type} required={req} value={(form as any)[key]}
                          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                          onFocus={onFocus} onBlur={onBlur}
                          className="w-full px-4 py-3 rounded-xl text-sm transition-all"
                          style={inputBase} placeholder={ph} />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider mb-1.5" style={{ color: '#FDE100' }}>{t.form.email} *</label>
                    <input type="email" required value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={onFocus} onBlur={onBlur}
                      className="w-full px-4 py-3 rounded-xl text-sm transition-all"
                      style={inputBase} placeholder="email@example.com" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { key: 'child_name', label: t.form.child_name, type: 'text', ph: t.form.child_name },
                      { key: 'child_age', label: t.form.child_age, type: 'number', ph: '7–15' },
                    ].map(({ key, label, type, ph }) => (
                      <div key={key}>
                        <label className="block text-[11px] font-black uppercase tracking-wider mb-1.5" style={{ color: '#FDE100' }}>{label} *</label>
                        <input type={type} required value={(form as any)[key]}
                          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                          onFocus={onFocus} onBlur={onBlur}
                          className="w-full px-4 py-3 rounded-xl text-sm transition-all"
                          style={inputBase} placeholder={ph}
                          {...(type === 'number' ? { min: 7, max: 15 } : {})} />
                      </div>
                    ))}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider mb-1.5" style={{ color: '#FDE100' }}>{t.form.group}</label>
                      <select value={form.group} onChange={(e) => setForm({ ...form, group: e.target.value })}
                        onFocus={onFocus} onBlur={onBlur}
                        className="w-full px-4 py-3 rounded-xl text-sm transition-all cursor-pointer"
                        style={inputBase}>
                        <option value="">—</option>
                        {t.form.group_options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider mb-1.5" style={{ color: '#FDE100' }}>{t.form.experience}</label>
                      <select value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })}
                        onFocus={onFocus} onBlur={onBlur}
                        className="w-full px-4 py-3 rounded-xl text-sm transition-all cursor-pointer"
                        style={inputBase}>
                        <option value="">—</option>
                        {t.form.experience_options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider mb-1.5" style={{ color: '#FDE100' }}>{t.form.medical}</label>
                    <textarea rows={3} value={form.medical}
                      onChange={(e) => setForm({ ...form, medical: e.target.value })}
                      onFocus={onFocus} onBlur={onBlur}
                      className="w-full px-4 py-3 rounded-xl text-sm transition-all resize-none"
                      style={inputBase} />
                  </div>

                  {error && (
                    <div className="rounded-xl px-4 py-3 text-sm" style={{ background: '#1a0000', border: '1px solid #ff4444', color: '#ff6666' }}>
                      {error}
                    </div>
                  )}

                  <button type="submit" disabled={sending}
                    className="w-full py-4 rounded-full font-black uppercase tracking-wider text-sm transition-all"
                    style={{ background: sending ? '#888' : '#FDE100', color: '#000', cursor: sending ? 'wait' : 'pointer' }}>
                    {sending ? (lang === 'en' ? 'Sending…' : 'Отправка…') : `${t.form.submit} →`}
                  </button>
                  <p className="text-xs text-center" style={{ color: '#444' }}>{t.trial_note}</p>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="rounded-2xl p-6 border" style={{ background: '#0d0d0d', borderColor: '#1a1a1a' }}>
              <h3 className="font-black text-lg text-white mb-5 uppercase tracking-wide">{t.info_title}</h3>
              <div className="space-y-3">
                {[
                  { icon: '📍', label: t.address },
                  { icon: '📞', label: t.phone },
                  { icon: '✉️', label: t.email, href: `mailto:${t.email}` },
                  { icon: '💬', label: t.telegram },
                  { icon: '📱', label: t.whatsapp, href: `https://wa.me/${t.whatsapp.replace(/\D/g, '')}` },
                  { icon: '📷', label: t.instagram, href: `https://instagram.com/${t.instagram.replace('@', '')}` },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-b last:border-b-0" style={{ borderColor: '#111' }}>
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noreferrer"
                        className="text-sm transition-colors hover:text-yellow-400" style={{ color: '#FDE100' }}>
                        {item.label}
                      </a>
                    ) : (
                      <span className="text-sm text-gray-400">{item.label}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-6 border" style={{ background: '#0d0d0d', borderColor: '#1a1a1a' }}>
              <h3 className="font-black text-sm text-white mb-3 uppercase tracking-wide">
                📍 {lang === 'en' ? 'Legal Address' : 'Юридический адрес'}
              </h3>
              <p className="text-sm text-gray-500">{t.legal_address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

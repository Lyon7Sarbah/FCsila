import { useState } from 'react';
import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/i18n';
import PageBanner from '@/components/PageBanner';
import gallery2 from '@/assets/gallery-2.png';

const API_BASE = '/api';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const VKIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.27-1.422 2.168-3.608 2.168-3.608.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.202 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

export default function ContactSection() {
  const { lang } = useLang();
  const t = translations[lang].contact;

  const VALID_PROMOS = ['SILA20', 'ISOT'];

  const [form, setForm] = useState({
    parent_name: '', phone: '', email: '', child_name: '',
    child_age: '', group: '', experience: '', medical: '', promo_code: '',
  });
  const [promoStatus, setPromoStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handlePromoChange = (val: string) => {
    const upper = val.toUpperCase();
    setForm({ ...form, promo_code: upper });
    if (upper === '') setPromoStatus('idle');
    else if (VALID_PROMOS.includes(upper)) setPromoStatus('valid');
    else setPromoStatus('invalid');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.promo_code && promoStatus === 'invalid') {
      setError(t.form.promo_invalid);
      return;
    }
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

  const inputBase: React.CSSProperties = {
    background: '#0a0a0a',
    border: '1px solid #252525',
    color: '#fff',
    outline: 'none',
  };
  const onFocus = (e: React.FocusEvent<any>) => { e.target.style.borderColor = '#FDE100'; };
  const onBlur = (e: React.FocusEvent<any>) => { e.target.style.borderColor = '#252525'; };

  const socials = [
    {
      name: 'Instagram',
      handle: '@academyfcsila',
      href: 'https://instagram.com/academyfcsila',
      icon: <InstagramIcon />,
      gradient: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
      followers: lang === 'en' ? 'Follow us' : 'Подписаться',
    },
    {
      name: 'Facebook',
      handle: '@academyfcsila',
      href: 'https://facebook.com/academyfcsila',
      icon: <FacebookIcon />,
      gradient: 'linear-gradient(135deg, #1877F2 0%, #0a5fc8 100%)',
      followers: lang === 'en' ? 'Like our page' : 'Подписаться',
    },
    {
      name: 'ВКонтакте',
      handle: '@academyfcsila',
      href: 'https://vk.com/academyfcsila',
      icon: <VKIcon />,
      gradient: 'linear-gradient(135deg, #0077ff 0%, #005cc8 100%)',
      followers: lang === 'en' ? 'Join our group' : 'Вступить в группу',
    },
  ];

  return (
    <section id="contact" className="py-24 min-h-screen" style={{ background: '#030303' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight section-title" style={{ color: '#ffffff' }}>
            {t.title}
          </h2>
          <p className="mt-3 text-gray-500 text-sm">
            {lang === 'en' ? 'Reach us on any platform — we respond within 24 hours.' : 'Свяжитесь с нами через любую платформу — ответим в течение 24 часов.'}
          </p>
        </div>

        <PageBanner
          imageSrc={gallery2}
          overlayText={lang === 'en' ? 'Join the FC SILA Academy Family' : 'Вступайте в семью Академии ФК Сила'}
        />

        {/* Social Media Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-2xl flex flex-col justify-between p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', minHeight: '140px' }}
            >
              {/* Brand gradient accent bar */}
              <div
                className="absolute inset-x-0 top-0 h-1 rounded-t-2xl transition-all duration-300 group-hover:h-1.5"
                style={{ background: s.gradient }}
              />
              {/* Glowing bg on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{ background: s.gradient, opacity: 0 }}
              />
              <div className="relative z-10 flex items-start justify-between">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white flex-shrink-0"
                  style={{ background: s.gradient }}
                >
                  {s.icon}
                </div>
                <span
                  className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border transition-colors duration-300 group-hover:border-yellow-400 group-hover:text-yellow-400"
                  style={{ color: '#555', borderColor: '#2a2a2a' }}
                >
                  {s.followers} →
                </span>
              </div>
              <div className="relative z-10 mt-4">
                <div className="font-black text-white text-lg leading-tight">{s.name}</div>
                <div className="text-sm font-semibold mt-0.5" style={{ color: '#888' }}>{s.handle}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Main grid: Form + Info */}
        <div className="grid lg:grid-cols-5 gap-8">

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border overflow-hidden" style={{ background: '#0d0d0d', borderColor: '#1a1a1a' }}>
              <div className="px-8 py-5 border-b flex items-center gap-3" style={{ borderColor: '#1a1a1a' }}>
                <div className="w-2 h-6 rounded-full" style={{ background: '#FDE100' }} />
                <h3 className="font-black text-lg text-white uppercase tracking-wide">{t.form_title}</h3>
              </div>
              <div className="p-8">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-14 text-center gap-4">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                      style={{ background: '#0a1a00', border: '2px solid #FDE100' }}
                    >
                      ✅
                    </div>
                    <div className="text-xl font-black text-white">{t.form.success}</div>
                    <p className="text-sm text-gray-400">
                      {lang === 'en' ? 'We will contact you within 24 hours.' : 'Мы свяжемся с вами в течение 24 часов.'}
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setPromoStatus('idle'); setForm({ parent_name: '', phone: '', email: '', child_name: '', child_age: '', group: '', experience: '', medical: '', promo_code: '' }); }}
                      className="mt-2 px-6 py-2 rounded-full text-xs font-black uppercase tracking-wider border transition-colors hover:bg-yellow-400 hover:text-black"
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
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-wider mb-1.5" style={{ color: '#FDE100' }}>{t.form.child_name} *</label>
                        <input type="text" required value={form.child_name}
                          onChange={(e) => setForm({ ...form, child_name: e.target.value })}
                          onFocus={onFocus} onBlur={onBlur}
                          className="w-full px-4 py-3 rounded-xl text-sm transition-all"
                          style={inputBase} placeholder={t.form.child_name} />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-wider mb-1.5" style={{ color: '#FDE100' }}>{t.form.child_age} *</label>
                        <select required value={form.child_age}
                          onChange={(e) => setForm({ ...form, child_age: e.target.value })}
                          onFocus={onFocus} onBlur={onBlur}
                          className="w-full px-4 py-3 rounded-xl text-sm transition-all cursor-pointer"
                          style={inputBase}>
                          <option value="">—</option>
                          <option value="7-10">7–10</option>
                          <option value="11-16">11–16</option>
                        </select>
                      </div>
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

                    {/* Promo Code */}
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider mb-1.5" style={{ color: '#FDE100' }}>{t.form.promo_code}</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={form.promo_code}
                          onChange={(e) => handlePromoChange(e.target.value)}
                          onFocus={onFocus}
                          onBlur={(e) => { e.target.style.borderColor = promoStatus === 'valid' ? '#4ade80' : promoStatus === 'invalid' ? '#ff4444' : '#252525'; }}
                          placeholder=""
                          className="w-full px-4 py-3 rounded-xl text-sm transition-all uppercase"
                          style={{
                            ...inputBase,
                            borderColor: promoStatus === 'valid' ? '#4ade80' : promoStatus === 'invalid' ? '#ff4444' : '#252525',
                            paddingRight: promoStatus !== 'idle' ? '2.5rem' : undefined,
                          }}
                        />
                        {promoStatus !== 'idle' && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-base">
                            {promoStatus === 'valid' ? '✅' : '❌'}
                          </span>
                        )}
                      </div>
                      {promoStatus === 'valid' && (
                        <p className="text-xs mt-1 font-semibold" style={{ color: '#4ade80' }}>{t.form.promo_applied}</p>
                      )}
                      {promoStatus === 'invalid' && (
                        <p className="text-xs mt-1" style={{ color: '#ff6666' }}>{t.form.promo_invalid}</p>
                      )}
                    </div>

                    {error && (
                      <div className="rounded-xl px-4 py-3 text-sm" style={{ background: '#1a0000', border: '1px solid #ff4444', color: '#ff6666' }}>
                        {error}
                      </div>
                    )}

                    <button type="submit" disabled={sending}
                      className="w-full py-4 rounded-full font-black uppercase tracking-wider text-sm transition-all hover:brightness-110 hover:scale-[1.01]"
                      style={{ background: sending ? '#555' : '#FDE100', color: '#000', cursor: sending ? 'wait' : 'pointer', boxShadow: '0 4px 24px rgba(253,225,0,0.25)' }}>
                      {sending ? (lang === 'en' ? 'Sending…' : 'Отправка…') : `${t.form.submit} →`}
                    </button>
                    <p className="text-xs text-center" style={{ color: '#3a3a3a' }}>{t.trial_note}</p>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Direct contacts */}
            <div className="rounded-2xl border overflow-hidden" style={{ background: '#0d0d0d', borderColor: '#1a1a1a' }}>
              <div className="px-6 py-4 border-b flex items-center gap-3" style={{ borderColor: '#1a1a1a' }}>
                <div className="w-2 h-5 rounded-full" style={{ background: '#FDE100' }} />
                <h3 className="font-black text-sm text-white uppercase tracking-wide">{t.info_title}</h3>
              </div>
              <div className="p-6 space-y-1">
                {[
                  {
                    icon: <EmailIcon />,
                    label: t.email,
                    sub: lang === 'en' ? 'Email us anytime' : 'Пишите в любое время',
                    href: `mailto:${t.email}`,
                    color: '#FDE100',
                  },
                  {
                    icon: <WhatsAppIcon />,
                    label: t.whatsapp,
                    sub: 'WhatsApp',
                    href: `https://wa.me/${t.whatsapp.replace(/\D/g, '')}`,
                    color: '#25D366',
                  },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 p-4 rounded-xl transition-all hover:bg-white/5"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                      style={{ background: `${item.color}18`, color: item.color }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{item.label}</div>
                      <div className="text-xs" style={{ color: '#555' }}>{item.sub}</div>
                    </div>
                    <div className="ml-auto text-gray-600 group-hover:text-yellow-400 transition-colors">→</div>
                  </a>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="rounded-2xl border p-6" style={{ background: '#0d0d0d', borderColor: '#1a1a1a' }}>
              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: '#FDE10018', color: '#FDE100' }}
                >
                  <LocationIcon />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: '#FDE100' }}>
                    {lang === 'en' ? 'Location' : 'Адрес'}
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{t.address}</p>
                </div>
              </div>
            </div>

            {/* Legal */}
            <div className="rounded-2xl border p-5" style={{ background: '#080808', borderColor: '#111' }}>
              <div className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: '#333' }}>
                {lang === 'en' ? 'Legal Address' : 'Юридический адрес'}
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#3a3a3a' }}>{t.legal_address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

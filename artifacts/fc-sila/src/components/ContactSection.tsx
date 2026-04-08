import { useState } from 'react';
import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/i18n';

export default function ContactSection() {
  const { lang } = useLang();
  const t = translations[lang];

  const [form, setForm] = useState({
    name: '',
    phone: '',
    age: '',
    group: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const groupOptions = t.programs.groups.map((g) => g.badge);

  return (
    <section id="contact" className="py-24" style={{ background: '#000000' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span
            className="text-xs font-bold uppercase tracking-widest mb-3 block"
            style={{ color: '#FDE100' }}
          >
            {lang === 'en' ? 'Get In Touch' : 'Свяжитесь с нами'}
          </span>
          <h2
            className="text-4xl md:text-5xl font-black uppercase tracking-tight section-title mb-4"
            style={{ color: '#ffffff' }}
          >
            {t.contact.title}
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <div
              className="rounded-2xl p-8 border"
              style={{ background: '#0d0d0d', borderColor: '#222' }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="text-5xl animate-bounce">✅</div>
                  <div className="text-xl font-black text-white">
                    {t.contact.form_success}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name & Phone */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        className="block text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: '#FDE100' }}
                      >
                        {t.contact.form_name} *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-white text-sm font-medium outline-none transition-all duration-200 focus:ring-2"
                        style={{
                          background: '#1a1a1a',
                          border: '1px solid #2a2a2a',
                          focusRingColor: '#FDE100',
                        } as React.CSSProperties}
                        onFocus={(e) => (e.target.style.borderColor = '#FDE100')}
                        onBlur={(e) => (e.target.style.borderColor = '#2a2a2a')}
                        placeholder={t.contact.form_name}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: '#FDE100' }}
                      >
                        {t.contact.form_phone} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-white text-sm font-medium outline-none transition-all duration-200"
                        style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}
                        onFocus={(e) => (e.target.style.borderColor = '#FDE100')}
                        onBlur={(e) => (e.target.style.borderColor = '#2a2a2a')}
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>
                  </div>

                  {/* Age & Group */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        className="block text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: '#FDE100' }}
                      >
                        {t.contact.form_age} *
                      </label>
                      <input
                        type="number"
                        required
                        min={5}
                        max={18}
                        value={form.age}
                        onChange={(e) => setForm({ ...form, age: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-white text-sm font-medium outline-none transition-all duration-200"
                        style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}
                        onFocus={(e) => (e.target.style.borderColor = '#FDE100')}
                        onBlur={(e) => (e.target.style.borderColor = '#2a2a2a')}
                        placeholder="5–18"
                      />
                    </div>
                    <div>
                      <label
                        className="block text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: '#FDE100' }}
                      >
                        {t.contact.form_group}
                      </label>
                      <select
                        value={form.group}
                        onChange={(e) => setForm({ ...form, group: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-white text-sm font-medium outline-none transition-all duration-200 cursor-pointer"
                        style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}
                        onFocus={(e) => (e.target.style.borderColor = '#FDE100')}
                        onBlur={(e) => (e.target.style.borderColor = '#2a2a2a')}
                      >
                        <option value="">—</option>
                        {groupOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      className="block text-xs font-bold uppercase tracking-wider mb-2"
                      style={{ color: '#FDE100' }}
                    >
                      {t.contact.form_message}
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-white text-sm font-medium outline-none resize-none transition-all duration-200"
                      style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}
                      onFocus={(e) => (e.target.style.borderColor = '#FDE100')}
                      onBlur={(e) => (e.target.style.borderColor = '#2a2a2a')}
                      placeholder="..."
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full font-black uppercase tracking-wider text-sm transition-all duration-300 hover:brightness-90 hover:scale-[0.99]"
                    style={{ background: '#FDE100', color: '#000' }}
                  >
                    {t.contact.form_submit}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Info sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div
              className="rounded-2xl p-6 border"
              style={{ background: '#0d0d0d', borderColor: '#222' }}
            >
              <h3 className="font-black text-lg text-white mb-5 uppercase tracking-wide">
                {t.contact.info_title}
              </h3>
              <div className="space-y-4">
                {[
                  { icon: '📍', label: t.contact.address },
                  { icon: '📞', label: t.contact.phone },
                  { icon: '✉️', label: t.contact.email },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <span className="text-gray-300 text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div
              className="rounded-2xl p-6 border"
              style={{ background: '#0d0d0d', borderColor: '#222' }}
            >
              <h3 className="font-black text-lg text-white mb-4 uppercase tracking-wide">
                {t.contact.social}
              </h3>
              <div className="flex gap-3 flex-wrap">
                {[
                  { icon: '📘', label: 'VKontakte', color: '#4680C2' },
                  { icon: '📸', label: 'Instagram', color: '#E1306C' },
                  { icon: '✈️', label: 'Telegram', color: '#229ED9' },
                  { icon: '▶️', label: 'YouTube', color: '#FF0000' },
                ].map((s, i) => (
                  <button
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 hover:scale-105 hover:brightness-110"
                    style={{ background: '#1a1a1a', color: '#ccc', border: '1px solid #2a2a2a' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = s.color;
                      e.currentTarget.style.color = s.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#2a2a2a';
                      e.currentTarget.style.color = '#ccc';
                    }}
                  >
                    <span>{s.icon}</span>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div
              className="rounded-2xl overflow-hidden border flex-1"
              style={{ background: '#0d0d0d', borderColor: '#222', minHeight: 200 }}
            >
              <div
                className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-center"
                style={{ minHeight: 200 }}
              >
                <div className="text-4xl">🗺️</div>
                <div className="font-bold text-white">
                  {lang === 'en' ? 'Luzhniki, Moscow' : 'Лужники, Москва'}
                </div>
                <div className="text-xs text-gray-500">
                  {lang === 'en'
                    ? 'Luzhniki Stadium, Luzhniki, Moscow 119048'
                    : 'Стадион Лужники, Лужники, Москва 119048'}
                </div>
                <div
                  className="text-xs px-3 py-1 rounded-full border"
                  style={{ color: '#FDE100', borderColor: 'rgba(253,225,0,0.3)' }}
                >
                  {lang === 'en' ? 'View on map' : 'Смотреть на карте'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

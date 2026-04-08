import { useState } from 'react';
import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/i18n';

export default function ContactSection() {
  const { lang } = useLang();
  const t = translations[lang].contact;

  const [form, setForm] = useState({
    parent_name: '',
    phone: '',
    email: '',
    child_name: '',
    child_age: '',
    group: '',
    experience: '',
    medical: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = { background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#fff' };
  const labelStyle: React.CSSProperties = { color: '#FDE100' };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = '#FDE100';
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = '#2a2a2a';
  };

  return (
    <section id="contact" className="py-24" style={{ background: '#050505' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight section-title" style={{ color: '#ffffff' }}>
            {t.title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl p-8 border" style={{ background: '#0d0d0d', borderColor: '#222' }}>
              <h3 className="font-black text-xl text-white mb-6">{t.form_title}</h3>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-14 text-center gap-4">
                  <div className="text-5xl">✅</div>
                  <div className="text-xl font-black text-white">{t.form.success}</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Row 1 */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={labelStyle}>
                        {t.form.parent_name} *
                      </label>
                      <input
                        type="text" required value={form.parent_name}
                        onChange={(e) => setForm({ ...form, parent_name: e.target.value })}
                        onFocus={handleFocus} onBlur={handleBlur}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={inputStyle} placeholder={t.form.parent_name}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={labelStyle}>
                        {t.form.phone} *
                      </label>
                      <input
                        type="tel" required value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        onFocus={handleFocus} onBlur={handleBlur}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={inputStyle} placeholder="+7 (___) ___-__-__"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={labelStyle}>
                      {t.form.email} *
                    </label>
                    <input
                      type="email" required value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={handleFocus} onBlur={handleBlur}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={inputStyle} placeholder="email@example.com"
                    />
                  </div>

                  {/* Row 3 */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={labelStyle}>
                        {t.form.child_name} *
                      </label>
                      <input
                        type="text" required value={form.child_name}
                        onChange={(e) => setForm({ ...form, child_name: e.target.value })}
                        onFocus={handleFocus} onBlur={handleBlur}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={inputStyle} placeholder={t.form.child_name}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={labelStyle}>
                        {t.form.child_age} *
                      </label>
                      <input
                        type="number" required min={7} max={15} value={form.child_age}
                        onChange={(e) => setForm({ ...form, child_age: e.target.value })}
                        onFocus={handleFocus} onBlur={handleBlur}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={inputStyle} placeholder="7–15"
                      />
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={labelStyle}>
                        {t.form.group}
                      </label>
                      <select
                        value={form.group}
                        onChange={(e) => setForm({ ...form, group: e.target.value })}
                        onFocus={handleFocus} onBlur={handleBlur}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all cursor-pointer"
                        style={inputStyle}
                      >
                        <option value="">—</option>
                        {t.form.group_options.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={labelStyle}>
                        {t.form.experience}
                      </label>
                      <select
                        value={form.experience}
                        onChange={(e) => setForm({ ...form, experience: e.target.value })}
                        onFocus={handleFocus} onBlur={handleBlur}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all cursor-pointer"
                        style={inputStyle}
                      >
                        <option value="">—</option>
                        {t.form.experience_options.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Medical */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={labelStyle}>
                      {t.form.medical}
                    </label>
                    <textarea
                      rows={3} value={form.medical}
                      onChange={(e) => setForm({ ...form, medical: e.target.value })}
                      onFocus={handleFocus} onBlur={handleBlur}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                      style={inputStyle} placeholder="..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full font-black uppercase tracking-wider text-sm transition-all hover:brightness-90 hover:scale-[0.99]"
                    style={{ background: '#FDE100', color: '#000' }}
                  >
                    {t.form.submit} →
                  </button>
                  <p className="text-xs text-center" style={{ color: '#555' }}>{t.trial_note}</p>
                </form>
              )}
            </div>
          </div>

          {/* Info sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="rounded-2xl p-6 border" style={{ background: '#0d0d0d', borderColor: '#222' }}>
              <h3 className="font-black text-lg text-white mb-5 uppercase tracking-wide">{t.info_title}</h3>
              <div className="space-y-4">
                {[
                  { icon: '📍', label: t.address },
                  { icon: '📞', label: t.phone },
                  { icon: '✉️', label: t.email },
                  { icon: '🌐', label: t.website },
                  { icon: '✈️', label: t.telegram },
                  { icon: '📱', label: t.whatsapp },
                  { icon: '📷', label: t.instagram },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-b last:border-b-0" style={{ borderColor: '#1a1a1a' }}>
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <span className="text-sm text-gray-300">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-6 border" style={{ background: '#0d0d0d', borderColor: '#222' }}>
              <h3 className="font-black text-sm text-white mb-3 uppercase tracking-wide">
                📍 {lang === 'en' ? 'Legal Address' : 'Юридический адрес'}
              </h3>
              <p className="text-sm text-gray-400">{t.legal_address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

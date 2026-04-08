import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/i18n';

export default function MatchesSection() {
  const { lang } = useLang();
  const t = translations[lang].matches;

  return (
    <section id="matches" className="py-24" style={{ background: '#050505' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight section-title" style={{ color: '#ffffff' }}>
            {t.title}
          </h2>
        </div>

        {/* Philosophy */}
        <div className="rounded-2xl p-7 border mb-10" style={{ background: '#0d0d0d', borderColor: '#222' }}>
          <h3 className="font-black text-lg uppercase tracking-wide mb-3" style={{ color: '#FDE100' }}>
            {t.philosophy_title}
          </h3>
          <p className="text-gray-300 leading-relaxed">{t.philosophy_text}</p>
        </div>

        {/* Upcoming Matches */}
        <h3 className="text-lg font-black uppercase tracking-wide mb-6 flex items-center gap-3" style={{ color: '#FDE100' }}>
          <span>📅</span> {t.upcoming}
        </h3>

        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: '#222' }}>
          {/* Header */}
          <div
            className="grid gap-2 px-5 py-4 text-xs font-black uppercase tracking-widest"
            style={{ background: '#FDE100', color: '#000', gridTemplateColumns: '2fr 2fr 2fr 2fr 1.5fr' }}
          >
            <span>{t.cols.date}</span>
            <span>{t.cols.type}</span>
            <span>{t.cols.opponent}</span>
            <span>{t.cols.age}</span>
            <span>{t.cols.time}</span>
          </div>

          {/* Rows */}
          {t.rows.map((row, i) => (
            <div
              key={i}
              className="grid gap-2 px-5 py-4 border-t items-center hover:bg-white/[0.015] transition-colors"
              style={{ borderColor: '#1a1a1a', gridTemplateColumns: '2fr 2fr 2fr 2fr 1.5fr' }}
            >
              <span className="text-sm font-bold text-white">{row.date}</span>
              <span className="text-sm text-gray-300">{row.type}</span>
              <span className="text-sm text-gray-300">{row.opponent}</span>
              <span className="text-sm text-gray-400">{row.age}</span>
              <span className="text-sm font-mono text-gray-400">{row.time}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

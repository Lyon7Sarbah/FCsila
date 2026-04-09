import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/i18n';
import PageBanner from '@/components/PageBanner';
import gallery1 from '@/assets/gallery-1.png';

const POSITION_COLORS: Record<string, { bg: string; text: string; glow: string; label_en: string; label_ru: string }> = {
  GK: { bg: '#FF6B35', text: '#000', glow: 'rgba(255,107,53,0.3)', label_en: 'Goalkeeper', label_ru: 'Вратарь' },
  DEF: { bg: '#4ECDC4', text: '#000', glow: 'rgba(78,205,196,0.3)', label_en: 'Defender', label_ru: 'Защитник' },
  MID: { bg: '#FDE100', text: '#000', glow: 'rgba(253,225,0,0.3)', label_en: 'Midfielder', label_ru: 'Полузащитник' },
  FWD: { bg: '#FF4757', text: '#fff', glow: 'rgba(255,71,87,0.3)', label_en: 'Forward', label_ru: 'Нападающий' },
};

const POSITIONS_ORDER = ['GK', 'DEF', 'DEF', 'DEF', 'MID', 'MID', 'MID', 'FWD', 'FWD', 'DEF', 'MID', 'MID', 'FWD', 'FWD', 'GK', 'DEF'];
const PLAYER_SLOTS = Array(16).fill(null).map((_, i) => ({ id: i, pos: POSITIONS_ORDER[i] }));

export default function PlayersSection() {
  const { lang } = useLang();
  const t = translations[lang].players;

  return (
    <section id="players" className="py-24 min-h-screen" style={{ background: '#000000' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight section-title" style={{ color: '#ffffff' }}>
            {t.title}
          </h2>
        </div>
        <p className="text-center text-gray-500 mb-8 text-sm">{t.subtitle}</p>

        <PageBanner
          imageSrc={gallery1}
          overlayText={lang === 'en' ? 'Every Player Matters — Equal Time on the Pitch' : 'Каждый игрок важен — равное время на поле'}
        />

        {/* Stats */}
        <div className="flex justify-center gap-8 md:gap-16 mb-14 flex-wrap">
          {t.stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-5xl font-black mb-1" style={{ color: '#FDE100' }}>{s.num}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Position legend */}
        <div className="rounded-2xl p-5 border mb-12" style={{ background: '#0d0d0d', borderColor: '#1a1a1a' }}>
          <div className="flex flex-wrap gap-4 justify-center">
            <span className="text-xs text-gray-500 uppercase tracking-wider self-center mr-2">{t.legend_title}:</span>
            {Object.entries(POSITION_COLORS).map(([pos, style]) => (
              <div key={pos} className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs"
                  style={{ background: style.bg, color: style.text, boxShadow: `0 0 8px ${style.glow}` }}
                >
                  {pos}
                </div>
                <span className="text-xs text-gray-400">{lang === 'en' ? style.label_en : style.label_ru}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Age Group 1 — Foundation (7–10) */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider" style={{ background: '#FDE100', color: '#000' }}>
              {lang === 'en' ? 'Foundation' : 'Основы'} — 7–10
            </div>
            <div className="flex-1 h-px" style={{ background: '#1a1a1a' }} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {PLAYER_SLOTS.map((slot) => (
              <PlayerCard key={slot.id} lang={lang} pos={slot.pos} />
            ))}
          </div>
        </div>

        {/* Age Group 2 — Development (11–15) */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider" style={{ background: '#FDE100', color: '#000' }}>
              {lang === 'en' ? 'Development' : 'Развитие'} — 11–15
            </div>
            <div className="flex-1 h-px" style={{ background: '#1a1a1a' }} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {PLAYER_SLOTS.map((slot) => (
              <PlayerCard key={slot.id + 16} lang={lang} pos={slot.pos} />
            ))}
          </div>
        </div>

        {/* Player of the Month */}
        <div className="rounded-2xl p-8 border text-center mb-12" style={{ background: '#0d0d0d', borderColor: '#1a1a1a' }}>
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="text-xl font-black uppercase tracking-wide text-white mb-3">{t.potm_title}</h3>
          <p className="text-gray-400 italic">{t.potm_text}</p>
        </div>

        {/* Testimonials */}
        <h3 className="text-lg font-black uppercase tracking-wide mb-6" style={{ color: '#FDE100' }}>
          {t.testimonials_title}
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {t.testimonials.map((test, i) => (
            <div key={i} className="card-lift rounded-2xl p-6 border italic" style={{ background: '#0d0d0d', borderColor: '#1a1a1a' }}>
              <p className="text-gray-300 leading-relaxed mb-4">{test.text}</p>
              <p className="text-sm font-bold" style={{ color: '#FDE100' }}>— {test.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlayerCard({ lang, pos }: { lang: 'en' | 'ru'; pos: string }) {
  const style = POSITION_COLORS[pos];

  return (
    <div
      className="card-lift rounded-xl border flex flex-col items-center overflow-hidden"
      style={{ background: '#0d0d0d', borderColor: '#1a1a1a' }}
    >
      {/* Photo area */}
      <div
        className="w-full flex items-center justify-center relative"
        style={{
          height: '140px',
          background: `linear-gradient(135deg, #0f0f0f, #151515)`,
          borderBottom: `2px solid ${style.bg}44`,
        }}
      >
        <div className="text-5xl opacity-20">👤</div>
        {/* Position badge */}
        <div
          className="absolute bottom-2 left-2 px-2 py-1 rounded text-[11px] font-black"
          style={{ background: style.bg, color: style.text, boxShadow: `0 0 8px ${style.glow}` }}
        >
          {pos}
        </div>
      </div>
      {/* Name area */}
      <div className="w-full px-3 py-3 text-center">
        <div className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">
          {lang === 'en' ? 'Available' : 'Вакансия'}
        </div>
      </div>
    </div>
  );
}

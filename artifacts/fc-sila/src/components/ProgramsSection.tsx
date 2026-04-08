import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/i18n';

export default function ProgramsSection() {
  const { lang } = useLang();
  const t = translations[lang];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="programs" className="py-24" style={{ background: '#000000' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span
            className="text-xs font-bold uppercase tracking-widest mb-3 block"
            style={{ color: '#FDE100' }}
          >
            {lang === 'en' ? 'What We Offer' : 'Наши предложения'}
          </span>
          <h2
            className="text-4xl md:text-5xl font-black uppercase tracking-tight section-title mb-4"
            style={{ color: '#ffffff' }}
          >
            {t.programs.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base">
            {t.programs.subtitle}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.programs.groups.map((group, i) => (
            <div
              key={i}
              className="card-lift rounded-2xl p-6 flex flex-col border relative overflow-hidden"
              style={{
                background: '#0d0d0d',
                borderColor: '#222',
              }}
            >
              {/* Yellow accent top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: '#FDE100' }}
              />

              {/* Badge */}
              <span
                className="inline-block self-start px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4 mt-2"
                style={{ background: '#FDE100', color: '#000' }}
              >
                {group.badge}
              </span>

              {/* Icon */}
              <div className="text-4xl mb-3">{group.icon}</div>

              {/* Age */}
              <h3
                className="text-2xl font-black mb-2"
                style={{ color: '#FDE100' }}
              >
                {group.age}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-400 mb-5 leading-relaxed flex-grow">
                {group.desc}
              </p>

              {/* Features */}
              <ul className="mb-6 space-y-2">
                {group.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                    <span style={{ color: '#FDE100', fontSize: 10, marginTop: 4 }}>⬤</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Price */}
              <div
                className="text-2xl font-black mb-4"
                style={{ color: '#FDE100' }}
              >
                {group.price}
              </div>

              {/* CTA */}
              <button
                onClick={() => scrollTo('contact')}
                className="w-full py-3 rounded-full text-sm font-black uppercase tracking-wider transition-all duration-300 hover:brightness-90 hover:scale-[0.98]"
                style={{ background: '#FDE100', color: '#000' }}
              >
                {t.programs.join}
              </button>
            </div>
          ))}
        </div>

        {/* Ticker tape */}
        <div
          className="mt-16 py-4 rounded-xl overflow-hidden"
          style={{ background: '#FDE100' }}
        >
          <div className="ticker-wrap">
            <div className="ticker-content">
              {Array(6).fill(null).map((_, i) => (
                <span key={i} className="inline-flex items-center gap-4 px-8 text-black font-black uppercase text-sm tracking-widest">
                  <span>FC SILA</span>
                  <span>⚽</span>
                  <span>{lang === 'en' ? 'Moscow Football Academy' : 'Футбольная академия Москвы'}</span>
                  <span>⚽</span>
                  <span>{lang === 'en' ? 'Strength · Discipline · Passion' : 'Сила · Дисциплина · Страсть'}</span>
                  <span>⚽</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

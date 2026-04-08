import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/i18n';
import logoEn from '@assets/football_club_strength_1775666267415.png';
import logoRu from '@assets/sila_logo__1775666431192.png';

const NAV_ITEMS = ['home', 'about', 'programs', 'schedule', 'coaches', 'contact'] as const;

export default function Footer() {
  const { lang } = useLang();
  const t = translations[lang];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer style={{ background: '#030303', borderTop: '2px solid #FDE100' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={lang === 'en' ? logoEn : logoRu}
                alt="FC SILA"
                className="h-14 w-auto object-contain"
              />
              <div>
                <div className="font-black text-xl tracking-wider" style={{ color: '#FDE100' }}>
                  {lang === 'en' ? 'FC SILA' : 'ФК СИЛА'}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">
                  {lang === 'en' ? 'Moscow' : 'Москва'}
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              {t.footer.tagline}
            </p>
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: 'rgba(253,225,0,0.1)', color: '#FDE100', border: '1px solid rgba(253,225,0,0.2)' }}
            >
              Est. 2017
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4
              className="font-black uppercase tracking-widest text-sm mb-5"
              style={{ color: '#FDE100' }}
            >
              {t.footer.links}
            </h4>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollTo(item)}
                    className="text-sm text-gray-500 hover:text-yellow-400 transition-colors duration-200 font-medium uppercase tracking-wide"
                  >
                    {t.nav[item]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal info */}
          <div>
            <h4
              className="font-black uppercase tracking-widest text-sm mb-5"
              style={{ color: '#FDE100' }}
            >
              {t.footer.legal}
            </h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div>
                <span style={{ color: '#FDE100' }}>
                  {lang === 'en' ? 'Organization:' : 'Организация:'}
                </span>{' '}
                {lang === 'en' ? 'FC SILA Youth Football Academy' : 'ФК «Сила» ДЮФА'}
              </div>
              <div>
                <span style={{ color: '#FDE100' }}>
                  {lang === 'en' ? 'Legal form:' : 'Правовая форма:'}
                </span>{' '}
                {lang === 'en' ? 'Sports Association (NP)' : 'Некоммерческое партнёрство (НП)'}
              </div>
              <div>
                <span style={{ color: '#FDE100' }}>
                  {lang === 'en' ? 'Address:' : 'Адрес:'}
                </span>{' '}
                {lang === 'en' ? 'Luzhniki, Moscow' : 'г. Москва, Лужники'}
              </div>
              <div>
                <span style={{ color: '#FDE100' }}>
                  {lang === 'en' ? 'Phone:' : 'Телефон:'}
                </span>{' '}
                +7 (495) 123-45-67
              </div>
              <div>
                <span style={{ color: '#FDE100' }}>
                  Email:
                </span>{' '}
                info@fcsila.ru
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: '#1a1a1a' }}
        >
          <p className="text-xs text-gray-600">{t.footer.copyright}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">
              {lang === 'en' ? 'Made with' : 'Сделано с'}
            </span>
            <span style={{ color: '#FDE100' }}>⚽</span>
            <span className="text-xs text-gray-600">
              {lang === 'en' ? 'for football' : 'для футбола'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useState, useEffect } from 'react';
import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/i18n';
import logoEn from '@assets/football_club_strength_1775666267415.png';
import logoRu from '@assets/sila_logo__1775666431192.png';

const NAV_ITEMS = ['home', 'about', 'programs', 'schedule', 'coaches', 'contact'] as const;

export default function Header() {
  const { lang, setLang } = useLang();
  const t = translations[lang];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = NAV_ITEMS.map((id) => document.getElementById(id));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(NAV_ITEMS[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(0,0,0,0.97)' : '#000000',
        borderBottom: '2px solid #FDE100',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <img
              src={lang === 'en' ? logoEn : logoRu}
              alt="FC SILA Logo"
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <div className="text-lg font-black tracking-wider" style={{ color: '#FDE100' }}>
                {lang === 'en' ? 'FC SILA' : 'ФК СИЛА'}
              </div>
              <div className="text-xs text-gray-400 tracking-widest uppercase">
                {lang === 'en' ? 'Moscow' : 'Москва'}
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`nav-link text-sm font-semibold uppercase tracking-wide transition-colors duration-200 ${
                  activeSection === item ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                } ${activeSection === item ? 'active' : ''}`}
              >
                {t.nav[item]}
              </button>
            ))}
          </nav>

          {/* Lang + Menu */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div
              className="flex items-center rounded-full p-1 gap-1"
              style={{ background: '#1a1a1a' }}
            >
              {(['en', 'ru'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    lang === l
                      ? 'text-black'
                      : 'text-white hover:text-yellow-400'
                  }`}
                  style={lang === l ? { background: '#FDE100' } : {}}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className="block w-6 h-0.5 transition-all duration-300"
                style={{
                  background: '#FDE100',
                  transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none',
                }}
              />
              <span
                className="block w-6 h-0.5 transition-all duration-300"
                style={{
                  background: '#FDE100',
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-6 h-0.5 transition-all duration-300"
                style={{
                  background: '#FDE100',
                  transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="lg:hidden pb-4 animate-slide-down border-t"
            style={{ borderColor: '#222' }}
          >
            <nav className="flex flex-col gap-1 pt-3">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className={`text-left px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-200 ${
                    activeSection === item
                      ? 'text-black font-bold'
                      : 'text-white hover:text-yellow-400 hover:bg-white/5'
                  }`}
                  style={activeSection === item ? { background: '#FDE100' } : {}}
                >
                  {t.nav[item]}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

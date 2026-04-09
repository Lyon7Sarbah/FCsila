import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useLang } from '@/context/LangContext';
import { translations, NAV_ITEMS, PAGE_ROUTES, SCROLL_SECTIONS } from '@/lib/i18n';
import logoEn from '@assets/football_club_strength_1775666267415.png';
import logoRu from '@assets/sila_logo__1775666431192.png';

export default function Header() {
  const { lang, setLang } = useLang();
  const t = translations[lang];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [location, navigate] = useLocation();

  const isHome = location === '/';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (!isHome) return;
      for (let i = SCROLL_SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SCROLL_SECTIONS[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(SCROLL_SECTIONS[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  useEffect(() => {
    if (!isHome) {
      const routeKey = Object.entries(PAGE_ROUTES).find(([, path]) => path === location)?.[0];
      if (routeKey) setActiveSection(routeKey);
    } else {
      setActiveSection('home');
    }
  }, [location, isHome]);

  const handleNav = (item: string) => {
    setMenuOpen(false);
    if (SCROLL_SECTIONS.includes(item)) {
      if (!isHome) {
        navigate('/');
        setTimeout(() => {
          if (item === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            document.getElementById(item)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        if (item === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          document.getElementById(item)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else if (PAGE_ROUTES[item]) {
      navigate(PAGE_ROUTES[item]);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const isActive = (item: string) => {
    if (SCROLL_SECTIONS.includes(item)) return isHome && activeSection === item;
    return location === PAGE_ROUTES[item];
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(0,0,0,0.98)' : '#000000',
        borderBottom: '2px solid #FDE100',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 group focus:outline-none flex-shrink-0"
          >
            <img
              src={lang === 'en' ? logoEn : logoRu}
              alt="FC SILA Logo"
              className="w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              style={{
                height: lang === 'ru' ? '3.2rem' : '2.25rem',
              }}
            />
            <div className="hidden sm:block text-left">
              <div className="text-sm font-black tracking-widest leading-none" style={{ color: '#FDE100' }}>
                {lang === 'en' ? 'FC SILA' : 'ФК СИЛА'}
              </div>
              <div className="text-[10px] text-gray-500 tracking-[0.12em] uppercase leading-none mt-0.5">
                {lang === 'en' ? 'Academy' : 'Академия'}
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-5">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => handleNav(item)}
                className={`nav-link text-[11px] font-black uppercase tracking-wider transition-colors duration-200 ${
                  isActive(item) ? 'text-yellow-400 active' : 'text-gray-400 hover:text-yellow-400'
                }`}
              >
                {t.nav[item]}
              </button>
            ))}
          </nav>

          {/* Lang + Menu */}
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-full p-1 gap-0.5" style={{ background: '#1a1a1a' }}>
              {(['en', 'ru'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                    lang === l ? 'text-black' : 'text-gray-400 hover:text-yellow-400'
                  }`}
                  style={lang === l ? { background: '#FDE100' } : {}}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              className="xl:hidden flex flex-col gap-1.5 p-2 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className="block w-6 h-0.5 transition-all duration-300"
                style={{ background: '#FDE100', transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none' }} />
              <span className="block w-6 h-0.5 transition-all duration-300"
                style={{ background: '#FDE100', opacity: menuOpen ? 0 : 1 }} />
              <span className="block w-6 h-0.5 transition-all duration-300"
                style={{ background: '#FDE100', transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="xl:hidden pb-4 animate-slide-down border-t" style={{ borderColor: '#1a1a1a' }}>
            <nav className="grid grid-cols-2 gap-1 pt-3">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNav(item)}
                  className={`text-left px-4 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all ${
                    isActive(item) ? 'text-black' : 'text-white hover:text-yellow-400 hover:bg-white/5'
                  }`}
                  style={isActive(item) ? { background: '#FDE100' } : {}}
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

import { useLocation } from 'wouter';
import { useLang } from '@/context/LangContext';

export default function JoinCTA() {
  const { lang } = useLang();
  const [, navigate] = useLocation();

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FDE100 0%, #e0c800 60%, #FDE100 100%)',
        borderTop: '2px solid #000',
        borderBottom: '2px solid #000',
      }}
    >
      {/* Diagonal stripe overlay */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-45deg, #000 0, #000 1px, transparent 0, transparent 14px)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-14 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 opacity-50" style={{ color: '#000' }}>
          {lang === 'en' ? 'Moscow Youth Football Academy' : 'Молодёжная футбольная академия Москвы'}
        </p>
        <h2
          className="font-black uppercase leading-none mb-4"
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            color: '#000',
            letterSpacing: '-0.02em',
          }}
        >
          {lang === 'en' ? 'Ready to Join the Academy?' : 'Готовы вступить в академию?'}
        </h2>
        <p className="text-sm font-semibold opacity-60 mb-8 max-w-md mx-auto" style={{ color: '#000' }}>
          {lang === 'en'
            ? 'Book a free trial session — 2,000 RUB deducted from your first month if you join.'
            : 'Запишитесь на пробное занятие — 2 000 ₽ вычитаются из первого месяца при вступлении.'}
        </p>
        <button
          onClick={() => { navigate('/contact'); window.scrollTo({ top: 0, behavior: 'instant' }); }}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105"
          style={{
            background: '#000',
            color: '#FDE100',
            boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
          }}
        >
          {lang === 'en' ? 'Book a Trial Session →' : 'Записаться на пробное занятие →'}
        </button>
        <div className="mt-5 flex justify-center gap-6 text-[10px] font-bold uppercase tracking-wider opacity-50" style={{ color: '#000' }}>
          <span>✓ {lang === 'en' ? 'Ages 7–16' : 'Возраст 7–16'}</span>
          <span>✓ {lang === 'en' ? 'Every Saturday' : 'Каждую субботу'}</span>
          <span>✓ {lang === 'en' ? 'Max 15 players' : 'Макс. 15 игроков'}</span>
        </div>
      </div>
    </section>
  );
}

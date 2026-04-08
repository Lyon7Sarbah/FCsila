import { useLang } from '@/context/LangContext';

const ITEMS_EN = [
  '⚽ FC SILA ACADEMY',
  '★ YOUTH FOOTBALL MOSCOW',
  '⚽ AGES 7–15',
  '★ EVERY SATURDAY',
  '⚽ MAX 15 PER GROUP',
  '★ PROFESSIONAL COACHING',
  '⚽ FAIR PLAY',
  '★ REGISTERED MOSCOW CLUB',
  '⚽ JOIN A TRIAL SESSION',
  '★ BUILD YOUR GAME',
];

const ITEMS_RU = [
  '⚽ ФК СИЛА АКАДЕМИЯ',
  '★ ДЕТСКИЙ ФУТБОЛ МОСКВА',
  '⚽ ВОЗРАСТ 7–15 ЛЕТ',
  '★ КАЖДУЮ СУББОТУ',
  '⚽ МАКС. 15 В ГРУППЕ',
  '★ ПРОФЕССИОНАЛЬНЫЕ ТРЕНЕРЫ',
  '⚽ ЧЕСТНАЯ ИГРА',
  '★ ОФИЦИАЛЬНЫЙ КЛУБ',
  '⚽ ПРОБНОЕ ЗАНЯТИЕ',
  '★ РАЗВИВАЙ СВОЮ ИГРУ',
];

export default function TickerBanner() {
  const { lang } = useLang();
  const items = lang === 'en' ? ITEMS_EN : ITEMS_RU;
  const doubled = [...items, ...items];

  return (
    <div
      className="ticker-wrap py-3 select-none overflow-hidden"
      style={{
        background: '#FDE100',
        borderTop: '2px solid #000',
        borderBottom: '2px solid #000',
      }}
    >
      <div className="ticker-content flex gap-10">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-xs font-black uppercase tracking-widest whitespace-nowrap flex-shrink-0"
            style={{ color: '#000' }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

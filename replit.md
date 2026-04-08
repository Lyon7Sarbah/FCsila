# FC SILA Moscow — Youth Football Academy Website

## Project Overview
A bilingual (English/Russian) football academy website for FC SILA Moscow with a black & yellow Dortmund-style color scheme (#000000 / #FDE100). Built with React + Vite, TypeScript, Tailwind CSS.

## Architecture

### Artifact
- **Kind:** web
- **Dir:** `artifacts/fc-sila`
- **Preview path:** `/`

### Tech Stack
- React 18 + Vite + TypeScript
- Tailwind CSS v4 with custom CSS animations
- React Query (for future API use)
- pnpm monorepo workspace

## Key Files
- `artifacts/fc-sila/src/lib/i18n.ts` — All translations (EN/RU) and NAV_ITEMS (source of truth)
- `artifacts/fc-sila/src/context/LangContext.tsx` — Language switcher context
- `artifacts/fc-sila/src/App.tsx` — Main app, imports all sections
- `artifacts/fc-sila/src/index.css` — Black/yellow theme + custom animations

## Components
| File | Section |
|------|---------|
| `Header.tsx` | Fixed nav, logo (EN/RU logos), language toggle, mobile hamburger |
| `HeroSection.tsx` | Full-screen hero with logo, title, badges, CTA, stats strip |
| `AboutSection.tsx` | Club story, history, values, legal info box |
| `AcademySection.tsx` | Foundation (7–10, 10k RUB/mo) + Development (11–15, 12k RUB/mo) |
| `CoachesSection.tsx` | Vladislav Shishelov + vacancy card |
| `PlayersSection.tsx` | Stats, Player of Month, parent testimonials |
| `MatchesSection.tsx` | Philosophy + upcoming matches table |
| `TrainingSection.tsx` | Saturday schedule (no time shown), 2-hr session plan, gear list |
| `GallerySection.tsx` | Placeholder gallery grid |
| `ContactSection.tsx` | Registration form + contact info sidebar |
| `Footer.tsx` | Logo, quick links, contact, legal/copyright |

## Club Content (Real Data)
- **Ages:** 7–15 only
- **Groups:** Foundation (7–10) 10,000 RUB/mo | Development (11–15) 12,000 RUB/mo
- **Trial:** 2,000 RUB (deducted from first month if enrolled)
- **Training:** Saturdays only (no time displayed per user request)
- **Head Coach:** Vladislav Shishelov — "Every child deserves to love the game."
- **Email:** info@fcsila.ru | **Instagram:** @silahfc | **Web:** www.fcsila.ru
- **Legal:** OGRN 1207700105073 | INN/KPP 9715380269/502701001 | Founded March 6 2020
- **Address:** 140009 Moscow region, Lyubertsy, Motyakovo, SNTSN Yelochka 38a rm 1

## Logos
- EN: `attached_assets/football_club_strength_1775666267415.png`
- RU: `attached_assets/sila_logo__1775666431192.png`

## Design
- Colors: Black (#000) + Dortmund Yellow (#FDE100)
- Font: Inter (all weights)
- Custom animations: float (hero logo), ticker (academy strip), btn-pulse (CTA), card-lift (hover), slide-down (mobile menu)
- 9 nav sections: Home, About, Academy, Coaches, Players, Matches, Training, Gallery, Contact

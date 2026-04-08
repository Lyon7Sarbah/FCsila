# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### FC SILA Moscow — Football Academy (`artifacts/fc-sila`)
- **Type**: React + Vite (presentation-first, no backend)
- **Preview**: `/` (root)
- **Description**: Modern bilingual (EN/RU) youth football academy website for FC SILA Moscow
- **Features**:
  - Full language switcher (English / Russian) with language-specific logos
  - Sections: Hero, About, Programs (4 age groups), Training Schedule, Coaches, Contact Form, Footer
  - Saturday: shows "Training" status with no time (as requested)
  - Black & yellow Dortmund-style color scheme (#000000 / #FDE100)
  - Animated hero with floating logo, ticker tape, card hover effects
  - Mobile-responsive with hamburger menu
  - Contact form with validation and success state
  - Scroll-aware active navigation highlighting

### API Server (`artifacts/api-server`)
- **Type**: Express 5 backend
- **Preview**: `/api`
- **Description**: Shared backend API (currently serves health check only)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

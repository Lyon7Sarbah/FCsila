# Threat Model

## Project Overview

FC SILA Moscow is a bilingual youth football academy website built in a pnpm workspace. The main web artifact is `artifacts/fc-sila`, a React/Vite/TypeScript frontend. The repository also contains a production-intended Express API in `artifacts/api-server` for registration intake and admin management of registrations, with PostgreSQL accessed through `pg` and email delivery through Gmail/Nodemailer. The `artifacts/mockup-sandbox` area is development-only and should not be treated as production unless separately proven reachable.

## Assets

- **Registration personal data** -- parent names, phone numbers, email addresses, child names, ages, group selection, experience, medical information, notes, and agreement status stored in the `registrations` table.
- **Admin access** -- the `/admin` UI and `/api/admin/*` routes can view, modify, export, delete, and email registration records.
- **Application secrets** -- `ADMIN_PASSWORD`, `DATABASE_URL`, and `GMAIL_APP_PASSWORD` control admin authentication, database access, and outbound email delivery.
- **Academy communication channel** -- the public registration endpoint can send email to the academy mailbox and insert records in the database.

## Trust Boundaries

- **Browser to frontend/API** -- all input from visitors and admins is untrusted. The frontend cannot be relied on for validation or authorization.
- **Public visitor to registration API** -- unauthenticated users can submit registration data to `POST /api/contact`, which crosses into the database and email systems.
- **Admin UI to admin API** -- `/admin` collects an admin password and sends a bearer token to `/api/admin/*`; authorization must be enforced server-side on every admin route.
- **API to PostgreSQL** -- the API server sends user-submitted data and admin queries to PostgreSQL. Queries must remain parameterized and the transport must protect credentials and PII.
- **API to Gmail/Nodemailer** -- public and admin-controlled data is rendered into email messages and sent through Gmail credentials.
- **Repository/configuration to runtime** -- committed configuration and environment variables can become production runtime secrets if deployed directly.

## Scan Anchors

- Production-intended frontend: `artifacts/fc-sila/src/App.tsx`, `/contact`, and `/admin`.
- Production-intended backend: `artifacts/api-server/src/app.ts`, `routes/contact.ts`, `routes/admin.ts`, `lib/db.ts`, and `lib/logger.ts`.
- Public surfaces: `POST /api/contact`, frontend registration form at `/contact`, and static public marketing pages.
- Admin surfaces: `/admin` frontend and `/api/admin/login`, `/api/admin/registrations`, `/api/admin/export.csv`, `/api/admin/stats`, and agreement email routes.
- Data stores and schema: PostgreSQL `registrations` table described in `attached_assets/fc_sila_database_export.sql`.
- Dev-only areas normally out of scope: `artifacts/mockup-sandbox`, generated assets, and local workflow/log state unless production reachability is demonstrated.

## Threat Categories

### Spoofing

Admin access is protected by a shared password-derived bearer token. The system must keep admin credentials out of source control and runtime logs, compare credentials safely, and avoid exposing the long-lived credential itself as the session token. Every `/api/admin/*` route must require a valid admin authorization mechanism independent of frontend state.

### Tampering

Visitors can submit arbitrary registration fields, and admins can update statuses and notes. The API must validate request bodies server-side, enforce allowed state transitions and field lengths, and continue using parameterized SQL for all values. Admin-only mutations such as status changes, notes, deletion, and agreement sending must never be reachable with only client-side checks.

### Information Disclosure

Registration data contains PII and child medical information. Admin list, detail, export, and stats endpoints must only disclose data to authorized admins. CSV exports and generated emails must neutralize untrusted content so data does not become executable formulas, markup, or misleading content when opened by staff. Database connections must validate the server endpoint so PII and credentials are not exposed to network impersonation.

### Denial of Service

The public registration endpoint sends email and writes to the database, while the admin login endpoint performs authentication checks. Public endpoints must have rate limits, request size limits appropriate to the form, and abuse controls so attackers cannot flood the academy mailbox, fill the registration table, or brute-force credentials.

### Elevation of Privilege

Compromise of the admin credential grants full access to registration PII and destructive operations. Secrets must be stored in the Replit Secrets store, rotated when exposed, and separated from session tokens. Server-side authorization must remain the source of truth for all admin operations.
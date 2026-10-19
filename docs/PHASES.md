# Implementation phase status

New repo: `corebolt-platform` (sibling of `CoreBolt`). Source UI copied from CoreBolt; original repo left intact.

| Phase | Status | Notes |
|-------|--------|--------|
| 1. Monorepo + UI migrate | **Done** | pnpm workspaces; Next.js + replica CSS; catalogue catch-all routes |
| 2. DB + catalogue API + seed | **Code ready** | Drizzle + migrate/seed/catalog scripts — run when Postgres is installed |
| 3. Currency switcher | **Done** | Cookie + nav toggle; client-side INR→USD fallback; server FX when DB up |
| 4. Auth + account | **Done** | Account login/register UI; needs API+DB for real sessions; local orders list |
| 5. Cart / checkout / payments | **Done (local-first)** | Browser localStorage cart + checkout; syncs to API when available; ICICI/Stripe stubs |
| 6. Enquiries / ON_REQUEST | **Done** | Modal → enquiry API; Ask Price / Request Quote preserved |
| 7. Admin | **Done (baseline)** | Admin shell + products from static catalogue; other lists via API |
| 8. SEO + i18n + reviews | **Done (baseline)** | metadata/sitemap/robots; `/en`+`/hi`; reviews UI on product pages |
| 9. Tests + hardening + docs | **Partial** | Unit tests; OpenAPI stub; health reports DB up/down; CI deferred |

## Works today without Docker/Postgres

- Homepage, catalogue browse (`/en/edge-computers/subcategories`, products, etc.)
- Currency toggle (client FX fallback)
- **Buy Now** → local cart → checkout (local order receipt if API down)
- Contact / enquiry forms (API call fails gracefully / toast)
- Blog, about, contact
- Admin products browser (static data)

## After you install Postgres (or Docker)

```bash
docker compose up -d   # or brew postgresql
npx pnpm@9.15.0 db:migrate
npx pnpm@9.15.0 db:seed
npx pnpm@9.15.0 db:seed:catalog
npx pnpm@9.15.0 dev
```

Then auth, API cart merge, paid checkout, enquiry persistence, and review moderation go live.

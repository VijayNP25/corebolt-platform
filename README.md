# COREBOLT Platform

Production-oriented **3-tier** e-commerce monorepo for [www.core-bolt.com](https://www.core-bolt.com).

| Tier | App | Stack |
|------|-----|--------|
| Presentation | `apps/web` | Next.js 15 (App Router), SSR/ISR, next-intl (`/en`, `/hi`), Tailwind + CoreBolt replica CSS |
| Application | `apps/api` | Express (layered), REST, JWT httpOnly cookies |
| Data | PostgreSQL | Drizzle ORM, decimal money |

Original static/Vite catalogue lives in sibling `../CoreBolt` (untouched). UI assets were copied into this repo.

Architecture & product choices: [`docs/DECISIONS.md`](./docs/DECISIONS.md).

---

## Prerequisites

- Node.js ≥ 20
- [pnpm](https://pnpm.io) 9 (`npx pnpm@9.15.0` works if not installed globally)
- **No Docker required for local dev** — API uses **PGlite** (`DATABASE_URL=pglite:./.data/pglite`) by default
- Optional later: Docker Desktop or Homebrew Postgres for a real `postgresql://` URL (EC2 production)

---

## Quick start

```bash
cd corebolt-platform
npx pnpm@9.15.0 install
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local

npx pnpm@9.15.0 db:migrate
npx pnpm@9.15.0 db:seed
npx pnpm@9.15.0 db:seed:catalog

npx pnpm@9.15.0 dev
```

- Web: http://localhost:3000/en  
- API health: http://localhost:4000/api/v1/health  

### Default admin

- Email: `admin@core-bolt.com`  
- Password: `ChangeMeAdmin123!`

### Later: switch to real Postgres / Docker

```bash
docker compose up -d
# set DATABASE_URL=postgresql://corebolt:corebolt@localhost:5432/corebolt in apps/api/.env
npx pnpm@9.15.0 db:migrate && npx pnpm@9.15.0 db:seed && npx pnpm@9.15.0 db:seed:catalog
```
---

## Workspace layout

```
apps/web          Next.js storefront + /admin
apps/api          Express REST API
packages/shared   Shared zod schemas + currency formatters
docs/DECISIONS.md Locked product/architecture decisions
docker-compose.yml  Local Postgres only
```

---

## Key behaviours (per decisions)

- **Currency:** INR/USD switcher (cookie + profile); FX from ExchangeRate-API + admin % markup on rate; USD rounded to whole numbers; bots/JSON-LD use INR
- **Checkout:** Guest cart OK; login + verified email required to place order; charge INR via ICICI, USD via Stripe (`PaymentProvider`)
- **ON_REQUEST products:** Ask Price / Request Quote — never cartable; enquiries API replaces EmailJS
- **Shipping:** Per-product INR/USD amounts; cart sums line shipping
- **Roles:** Customer / Staff (orders+enquiries) / Admin (full)
- **i18n:** `/en` and `/hi` routes wired; English copy now, translations phased
- **Reviews:** Verified purchasers, admin moderation, stars + text

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | API + web in parallel |
| `pnpm --filter api dev` | API only |
| `pnpm --filter web dev` | Web only |
| `pnpm test` | Unit + API tests |
| `pnpm db:migrate` | Apply Drizzle SQL migrations |
| `pnpm db:seed` | Admin + sample products + FX |
| `pnpm --filter api db:seed:catalog` | Import full CoreBolt catalogue |
| `pnpm docker:up` / `docker:down` | Postgres container |

---

## Environment variables

See:

- `apps/api/.env.example` — `DATABASE_URL`, JWT secrets, CORS origin, SES, Stripe, ICICI, FX API
- `apps/web/.env.example` — `NEXT_PUBLIC_API_URL`, site URL, GA4 id

Never commit real secrets.

---

## Deploy (AWS EC2 v1)

1. Provision Ubuntu EC2; install Node 20, Docker, nginx/Caddy  
2. Clone this repo; copy production `.env` files  
3. `docker compose up -d` for Postgres on the instance  
4. `pnpm install && pnpm build && pnpm db:migrate && pnpm db:seed && pnpm --filter api db:seed:catalog`  
5. Run API (`node apps/api/dist/index.js` or `tsx`) and Next (`pnpm --filter web start`) under systemd/pm2  
6. Terminate TLS at nginx; proxy `/` → web `:3000`, `/api` → api `:4000`  
7. Point `www.core-bolt.com` at the instance  
8. Configure SES domain auth; ICICI + Stripe webhooks to `https://www.core-bolt.com/api/v1/webhooks/...`  

Later: move apps to **ECS**, Postgres to **RDS**.

CI/CD: none for now (manual deploy). Monitoring: structured logs only for now.

---

## Testing

```bash
npx pnpm@9.15.0 --filter @corebolt/shared test
npx pnpm@9.15.0 --filter api test
```

---

## UI migration notes

- Replica home, nav, footer, contact modal styling, and product card patterns were copied from CoreBolt.
- Deep legacy category URL trees are partially mapped; primary commerce routes use `/[locale]/products` and `/[locale]/products/[slug]`.
- Keep iterating toward pixel parity on remaining catalogue browse paths without redesigning components.

---

## Brand

**COREBOLT** · www.core-bolt.com · sales@core-bolt.com · 9849035858 · Kakinada, India

# CORE BOLT Web (`apps/web`)

Next.js 15 App Router frontend for the CORE BOLT platform. Visual design is the copied replica UI (`replica-*` CSS + components). Data and commerce talk to the Express API at `NEXT_PUBLIC_API_URL`.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript strict
- Tailwind CSS (tokens from CoreBolt `index.corebolt.css`)
- `next-intl` — locale prefix `U1`: `/en/...`, `/hi/...` (hi is a stub for wiring)
- Currency cookie `currency=INR|USD` + header switcher in replica nav
- Auth via httpOnly cookies (`credentials: 'include'`) against `apps/api`
- Zod + shared `@corebolt/shared` types

## Setup

```bash
# from monorepo root
pnpm install
cp apps/web/.env.example apps/web/.env.local
pnpm --filter web dev
```

Default API: `http://localhost:4000/api/v1` (run `pnpm --filter api dev`).

## Routes

| Path | Notes |
|------|--------|
| `/[locale]` | Replica homepage |
| `/[locale]/about`, `/about-us` | About |
| `/[locale]/contact`, `/contact-us` | Contact |
| `/[locale]/blog`, `/blog/[slug]` | Markdown under `src/content/blog` |
| `/[locale]/products`, `/products/[slug]` | API + static catalog fallback |
| `/[locale]/cart`, `/checkout` | Commerce shells (`noindex`) |
| `/[locale]/account` | Login / register (`noindex`) |
| `/[locale]/admin/*` | Admin shell stubs (`noindex`) |

## Source layout

- `src/components` — adapted from `components-src/`
- `src/styles` — replica CSS from `styles-src/`
- `src/lib` — helpers from `lib-src/` + API/auth/currency
- `src/data` — static catalog fallback (`data-src/`)
- `src/content/blog` — blog markdown
- `components-src/`, `styles-src/`, etc. — untouched copies for reference

## Product CTAs

- `pricingType === 'FIXED'` → **Buy Now** (+ price)
- `pricingType === 'ON_REQUEST'` → **Ask Price** (enquiry modal)

Contact modal posts to `POST /enquiries` (not EmailJS).

## SEO

- `generateMetadata` / page `metadata` on public routes
- `src/lib/seo-jsonld.ts` helpers + homepage schema
- `src/app/sitemap.ts`, `src/app/robots.ts`
- Admin, account, cart, checkout are `noindex`

## Notes / caveats

- Not every legacy CoreBolt route is pixel-migrated; priority shells use replica CSS so they match brand.
- Product listing falls back to `src/data/products.ts` when the API is down.
- Hindi locale messages exist; copy is still mostly English until content is translated.
- Original CoreBolt repo is not modified; work stays in `corebolt-platform`.

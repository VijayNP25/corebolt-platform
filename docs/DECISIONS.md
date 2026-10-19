# CoreBolt — Architecture & Product Decisions

Living record of choices for the 3-tier e-commerce migration.  
Do not contradict these without an explicit new decision entry.

---

## A. Architecture

### 1. Frontend framework / rendering strategy

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Next.js (App Router) · B) Remix / React Router v7 · C) Keep Vite + React SPA + prerender/SSR · D) Astro + React islands · E) Nuxt / SvelteKit |
| **Choice** | **A — Next.js (App Router, React, SSR/SSG/ISR)** |
| **Reason** | Same React + Tailwind/shadcn surface; first-class SSR/ISR for catalogue SEO; currency cookie + auth without fighting the current S3-static-only deploy. |

### 2. Backend framework

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) NestJS · B) Express or Fastify (Node/TS, layered) · C) Django + DRF · D) Spring Boot · E) ASP.NET Core / Laravel |
| **Choice** | **B — Express or Fastify (Node/TS, layered)** → refined in **2b** |
| **Reason** | Thinner API, faster start on the existing Node/Express footprint in the repo. |

### 2b. Express vs Fastify

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Express · B) Fastify |
| **Choice** | **A — Express (layered)** |
| **Reason** | Reuse the existing Express footprint in the repo; familiar middleware ecosystem. |

### 3. API style

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) REST (+ OpenAPI) · B) GraphQL · C) tRPC |
| **Choice** | **A — REST + OpenAPI** |
| **Reason** | Payment webhooks and third-party clients fit REST; catalogue size does not justify GraphQL. |

### 4. Repository structure

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Monorepo (pnpm workspaces / Turborepo) · B) Separate repos · C) Single framework app with colocated API |
| **Choice** | **A — Monorepo** |
| **Reason** | Matches existing `client` / `server` / `shared` layout; shared TypeScript types; independently deployable web + API tiers. |
| **Note** | Exact monorepo tooling (pnpm-only vs Turborepo/Nx) can be confirmed in Operations (batch H) if needed. |

### 5. Language strictness

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) TypeScript strict · B) TypeScript non-strict · C) JavaScript |
| **Choice** | **A — TypeScript strict** |
| **Reason** | Already enabled in `tsconfig.json`; needed for money, auth, and ID safety. |

---

## B. Data

### 6. Database

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) PostgreSQL (self-managed / Docker locally) · B) PostgreSQL on Neon · C) PostgreSQL on Supabase/RDS · D) MySQL/MariaDB · E) MongoDB Atlas |
| **Choice** | **A — PostgreSQL** (local/Docker for now; production host deferred to batch H) |
| **Reason** | Relational fit for orders, money, catalogue, and full-text search; no forced serverless vendor. |

### 7. ORM / data access

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Drizzle · B) Prisma · C) TypeORM · D) Sequelize · E) Mongoose |
| **Choice** | **A — Drizzle** |
| **Reason** | Already in deps (`drizzle-orm`, stub `shared/schema.ts`); lightweight SQL-like DX with Postgres + TS strict. |

### 8. Money storage

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Integer minor units (paise/cents) · B) Decimal / numeric type in DB |
| **Choice** | **B — Decimal / numeric in the database** |
| **Reason** | Human-readable amounts in SQL (`1999.00`); admin-friendly. |
| **Constraint** | Never use JS `number` for money in app code — use string/Decimal libraries at API boundaries; gateways still receive minor units at charge time. |

### 9. Image / file storage

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Keep existing CDN · B) AWS S3 · C) Cloudflare R2 · D) Cloudinary · E) Supabase Storage · F) Local disk (dev only) |
| **Choice** | **A — Keep existing CDN URLs** (`assets.core-bolt.com` / current host) |
| **Reason** | Seeded catalogue images stay identical; no URL rewrite risk to the UI. |
| **Note** | Admin upload pipeline for *new* images is unspecified — ask again when implementing admin product CRUD if uploads are needed beyond pasting CDN URLs. |

### 10. Product search

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Postgres full-text · B) Meilisearch · C) Typesense · D) Algolia |
| **Choice** | **A — Database full-text search (Postgres)** |
| **Reason** | Catalogue is small (~158 products); avoids an extra search service. |

---

## C. Auth & users

### 11. Auth approach

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Custom JWT access + refresh in httpOnly cookies · B) Server-side sessions · C) Auth.js/NextAuth · D) Managed provider |
| **Choice** | **A — Custom JWT access + refresh tokens in httpOnly cookies** |
| **Reason** | Fits separate Express API + Next.js SSR; fully custom login UI to match CoreBolt design; no Redis required for v1. |

### 12. Login methods

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Email + password · B) Magic link/OTP · C) Phone OTP · D) Google · E) Other social |
| **Choice** | **A — Email + password** |
| **Reason** | Simple, expected for B2B industrial buyers; no SMS/OAuth dependency in v1. |

### 13. Email verification required before ordering

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Yes · B) No |
| **Choice** | **A — Yes** |
| **Reason** | High-ticket products; verified email before paid orders. |

### 14. Roles

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Customer + Admin only · B) Customer + Admin + Staff · C) Fully configurable RBAC |
| **Choice** | **B — Customer + Admin + Staff (limited admin)** |
| **Reason** | Staff can handle orders/enquiries/tracking without full admin power. |

### 15. Guest checkout

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Allowed · B) Not allowed (login required) · C) Allowed + optional account after order |
| **Choice** | **B — Not allowed (login required)** |
| **Reason** | Cleaner order history and account linkage; login required to place an order. |
| **Follow-up** | Whether a **guest cart while browsing** (login required only at checkout) is allowed — asked in batch D. |

---

## D. Commerce rules

### 15b. Cart before login

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Cart only when logged in · B) Guest cart OK; login required at checkout |
| **Choice** | **B — Guest cart allowed; login (+ verified email) required at checkout** |
| **Reason** | Browse-and-add without account; merge guest → user cart on login; no guest *checkout*. |

### 16. Payment gateway

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) ICICI only · B) ICICI + Stripe · C) Stripe only · D) ICICI now, second gateway later · (earlier: Razorpay, PayU, Cashfree, PhonePe, COD) |
| **Choice** | **B — ICICI Bank PG (via [api-portal.icici.bank.in](https://api-portal.icici.bank.in)) for INR + Stripe for USD / fallback** |
| **Reason** | Use ICICI banking relationship for India; Stripe satisfies **17f** (charge in selected currency) when USD is selected. Swappable `PaymentProvider` interface. |
| **Note** | ICICI: Sandbox → UAT (NDA) → Production. Stripe: standard Connect/Checkout or Payment Intents + webhooks. Never trust client for payment confirmation. |

### 17a. How USD prices are set

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Manual USD per product · B) Auto-convert from INR via live FX · C) Fixed admin rate · D) Hybrid auto + per-product override |
| **Choice** | **B (modified) — Auto-convert from INR using live FX, with admin forex markup** |
| **Detail** | Admin sets markup **X as a percentage on the FX rate** (decision 17a-extra). Converted USD = round_whole(INR_price / (rate × (1 + X/100))) or equivalent agreed formula at implementation; rate cached daily with last-known fallback. |
| **Reason** | Low catalogue maintenance with controllable margin on FX. |

### 17a-extra. Forex markup unit

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) % on FX rate · B) % on converted USD price · C) Fixed USD add-on |
| **Choice** | **A — Percentage on the FX rate** |
| **Reason** | Simple admin control (e.g. +2.5% on the rate). Default numeric value of X can be set in admin at go-live. |

### 17b. Exchange-rate source

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Open Exchange Rates · B) ExchangeRate-API · C) Fixer · D) Admin manual rate |
| **Choice** | **B — ExchangeRate-API** |
| **Reason** | Simple HTTP API; daily cache + last-known fallback as specified in fixed requirements. |

### 17c. Rounding of converted prices

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) 2 decimals · B) Nearest whole number · C) Psychological x.99 · D) Admin-configurable |
| **Choice** | **B — Round to nearest whole number** |
| **Reason** | Cleaner B2B USD amounts. |

### 17d. Default currency for first-time visitors

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Always INR · B) Auto-detect by visitor country (geo-IP) · C) Browser locale |
| **Choice** | **B — Auto-detect by visitor country (geo-IP)** |
| **Reason** | Better UX for international visitors. |
| **SEO companion** | See **17d-SEO**. |

### 17d-SEO. Structured data / bot currency

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) JSON-LD + bot SSR always INR; humans get geo default · B) Always INR until cookie set · C) JSON-LD follows geo |
| **Choice** | **A — JSON-LD / first SSR for bots always INR; humans get geo-IP default** |
| **Reason** | Stable Google rich results for an India-primary catalogue; humans still get sensible default currency. |

### 17e. Where currency choice is saved

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Cookie only · B) localStorage · C) Cookie + user profile when logged in |
| **Choice** | **C — Cookie + saved to user profile when logged in** |
| **Reason** | SSR-safe (no price flicker); synced for returning logged-in users. |

### 17f. Charge currency

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Charge in selected currency · B) Always INR, USD display-only · C) USD only for international shipping addresses |
| **Choice** | **A — Charge in the selected currency** |
| **Reason** | Displayed price matches charged currency. |
| **Depends on** | Decision 16 — gateway must support INR and USD charging. |

### 17g. Currency-dependent business rules

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Separate values per currency · B) Convert from INR · C) Mixed |
| **Choice** | **A — Separate configured values per currency** |
| **Reason** | Shipping/tax/coupon thresholds are policy, not pure FX. |
| **Note** | Coupons are optional-scope (batch I); when built, configure per currency. |

### 17h. Admin reporting currency

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) All INR · B) Original order currency only · C) Both |
| **Choice** | **C — Both** (order in original currency; rollups in INR) |
| **Reason** | Ops accuracy + finance rollup. |

### 18. Tax handling

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Inclusive GST · B) Exclusive, tax at checkout · C) No tax for now |
| **Choice** | **B — Prices exclusive; GST added at checkout** |
| **Reason** | Matches current UI “Excl. GST”. |

### 19. Shipping charges

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Free · B) Flat · C) Free above threshold · D) Weight/zone based · (follow-up) per-product admin shipping |
| **Choice** | **Per-product shipping — manually entered by admin** (supersedes weight/zone matrix) |
| **Reason** | Admin sets shipping charge on each product; no weight data in current catalogue. |
| **Detail** | Separate shipping amounts per currency per **17g** (INR and USD fields on the product, or equivalent). ON_REQUEST products are not cartable, so shipping applies to FIXED-price cart items only. |

### 19b. Multi-item shipping combine

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Sum · B) Max once · C) Sum + ships-together flag |
| **Choice** | **A — Sum each line’s shipping** |
| **Reason** | Safest default for heavy multi-item sensor orders. |

### 20. Shipping & tracking

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Manual · B) Shiprocket · C) Delhivery / other API |
| **Choice** | **A — Manual (admin enters carrier + tracking)** |
| **Reason** | Low/high-touch order volume; no courier API in v1. |

### 21. Order status workflow

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Simple · B) Standard · C) B2B payment-aware |
| **Choice** | **B — Standard:** `PENDING` → `CONFIRMED` → `PROCESSING` → `SHIPPED` → `DELIVERED` (+ `CANCELLED`, `REFUNDED`, `RETURNED`) |
| **Transitions (default until edited)** | Payment webhook/system: `PENDING` → `CONFIRMED`. Staff/Admin: `PROCESSING` / `SHIPPED` / `DELIVERED`. Admin: `REFUNDED` / `RETURNED`. Cancel: admin/staff only (customer cancel disabled — decision 22). |

### 22. Order cancellation by customer

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Not allowed · B) Until a status · C) Request-based |
| **Choice** | **A — Not allowed** |
| **Reason** | High-touch / imported goods; cancellations via support/admin. |

### 23. Inventory

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Track + block oversell · B) Track + backorders · C) No stock tracking |
| **Choice** | **C — No stock tracking** |
| **Reason** | Matches current site behavior; lead-time sales without stock UI. |

### 24. Product variants

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) None · B) Simple · C) Full matrix |
| **Choice** | **A — None** |
| **Reason** | Catalogue is one row per model today. |

### 25. Refunds & returns

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Out of scope · B) Manual admin mark refunded · C) Automated gateway refunds |
| **Choice** | **B — Manual (admin marks refunded)** |
| **Reason** | Fits sales-assisted return/warranty process. |

---

## E. Price-on-request & Contact Us modal

### 26. Button label

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Contact us to book · B) Request a quote · C) Enquire now · D) Keep current split · E) Custom |
| **Choice** | **D — Keep current split:** listings **“Ask Price”**, product page **“Request Quote”** |
| **Reason** | Zero copy change vs current UI. |

### 27. Modal fields

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Choice** | **Same as current `ContactFormModal`** |
| **Fields (from `client/src/components/contact-form-modal.tsx`)** | **Required:** name, email, mobile (phone). **Optional:** company, topic (select), products (multi-select; pre-filled when opened from a product), systemCore / order-information select when the product defines options, message. |
| **Server-attached context** | Product id/slug/name, action (`quote` \| `order`), timestamp; replace EmailJS with API + enquiry record. |
| **Reason** | UI-identical form; only the submit backend changes. |

### 28. Login required to submit enquiry

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Yes · B) No · C) Optional |
| **Choice** | **B — No** (guests can submit) |
| **Reason** | Matches current anonymous EmailJS flow. Rate-limit enquiry endpoints. |

### 29. Enquiry workflow statuses

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Simple · B) Sales pipeline |
| **Choice** | **A —** `NEW` → `CONTACTED` → `BOOKED` → `CLOSED` (optional `SPAM` / `REJECTED`) |
| **Transitions** | Staff + Admin; customer read-only if later linked by email (login not required to submit). |

### 30. Admin notification on new enquiry

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Email · B) WhatsApp · C) SMS · D) Admin dashboard only |
| **Choice** | **A + D — Email + Admin dashboard** |
| **Reason** | Email alert for sales; dashboard for tracking. Depends on transactional email (batch F). |

### 31. Listing appearance for price-on-request

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Hide price · B) “Price on request” text · C) Starting from · D) Keep current |
| **Choice** | **D — Keep current:** no price number; **Ask Price** CTA only |
| **Reason** | UI-identical; JSON-LD omits offer price for ON_REQUEST. |

---

## F. Integrations

### 32. Transactional email provider

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Resend · B) SendGrid · C) Amazon SES · D) Brevo · E) SMTP (Zoho/Gmail Workspace) |
| **Choice** | **C — Amazon SES** |
| **Reason** | Cost-effective transactional mail at scale; fits AWS-friendly ops. |
| **Note** | Verify `core-bolt.com` (SPF/DKIM/DMARC); exit SES sandbox before production volume. |

### 33. SMS / WhatsApp notifications

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) None · B) MSG91 · C) Twilio · D) Gupshup · E) WhatsApp Cloud API |
| **Choice** | **A — None for now** |
| **Reason** | Enquiry/order alerts via email + dashboard; no phone OTP in auth. |

### 34. Analytics

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) None · B) GA4 · C) Plausible · D) PostHog · E) GA4 + Meta Pixel |
| **Choice** | **B — Google Analytics 4** |
| **Reason** | Standard traffic/product insights without extra product-analytics stack. |

### 35. Invoices

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) None · B) PDF emailed + downloadable · C) Full GST-compliant with GSTIN |
| **Choice** | **B — PDF invoice emailed and downloadable** |
| **Reason** | B2B buyers need a PDF; full GST e-invoice can come later. Schema should not block upgrade to C. |

---

## G. Admin module

### 36. Admin panel approach

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Custom in main Next.js frontend · B) Separate admin app · C) Admin framework (Refine/React-admin/AdminJS) |
| **Choice** | **A — Custom-built inside the main Next.js frontend** (`/admin/...`, noindex) |
| **Reason** | Match CoreBolt design language; single web deployable; role-guarded routes. |

### 37. Admin features (v1)

| | |
|---|---|
| **Date** | 2026-10-19 |
| **In scope (v1)** | A Dashboard metrics · B Orders · C Enquiries · D Products CRUD · E Categories CRUD · F Customers · G Currency/FX management · H CSV export · I Audit log · K Reports |
| **Deferred** | J Coupons (until batch I) |
| **Reason** | Full ops surface for catalogue, orders, enquiries, FX, and reporting without coupon scope creep. |

### 37-roles. Staff vs Admin permissions

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Staff** | **B + C** — Orders and Enquiries (update statuses, tracking, notes). **Read-only** products and customers (optional views; no create/edit/deactivate). |
| **Admin** | All v1 features (A–I, K), including product/category CRUD, FX markup, customer deactivate, CSV, audit, reports. |
| **Reason** | Staff handle fulfilment and leads; Admin owns catalogue, money config, and user admin. |

---

## H. Operations

### 38. Hosting / deployment

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Vercel + Render/Railway · B) AWS · C) DO/VPS Docker · D) Cloud Run · E) S3 + separate API |
| **Choice** | **B — AWS:** **simple EC2 for now**, migrate to **ECS later** |
| **Reason** | Pragmatic v1 on one EC2 (Next.js + Express + reverse proxy); path to ECS when scale/ops demand it. |
| **Note** | SES remains Amazon SES. Leave pure S3-static-only deploy; SSR needs Node on EC2. |

### 38-extra. Postgres placement (AWS v1)

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Postgres on same EC2 (Docker) · B) Amazon RDS |
| **Choice** | **A — PostgreSQL on the same EC2 (Docker)** |
| **Reason** | Cheapest/simplest for early v1; revisit RDS when moving to ECS. |

### 39. Local development setup

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Docker Compose everything · B) Docker only for DB · C) No Docker |
| **Choice** | **B — Docker only for PostgreSQL**; web/API via pnpm locally |
| **Reason** | Light, reproducible DB without full-stack containers. |

### 40. CI/CD

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) GitHub Actions · B) GitLab CI · C) None for now |
| **Choice** | **C — None for now** |
| **Reason** | Defer pipeline automation; deploy manually to EC2 initially. |
| **Note** | Existing `.github/workflows/deploy.yaml` (S3 prerender) will be superseded/disabled when Next+API on EC2 lands — confirm before removing. |

### 41. Testing scope

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) Unit only · B) Unit + API integration · C) Unit + integration + E2E |
| **Choice** | **B — Unit + API integration tests** |
| **Reason** | Cover money, auth, catalogue, webhooks without full E2E CI yet. |

### 42. Error monitoring & logging

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) None · B) Sentry · C) Logtail/Better Stack · D) Cloud provider logging |
| **Choice** | **A — None for now** |
| **Reason** | Defer paid monitoring; use structured app logs on EC2 until needed. |

### 4-extra. Monorepo tooling

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Options considered** | A) pnpm workspaces only · B) pnpm + Turborepo · C) Nx |
| **Choice** | **A — pnpm workspaces only** |
| **Reason** | Simplest monorepo setup for web + api + shared packages. |

---

## I. Scope (optional features)

| ID | Feature | Choice | Date |
|----|---------|--------|------|
| 43a | Wishlist | **later** | 2026-10-19 |
| 43b | Product reviews & ratings | **now** | 2026-10-19 |
| 43c | Coupons / discounts | **later** | 2026-10-19 |
| 43d | Newsletter signup | **later** | 2026-10-19 |
| 43e | Multi-language | **now** | 2026-10-19 |
| 43f | Blog / content pages | **now** (migrate existing blog) | 2026-10-19 |
| 43g | Related products | **now** | 2026-10-19 |
| 43h | Recently viewed | **later** | 2026-10-19 |

### 43e-extra. Multi-language approach

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Choice** | **C — English UI now; i18n framework wired; translations phased** |
| **URL strategy** | **U1 — `/en/...`, `/hi/...` (etc.) + hreflang** |
| **Reason** | Unblock architecture without translating the full catalogue on day one. |

### 43b-extra. Reviews rules

| | |
|---|---|
| **Date** | 2026-10-19 |
| **Who can review** | **C — Verified purchasers only** |
| **Moderation** | **B — Admin approve before publish** |
| **Fields** | **A — Stars + text** |

---

## J. Project info

| ID | Field | Value | Date |
|----|-------|-------|------|
| 44a | Legal / brand name | **COREBOLT** | 2026-10-19 |
| 44b | Production domain | **www.core-bolt.com** | 2026-10-19 |
| 44c | Support email | **sales@core-bolt.com** | 2026-10-19 |
| 44d | Support phone | **9849035858** | 2026-10-19 |
| 44e | Company address | **Kakinada, India** | 2026-10-19 |
| 44f | GSTIN | **skip for now** | 2026-10-19 |
| 44g | Ops/sales notify email | **sales@core-bolt.com** | 2026-10-19 |

---

## Locked stack (final for planning)

- **Brand:** COREBOLT · `www.core-bolt.com` · sales@core-bolt.com · 9849035858 · Kakinada, India  
- **Presentation:** Next.js (SSR/SSG/ISR), TypeScript strict, custom `/admin`, GA4  
- **Application:** Layered Express API, REST + OpenAPI  
- **Data:** PostgreSQL (Docker on EC2 + local Docker) + Drizzle; decimal money; Postgres FTS; existing CDN images  
- **Auth:** JWT httpOnly cookies; email+password; verify before order; Customer/Admin/Staff; guest cart; login at checkout  
- **Commerce:** INR/USD (ExchangeRate-API + % FX markup, whole USD); geo default / INR for bots; charge selected currency; GST at checkout; per-product shipping (sum); manual tracking; no customer cancel; no stock; no variants; manual refunds; PDF invoices  
- **Payments:** ICICI PG (INR) + Stripe (USD/fallback)  
- **Enquiries:** Current modal fields; anonymous OK; NEW→CONTACTED→BOOKED→CLOSED; SES email + dashboard  
- **Scope now:** Blog, related products, **reviews** (purchasers + moderated + stars/text), **multi-language** (i18n wired, `/en`+`/hi`, translations phased)  
- **Scope later:** Wishlist, coupons, newsletter, recently viewed  
- **Ops:** EC2 now → ECS later; Postgres on EC2; pnpm workspaces; no CI/CD yet; unit + API tests; no Sentry yet  
- **UI:** Keep identical; move/reuse, do not redesign  

---

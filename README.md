# Solace Coffee

A production-shaped specialty café website built with **Nuxt 4**, Vue 3, TypeScript, Tailwind CSS, Nitro APIs, Resend email, and bilingual **EN / FA** (RTL).

Demo brand: **Solace** — specialty café, Seattle.

## Features

- Full homepage: hero, marquee, featured pours, story, values, gallery, journal, Instagram demo, newsletter, visit
- Café ordering: menu → ticket → table service or counter pickup → live wait status
- Table QR deep-links + printable QR sheet (Visit page)
- Kitchen staff board (`/kitchen`) with manual stage control
- Loyalty stamps (localStorage) earned on each sent order
- Order history + reorder, printable guest receipt
- Menu search, category + dietary filters, favorites/recent, print menu
- Gift card inquiry API (Resend-ready)
- Visit page with live open status, map, directions
- Events (RSVP + ICS), catering, wholesale, press, Wi‑Fi, FAQ
- Markdown journal (`content/blog/en` + `content/blog/fa`)
- Contact / order / newsletter / gift-card Nitro APIs
- SEO: JSON-LD, dynamic robots + sitemap, i18n `baseUrl`
- Accessibility: skip link, focus rings, labeled forms
- ESLint + GitHub Actions CI

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

- English: http://localhost:3000
- فارسی: http://localhost:3000/fa

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run start` | Run built server (Node) |
| `npm run generate` | Static generate (optional) |
| `npm run lint` | ESLint |

## Environment

| Variable | Purpose |
|---|---|
| `NUXT_PUBLIC_SITE_URL` | Canonical URL (SEO, sitemap, robots, JSON-LD). **Set this in production.** |
| `NUXT_CONTACT_INBOX` | Inbox for contact, orders, gift inquiries |
| `NUXT_RESEND_API_KEY` | Resend API key (empty = demo console logging) |
| `NUXT_MAIL_FROM` | Verified sender address |

## Deploy (Vercel)

1. Import `selengr/nuxt4-solace-coffee` (or push this repo).
2. Framework preset: **Nuxt**.
3. Set env vars:
   - `NUXT_PUBLIC_SITE_URL` = your live URL (e.g. `https://solace.coffee`)
   - Optional: `NUXT_RESEND_API_KEY`, `NUXT_CONTACT_INBOX`, `NUXT_MAIL_FROM`
4. Deploy. Without a Resend key, forms still work in demo mode.

Self-host after `npm run build`:

```bash
npm run start
```

## Structure notes

- App code: `app/` (Nuxt 4)
- Café content: `app/data/menu.ts`, `app/types/cafe.ts`
- Locales: `i18n/locales/en.json`, `i18n/locales/fa.json`
- Blog: `content/blog/{en,fa}/*.md`
- Staff board: `/kitchen` (demo — no auth)

## GitHub

Remote: `selengr/nuxt4-solace-coffee`

## License

MIT

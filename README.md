# Solace Coffee

A production-shaped specialty café website built with **Nuxt 4**, Vue 3, TypeScript, Tailwind CSS, Nitro APIs, Resend email, and bilingual **EN / FA** (RTL).

Demo brand: **Solace** — specialty café, Seattle.

## Features

- Cinematic homepage (hero, marquee, featured pours, story, gallery, journal teaser)
- Menu search, category + **dietary filters**, allergen note, printable menu
- Pickup bag with **localStorage persistence** and accessible qty controls
- Visit page with **live open status**, closes-soon cues, weekly hours table, map
- Events with RSVP interest + **private hire** packages and inquiry form
- FAQ, Gift cards, Wholesale, About timeline / sourcing
- Markdown journal (`content/blog/en` + `content/blog/fa`)
- Contact / order / newsletter Nitro APIs (Resend-ready, demo logging without a key)
- SEO: JSON-LD, sitemap, i18n `baseUrl`
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
| `npm run lint` | ESLint |
| `npm run preview` | Preview build |

## Environment

| Variable | Purpose |
|---|---|
| `NUXT_PUBLIC_SITE_URL` | Canonical site URL (i18n SEO, sitemap, JSON-LD) |
| `NUXT_CONTACT_INBOX` | Contact & order inbox |
| `NUXT_RESEND_API_KEY` | Resend key (empty = demo mode logging) |
| `NUXT_MAIL_FROM` | Verified sender |

## Structure notes

- App code lives under `app/` (Nuxt 4)
- Café content: `app/data/menu.ts`, `app/types/cafe.ts`
- Locale files: `i18n/locales/en.json`, `i18n/locales/fa.json`
- Blog markdown: `content/blog/{en,fa}/*.md`

## GitHub

Remote: `selengr/nuxt4-solace-coffee`

## License

MIT

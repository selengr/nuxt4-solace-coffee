# Solace Coffee

A production-shaped specialty café website built with **Nuxt 4**, Vue 3, TypeScript, Tailwind CSS, Nitro APIs, Resend email, and bilingual **EN / FA**.

## Features

- Multi-page café site: Home · Menu · About · Visit · Contact · Order · **Events**
- Open-now status from structured hours
- Pickup cart + toast feedback
- Menu category filters with add-to-order
- Contact + events inquiry APIs (Resend or demo log)
- Google Maps embed + LocalBusiness JSON-LD
- Sitemap + robots
- i18n English / فارسی (RTL)
- `@nuxt/image`, ESLint, GitHub Actions CI, Vercel headers

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
| `NUXT_PUBLIC_SITE_URL` | Canonical site URL (sitemap / JSON-LD) |
| `NUXT_CONTACT_INBOX` | Contact & order inbox |
| `NUXT_RESEND_API_KEY` | Resend key (empty = demo mode) |
| `NUXT_MAIL_FROM` | Verified sender |

## GitHub

Prefer renaming the remote repository to **`solace-coffee`**.

## License

MIT

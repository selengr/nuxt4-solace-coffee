# Solace Coffee

A production-shaped specialty café website built with **Nuxt 4**, Vue 3, TypeScript, Tailwind CSS, Nitro APIs, Resend email, and bilingual **EN / FA**.

Demo brand: **Solace** — quiet specialty coffee in Seattle.

## Features

- Multi-page café site: Home · Menu · About · Visit · Contact · **Order**
- Full-bleed landing with values, story, gallery, and visit CTA
- Pickup ordering cart (`useCart`) + `POST /api/order`
- Contact form + `POST /api/contact` with **Resend** (demo log fallback)
- Embedded Google Maps on Visit
- i18n English / فارسی with RTL support (Vazirmatn)
- Typed content model + composables
- Tailwind design tokens

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) · فارسی: [/fa](http://localhost:3000/fa)

## Environment

| Variable | Purpose |
|---|---|
| `NUXT_CONTACT_INBOX` | Where contact/orders are sent |
| `NUXT_RESEND_API_KEY` | Resend API key (empty = demo mode) |
| `NUXT_MAIL_FROM` | Verified sender address |

## Customize

| Goal | Where |
|---|---|
| Café name, hours, menu | `app/data/menu.ts` |
| Colors | `tailwind.config.ts` |
| Translations | `i18n/locales/en.json`, `fa.json` |
| Photos | Home/about components |

## GitHub name

Rename the remote repo to **`solace-coffee`** — clearer and more professional than a “starter” label.

## License

MIT

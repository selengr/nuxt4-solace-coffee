# Solace Coffee

A production-shaped specialty café website built with **Nuxt 4**, Vue 3, TypeScript, Tailwind CSS, and a Nitro contact API.

Demo brand: **Solace** — quiet specialty coffee in Seattle. Fork it, rebrand it, or use it as a client-ready café site.

## Why this project

Not a bare folder demo. It includes:

- Polished multi-page café experience (Home, Menu, About, Visit, Contact)
- Full-bleed hero, featured menu, values, story, gallery, and visit CTA
- Typed content model + `useCafe()` composable
- Tailwind design tokens (Solace palette + Fraunces / Sora)
- Validated contact form with `POST /api/contact`
- SEO meta, page transitions, responsive layout
- Clear structure you can hand to a client or keep as a portfolio piece

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize

| Goal | Where |
|---|---|
| Café name, hours, menu | `app/data/menu.ts` |
| Colors & type | `tailwind.config.ts` + `app/assets/css/main.css` |
| Contact inbox | `.env` → `NUXT_CONTACT_INBOX` |
| Photos | Replace Unsplash URLs in home/about components |
| Map | `app/pages/visit.vue` |

Copy `.env.example` to `.env` for local contact config.

## Structure

```text
app/
  components/
    contact/     Contact form
    home/        Landing sections
    layout/      Header & footer
    ui/          BaseButton
  composables/   useCafe()
  data/          Café content
  pages/         Routes
  types/         Shared types
server/
  api/           contact.post.ts
```

## Contact API

`POST /api/contact` accepts `{ name, email, message }`, validates input, and logs the payload (demo mode). Wire `console.info` in `server/api/contact.post.ts` to Resend, Nodemailer, or a CRM webhook for production.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run generate` | Static generation |

## Suggested GitHub name

Rename the remote repository to **`solace-coffee`** so the project reads as a brand product, not a tutorial starter.

## License

MIT

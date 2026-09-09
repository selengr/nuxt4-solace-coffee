# Northroom — Nuxt 4 Café Starter

A modern specialty-café website boilerplate built with **Nuxt 4**, Vue 3, and TypeScript.

Demo brand: **Northroom**. Swap the name, menu, and photos to ship your own café site — or keep it as a clean Nuxt structure reference.

## What’s included

- Full-bleed homepage (hero, featured menu, story, visit CTA)
- Pages: Home · Menu · About · Visit
- Typed café data + `useCafe()` composable
- Layout shell with sticky header and footer
- Design tokens (CSS variables) + expressive typography
- Nuxt 4 `app/` directory best-practice layout

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```text
app/
  assets/css/        # Global tokens & base styles
  components/
    home/            # Homepage sections
    layout/          # Header & footer
    ui/              # Reusable UI (BaseButton)
  composables/       # useCafe()
  data/              # Café info & menu content
  layouts/           # default layout
  pages/             # File-based routes
  types/             # Shared TypeScript types
nuxt.config.ts
```

## Customize

1. Edit `app/data/menu.ts` — café name, hours, menu items  
2. Update colors/fonts in `app/assets/css/main.css`  
3. Replace Unsplash images with your own in `public/` or a CDN  
4. Drop a map embed into `app/pages/visit.vue`

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run generate` | Static site generation |

## Stack

- [Nuxt 4](https://nuxt.com)
- Vue 3 + Vue Router
- TypeScript
- Plain CSS with design tokens (no UI framework lock-in)

## License

MIT — use it for client work, demos, or your own café brand.

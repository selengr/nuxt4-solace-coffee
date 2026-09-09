// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Northroom — Specialty Coffee',
      meta: [
        {
          name: 'description',
          content:
            'A modern Nuxt 4 café boilerplate — specialty coffee, clean structure, and production-ready patterns.',
        },
        { name: 'theme-color', content: '#1a1714' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Sora:wght@300;400;500;600&display=swap',
        },
      ],
    },
  },
})

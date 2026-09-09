// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4,
  },
  modules: ['@nuxtjs/tailwindcss'],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  runtimeConfig: {
    contactInbox: process.env.NUXT_CONTACT_INBOX || 'hello@solace.coffee',
    public: {
      siteName: 'Solace',
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Solace — Specialty Coffee',
      meta: [
        {
          name: 'description',
          content:
            'Solace is a specialty café experience — quiet mornings, dialed espresso, and a production-ready Nuxt 4 website.',
        },
        { name: 'theme-color', content: '#14110f' },
        { property: 'og:title', content: 'Solace — Specialty Coffee' },
        {
          property: 'og:description',
          content: 'Quiet specialty coffee for people who linger.',
        },
        { property: 'og:type', content: 'website' },
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

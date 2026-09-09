// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxtjs/sitemap',
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
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
          href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Sora:wght@300;400;500;600&family=Vazirmatn:wght@300;400;500;600&display=swap',
        },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://solace.coffee',
    name: 'Solace Coffee',
  },
  runtimeConfig: {
    contactInbox: process.env.NUXT_CONTACT_INBOX || 'hello@solace.coffee',
    resendApiKey: process.env.NUXT_RESEND_API_KEY || '',
    mailFrom: process.env.NUXT_MAIL_FROM || 'Solace Coffee <onboarding@resend.dev>',
    public: {
      siteName: 'Solace',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://solace.coffee',
    },
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-07-15',
  eslint: {
    config: {
      stylistic: true,
    },
  },
  i18n: {
    locales: [
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        file: 'en.json',
        dir: 'ltr',
      },
      {
        code: 'fa',
        language: 'fa-IR',
        name: 'فارسی',
        file: 'fa.json',
        dir: 'rtl',
      },
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'locales',
    strategy: 'prefix_except_default',
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://solace.coffee',
    detectBrowserLanguage: {
      cookieKey: 'solace_lang',
      redirectOn: 'root',
      useCookie: true,
    },
  },
  image: {
    domains: ['images.unsplash.com'],
    quality: 80,
  },
  sitemap: {
    autoLastmod: true,
  },
})

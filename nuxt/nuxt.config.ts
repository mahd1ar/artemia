// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true
  },
  devServer: {
    port: 5175
  },
  nitro: {
    // port: 5175

  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_API_URL,
      frontendUrl: process.env.FRONTENDURL
    }
  },
  app: {
    head: {
      link: [{
        href: 'https://cdn.jsdelivr.net/gh/rastikerdar/samim-font@v4.0.5/dist/font-face.css',
        rel: 'stylesheet',
        type: 'text/css'
      },
      { rel: 'icon', type: 'image/png', href: '/LOGO-FINAL-150x150.png', sizes: '32x32' },
      { rel: 'icon', type: 'image/png', href: '/LOGO-FINAL-300x300.png', sizes: '192x192' }
      ]

    },
    layoutTransition: {
      name: 'home',
      mode: 'out-in' // default
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/device',
    '@nuxtjs/i18n',
    '@nuxtjs/apollo',
    '@pinia/nuxt'
  ],
  i18n: {
    locales: [
      { code: 'fa', iso: 'fa-IR', dir: 'rtl', file: 'fa.js' },
      { code: 'en', iso: 'en-US', dir: 'ltr', file: 'en.js' }
    ],
    defaultLocale: 'en',
    langDir: 'i18n/'
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.scss'
  },
  apollo: {
    clients: {
      default: 'apollo-client.ts'
    }
  },
  build: {
    transpile: ['graphql']
  }
})

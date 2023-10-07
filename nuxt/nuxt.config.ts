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
      }]
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

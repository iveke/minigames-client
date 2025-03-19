// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-03-08',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  ssr: true,
  pinia: {
    storesDirs: ['./stores/**'],
  },
  typescript: {
    strict: false
  },
  imports: {
    dirs: [
     'utils/**'
    ]
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'GMini',
      titleTemplate: '%s | GMini',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },

  },
})
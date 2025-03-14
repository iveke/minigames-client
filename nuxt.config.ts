// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-03-08',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  typescript: {
    strict: false
  },

  css: ['~/assets/css/main.css'],
})
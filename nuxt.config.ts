// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-03-08',
    ssr: true,
    devtools: {enabled: true},
    typescript: {
        strict: false
    },
    modules: ['@pinia/nuxt', '@nuxt/test-utils'],
    css: ['~/assets/css/main.css'],

    pinia: {
        storesDirs: ['./stores/**'],
    },
    typescript: {
        strict: false
    },
    imports: {
        dirs: [
            'utils/**',
            'components/**',
            'composables/**',
        ]
    },
    css: ['~/assets/css/main.css'],
    app: {
        head: {
            title: 'GMini',
            titleTemplate: '%s | GMini',
            link: [
                {rel: 'icon', type: 'image/x-icon', href: '/favicon.svg'}
            ]
        },

    },
})
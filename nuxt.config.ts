// https://nuxt.com/docs/api/configuration/nuxt-config
import {process} from "std-env";

export default defineNuxtConfig({
    compatibilityDate: '2025-03-08',
    ssr: true,
    devtools: {enabled: true},
    typescript: {
        strict: false
    },
    modules: ['@pinia/nuxt', '@nuxt/test-utils', '@nuxtjs/i18n'],
    css: ['~/assets/css/main.css'],

    pinia: {
        storesDirs: ['./stores/**'],
    },
    imports: {
        dirs: [
            'utils/**',
            'components/**',
            'composables/**',
        ]
    },
    app: {
        head: {
            title: 'GMini',
            titleTemplate: '%s | GMini',
            link: [
                {rel: 'icon', type: 'image/x-icon', href: '/favicon.svg'}
            ]
        },

    },
    // nitro: {
    //     devProxy: {
    //         '/api': {
    //             target: 'https://minigames-back.onrender.com',
    //             changeOrigin: true,
    //             prependPath: false
    //         }
    //     }
    // },
    runtimeConfig: {
        public: {
            // API_URL: '/api',
            API_URL: process.env.API_BASE,
        }
    },
})
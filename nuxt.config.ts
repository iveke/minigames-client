// https://nuxt.com/docs/api/configuration/nuxt-config
import {process} from "std-env";

export default defineNuxtConfig({
    compatibilityDate: '2025-03-08',
    ssr: true,
    devtools: {enabled: true},
    typescript: {
        strict: false
    },
    modules: [
      '@pinia/nuxt',
      '@nuxt/test-utils',
      '@nuxtjs/i18n',
      '@vee-validate/nuxt',
      '@nuxt/icon',
    ],
    css: [
        '~/assets/css/main.css',
        '~/assets/css/inputFields.css',
        '~/assets/css/typography.css',
    ],

    pinia: {
        storesDirs: ['./stores/**'],
    },
    veeValidate: {
        autoImports: true,
        // Use different names for components
        componentNames: {
            Form: 'VeeForm',
            Field: 'VeeField',
            FieldArray: 'VeeFieldArray',
            ErrorMessage: 'VeeErrorMessage',
        },
    },
    // i18n: {
    //     // locales: [
    //     //     { code: 'uk', iso: 'uk-UA', file: 'uk.json', name: 'Українська' },
    //     //     { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
    //     // ],
    //     // defaultLocale: 'uk',
    //     // langDir: 'locales/',
    //     // strategy: 'prefix_except_default',
    //     // bundle: {
    //     //     optimizeTranslationDirective: false,
    //     // },
    // },
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
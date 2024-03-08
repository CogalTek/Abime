// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: [
        '~/assets/css/main.css'
    ],
    plugins: [
        '~/plugins/pocketbase.js',
        { src: '~/plugins/bootstrap.js', mode: 'client' }
    ],
    app: {
        head: {
            htmlAttrs: {
                lang: 'fr',
            },
        }
    },
    runtimeConfig: {
        public: {
            pocketbaseIp: process.env.NUXT_PUBLIC_POCKETBASE_IP
        }
    }
})

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
        // Keys within public, will be also exposed to the client-side
        public: {
            pocketbaseIp: ''
        }
    }
})

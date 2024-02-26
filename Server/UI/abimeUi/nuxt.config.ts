// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css'
  ],
  plugins: [
    '~/plugins/pocketbase.js',
    { src: '~/plugins/bootstrap.js', mode: 'client' }
  ]
})

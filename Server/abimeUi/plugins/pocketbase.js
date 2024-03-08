// plugins/pocketbase.js
import PocketBase from 'pocketbase';

export default defineNuxtPlugin((nuxtApp) => {
    const runtimeConfig = useRuntimeConfig()

    const pb = new PocketBase(runtimeConfig.public.pocketbaseIp);
    nuxtApp.provide('pb', pb);
});

// plugins/pocketbase.js
import PocketBase from 'pocketbase';

export default defineNuxtPlugin((nuxtApp) => {
    const pb = new PocketBase('http://mathieu-rio.fr:8090');
    nuxtApp.provide('pb', pb);
});
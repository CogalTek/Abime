// plugins/pocketbase.js
import PocketBase from 'pocketbase';

export default defineNuxtPlugin((nuxtApp) => {
    const pb = new PocketBase('http://mathieu-rio.fr:8090'); // A fixer
    nuxtApp.provide('pb', pb);
});

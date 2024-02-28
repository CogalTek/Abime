<!-- Affichage de tout les utilisateur enregistrer -->

<template>
    <div class="card userListWidget shadow rounded m-3" style="width: 25%; height: 20rem;">
        <div class="card-header">
            Gestionnaire d'accès
        </div>
        <div class="card-body" style="overflow-y: scroll">
            <userFicheComponent v-for="user in record" :name="user.username" :admin="user.admin" :edit="admin"/>
        </div>
        <div class="card-footer">
            <button class="btn btn-outline-primary w-100">Crée une nouvelle clée</button>
        </div>
    </div>
</template>

<style>
</style>

<script setup>
    import userFicheComponent from './userFicheComponent.vue';
    import { useNuxtApp } from '#app';

    const nuxtApp = useNuxtApp();
    const pb = ref({});
    const record = ref({});
    const admin = ref(false);

    // Chargement de resource au chargement de la page, permet de ne pas avoir d'erreur de sync
    onMounted(async () => {
        try {
            pb.value = nuxtApp.$pb;
            if (!pb.value.authStore.isValid)
                router.push('/');
            record.value = await pb.value.collection('users').getFullList();
            admin.value = pb.value.authStore.model.admin;
        } catch (error) {
            console.error("Erreur durant le chargement des données.", error);
        } finally {
        }
    });
</script>
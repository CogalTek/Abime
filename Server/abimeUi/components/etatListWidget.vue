<!-- Affichage de tout les utilisateur enregistrer -->

<template>
    <createDocWidget v-if="creating" @close="editCreating" />
    <div class="card etatListWidget shadow rounded m-3" style="width: 69%; height: 33rem;">
        <div class="card-header">
            Gestionnaire de resource
        </div>
        <div class="card-body">
            <etatFicheComponent v-for="user in record" :name="user.etat_name" :edit="admin"/>
        </div>
        <div class="card-footer">
            <button @click="editCreating" :disabled="!admin" class="btn btn-outline-primary">Ajouter une nouvelle documentation</button>
        </div>
    </div>
</template>

<style>
    .etatListWidget {
        overflow-y: scroll;
    }
</style>

<script setup>
    import etatFicheComponent from './etatFicheComponent.vue';
    import createDocWidget from './createDocWidget.vue';
    import { useNuxtApp } from '#app';

    const nuxtApp = useNuxtApp();
    const pb = ref({});
    const record = ref({});
    const creating = ref(false);
    const admin = ref(false);

    const editCreating = () => {
        creating.value = !creating.value;
        console.log("new value " + creating.value)
    }

    // Chargement de resource au chargement de la page, permet de ne pas avoir d'erreur de sync
    onMounted(async () => {
        try {
            pb.value = nuxtApp.$pb;
            if (!pb.value.authStore.isValid)
                router.push('/');
            record.value = await pb.value.collection('Documentation').getFullList();
            admin.value = pb.value.authStore.model.admin;
        } catch (error) {
            console.error("Erreur durant le chargement des données.", error);
        } finally {
        }
    });
</script>
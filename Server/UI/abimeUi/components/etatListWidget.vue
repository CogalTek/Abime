<!-- Affichage de tout les utilisateur enregistrer -->

<template>
    <div class="card etatListWidget shadow rounded m-3" style="width: 69%; height: 33rem;">
        <div class="card-header">
            Gestionnaire de resource
        </div>
        <div class="card-body">
            <userFicheComponent v-for="user in tableTest" :name="user.name" :admin="user.admin"/>
        </div>
        <div class="card-footer">
            <button class="btn btn-outline-primary">Ajouter une nouvelle documentation</button>
        </div>
    </div>
</template>

<style>
    .etatListWidget {
        overflow-y: scroll;
    }
</style>

<script setup>
    import userFicheComponent from './userFicheComponent.vue';

    const tableTest = ref([
        {
            name: "BA11"
        },
        {
            name: "BA12"
        },
        {
            name: "BA13"
        },
        {
            name: "BA19"
        }
    ])
</script>
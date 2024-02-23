<!-- Affichage de tout les utilisateur enregistrer -->

<template>
    <div class="card userListWidget shadow rounded m-3" style="width: 25%; height: 20rem;">
        <div class="card-header">
            Gestionnaire d'accès
        </div>
        <div class="card-body" style="overflow-y: scroll">
            <userFicheComponent v-for="user in tableTest" :name="user.name" :admin="user.admin"/>
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

    const tableTest = ref([
        {
            name: "RRH Compte",
            admin: false
        },
        {
            name: "RRH Sup",
            admin: true
        },
        {
            name: "RH Compte",
            admin: false
        },
        {
            name: "autre",
            admin: false
        },
        {
            name: "RRH Compte",
            admin: false
        },
        {
            name: "RRH Sup",
            admin: true
        },
        {
            name: "RH Compte",
            admin: false
        },
        {
            name: "autre",
            admin: false
        },
        {
            name: "RRH Compte",
            admin: false
        },
        {
            name: "RRH Sup",
            admin: true
        },
        {
            name: "RH Compte",
            admin: false
        },
        {
            name: "autre",
            admin: false
        }
    ])
</script>
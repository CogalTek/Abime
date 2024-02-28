<template>
    <div @click="close" class="createDocWidgetBackground"></div>
    <div class="createDocWidget rounded shadow d-flex flex-column align-items-center justify-content-center p-3">
        <h2 class="mb-2">Creation d'une documentation</h2>
        <p style="text-align: center; color: red;">{{ message }}</p>
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Nom de l'état</span>
            <input v-model="etat_name" type="text" class="form-control" placeholder="ex: BA13-Liste des meilleurs employés" aria-label="Nom de l'etat" aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Documentation</span>
            <textarea v-model="etat_descrition" class="form-control" placeholder="ex: Il permet d'extraire la liste des meilleurs employés" aria-label="Input de documentation"></textarea>
        </div>
        <button @click="create" class="btn btn-outline-primary">Crée la documentation</button>
    </div>
</template>

<style>
    .createDocWidgetBackground {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0px;
        top: 0px;
        background-color: rgba(129, 129, 129, 0.542);
        z-index: 9;
    }
    .createDocWidget {
        right: 5%;
        height: 70%;
        width: 40%;
        background-color: rgb(255, 255, 255);
        position: fixed;
        z-index: 10;
        overflow-y: scroll;
    }
</style>

<script setup>
    import { defineEmits } from 'vue';

    const nuxtApp = useNuxtApp();
    const pb = ref({});
    const record = ref({});
    const emit = defineEmits(["close", "refresh"]);
    const etat_name = ref("");
    const etat_descrition = ref("");
    const message = ref("");

    const close = () => { // emet l'ordre de fermeture au parent
        emit('close');
    }

    const create = async () => { // creation d'une documentation
        if (!etat_name.value || !etat_descrition.value) { // Vérifie si l'un des champs est vide
            message.value = "Veuillez renseigner tous les champs.";
            return; // Sort de la fonction si un champ est vide
        }
        try {
            await pb.value.collection("Documentation").create({ etat_name: etat_name.value, description: etat_descrition.value }); // Assurez-vous que cette opération est asynchrone
            message.value = "Documentation créée et ajoutée.";
            emit('refresh');
            close(); // Ferme le widget après la création réussie
        } catch (e) {
            console.error(e);
            message.value = "Une erreur est survenue lors de la création de la documentation.";
        }
    };


    // Chargement de resource au chargement de la page, permet de ne pas avoir d'erreur de sync
    onMounted(async () => {
        try {
            pb.value = nuxtApp.$pb;
            if (!pb.value.authStore.isValid)
                router.push('/');
            record.value = await pb.value.collection('Documentation').getFullList();
        } catch (error) {
            console.error("Erreur durant le chargement des données.", error);
        } finally {
        }
    });
</script>
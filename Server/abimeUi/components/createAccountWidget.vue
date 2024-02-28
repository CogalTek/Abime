<template>
    <div @click="close" class="createAccountWidgetBackground"></div>
    <div class="createAccountWidget rounded shadow d-flex flex-column align-items-center justify-content-center p-3">
        <h2 class="mb-2">Creation d'un nouvelle accès</h2>
        <p style="text-align: center; color: red;">{{ message }}</p>
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Nom de l'accès</span>
            <input v-model="name" type="text" class="form-control" placeholder="ex: RRH, Administration, ..." aria-label="nom du compte" aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Mot de passe</span>
            <input v-model="password" type="text" class="form-control" placeholder="ex: PasswordPasSecurisé12" aria-label="Mot de passe" aria-describedby="basic-addon1">
            <button @click="generatePassword" class="input-group-btn btn btn-outline-dark">Générer une clée</button>
        </div>
        <div v-if="admin" class="form-check form-switch mb-3">
            <input v-model="isAdmin" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked">
            <label class="form-check-label" for="flexSwitchCheckChecked">Donner les privilèges d'administration</label>
        </div>
        <button @click="create" class="btn btn-outline-primary">Crée l'accès</button>
    </div>
</template>

<style>
    .createAccountWidgetBackground {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0px;
        top: 0px;
        background-color: rgba(129, 129, 129, 0.542);
        z-index: 9;
    }
    .createAccountWidget {
        right: 5%;
        height: 70%;
        width: 50%;
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
    const emit = defineEmits(["close"]);
    const name = ref("");
    const admin = ref(false);
    const isAdmin = ref(false);
    const password = ref("");
    const message = ref("");

    const close = () => { // emet l'ordre de fermeture au parent
        emit('close');
    }

    const create = async () => { // creation d'une documentation
        if (!name.value || !password.value) { // Vérifie si l'un des champs est vide
            message.value = "Veuillez renseigner tous les champs.";
            return; // Sort de la fonction si un champ est vide
        }
        try {
            await pb.value.collection("users").create({
                username: name.value,
                password: password.value,
                passwordConfirm: password.value,
                admin: isAdmin.value
            });
            message.value = "Accès créée et ajoutée.";
            close(); // Ferme le widget après la création réussie
        } catch (e) {
            console.error(e);
            message.value = "Une erreur est survenue lors de la création de l'accès.";
        }
    };

    const generatePassword = () => {
        password.value = (Math.random().toString(16) + '00000000000000000').slice(2, 15);
    }


    // Chargement de resource au chargement de la page, permet de ne pas avoir d'erreur de sync
    onMounted(async () => {
        try {
            pb.value = nuxtApp.$pb;
            if (!pb.value.authStore.isValid)
                router.push('/');
            admin.value = pb.value.authStore.model.admin;
        } catch (error) {
            console.error("Erreur durant le chargement des données.", error);
        } finally {
        }
    });
</script>
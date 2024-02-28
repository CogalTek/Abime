<template>
    <div @click="close" class="viewWidgetBackground"></div>
    <div class="viewWidget rounded shadow d-flex flex-column align-items-center justify-content-center">
        <div class="card-header w-100">
            {{ props.title }}
        </div>
        <div class="card-body" v-html="props.description">
        </div>
    </div>
</template>

<style>
    .viewWidgetBackground {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0px;
        top: 0px;
        background-color: rgba(129, 129, 129, 0.542);
        z-index: 9;
    }
    .viewWidget {
        top: 10%;
        right: 5%;
        height: 70%;
        width: 50%;
        background-color: rgb(255, 255, 255);
        position: fixed;
        z-index: 12;
        overflow-y: scroll;
    }
</style>

<script setup>
    import { defineEmits } from 'vue';

    const nuxtApp = useNuxtApp();
    const pb = ref({});
    const emit = defineEmits(["close", "refresh"]);
    const admin = ref(false);

    const close = () => { // emet l'ordre de fermeture au parent
        emit('close');
    }

    const props = defineProps({
        title: String,
        description: String
    });

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
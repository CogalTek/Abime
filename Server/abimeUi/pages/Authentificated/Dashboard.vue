<template>
    <Head>
      <Title>Dashboard AbimeUi</Title>
      <Meta name="description" content="Dashboard de AbimeUI permettant de crée des comptes et de la documentation"/>
    </Head>
    <!-- Navigation bar -->
    <div class="shadow m-3 p-3 d-flex align-items-center" style="height: 4rem;">
        <img @click="logout" src="/icon.jpeg" alt="icon abime" class="rounded cursor" style="height: 3rem;">
        <h1 style="color: rgb(201, 201, 201); font-family: Verdana, Geneva, Tahoma, sans-serif;" class="mt-1 mx-3">Dashboard</h1>
    </div>
    <div class="m-3 p-2 d-flex flex-lg-wrap">
        <userListWidget />
        <etatListWidget />
    </div>
</template>

<style>
    .cursor:hover {
        cursor: pointer;
    }
</style>

<script setup>
    import userListWidget from '~/components/userListWidget.vue';
    import etatListWidget from '~/components/etatListWidget.vue';
    import { useNuxtApp } from '#app';
    import { useRouter } from 'vue-router';

    const nuxtApp = useNuxtApp();
    const router = useRouter();
    const pb = ref({});

    // Chargement de resource au chargement de la page, permet de ne pas avoir d'erreur de sync
    onMounted(async () => {
        try {
            pb.value = nuxtApp.$pb;
            if (!pb.value.authStore.isValid)
                router.push('/');
        } catch (error) {
            console.error("Erreur durant le chargement des données.", error);
        } finally {
        }
    });

    const logout = () => { // deconnect et renvoie vers la page de connexion
        pb.value.authStore.clear();
        router.push('/');
    }

    // Définir un watcher pour observer les changements sur pb.value.authStore
    watch(() => pb.value.authStore, (newVal, oldVal) => {
        console.log("Le store auth a changé", newVal);
        // rediriger l'utilisateur si authStore.isValid devient false
        if (!newVal.isValid) {
            router.push('/');
        }
    }, {
        deep: true // verification en profondeur
    });
</script>
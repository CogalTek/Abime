<template>
    <div class="userFicheComponent cursor d-flex align-items-center justify-content-center rounded mb-1" style="height: 2em;">
        <p class="w-100 mt-3 mx-2"><span style="color: red;">{{ props.admin ? "A - " : ""}}</span>{{ props.name }}</p>
        <div class="w-100 d-flex flex-row-reverse" style="overflow-y: hidden">
            <img style="height: 50%;" class="mx-1" src="/eye.svg" alt="voir les informations">
            <img v-if="props.edit" @click="deleteItem" style="height: 50%;" class="mx-1" src="/trash.svg" alt="supprimer">
        </div>
    </div>
</template>

<style>
    .userFicheComponent img {
        opacity: 0;
        transition: opacity 0.1s;
    }
    .userFicheComponent img:hover {
        border: 1px solid rgb(201, 201, 201);
        border-radius: 7px;
    }
    .userFicheComponent:hover img {
        opacity: 1;
    }
    .userFicheComponent:hover {
        background-color: rgb(240, 240, 240);
    }
    .userFicheComponent {
        overflow-y: hidden;
        overflow-x: hidden;
    }
    .cursor:hover {
        cursor: pointer;
    }
</style>

<script setup>

    import { useNuxtApp } from '#app';

    const nuxtApp = useNuxtApp();
    const pb = ref({});

    const props = defineProps({
        id: String,
        name: String,
        admin: Boolean,
        edit: Boolean
    });

    const emit = defineEmits(["refresh"]);

    const deleteItem = async () => { // destruction d'un compte si la personne est admin
        try {
            if (confirm(`Vous allez supprimer le compte "${props.name}", cela supprimera l'accès à toute personne utilisant ce compte, êtes vous sûr de vouloir faire ça ?`))
                await pb.value.collection('users').delete(props.id);
        } catch (e) {
            console.error(e);
        } finally {
            emit('refresh');
        }
    }

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

</script>

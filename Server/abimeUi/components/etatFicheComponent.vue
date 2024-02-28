<template>
    <div class="userFicheComponent cursor d-flex">
        <p class="w-100">{{ props.name }}</p>
        <div class="w-100 d-flex flex-row-reverse" style="overflow-y: hidden">
            <img style="height: 50%;" class="mx-1" src="/eye.svg" alt="voir les informations">
            <img style="height: 50%;" class="mx-1" src="/trash.svg" alt="supprimer">
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
    .cursor:hover {
        cursor: pointer;
    }
</style>

<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        name: String,
        admin: Boolean
    });
</script>

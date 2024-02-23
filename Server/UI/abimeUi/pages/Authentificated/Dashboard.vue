<template>
    <!-- Navigation bar -->
    <div class="shadow m-3 p-3 d-flex align-items-center" style="height: 4rem;">
        <img src="/icon.jpeg" alt="icon abime" class="rounded cursor" style="height: 3rem;">
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
</script>
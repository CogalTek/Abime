<template>
    <div class="d-flex flex-column justify-content-center align-items-center">
        <div class="shadow card d-flex align-items-center justify-content-center p-3" style="width: 18rem; margin-top: 8rem;">
            <img src="/icon.jpeg" class="card-img-top" alt="icon abime" style="height: 4rem; width: 4rem; border-radius: 7px;">
            <div class="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 class="card-title">Abime<span style="color: blueviolet;" >U</span><span style="color: rgb(226, 43, 211);">i</span></h5>
                <p class="my-2" style="font-family: monospace; color: red; text-align: center;">{{ message }}</p>
                <div class="input-group flex-nowrap mx-3 my-3">
                    <input v-model="username" type="text" class="form-control" placeholder="Identifiant" aria-label="Username" aria-describedby="addon-wrapping">
                </div>
                <div class="input-group flex-nowrap mx-3 my-3 mb-3">
                    <input v-model="password" type="password" class="form-control" placeholder="Mots de passe" aria-label="Password" aria-describedby="addon-wrapping">
                </div>

                <div class="d-flex justify-content-end">
                    <button @click="connect" href="#" class="btn btn-outline-dark mt-3">Connexion</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useNuxtApp } from '#app';
    import { useRouter } from 'vue-router';

    const nuxtApp = useNuxtApp();
    const router = useRouter();
    const pb = ref({});
    const username = ref("");
    const password = ref("");
    const message = ref("");

    // Chargement de resource au chargement de la page, permet de ne pas avoir d'erreur de sync
    onMounted(async () => {
        try {
            pb.value = nuxtApp.$pb;
        } catch (error) {
            console.error("Erreur durant le chargement des données.", error);
        } finally {
        }
    });

    // Fonction de connexion, elle affiche un message d'erreur entre le logo et les inputs si une erreur survient
    const connect = async () => {
        try {
            const authData = await pb.value.collection('users').authWithPassword( // envoie de la requete à L'api
                username.value,
                password.value,
            );
        } catch (e) { // si une erreur survient
            console.error("Erreur durant la connexion", e);
            message.value = "Une erreur est survenue."
        } finally {
            if (pb.value.authStore.isValid) // si la connexion à reussi
                navigateToDashboard();
            else // sinon on modifie le texte d'erreur
                message.value = "Identifiant ou mot de passe incorrect."
        }
    }

    // Navigue vers la page Dashboard
    const navigateToDashboard = () => {
        router.push('/Authentificated/Dashboard');
    };
</script>

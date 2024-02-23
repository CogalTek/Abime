<template>
    <div class="d-flex flex-column justify-content-center align-items-center">
        <div class="shadow card d-flex align-items-center justify-content-center p-3" style="width: 18rem; margin-top: 8rem;">
            <img src="/icon.jpeg" class="card-img-top" alt="icon abime" style="height: 4rem; width: 4rem; border-radius: 7px;">
            <div class="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 class="card-title">Abime<span style="color: blueviolet;" >U</span><span style="color: rgb(226, 43, 211);">i</span></h5>

                <div class="input-group flex-nowrap mx-3 my-3">
                    <input type="text" class="form-control" placeholder="Identifiant" aria-label="Username" aria-describedby="addon-wrapping">
                </div>
                <div class="input-group flex-nowrap mx-3 my-3 mb-3">
                    <input type="password" class="form-control" placeholder="Mots de passe" aria-label="Password" aria-describedby="addon-wrapping">
                </div>

                <div class="d-flex justify-content-end">
                    <button @click="navigateToDashboard" href="#" class="btn btn-outline-dark mt-3">Connexion</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const navigateToDashboard = () => {
        router.push('/Authentificated/Dashboard');
    };
</script>
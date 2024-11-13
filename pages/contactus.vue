<template>
    <NuxtLayout :name="navbarLayout">
        <h1 class="w-50 h-50">NO CONTENT YET :D</h1>
    </NuxtLayout>
    <NuxtLayout name="footer"></NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const navbarLayout = ref('');

onMounted(() => {
    const userType = route.query.userType;
    if (userType === 'Auctioneer') {
        navbarLayout.value = 'auctioneernavbar';
    } else {
        navbarLayout.value = 'biddernavbar';
    }
});
</script>

<style scoped></style>
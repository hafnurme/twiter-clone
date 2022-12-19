<template>
    <div class="h-full">
        <MainSection title="Home" :isLoading="isLoading">
            This is our Home page
        </MainSection>
    </div>
</template>

<script setup>
const isLoading = ref(false)
</script>
<template>
    <div class="h-full">
        <MainSection title="Home" :isLoading="isLoading">
            <TweetsForm :user="user" />
        </MainSection>
    </div>
</template>

<script setup>
const isLoading = ref(false)
const { useAuthUser } = useAuth()
const user = useAuthUser().value
</script>
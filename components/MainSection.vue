<template>
    <div class="h-full flex flex-col border-y-0" :class="twitterBorder">
        <div class="sticky top-0 p-4 bg-light-100 backdrop-blur-md dark:bg-dim-900/70">
            <h2 class="text-xl font-bold text-gray-900 backdrop-blur-md dark:text-light-100">{{ title }}</h2>
        </div>
        <div v-if="isLoading" class="flex-1 grid place-items-center">
            <UISpinner />
        </div>
        <div v-else>
            <slot />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    isLoading: {
        type: Boolean,
        required: true
    }
})
</script>
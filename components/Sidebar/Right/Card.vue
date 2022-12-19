<template>
    <div class="my-3 bg-gray-100 dark:(text-white bg-dim-700) rounded-2xl" :class="twitterBorder">

        <h1 class="p-3">{{ title }}</h1>

        <div class="border-t dark:border-gray-700">
            <slot />
        </div>

        <div class="p-3 text-sm text-blue-400 cursor-pointer rounded-b-2xl hover:(bg-gray-200 dark:bg-gray-600 )"
            :class="transition">
            Learn More
        </div>

    </div>
</template>

<script setup>

import { twitterBorder, transition } from '~~/composables/useStyle';
const props = defineProps({
    title: {
        type: String,
        default: "None"
    }
})
</script>
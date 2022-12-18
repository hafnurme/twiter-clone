<template>
    <nuxt-link to="#"
        class="flex w-min xl:w-full items-center p-3 rounded-full  hover:bg-gray-200 dark:text-white dark:hover:bg-blue-gray-600 mb-2"
        :class="transition">

        <div class="w-6 h-6">
            <slot name="icon" />
        </div>

        <div class="text-lg hidden xl:block mx-3" :class="tabActive">
            <slot name="name" />
        </div>

    </nuxt-link>
</template>

<script setup>
import { transition } from '@/composables/useStyle.js'
const props = defineProps({
    active: {
        type: Boolean,
        default: false
    }
})

const tabActive = computed(() => props.active ? 'font-semibold' : 'font-normal')
</script>
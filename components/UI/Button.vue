<template>


    <button class="px-4 py-2 bg-black text-white rounded-xl  w-full my-4 dark:(text-black bg-light-200)">{{ text
    }}</button>


</template>

<script setup>
const props = defineProps({
    text: {
        type: String
    }
})
</script>
<template>
    <div class="mb-2 dark:(text-light-200)">
        <label for="input" class="block m-2" v-if="label">{{ label }}</label>
        <input :value="modelValue" :type="type" id="input" :placeholder="placeholder"
            class="border-2 px-4 py-2 w-full rounded-lg focus:( border-2 border-dim-50 outline-none) dark:(bg-gray-600 outline-2 border-gray-600 placeholder-gray-300)"
            @input="event => emits('update:modelValue', event.target.value)" ref="input">
    </div>
</template>

<script setup>
const props = defineProps({
    placeholder: {
        type: String,

    },
    label: {
        type: String,

    },
    type: {
        type: String,

    },
    modelValue: {
        type: String,
    }
})

const emits = defineEmits(['update:modelValue'])

const input = ref(null)
onUnmounted(() => {
    input.value.value = ''
})
</script>
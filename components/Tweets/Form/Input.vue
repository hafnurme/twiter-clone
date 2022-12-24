<template>
    <form class="flex" @submit.prevent="handleSubmit">
        <div class="w-11 h-11 bg-gray-200 overflow-hidden rounded-full mr-4">
            <img :src="profilePict" alt="profilepicture">
        </div>
        <div class=" flex-1">
            <textarea class="resize-none w-full outline-none text-lg p-2 rounded-lg border text-sm"
                placeholder="What's Happening" v-model="text" required name="text"></textarea>
            <div class="max-h-[300px] mt-2 overflow-hidden relative inline-block border rounded-md"
                v-if="inputImageUrl">

                <button class="w-6 h-6 bg-gray-200 border rounded-full absolute right-1 top-1"
                    @click.prevent="handleResetInputImage">&cross;
                </button>

                <img :src="inputImageUrl" alt="image" class="max-h-[200px] max-w[520] rounded-md">

            </div>
            <div class="flex items-center justify-between gap-2 mt-2">
                <div>
                    <UIImageUploadButton />
                    <input type="file" hidden id="image" name="image" accept="image/png, image/jpeg"
                        @change="handleImageChange" ref="input">
                </div>
                <button class="bg-dim-50 text-white rounded-full px-3 py-1">Tweet</button>
            </div>
        </div>
    </form>
</template>

<script setup>
const props = defineProps({
    profilePict: {
        type: String
    }
})

const text = ref(null)
const inputImageUrl = ref(null)
const input = ref()

const emit = defineEmits(['onSubmit'])

const handleSubmit = (data) => {
    const tempForm = new FormData(data.target)

    // emit('onSubmit', tempForm)

    // data.target.reset()
}
const handleImageChange = (inputImage) => {
    const file = inputImage.target.files[0]

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = (event) => {
        inputImageUrl.value = event.target.result;
    }


}

const handleResetInputImage = () => {
    input.value.value = ''
    inputImageUrl.value = null
}
</script>
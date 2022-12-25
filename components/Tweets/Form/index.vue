<template>
    <div>
        <div class="border-b p-3">
            <TweetsFormInput @onSubmit="handleSubmit" :profilePict="user.profileImage" />
        </div>

        <Teleport to="body">
            <div class=" fixed top-0 bottom-0 right-0 left-0 z-40 bg-gray-600/20 grid place-items-center"
                v-if="loading">
                <div class="w-24 h-24 bg-white rounded-lg grid place-items-center" :class="twitterBorder">
                    <UISpinner />
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup>

const loading = ref(false)
const props = defineProps({
    user: {
        type: Object
    }
})

const { postTweet } = useTweets()

const handleSubmit = async (tweetData) => {
    loading.value = true
    console.log(loading.value)
    const text = tweetData.get('text')
    if (!text || text == null || text == '') {
        console.log('Canceled')
        return;
    }
    try {
        const response = await postTweet(tweetData);

        console.log(response)
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }

}
</script>
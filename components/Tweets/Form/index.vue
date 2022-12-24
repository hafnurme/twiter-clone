<template>
    <div>
        <div class="border-b p-4 pt-0">
            <TweetsFormInput @onSubmit="handleSubmit" :profilePict="user.profileImage" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    user: {
        type: Object
    }
})

const { postTweet } = useTweets()

const handleSubmit = async (tweetData) => {

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
    }

}
</script>
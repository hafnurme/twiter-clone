<template>
    <div class="p-5 box-border">
        <input type="text" name="search" id="search" class=" rounded-full border-2 px-2 py-1 outline-none w-full"
            placeholder="Search">

        <SidebarRightCard title="What's happening">
            <div v-for="whathappen in whathappens"
                class="px-3 py-2 border-b dark:border-gray-700 cursor-pointer hover:(bg-gray-200 dark:bg-gray-600)"
                :class="transition">
                <h4 class="text-sm font-semibold">{{ whathappen.title }}</h4>
                <h6 class="text-xs text-gray-400">{{ whathappen.count }} Tweets</h6>
            </div>
        </SidebarRightCard>

        <SidebarRightCard title="Who to follow">
            <div v-for="n in 3"
                class="p-3 flex justify-between items-center border-b dark:border-gray-700 hover:(bg-gray-200 dark:bg-gray-600)"
                :class="transition">
                <img :src="whotofollow.image" :alt="whotofollow.name" class="h-8 rounded-full">
                <div class="ml-3 flex-1 cursor-pointer">
                    <h4 class="text-sm font-semibold">{{ whotofollow.name }}</h4>
                    <h6 class="text-xs">{{ whotofollow.handle }}</h6>
                </div>
                <button
                    class="text-xs bg-dim-900 text-white rounded-full p-1 px-2 dark:(bg-white text-dim-900)">Follow</button>
            </div>
        </SidebarRightCard>

    </div>
</template>

<script setup>
const whathappens = [
    {
        title: "BlaBla1",
        count: "20k"
    },
    {
        title: "#Coding is not stressful",
        count: "12k"
    },
    {
        title: "MeatLee",
        count: "6k"
    },
]

const whotofollow =
{
    name: 'hafnurme',
    handle: '@kachanisme',
    image: 'https://picsum.photos/200'
}

</script>
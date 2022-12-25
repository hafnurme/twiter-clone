<template>
    <div class="flex flex-col h-screen xs:items-center xl:items-start p-1 md:p-3 sticky top-0">

        <div class="p-2 w-min rounded-full hover:bg-blue-100 dark:hover:bg-gray-600" :class="transition">
            <nuxt-link to="/">
                <div class="w-8 h-8">
                    <LogoTwiter />
                </div>
            </nuxt-link>
        </div>


        <div class="w-full">

            <SidebarLeftTab>
                <template v-slot:icon>
                    <HomeIcon />
                </template>
                <template v-slot:name>
                    Home
                </template>
            </SidebarLeftTab>

            <SidebarLeftTab>
                <template v-slot:icon>
                    <HashtagIcon />
                </template>
                <template v-slot:name>
                    Explore
                </template>
            </SidebarLeftTab>

            <SidebarLeftTab>
                <template v-slot:icon>
                    <BellIcon />
                </template>
                <template v-slot:name>
                    Notification
                </template>
            </SidebarLeftTab>

            <SidebarLeftTab>
                <template v-slot:icon>
                    <InboxIcon />
                </template>
                <template v-slot:name>
                    Messages
                </template>
            </SidebarLeftTab>

            <SidebarLeftTab>
                <template v-slot:icon>
                    <BookmarkIcon />
                </template>
                <template v-slot:name>
                    Bookmark
                </template>
            </SidebarLeftTab>

            <SidebarLeftTab>
                <template v-slot:icon>
                    <DocumentTextIcon />
                </template>
                <template v-slot:name>
                    List
                </template>
            </SidebarLeftTab>

            <SidebarLeftTab>
                <template v-slot:icon>
                    <UserIcon />
                </template>
                <template v-slot:name>
                    Profile
                </template>
            </SidebarLeftTab>

            <SidebarLeftTab>
                <template v-slot:icon>
                    <EllipsisHorizontalCircleIcon />
                </template>
                <template v-slot:name>
                    More
                </template>
            </SidebarLeftTab>

        </div>

    </div>
</template>

<script setup>
import { transition } from '@/composables/useStyle.js'
import { HomeIcon } from '@heroicons/vue/24/solid'
import { BellIcon, HashtagIcon, BookmarkIcon, DocumentTextIcon, InboxIcon, UserIcon, EllipsisHorizontalCircleIcon } from '@heroicons/vue/24/outline'
</script>
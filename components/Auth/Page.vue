<template>
    <div class="min-h-screen min-w-screen bg-gray-200 dark:(bg-dim-900)">
        <div class="max-w-[614px] h-screen mx-auto bg-light-300/80 backdrop-blur-md shadow-md dark:(bg-dim-200/80 shadow-gray-800) flex flex-col items-center justify-center"
            :class="twitterBorder">
            <div class="w-20">
                <LogoTwiter />
            </div>
            <AuthForm />


        </div>
    </div>
</template>

<script setup></script>
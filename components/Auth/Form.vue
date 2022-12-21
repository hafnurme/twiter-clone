<template>
    <div class="w-[75%]">
        <UIInput placeholder="@username" label="Username" type="text" v-model="authData.username" />
        <UIInput placeholder="*********" label="Password" type="password" v-model="authData.password" />
        <div class="w-full">
            <UIButton text="Login" @click="handleClick" />
        </div>
        <div class="flex items-center">
            <hr class="flex-1 border-gray-400">
            <span class="mx-2 dark:text-white">or</span>
            <hr class="flex-1 border-gray-400">
        </div>
        <div class="w-full">
            <UIButton text="Register" />
        </div>
    </div>
</template>

<script setup>
const { login } = useAuth()

const authData = ref({
    username: '',
    password: '',
    loading: false
})

const handleClick = async () => {
    authData.value.loading = true
    try {
        await login(authData.value)
    } catch (error) {
        console.log(error);
    } finally {
        authData.value.loading = false
    }

}

</script>
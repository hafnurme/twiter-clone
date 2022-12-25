<template>

  <div class="absolute top-0 right-0 bg-white">
    <button @click="theme = !theme">theme</button>
  </div>

  <div :class="{ 'dark': theme }">

    <div v-if="isLoading">
      <Loading />
    </div>

    <!-- App -->
    <div v-else-if="user" class="min-h-screen bg-white dark:bg-dim-900 app">

      <div class="flex w-screen xs:w-[614px] sm:w-min md:(max-w-7xl border-x) xl:(w-[1280px]) mx-auto relative">
        <!-- Left sidebar -->
        <aside class="xl:w-[250px]">
          <SidebarLeft />
        </aside>
        <!-- Main content -->
        <main class=" w-full xs:w-[614px] xl:w-[610px]">
          <RouterView />
        </main>

        <!-- right sidebar -->
        <aside class="xl:(px-5 flex-1) w-[300px] hidden md:(block px-5)">
          <SidebarRight />
        </aside>
      </div>
    </div>



    <AuthPage v-else />

  </div>

</template>

<style>
* {
  scrollbar-width: none;
}
</style>

<script setup>
const theme = ref(false)
const { useAuthUser, initAuth, useAuthLoading } = useAuth()
const user = useAuthUser()
const isLoading = useAuthLoading()

onBeforeMount(() => {
  initAuth()
})
</script>

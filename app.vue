<template>

  <div class="absolute top-0 right-0 bg-white">
    <button @click="theme = !theme">theme</button>
  </div>

  <div :class="{ 'dark': theme }">

    <!-- App -->
    <div v-if="user" class=" min-h-screen bg-white dark:bg-dim-900 ">

      <div class=" flex w-min md:max-w-[1280px] mx-auto">
        <!-- Left sidebar -->
        <aside class="xl:w-[20%] max-w-[220px] px-2 xl:px-5">
          <SidebarLeft />
        </aside>

        <!-- Main content -->
        <main class="min-w-[614px]">
          <RouterView />
        </main>

        <!-- right sidebar -->
        <aside class="xl:(px-5) xl:w-[400px] w-[300px] hidden md:(block px-3)">
          <SidebarRight />
        </aside>
      </div>
    </div>

    <AuthPage v-else />

  </div>

</template>

<script setup>
const theme = ref(false)
const { useAuthUser, initAuth } = useAuth()
const user = useAuthUser()

onBeforeMount(() => {
  initAuth()
})
</script>

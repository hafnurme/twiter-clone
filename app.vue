<template>

  <div class="absolute top-0 right-0 bg-white">
    <button @click="theme = !theme">theme</button>
  </div>
  <div :class="{ 'dark': theme }">


    <div class="min-h-screen bg-white dark:bg-dim-900">

      <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg-gap-5">

        <!-- Left sidebar -->
        <aside class="hidden md:block md:col-span-1 xl:col-span-2">
          <SidebarLeft />
        </aside>

        <!-- Main content -->
        <main class="h-screen col-span-12 md:col-span-8 xl:col-span-6 bg-dark-50">
          Main
        </main>

        <!-- right sidebar -->
        <aside class="hidden md:block md:col-span-3 xl:col-span-4">
          <SidebarRight />
        </aside>
      </div>

    </div>

  </div>

</template>

<script setup>
const theme = ref(false)
</script>

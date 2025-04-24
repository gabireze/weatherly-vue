<template>
  <div class="animate-pulse space-y-4 text-white mb-4">
    <div class="h-6 bg-white/20 rounded w-2/3 mx-auto"></div>
    <div class="h-20 bg-white/20 rounded-full w-20 mx-auto"></div>
    <div class="h-10 bg-white/20 rounded w-1/2 mx-auto"></div>
    <div class="grid grid-cols-2 gap-2 text-sm mt-4">
      <div
        v-for="i in 6"
        :key="i"
        class="h-4 bg-white/20 rounded col-span-1"
      ></div>
    </div>
  </div>
</template>

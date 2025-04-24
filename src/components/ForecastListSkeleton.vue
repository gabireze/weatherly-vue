<template>
  <div class="space-y-3">
    <div
      v-for="n in 5"
      :key="n"
      class="flex items-center justify-between animate-pulse"
    >
      <div class="h-4 w-16 bg-white/20 rounded"></div>
      <div class="h-6 w-6 bg-white/20 rounded-full"></div>
      <div class="h-4 w-14 bg-white/20 rounded"></div>
    </div>
  </div>
</template>

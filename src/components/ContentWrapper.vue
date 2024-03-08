<template>
  <div class="relative container w-11/12 mx-auto">
    <img
      v-if="theme === 1"
      class="absolute right-0 bottom-0 hidden lg:block translate-x-[90%] -translate-y-1/2 opacity-95"
      src="../assets/images/wrapperbg_rb.png"
      alt="background-image-birds"
    >
    <img
      v-if="theme === 1"
      class="absolute left-0 top-0 hidden lg:block -translate-x-[95%] translate-y-[85%] opacity-90"
      src="../assets/images/wrapperbg_lt.png"
      alt="background-image-birds"
    >
    
    <div
      class="relative p-4 md:p-8 xl:px-14 xl:py-10"
      :class="[contentClass, showShadow && 'shadow-lg xl:shadow-xl 2xl:shadow-2xl shadow-primary-dark/10']"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  showShadow: {
    type: Boolean,
    default: false,
  },
  contentClass: {
    type: String,
    default: ''
  },
  theme: {
    type: Number,
    default: 1
  },
})

</script>
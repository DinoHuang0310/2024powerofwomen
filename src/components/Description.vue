<template>
  <div class="relative w-11/12 max-w-3xl mx-auto mt-12 landscape:mt-0 md:landscape:mt-12">
    <div class="absolute w-full max-w-[540px] -top-4 left-1/2 -translate-x-1/2 -translate-y-full">
      <img class="landscape:hidden md:landscape:block" src="../assets/images/description_painting.png" alt="">
    </div>
    
    <div>
      <p
        v-for="str in description"
        :key="str.index"
        class="font-bold md:text-center tracking-wider 2xl:leading-6 mb-2 opacity-80"
      >
        {{ str }}
      </p>
    </div>
    <span class="absolute w-px h-7 sm:h-8 left-1/2 -bottom-3 sm:-bottom-5 bg-secondary translate-y-full" />
  </div>
</template>

<script setup>
const description = [
  '每個角落都有一群女性，有人天生殘缺、出身貧困；有人傷痕累累、困頓挫敗，卻在逆境中用微笑面對挑戰，讓難關變成淬煉內心的磨刀石。',
  '就如突破荊棘的百合花，在黑暗中綻開、迎向光芒。 她們是「逆轉女王」！'
]
</script>

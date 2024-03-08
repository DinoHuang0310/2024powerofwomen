<template>
  <div
    class="relative bg-contain bg-no-repeat bg-bottom"
    :class="isTheme2 ? 'my-[20vw] md:my-[6vw]' : 'overflow-hidden'"
    :style="isTheme2 ? null : {'background-image': `url(${cloudBottom})`}"
  >
    <div
      class="pb-[60%] sm:pb-[40%] lg:pb-[30%] 2xl:pb-[25%] bg-center bg-cover bg-scroll lg:bg-fixed"
      :class="[isTheme2 && 'hidden']"
      :style="{'background-image': `url(${bgImg || imgUrl})`}"
    />
    
    <div
      class="bg-contain bg-no-repeat bg-top"
      :style="isTheme2 ? null : {'background-image': `url(${cloudTop})`}"
    >
      <!-- theme1 -->
      <ContentWrapper
        v-if="theme === 1"
        class="-translate-y-[15vw] sm:-translate-y-[8vw]"
        contentClass="bg-white rounded-lg"
        :showShadow="true"
      >
        <article class="space-y-6 font-bold xl:font-medium">
          <h2 class="text-xl xl:text-3xl font-black text-primary">
            <span class="break-words" v-html="title" />
          </h2>
          <div class="flex justify-end items-center font-black opacity-80">
            <span class="w-7 xl:w-12 hidden sm:block border-b border-secondary mr-2" />
            <div>
              <span class="text-base sm:text-lg mr-1 sm:mr-2">{{ respondents.name }}</span>
              <span class="text-sm sm:text-base tracking-normal">{{ respondents.title }}</span>
            </div>
          </div>
          <div class="relative">
            <img v-if="mainImg" class="mx-auto mb-7" :src="mainImg" :alt="title">
            <div class="first-letter:text-3xl sm:first-letter:text-4xl first-letter:float-left first-letter:tracking-widest first-letter:font-normal first-letter:pr-1 space-y-5">
              <slot name="article" />
            </div>
            <div class="absolute w-full h-14 -bottom-2 border-dashed border-b border-[#cccccc]" />
          </div>
          <div class="text-center mt-8">
            <ReadMoreBtn v-show="link" @click="handleClick" />
          </div>

          <slot />
        </article>
      </ContentWrapper>

      <!-- theme2 -->
      <ContentWrapper
        v-else-if="theme === 2"
        contentClass="bg-white rounded-lg border-t-8 border-primary"
        :showShadow="true"
        :theme="theme"
      >
        <article class="space-y-6 font-bold xl:font-medium">
          <div class="sm:flex items-start">
            <div class="sm:w-2/5 rounded-md overflow-hidden">
              <img v-if="mainImg" class="w-full" :src="mainImg" :alt="title">
            </div>
            <div class="flex-1 sm:pl-8 mt-3 sm:mt-0 space-y-4">
              <h2 class="text-xl xl:text-2xl font-black text-primary">
                <span v-html="title" />
              </h2>
              <div class="flex justify-center sm:justify-end items-center font-black opacity-80">
                <span class="w-7 xl:w-12 hidden sm:block border-b border-secondary mr-2" />
                <div>
                  <span class="text-base sm:text-lg mr-1 sm:mr-2">{{ respondents.name }}</span>
                  <span class="text-sm sm:text-base tracking-normal">{{ respondents.title }}</span>
                </div>
              </div>
              <div class="text-center sm:text-right">
                <ReadMoreBtn v-show="link" @click="handleClick" />
              </div>
            </div>
          </div>

          <slot />
        </article>
      </ContentWrapper>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ContentWrapper from './ContentWrapper.vue'
import ReadMoreBtn from './ReadMoreBtn.vue'

const imgUrl = new URL('../assets/images/background.jpg', import.meta.url)
const cloudTop = new URL('../assets/images/cloud_top.png', import.meta.url)
const cloudBottom = new URL('../assets/images/cloud_bottom.png', import.meta.url)

const props = defineProps({
  theme: {
    type: Number,
    default: 1
  },
  title: {
    type: String,
    default: ''
  },
  respondents: {
    type: Object,
  },
  bgImg: {
    type: String,
    default: ''
  },
  mainImg: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: ''
  },
})

const isTheme2 = computed(() => props.theme === 2)

const handleClick = () => {
  if (props.link) {
    window.open(props.link, '_blank');
  }
}
</script>
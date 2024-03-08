<template>
  <div class="fixed w-full h-[100vh] top-0 pt-10 lg:pt-0 bg-bgColor overflow-hidden -z-10">
    <div
      class="w-full h-full bg-cover bg-center"
      :style="{'background-image': `url(${width <= height ? imgUrl_m : imgUrl})`}"
      ref="backgroundRef"
    />
    <!-- left -->
    <img
      v-if="!isMobile"
      class="portrait:hidden absolute w-full sm:w-[40%] md:w-[60%] lg:w-[40%] lg:portrait:w-[60%] -left-1/4 sm:-left-0 md:-left-[10%] lg:left-0 lg:portrait:-left-[10%] bottom-0"
      src="../assets/images/kv_items_left3.png"
      ref="woodleft3_Ref"
      @load="loadedImageCount++"
    />
    <img
      v-if="!isMobile"
      class="portrait:hidden absolute w-[30%] md:w-[70%] lg:w-[30%] md:-left-[45%] lg:left-0 top-0"
      src="../assets/images/kv_items_left2.png"
      ref="woodleft2_Ref"
      @load="loadedImageCount++"
    />
    <img
      class="absolute w-full sm:w-[40%] md:w-[60%] lg:w-[40%] lg:portrait:w-[60%] -left-1/4 sm:-left-0 md:-left-[10%] lg:left-0 lg:portrait:-left-[10%] bottom-0"
      src="../assets/images/kv_items_left1.png"
      ref="woodleft1_Ref"
      @load="loadedImageCount++"
    />

    <!-- right -->
    <img
      v-if="!isMobile"
      class="portrait:hidden absolute w-1/4 md:w-[40%] lg:w-1/4 -right-1/4 sm:-right-0 md:-right-[10%] lg:right-0 top-0"
      src="../assets/images/kv_items_right2.png"
      ref="woodright2_Ref"
      @load="loadedImageCount++"
    />
    <img
      class="absolute w-2/3 sm:w-1/4 md:w-[40%] lg:w-1/4 lg:portrait:w-[40%] -right-1/4 sm:-right-0 md:-right-[10%] lg:right-0 lg:portrait:-right-[10%] bottom-0"
      src="../assets/images/kv_items_right1.png"
      ref="woodright1_Ref"
      @load="loadedImageCount++"
    />

    <IcoScrollDown
      class="absolute left-1/2 scale-75 xl:scale-100"
      :class="isIos && isSafari ? 'bottom-16 sm:bottom-8 mb-1' : 'bottom-2 sm:bottom-4'"
    />

    <!-- title -->
    <div
      class="absolute top-1/2 right-[7%] xl:right-[10%] -translate-y-1/2 w-[28%] sm:w-[12%] md:w-1/5 lg:w-[12%] lg:portrait:w-1/5 max-w-[220px] 
        transform duration-1000 drop-shadow-[0_0_7px_rgba(41,36,31,0.7)] sm:drop-shadow-[0_0_10px_rgba(41,36,31,0.6)]"
    >
      <picture>
        <source srcset="../assets/images/title.svg" media="(min-width: 640px)">
        <img
          class="w-full drop-shadow-[1px_1px_3px_rgba(41,36,31,0.9)] sm:drop-shadow-[1px_1px_5px_rgba(41,36,31,0.6)]"
          src="../assets/images/title_m.svg"
          alt="逆轉女王-低谷向上的力量，從態度開始"
          ref="titleRef"
          @load="loadedImageCount++"
        >
      </picture>
    </div>

    <!-- description -->
    <div
      class="absolute flex justify-center items-center w-full h-full top-0 left-0 pt-10 sm:pt-0 bg-bgColor shadow-inner-box bg-contain bg-no-repeat"
      ref="maskRef"
      :style="{'background-image': `url(${cloudTop}), url(${cloudBottom})`, 'background-position': 'top, bottom'}"
    >
      <div ref="descriptionRef">
        <Description />
      </div>
    </div>

    <!-- loading -->
    <Transition name="fade">
      <div
        v-show="showLoadingMask"
        class="absolute w-full h-full top-0 left-0 flex items-center bg-bgColor bg-contain bg-no-repeat"
        :style="{'background-image': `url(${cloudTop}), url(${cloudBottom})`, 'background-position': 'top, bottom'}"
      >
        <div
          class="absolute bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-4 transform duration-500 font-notosans"
          :class="showProgressBar ? 'opacity-1' : 'opacity-0'"
        >
          <NumberAnimation
            :to="progress"
            :format="(e) => Math.floor(e)"
            :duration="0.5"
            autoplay
            easing="linear"
            class="text-3xl lg:text-5xl text-duration-500 font-thin"
            @complete="checkProgress"
          />
          <span class="text-2xl lg:text-4xl font-thin">%</span>
        </div>

        <div
          class="h-px w-full bg-neutral-500 transform duration-500"
          :class="showProgressBar ? 'opacity-1' : 'opacity-0'"
          :style="{'width': `${progress}%`}"
        />
      </div>
    </Transition>

  </div>
</template>

<script setup>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NumberAnimation from "vue-number-animation";
import IcoScrollDown from './IcoScrollDown.vue'
import Description from './Description.vue'

import useClientSize from '../composables/useClientSize'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

gsap.registerPlugin(ScrollTrigger);

const { width, height, isMobile } = useClientSize()

const showLoadingMask = ref(true);
const showProgressBar = ref(true);

const checkProgress = (e) => {
  if (e === 100) showProgressBar.value = false
}

const totalImageCount = computed(() => isMobile.value ? 4 : 7) // 需下載總數
const loadedImageCount = ref(0); // 已下載總數
watch(loadedImageCount, (count) => {
  if (count === totalImageCount.value) {
    setTimeout(() => {
      showLoadingMask.value = false
    }, 800);
  }
})

// 圖片下載進度
const progress = computed(() => (
  Math.min(loadedImageCount.value * (100 / totalImageCount.value), 100)
))

const imgUrl = new URL('../assets/images/background.jpg', import.meta.url)
const imgUrl_m = new URL('../assets/images/background_m.jpg', import.meta.url)

const cloudTop = new URL('../assets/images/cloud_top.png', import.meta.url)
const cloudBottom = new URL('../assets/images/cloud_bottom.png', import.meta.url)

const backgroundImage = new Image();
backgroundImage.addEventListener('load', () => {
  loadedImageCount.value ++
});

backgroundImage.src = width.value <= height.value ? imgUrl_m : imgUrl;

const backgroundRef = ref(null)
const woodleft1_Ref = ref(null)
const woodleft2_Ref = ref(null)
const woodleft3_Ref = ref(null)

const woodright1_Ref = ref(null)
const woodright2_Ref = ref(null)

const descriptionRef = ref(null)
const titleRef = ref(null)
const maskRef = ref(null)

const isIos = /iP(ad|od|hone)/i.test(window.navigator.userAgent);
const isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);

const resetGsap = () => {
  ScrollTrigger.killAll()

  const scrollOptions = {
    start: 0, // (物件開始位置, 卷軸開始位置) top center bottom px
    end: `${height.value * 2}`, // (物件結束位置, 卷軸結束位置), 也可以設卷軸捲動多少結束動畫(+=300)
    // pin: true, // 物件執行完動畫會跟著卷軸走, 類似 fixed-top
    scrub: 1, // 物件動畫根據卷軸捲動程度跑
    scroller: '.scroll-container',
  }

  // background
  gsap.fromTo(backgroundRef.value, {
    scale: 1,
  },
  {
    scale: 1.5,
    scrollTrigger: scrollOptions,
  });

  gsap.fromTo(woodleft1_Ref.value, {
    scale: 1,
    x: 0,
    y: 0,
  },
  {
    scale: 2.6,
    x: (isMobile.value ? width.value * 0.5 : width.value * 0.45) * -1,
    y: isMobile.value ? 100 : width.value * 0.05,
    scrollTrigger: scrollOptions,
  });

  gsap.fromTo(woodright1_Ref.value, {
    scale: 1,
    x: 0,
    y: 0,
  },
  {
    scale: 2.6,
    x: isMobile.value ? width.value * 0.5 : width.value * 0.35,
    y: isMobile.value ? 100 : width.value * 0.05,
    scrollTrigger: scrollOptions,
  });

  // 640px+
  if (!isMobile.value) {
    gsap.fromTo(woodleft2_Ref.value, {
      scale: 1,
      x: 0,
      y: 0,
    },
    {
      scale: 1.6,
      x: width.value * 0.25 * -1,
      y: width.value * 0.14 * -1,
      scrollTrigger: scrollOptions,
    });

    gsap.fromTo(woodleft3_Ref.value, {
      scale: 1,
      x: 0,
      y: 0,
    },
    {
      scale: 1.8,
      x: width.value * 0.24 * -1,
      y: width.value * 0.08,
      scrollTrigger: scrollOptions,
    });

    gsap.fromTo(woodright2_Ref.value, {
      scale: 1,
      x: 0,
      y: 0,
    },
    {
      scale: 1.3,
      x: width.value * 0.24,
      y: width.value * 0.13 * -1,
      scrollTrigger: scrollOptions,
    });
  }

  // title
  gsap.fromTo(titleRef.value, {
    scale: 1,
    x: 0,
    y: 0,
    opacity: 1,
  },
  {
    scale: 2.8,
    x: isMobile.value ? width.value * 0.5 : width.value * 0.35,
    y: 100,
    opacity: 0,
    scrollTrigger: scrollOptions,
  });

  // description mask
  gsap.fromTo(maskRef.value, {
    opacity: 0,
  },
  {
    opacity: 1,
    scrollTrigger: {
      ...scrollOptions,
      start: height.value * 0.8,
    }
  });

  // description
  gsap.fromTo(descriptionRef.value, {
    opacity: 0,
    y: 40,
  },
  {
    opacity: 1,
    y: 0,
    scrollTrigger: {
      ...scrollOptions,
      start: height.value * 1.8,
      end: height.value * 2.8
    }
  });
}

onMounted(() => {
  resetGsap()
  window.addEventListener('resize', resetGsap);
})

onUnmounted(() => {
  backgroundImage.removeEventListener('load');
  window.removeEventListener('resize', resetGsap);
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
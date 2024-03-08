<template>
  <main class="scroll-container">
    <header class="fixed xl:sticky flex justify-between items-center w-full top-0 px-3 sm:px-4 py-2 bg-white lg:bg-transparent shadow-lg lg:shadow-none z-50">
      <a class="block w-14 xl:w-20" href="https://www.businesstoday.com.tw/" target="blank">
        <img src="./assets/images/businesstoday.svg" alt="businesstoday">
      </a>
      <div class="flex items-center space-x-2 lg:ml-2">
        <a class="w-7 md:w-8" :href="`http://www.facebook.com/share.php?u=${url}`" target="blank">
          <img src="./assets/images/ico-facebook.svg" alt="businesstoday-facebook">
        </a>
        <a class="w-7 md:w-8" :href="`https://social-plugins.line.me/lineit/share?url=${url}`" target="blank">
          <img src="./assets/images/ico-line.svg" alt="businesstoday-line">
        </a>
        <a class="w-7 md:w-8" href="https://www.instagram.com/btoday_ig/" target="blank">
          <img src="./assets/images/ico-instagram.svg" alt="businesstoday-instagram">
        </a>
      </div>
    </header>

    <Kvarea />
    
    <div class="relative bg-bgColor" :class="isMobile ? 'mt-[400vh]' : 'mt-[450vh]'">
      <ArticleWrapper
        v-for="list in info.articles"
        :key="list.index"
        :theme="list.theme"
        :title="list.title"
        :respondents="list.respondents"
        :bgImg="`${isDev ? '' : '.'}${list.image}`"
        :mainImg="`${isDev ? '' : '.'}${list.mainimage}`"
        :link="list.link"
      >
        <template v-slot:article>
          <p v-for="paragraphs in list.content" :key="paragraphs.index">
            {{ paragraphs }}
          </p>
        </template>
        <br v-if="list.theme === 1" />
        
        <div v-if="list.podcast" class="block w-full sm:flex justify-between items-start">
          <a
            class="relative block w-full mx-auto sm:w-[232px] sm:mr-3 mb-3 sm:mb-0 rounded-lg overflow-hidden sm:hover:opacity-75 opacity-100 duration-500"
            :href="list.podcastLink"
            target="blank"
          >
            <img class="mx-auto" :src="`${isDev ? '' : '.'}${list.podcastImage}`" :alt="list.podcastTitle">
            <div class="md:hidden absolute -left-1 -top-1 w-10 rounded-full bg-white shadow p-2">
              <img src="./assets/images/podcast_ico.svg" class="" alt="">
            </div>
            <div class="absolute w-full left-0 bottom-0 bg-black/60 text-white text-sm px-2 py-1">
              {{ list.podcastTitle }}
            </div>
          </a>
          <BtPodcastPlayer class="flex-1" :podcastId="list.podcast" />
        </div>

        <div v-if="list.youtube" class="w-[660px] max-w-full mx-auto">
          <BtYouTubePlayer :videoId="list.youtube" />
        </div>
      </ArticleWrapper>
      <hr>
    </div>

    <BtFooter class="relative z-10" :showFloat="false" />

    <!-- light box container -->
    <!-- <ModalsContainer /> -->
  </main>

</template>

<script setup>
import { onMounted } from 'vue';
import useInfoData from './composables/useInfoData'
import useClientConfig from './composables/useClientConfig';
import useClientSize from './composables/useClientSize';

// import BtNavbar from './components/BtNavbar/Nav.vue';
import Kvarea from './components/Kvarea.vue';
import ArticleWrapper from './components/ArticleWrapper.vue'
import BtPodcastPlayer from './components/BtPodcastPlayer/Player.vue'
import BtYouTubePlayer from './components/BtYouTubePlayer/Player.vue'
import BtFooter from './components/BtFooter.vue';

const { info, getInfo } = useInfoData()
const { isDev } = useClientConfig()
const { isMobile } = useClientSize()

const url = import.meta.env.VITE_URL

onMounted(getInfo)

</script>
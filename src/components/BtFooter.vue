<template>
  <footer class="bg-btnetgray px-4 py-24">
    <div class="sm:flex sm:flex-wrap justify-center text-xs text-white font-notosans">
      <div class="pb-6 xl:pr-6 xl:pb-0 space-y-1">
        <p>專題製作：數位內容部、PODCAST運營中心</p>
        <p>監製：陳俍任、潘怡靜、李易紓</p>
        <p>採訪記者：林韋伶、劉煥彥、彭蕙珍、鄭鴻達、黃靖文</p>
        <p>Podcast製作：主持人／潘怡靜、製作人／張孝瑜</p>
        <p>視覺設計後製：劉怡君、石維婷、黃士哲、陳美環</p>
      </div>
      <div class="space-y-1 sm:text-center xl:text-left">
        <p>今周文化事業(股)公司/今周行銷(股)公司/今周出版(股)公司 版權所有</p>
        <p>本網站圖文非經本社同意不得刊載</p>
        <p>Copyright © 2024 Business Today All rights reserved</p>
      </div>
    </div>
    <!-- <div class="space-y-1 text-xs text-white font-notosans">
      <p>內容監製: 今周刊</p>
      <p>專題製作: 今周刊 數位內容部</p>
      <p>{{ copyrightText }}</p>
    </div> -->
    
    <div v-if="showFloatButton" class="fixed right-0 top-1/2 -translate-y-1/2 z-10">
      back
    </div>
    
  </footer>
</template>

<script>
import { computed } from 'vue';
import useClientSize from '../composables/useClientSize';
import useWindowScroll from '../composables/useWindowScroll';

export default {
  props: {
    showFloat: {
      type: Boolean,
      default: true
    }
  },

  setup(props) {
    const copyrightText = import.meta.env.VITE_COPYRIGHT
    const { height } = useClientSize();
    const { scrollTop } = useWindowScroll();

    const showFloatButton = computed(() => {
      return props.showFloat && scrollTop.value > height.value / 2;
    })
    
    return {
      copyrightText,
      showFloatButton,
    }
  }
  
}
</script>

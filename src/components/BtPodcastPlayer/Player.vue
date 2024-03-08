<template>
  <div class="flex justify-center" :class="[!podcastId && 'hidden']">
    <iframe
      :src="`https://embed.podcasts.apple.com/us/podcast/${podcastId}`"
      height="175px"
      frameborder="0"
      sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
      allow="autoplay *; encrypted-media *; clipboard-write"
      style="width: 100%; max-width: 660px; overflow: hidden; border-radius: 10px; transform: translateZ(0px); animation: 2s ease 0s 6 normal none running loading-indicator; background-color: rgb(228, 228, 228);"
    />
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  props: {
    podcastId: {
      type: String,
      required: true
    },
  },

  setup(props, { emit }) {

    onMounted(() => {
      
    })
    
    return {
      // player,
      // playerRef,
    }
  }
  
}
</script>

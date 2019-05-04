<template>
  <v-layout align-center row justify-space-around class="sns-post">
    <twitter-btn :url="url" :text="text" :tag="tag"/>
    <facebook-btn :url="url"/>
    <hatena-btn :url="url"/>
    <line-btn :url="url" :text="text"/>
  </v-layout>
</template>

<script>
import TwitterBtn from '~/components/atoms/TwitterBtn.vue'
import FacebookBtn from '~/components/atoms/FacebookBtn.vue'
import HatenaBtn from '~/components/atoms/HatenaBtn.vue'
import LineBtn from '~/components/atoms/LineBtn.vue'

export default {
  components: {
    TwitterBtn,
    FacebookBtn,
    HatenaBtn,
    LineBtn
  },
  props: {
    url: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.sns-post {
  width: 40%;
  padding-bottom: 15px;
}
</style>

<template>
  <v-layout align-center row justify-space-around class="sns-post">
    <twitter-btn :url="url"/>
    <facebook-btn :url="url"/>
    <hatena-btn :url="url"/>
  </v-layout>
</template>

<script>
import TwitterBtn from '~/components/atoms/TwitterBtn.vue'
import FacebookBtn from '~/components/atoms/FacebookBtn.vue'
import HatenaBtn from '~/components/atoms/HatenaBtn.vue'

export default {
  components: {
    TwitterBtn,
    FacebookBtn,
    HatenaBtn
  },
  props: {
    url: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.sns-post {
  width: 30%;
  padding-bottom: 10px;
}
</style>

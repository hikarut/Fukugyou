<template>
  <a :href="shareUrl" target="blank">
    <v-icon color="#55acee">fab fa-twitter-square</v-icon>
  </a>
</template>

<script>
import { twitterUrl } from '~/plugins/sns'

export default {
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
  },
  computed: {
    shareUrl() {
      return twitterUrl(this.url, this.text, this.tag)
    }
  }
}
</script>

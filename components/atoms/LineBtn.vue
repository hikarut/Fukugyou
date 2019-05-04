<template>
  <a :href="shareUrl" target="blank">
    <v-icon color="#00c300">fab fa-line</v-icon>
  </a>
</template>

<script>
import { lineUrl } from '~/plugins/sns'

export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    shareUrl() {
      return lineUrl(this.url, this.text)
    }
  }
}
</script>

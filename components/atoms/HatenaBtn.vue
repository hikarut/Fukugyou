<template>
  <a :href="shareUrl" target="blank">
    <v-icon color="#00a4de">fab fa-bootstrap</v-icon>
  </a>
</template>

<script>
import { hatenaUrl } from '~/plugins/sns'

export default {
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  computed: {
    shareUrl() {
      return hatenaUrl(this.url)
    }
  }
}
</script>

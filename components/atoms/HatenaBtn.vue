<template>
  <a :href="shareUrl" target="blank">
    <v-icon color="#00a4de" class="square">fab fa-bootstrap</v-icon>
  </a>
</template>

<script>
import { hatenaUrl } from '~/lib/sns'

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

<style scoped>
.square {
  font-size: 35px;
}
</style>

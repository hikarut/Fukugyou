<template>
  <a :href="shareUrl" target="blank">
    <v-icon color="#315096" class="square">fab fa-facebook-square</v-icon>
  </a>
</template>

<script>
import { facebookUrl } from '~/lib/sns'

export default {
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  computed: {
    shareUrl() {
      return facebookUrl(this.url)
    }
  }
}
</script>

<style scoped>
.square {
  font-size: 35px;
}
</style>

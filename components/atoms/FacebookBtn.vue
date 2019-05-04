<template>
  <a :href="shareUrl" target="blank">
    <v-icon color="#315096">fab fa-facebook-square</v-icon>
  </a>
</template>

<script>
import { facebookUrl } from '~/plugins/sns'

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

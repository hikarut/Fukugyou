<template>
  <a :href="shareUrl" target="blank">
    <fa :icon="faFacebookSquare" class="square" />
  </a>
</template>

<script>
import { facebookUrl } from '~/lib/sns'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'

export default {
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  computed: {
    faFacebookSquare() {
      return faFacebookSquare
    },
    shareUrl() {
      return facebookUrl(this.url)
    }
  }
}
</script>

<style lang="scss" scoped>
.square {
  font-size: 35px;
  color: $facebookColor;
}
</style>

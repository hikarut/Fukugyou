<template>
  <a :href="shareUrl" target="blank">
    <fa :icon="faBootstrap" class="square" />
  </a>
</template>

<script>
import { hatenaUrl } from '~/lib/sns'
import { faBootstrap } from '@fortawesome/free-brands-svg-icons'

export default {
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  computed: {
    faBootstrap() {
      return faBootstrap
    },
    shareUrl() {
      return hatenaUrl(this.url)
    }
  }
}
</script>

<style lang="scss" scoped>
.square {
  font-size: 35px;
  color: $hatenaColor;
}
</style>

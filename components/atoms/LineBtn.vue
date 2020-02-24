<template>
  <a :href="shareUrl" target="blank">
    <fa :icon="faLine" class="square" />
  </a>
</template>

<script>
import { lineUrl } from '~/lib/sns'
import { faLine } from '@fortawesome/free-brands-svg-icons'

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
    faLine() {
      return faLine
    },
    shareUrl() {
      return lineUrl(this.url, this.text)
    }
  }
}
</script>

<style lang="scss" scoped>
.square {
  font-size: 35px;
  color: $lineColor;
}
</style>

<template>
  <a :href="shareUrl" target="blank">
    <fa :icon="faTwitterSquare" class="square" />
  </a>
</template>

<script>
import { twitterUrl } from '~/lib/sns'
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons'

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
    faTwitterSquare() {
      return faTwitterSquare
    },
    shareUrl() {
      return twitterUrl(this.url, this.text, this.tag)
    }
  }
}
</script>

<style lang="scss" scoped>
.square {
  font-size: 35px;
  color: $twitterColor;
}
</style>

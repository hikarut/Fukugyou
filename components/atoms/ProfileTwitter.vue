<template>
  <a href="https://twitter.com/light940" target="blank"><fa :icon="faTwitterSquare" class="twitter" /></a>
</template>

<script>
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons'

export default {
  computed: {
    faTwitterSquare() {
      return faTwitterSquare
    }
  }
}
</script>

<style lang="scss" scoped>
.twitter {
  font-size: 20px;
  color: $twitterColor;
  margin: 5px;
}
</style>

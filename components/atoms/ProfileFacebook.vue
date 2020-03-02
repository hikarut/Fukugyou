<template>
  <a href="https://www.facebook.com/hikaru.takahashi.5031" target="blank"><fa :icon="faFacebookSquare" class="facebook" /></a>
</template>

<script>
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'

export default {
  computed: {
    faFacebookSquare() {
      return faFacebookSquare
    }
  }
}
</script>

<style lang="scss" scoped>
.facebook {
  font-size: 35px;
  color: $facebookColor;
}
</style>

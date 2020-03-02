<template>
  <a href="https://github.com/hikarut" target="blank"><fa :icon="faGithubSquare" class="github" /></a>
</template>

<script>
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons'

export default {
  computed: {
    faGithubSquare() {
      return faGithubSquare
    }
  }
}
</script>

<style lang="scss" scoped>
.github {
  font-size: 35px;
  color: $githubColor;
}
</style>

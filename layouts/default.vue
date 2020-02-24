<template>
  <v-app class="app">
    <div>
      <app-header />
      <nuxt />
      <app-footer />
    </div>
  </v-app>
</template>

<script>
import AppHeader from '~/components/layouts/Header.vue'
import AppFooter from '~/components/layouts/Footer.vue'

export default {
  components: {
    AppFooter,
    AppHeader
  }
}
</script>

<style lang="scss" scoped>
body {
  color: $darkGray;
}
.app {
  background: $white !important;
}
</style>

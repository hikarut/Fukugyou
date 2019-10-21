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

<style>
body {
  color: #424242;
}
.app {
  background: white !important;
}
</style>

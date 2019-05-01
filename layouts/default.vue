<template>
  <div>
    <app-header />
    <nuxt />
    <app-footer />
  </div>
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
  font-family: BlinkMacSystemFont, -apple-system Noto Sans SC, sans-serif;
  color: #424242;
}
</style>

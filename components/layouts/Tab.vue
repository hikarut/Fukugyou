<template>
  <v-tabs
    centered
    color="#134b8a"
  >

    <v-tab :class="[isHome ? 'active' : '']" @click="go('/')">
      ホーム
    </v-tab>

    <v-tab :class="[isNews ? 'active' : '']" @click="go('/news/')">
      複業(副業)ニュース
    </v-tab>

    <v-tab :class="[isEngineer ? 'active' : '']" @click="go('/posts/page/1/')">
      エンジニア向け情報
    </v-tab>

  </v-tabs>
</template>

<script>
import method from '~/mixins/method'

export default {
  mixins: [method],
  computed: {
    isHome() {
      return this.$route.path === '/'
    },
    isNews() {
      return /^\/news\//.test(this.$route.path)
    },
    isEngineer() {
      return /^\/posts\//.test(this.$route.path)
    }
  }
}
</script>

<style>
.v-tabs {
  margin-top: -1px;
}
.v-tabs__item {
  opacity: 1 !important;
  font-weight: bold;
  color: white !important;
}
.v-tabs__slider-wrapper {
  display: none !important;
}
</style>

<style scoped>
.active {
  padding-top: 5px;
  border-bottom: solid 5px white;
}
a {
  color: white;
}
</style>

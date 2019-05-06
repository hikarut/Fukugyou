<template>
  <div>
    <v-layout align-center column justify-center>
      <div v-if="statusCode === 404" class="error-word" >ページが見つかりません。</div>
      <div v-else class="error-word">エラーです。</div>
      <div class="error-top"><nuxt-link to="/">ホーム</nuxt-link>に戻る。</div>
      <list-item :items="recomendNews" />
    </v-layout>
  </div>
</template>

<script>
// TODO:本番だとここは使われない

import ListItem from '~/components/organisms/ListItem.vue'
const recomendNews = require('~/config/recomendNews.json')

export default {
  components: {
    ListItem
  },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    return {
      title: 'エラー'
    }
  },
  data: () => ({ recomendNews: recomendNews }),
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500
    }
  }
}
</script>

<style scoped>
.error-word {
  padding-top: 50px;
}
.error-top {
  padding-bottom: 50px;
}
</style>

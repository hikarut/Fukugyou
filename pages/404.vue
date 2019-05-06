<template>
  <div>
    <v-layout align-center column justify-center>
      <div class="error-word" >ページが見つかりません。</div>
      <div class="error-top"><nuxt-link to="/">ホーム</nuxt-link>に戻る。</div>
      <list-item :items="recomendNews" />
    </v-layout>
  </div>
</template>

<script>
import ListItem from '~/components/organisms/ListItem.vue'
const recomendNews = require('~/config/recomendNews.json')

export default {
  components: {
    ListItem
  },
  head() {
    return {
      title: 'エラー'
    }
  },
  data: () => ({ recomendNews: recomendNews })
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

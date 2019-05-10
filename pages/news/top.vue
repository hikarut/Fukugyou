<template>
  <div class="card-item-top">
    <bread-list :items="breadItems"/>
    <card-item :items="cards"/>
  </div>
</template>

<script>
import CardItem from '~/components/organisms/CardItem.vue'
import BreadList from '~/components/organisms/BreadList.vue'

// 手動で拾ってきたニュース
const topNews = require('~/config/topNews.json5')

export default {
  components: {
    CardItem,
    BreadList
  },
  data: () => ({
    breadItems: [
      {
        text: 'トップ',
        disabled: false,
        url: '/'
      },
      {
        text: 'トップニュース一覧',
        disabled: true,
        url: '/news/top'
      }
    ],
    cards: topNews
  })
}
</script>

<style scoped>
/* PC版は横に広がりすぎないようにする */
@media screen and (min-width: 600px) {
  .card-item-top {
    width: 60%;
    margin: 0 auto;
  }
}
</style>

<template>
  <div class="list-item-top">
    <bread-list :items="breadItems"/>
    <list-item :items="fukugyouNews" />
  </div>
</template>

<script>
import ListItem from '~/components/organisms/ListItem.vue'
import BreadList from '~/components/organisms/BreadList.vue'

// 手動で拾ってきたニュース
const fukugyouNews = require('~/config/fukugyouNews.json')

export default {
  components: {
    ListItem,
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
        text: '複業ニュース一覧',
        disabled: true,
        url: '/news/fukugyou'
      }
    ],
    fukugyouNews: fukugyouNews
  })
}
</script>

<style scoped>
/* PC版は横に広がりすぎないようにする */
@media screen and (min-width: 600px) {
  .list-item-top {
    width: 60%;
    margin: 0 auto;
  }
}
</style>

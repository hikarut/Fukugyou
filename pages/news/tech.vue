<template>
  <div class="list-item-top">
    <bread-list :items="breadItems"/>
    <list-item :items="techNewsList" />
  </div>
</template>

<script>
import ListItem from '~/components/organisms/ListItem.vue'
import BreadList from '~/components/organisms/BreadList.vue'

// 手動で拾ってきたニュース
const techNewsList = require('~/config/techNews.json5')

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
        text: 'エンジニア向けニュース一覧',
        disabled: true,
        url: '/news/fukugyou'
      }
    ],
    techNewsList: techNewsList
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

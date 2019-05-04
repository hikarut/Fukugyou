<template>
  <div class="top">
    <big-img-item :items="listData" />
    <div class="top-button">
      <nuxt-link to="/posts"><v-btn block outline color="#134b8a">もっと見る</v-btn></nuxt-link>
    </div>
    <card-item :items="cards"/>
    <list-item :items="fukugyouNews" />
    <list-item :items="techNews" />
  </div>
</template>

<script>
import { getEntries } from '~/plugins/contentful'
import { dateString } from '~/plugins/date'
import CardItem from '~/components/organisms/CardItem.vue'
import ListItem from '~/components/organisms/ListItem.vue'
import BigImgItem from '~/components/organisms/BigImgItem.vue'

// 手動で拾ってきたニュース
const topNews = require('~/config/topNews.json')
const fukugyouNews = require('~/config/fukugyouNews.json')
const techNews = require('~/config/techNews.json')

export default {
  components: {
    CardItem,
    ListItem,
    BigImgItem
  },
  // 投稿内容を取得
  asyncData() {
    return getEntries(1)
  },
  data: () => ({
    cards: topNews,
    fukugyouNews: fukugyouNews,
    techNews: techNews
  })
}
</script>

<style scoped>
.top-button {
  width: 90%;
  margin: 0 auto;
  padding-top: -10px;
}
/* PC版は横に広がりすぎないようにする */
@media screen and (min-width: 600px) {
  .top {
    width: 60%;
    margin: 0 auto;
  }
}
</style>

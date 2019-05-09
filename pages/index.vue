<template>
  <div class="top">
    <big-img-item :items="listData" />
    <div class="top-button">
      <nuxt-link to="/posts"><v-btn block outline color="#134b8a">もっと見る</v-btn></nuxt-link>
    </div>

    <card-item :items="cards"/>
    <div class="top-button">
      <nuxt-link to="/news/top"><v-btn block outline color="#134b8a">もっと見る</v-btn></nuxt-link>
    </div>

    <list-item :items="fukugyouNews" />
    <div class="top-button">
      <nuxt-link to="/news/fukugyou"><v-btn block outline color="#134b8a">もっと見る</v-btn></nuxt-link>
    </div>

    <list-item :items="techNews" />
    <div class="top-button">
      <nuxt-link to="/news/tech"><v-btn block outline color="#134b8a">もっと見る</v-btn></nuxt-link>
    </div>

    <list-item :items="recomendNews" />
  </div>
</template>

<script>
import { getEntries } from '~/plugins/contentful'
import { dateString } from '~/plugins/date'
import CardItem from '~/components/organisms/CardItem.vue'
import ListItem from '~/components/organisms/ListItem.vue'
import BigImgItem from '~/components/organisms/BigImgItem.vue'

// 手動で拾ってきたニュース
let topNews = require('~/config/topNews.json')
const topNewsData = topNews.data.slice(0, 4)
topNews.data = topNewsData

let fukugyouNews = require('~/config/fukugyouNews.json')
const fukugyouNewsData = fukugyouNews.data.slice(0, 8)
fukugyouNews.data = fukugyouNewsData

let techNews = require('~/config/techNews.json')
const techNewsData = techNews.data.slice(0, 4)
techNews.data = techNewsData

const recomendNews = require('~/config/recomendNews.json')

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
    techNews: techNews,
    recomendNews: recomendNews
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

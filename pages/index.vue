<template>
  <div class="top">
    <big-img-item :items="listData" />
    <button-link link="/posts" text="もっと見る" />

    <card-item :items="cards"/>
    <button-link link="/news/top" text="もっと見る" />

    <list-item :items="fukugyouNews" />
    <button-link link="/news/fukugyou" text="もっと見る" />

    <list-item :items="techNews" />
    <button-link link="/news/tech" text="もっと見る" />

    <list-item :items="recomendNews" />
  </div>
</template>

<script>
import { getEntries } from '~/plugins/contentful'
import { dateString } from '~/plugins/date'
import CardItem from '~/components/organisms/CardItem.vue'
import ListItem from '~/components/organisms/ListItem.vue'
import BigImgItem from '~/components/organisms/BigImgItem.vue'
import ButtonLink from '~/components/atoms/Button.vue'

// 手動で拾ってきたニュース
const topNewsOrigin = require('~/config/topNews.json')
const topNews = Object.assign({}, topNewsOrigin)
topNews.data = topNews.data.slice(0, 4)

const fukugyouNewsOrigin = require('~/config/fukugyouNews.json')
const fukugyouNews = Object.assign({}, fukugyouNewsOrigin)
fukugyouNews.data = fukugyouNews.data.slice(0, 8)

const techNewsOrigin = require('~/config/techNews.json')
const techNews = Object.assign({}, techNewsOrigin)
techNews.data = techNews.data.slice(0, 4)

const recomendNews = require('~/config/recomendNews.json')

export default {
  components: {
    CardItem,
    ListItem,
    BigImgItem,
    ButtonLink
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
}
/* PC版は横に広がりすぎないようにする */
@media screen and (min-width: 600px) {
  .top {
    width: 60%;
    margin: 0 auto;
  }
}
</style>

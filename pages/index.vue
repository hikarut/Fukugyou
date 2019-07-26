<template>
  <div class="top">
    <template v-if="loading">
      <v-progress-linear :indeterminate="true"/>
    </template>
    <template v-else>
      <card-item :items="topNews"/>
      <button-link :link="topNews.data[0].monthLink" class="news-more" text="もっと見る" />
    </template>

    <subheader text="トップニュース" />
    <big-img-item :items="listData" />
    <button-link link="/posts" text="もっと見る" />

    <card-item :items="fukugyouNewsWhy"/>

    <card-item :items="fukugyouNewsJob"/>

    <list-item :items="fukugyouNews" />
    <button-link link="/news/fukugyou" text="もっと見る" />

    <list-item :items="techNews" />
    <button-link link="/news/tech" text="もっと見る" />

    <list-item :items="recomendNews" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getEntries } from '~/plugins/contentful'
import { dateString } from '~/lib/date'
import CardItem from '~/components/organisms/CardItem.vue'
import ListItem from '~/components/organisms/ListItem.vue'
import BigImgItem from '~/components/organisms/BigImgItem.vue'
import ButtonLink from '~/components/atoms/Button.vue'
import Subheader from '~/components/atoms/Subheader.vue'

const fukugyouNewsOrigin = require('~/config/fukugyouNews.json5')
const fukugyouNews = Object.assign({}, fukugyouNewsOrigin)
fukugyouNews.data = fukugyouNews.data.slice(0, 4)

const techNewsOrigin = require('~/config/techNews.json5')
const techNews = Object.assign({}, techNewsOrigin)
techNews.data = techNews.data.slice(0, 4)

const fukugyouNewsWhy = require('~/config/why.json5')
const fukugyouNewsJob = require('~/config/job.json5')
const recomendNews = require('~/config/recomendNews.json5')

export default {
  components: {
    CardItem,
    ListItem,
    BigImgItem,
    ButtonLink,
    Subheader
  },
  // 投稿内容を取得
  asyncData() {
    return getEntries(2)
  },
  async fetch({ store }) {
    // news記事の取得
    await store.dispatch('news/getTopNews')
  },
  data: () => ({
    fukugyouNews: fukugyouNews,
    techNews: techNews,
    recomendNews: recomendNews,
    fukugyouNewsWhy: fukugyouNewsWhy,
    fukugyouNewsJob: fukugyouNewsJob
  }),
  computed: {
    ...mapGetters('news', ['topNews', 'loading'])
  },
  methods: {
    ...mapActions('news', ['getTopNews'])
  }
}
</script>

<style scoped>
/* PC版は横に広がりすぎないようにする */
@media screen and (min-width: 600px) {
  .top {
    width: 60%;
    margin: 0 auto;
  }
}
.news-more {
  margin-top: -20px;
  padding-bottom: 30px;
}
</style>

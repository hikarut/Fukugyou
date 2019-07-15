<template>
  <div class="top">
    <card-item :items="topNews"/>

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
fukugyouNews.data = fukugyouNews.data.slice(0, 8)

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
  data: () => ({
    fukugyouNews: fukugyouNews,
    techNews: techNews,
    recomendNews: recomendNews,
    fukugyouNewsWhy: fukugyouNewsWhy,
    fukugyouNewsJob: fukugyouNewsJob
  }),
  computed: {
    ...mapGetters('news', ['topNews'])
  },
  beforeMount() {
    console.log('beforeMount')
    // news記事の取得
    this.getTopNews()
  },
  mounted() {
    console.log('mounted')
    // console.log(this.topNews)
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
</style>

<template>
  <div class="main">
    <bread-list :items="breadItems"/>
    <sns-post :url="shareUrl" :text="shareText" :tag="shareTag" />

    <template v-if="loading">
      <v-progress-linear :indeterminate="true"/>
    </template>
    <template v-else>
      <card-item :items="dailyNews"/>
    </template>

    <list-item :items="recomendNews" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { addDateString, getAllTerm } from '~/lib/date'
import SnsPost from '~/components/molecules/SnsPost.vue'
import BreadList from '~/components/organisms/BreadList.vue'
import ListItem from '~/components/organisms/ListItem.vue'
import CardItem from '~/components/organisms/CardItem.vue'

const recomendNews = require('~/config/recomendNews.json5')
const constant = require('~/config/constant.json')

export default {
  components: {
    SnsPost,
    BreadList,
    ListItem,
    CardItem
  },
  validate({ params }) {
    // 日付と月を両方チェック
    return /^\d{8}$/.test(params.day) && /^\d{6}$/.test(params.month)
  },
  head() {
    return {
      title: this.dailyNews.header,
      // title: '記事一覧',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.dailyNews.header
          // content: '記事一覧'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${constant.url}${this.$route.path}`
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.dailyNews.header
          // content: '記事一覧'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/ogimage.png'
        },
        {
          hid: 'twitter:image:src',
          property: 'twitter:image:src',
          content: `${constant.url}${this.$route.path}`
        }
      ]
    }
  },
  data: () => ({
    recomendNews: recomendNews
  }),
  computed: {
    breadItems() {
      return [
        {
          text: 'トップ',
          disabled: false,
          url: '/'
        },
        {
          text: addDateString(this.month),
          disabled: false,
          url: `/news/${this.month}`
        },
        {
          text: addDateString(this.day),
          disabled: true,
          url: '/'
        }
      ]
    },
    shareUrl() {
      return `${constant.url}${this.$route.path}`
    },
    shareText() {
      return this.dailyNews.header
      // return '記事一覧'
    },
    shareTag() {
      return '複業,エンジニア'
    },
    ...mapGetters('news', ['dailyNews', 'loading'])
  },
  beforeMount() {
    // news記事の取得
    console.log('beforeMount')
    console.log(this.day)
    console.log(this.$route.params)
    // this.getDailyNews(this.$route.params.day)
    // const allTerm = getAllTerm()
    // console.log('getAllTerm')
    // console.log(allTerm)
    // const allTermPath = allTerm.map(data => `/news/${data.key}/${data.value}`)
    // console.log(allTermPath)
  },
  mounted() {
    console.log('mounted')
  },
  methods: {
    ...mapActions('news', ['getDailyNews'])
  },
  async asyncData({ params, store }) {
    console.log('_day asyncData')
    // asyncData({ params, store }) {
    await store.dispatch('news/getDailyNews', params.day)
    return { month: params.month, day: params.day }
  }
}
</script>

<style scoped>
/* PC版は横に広がりすぎないようにする */
@media screen and (min-width: 600px) {
  .main {
    width: 60%;
    margin: 0 auto;
  }
}
/* このページだけ横幅いっぱいにする */
.sns-post {
  width: 100%;
}
/* リストページだけ場所を調整 */
.v-breadcrumbs {
  padding: 20px 0px 20px 24px !important;
}
</style>

<template>
  <div class="main">
    <bread-list :items="breadItems"/>
    <sns-post :url="shareUrl" :text="shareText" :tag="shareTag" />

    <template v-if="loading">
      <v-progress-linear :indeterminate="true"/>
    </template>
    <template v-else>
      <card-item :items="monthlyNews"/>
    </template>

    <list-item :items="recomendNews" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { addDateString } from '~/lib/date'
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
    // 月をチェック
    return /^\d{6}$/.test(params.month)
  },
  head() {
    return {
      title: this.monthlyNews.header,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.monthlyNews.header
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${constant.url}${this.$route.path}`
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.monthlyNews.header
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
          disabled: true,
          url: `/news/${this.month}`
        }
      ]
    },
    shareUrl() {
      return `${constant.url}${this.$route.path}`
    },
    shareText() {
      return this.monthlyNews.header
    },
    shareTag() {
      return '複業,エンジニア'
    },
    ...mapGetters('news', ['monthlyNews'])
  },
  methods: {
    ...mapActions('news', ['getMonthlyData'])
  },
  async asyncData({ params, store }) {
    await store.dispatch('news/getMonthlyNews', params.month)
    return { month: params.month }
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

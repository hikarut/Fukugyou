<template>
  <v-container grid-list-md text-xs-center class="all">
    <v-layout row wrap>
      <v-flex :class="[isDesktop ? 'xs8' : 'xs12']" >
        <div class="main">
          <bread-list :items="breadItems"/>

          <template v-if="loading">
            <v-progress-linear :indeterminate="true"/>
          </template>
          <template v-else>
            <card-item :items="dailyNews" tag="h1" />
          </template>

          <template v-if="loading">
            <v-progress-linear :indeterminate="true"/>
          </template>
          <template v-else>
            <sns-post :url="shareUrl" :text="shareText" :tag="shareTag" />
          </template>

          <paging :date="day" />

        </div>
      </v-flex>

      <side-menu :items="recomendNews"/>

    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { addDateString } from '~/lib/date'
import SnsPost from '~/components/molecules/SnsPost.vue'
import BreadList from '~/components/organisms/BreadList.vue'
import CardItem from '~/components/organisms/CardItem.vue'
import Paging from '~/components/molecules/Paging.vue'
import SideMenu from '~/components/molecules/SideMenu.vue'
import device from '~/mixins/device'

const constant = require('~/config/constant.json')
const recomendNews = require('~/config/recomendNews.json5')

export default {
  components: {
    SnsPost,
    BreadList,
    CardItem,
    Paging,
    SideMenu
  },
  mixins: [device],
  validate({ params }) {
    // 日付と月を両方チェック
    return /^\d{8}$/.test(params.day) && /^\d{6}$/.test(params.month)
  },
  head() {
    return {
      title: this.dailyNews.header,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.dailyNews.header
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
          text: process.env.constant.newsList,
          disabled: false,
          url: '/news'
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
      // ランダムで呟くタイトルを変える
      const rand = Math.floor(Math.random() * this.dailyNews.data.length)
      return `【${this.dailyNews.header}】%0a・${encodeURIComponent(
        this.dailyNews.data[rand].title
      )}%0aほか${this.dailyNews.data.length}件%0a`
    },
    shareTag() {
      return '複業,エンジニア'
    },
    ...mapGetters('news', ['dailyNews', 'loading'])
  },
  async mounted() {
    // await this.$store.dispatch('news/getDailyNews', this.$route.params['day'])
  },
  methods: {
    ...mapActions('news', ['getDailyNews'])
  },
  async asyncData({ params, store, error }) {
    await store.dispatch('news/getDailyNews', params.day)
    // データがない場合はエラーページに飛ばす
    if (Object.keys(store.state['news'].dailyData).length === 0) {
      error({
        statusCode: 404,
        message: 'データがありません'
      })
    }
    return { month: params.month, day: params.day }
  }
}
</script>

<style scoped>
/* PC版は横に広がりすぎないようにする */
@media screen and (min-width: 1400px) {
  .all {
    width: 70%;
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
/* サイドメニューの調整 */
@media screen and (max-width: 959px) {
  .container {
    padding: 0px !important;
  }
}
.container.grid-list-md .layout:only-child {
  margin: 0px;
}
</style>

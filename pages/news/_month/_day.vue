<template>
  <div>
    <tab />
    <v-container grid-list-md text-xs-center class="all">
      <v-layout row wrap>
        <v-flex :class="[isDesktop ? 'xs8' : 'xs12']" >
          <div class="main">
            <bread-list :items="breadItems"/>

            <template v-if="loading">
              <v-progress-linear :indeterminate="true"/>
            </template>
            <template v-else>
              <template v-if="dailyNews.data === null">
                <div>
                  データがありません。<br>
                  <a href="/">トップページ</a>に戻る。
                </div>
              </template>
              <template v-else>
                <card-item :items="dailyNews" tag="h1" />
              </template>
            </template>

            <template v-if="loading">
              <v-progress-linear :indeterminate="true"/>
            </template>
            <template v-else>
              <sns-post v-if="dailyNews.data !== null" :url="shareUrl" :text="shareText" :tag="shareTag" />
            </template>

            <paging :date="day" />

          </div>
        </v-flex>

        <side-menu :items="recomendNews"/>

      </v-layout>
      <script type="application/ld+json" v-html="ldJson" />
      <script type="application/ld+json" v-html="ldJsonBreadcrumb" />
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { addDateString } from '~/lib/date'
import SnsPost from '~/components/molecules/SnsPost.vue'
import BreadList from '~/components/organisms/BreadList.vue'
import CardItem from '~/components/organisms/CardItem.vue'
import Paging from '~/components/molecules/Paging.vue'
import SideMenu from '~/components/molecules/SideMenu.vue'
import Tab from '~/components/layouts/Tab.vue'
import device from '~/mixins/device'

const recomendNews = require('~/config/recomendNews.json5')

export default {
  components: {
    SnsPost,
    BreadList,
    CardItem,
    Paging,
    SideMenu,
    Tab
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
          hid: 'description',
          name: 'description',
          content: this.dailyNews.header
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.constant.url}${this.$route.path}`
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.dailyNews.header
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.dailyNews.header
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: `${process.env.constant.url}${this.$route.path}`
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
          text: 'ホーム',
          disabled: false,
          url: '/'
        },
        {
          text: process.env.constant.newsList,
          disabled: false,
          url: '/news/'
        },
        {
          text: addDateString(this.month),
          disabled: false,
          url: `/news/${this.month}/`
        },
        {
          text: addDateString(this.day),
          disabled: true,
          url: '/'
        }
      ]
    },
    shareUrl() {
      return `${process.env.constant.url}${this.$route.path}`
    },
    shareText() {
      // ランダムで呟くタイトルを変える
      const rand = Math.floor(Math.random() * this.dailyNews.data.length)
      return `【${this.dailyNews.header}】%0a・${encodeURIComponent(
        this.dailyNews.data[rand].title
      )}%0aほか${this.dailyNews.data.length}件%0a`
    },
    shareTag() {
      return process.env.constant.twitterTag
    },
    ...mapGetters('news', ['dailyNews', 'loading', 'error']),
    ldJson() {
      return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${process.env.constant.url}${this.$route.path}`
        },
        headline: this.dailyNews.header,
        description: process.env.constant.description,
        image: {
          '@type': 'ImageObject',
          url: `${process.env.constant.url}/ogimage.png`,
          width: 1200,
          height: 800
        },
        author: {
          '@type': 'Organization',
          name: 'Fukugyou'
        },
        datePublished: this.day
      })
    },
    ldJsonBreadcrumb() {
      return JSON.stringify({
        '@context': 'https://schema.org/',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'ホーム',
            item: process.env.constant.url
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: process.env.constant.newsList,
            item: `${process.env.constant.url}/news/`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: addDateString(this.month),
            item: `${process.env.constant.url}/news/${this.month}/`
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: addDateString(this.day),
            item: `${process.env.constant.url}/news/${this.month}/${this.day}/`
          }
        ]
      })
    }
  },
  async beforeMount() {
    // if (this.error) {
    // 静的ファイルの時にasyncDataでうまく取得できてない場合があるのでここでも実行する(※一時的な対応)
    await this.$store.dispatch('news/getDailyNews', this.$route.params['day'])
    // }
  },
  methods: {
    ...mapActions('news', ['getDailyNews'])
  },
  async asyncData({ params, store, error }) {
    await store.dispatch('news/getDailyNews', params.day)
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
  padding: 20px 0px 0px 24px !important;
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
.container.grid-list-md .layout:not(:only-child) {
  margin: auto 0px;
}
</style>

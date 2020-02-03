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
            <template v-if="monthlyNews.data === null">
              <div>データがありません</div>
            </template>
            <template v-else>
              <card-item :items="monthlyNews" tag="h1" />
            </template>
          </template>

          <template v-if="loading">
            <v-progress-linear :indeterminate="true"/>
          </template>
          <template v-else>
            <sns-post v-if="monthlyNews.data !== null" :url="shareUrl" :text="shareText" :tag="shareTag" />
          </template>

          <paging :date="month" />

        </div>
      </v-flex>

      <side-menu :items="recomendNews"/>

    </v-layout>
    <script type="application/ld+json" v-html="ldJson" />
    <script type="application/ld+json" v-html="ldJsonBreadcrumb" />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { addDateString } from '~/lib/date'
import SnsPost from '~/components/molecules/SnsPost.vue'
import BreadList from '~/components/organisms/BreadList.vue'
import ListItem from '~/components/organisms/ListItem.vue'
import CardItem from '~/components/organisms/CardItem.vue'
import Paging from '~/components/molecules/Paging.vue'
import SideMenu from '~/components/molecules/SideMenu.vue'
import device from '~/mixins/device'

const recomendNews = require('~/config/recomendNews.json5')

export default {
  components: {
    SnsPost,
    BreadList,
    ListItem,
    CardItem,
    Paging,
    SideMenu
  },
  mixins: [device],
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
          hid: 'description',
          name: 'description',
          content: this.monthlyNews.header
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.constant.url}${this.$route.path}`
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.monthlyNews.header
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.monthlyNews.header
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
          text: 'トップ',
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
          disabled: true,
          url: `/news/${this.month}/`
        }
      ]
    },
    shareUrl() {
      return `${process.env.constant.url}${this.$route.path}`
    },
    shareText() {
      return this.monthlyNews.header
    },
    shareTag() {
      return process.env.constant.twitterTag
    },
    ...mapGetters('news', ['monthlyNews', 'loading', 'error']),
    ldJson() {
      return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${process.env.constant.url}${this.$route.path}`
        },
        headline: this.monthlyNews.header,
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
        datePublished: this.month
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
            name: 'トップ',
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
          }
        ]
      })
    }
  },
  async beforeMount() {
    if (this.error) {
      // asyncDataでデータが取れなかった場合再取得
      await this.$store.dispatch(
        'news/getMonthlyNews',
        this.$route.params['month']
      )
    }
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
.container.grid-list-md .layout:not(:only-child) {
  margin: auto 0px;
}
</style>

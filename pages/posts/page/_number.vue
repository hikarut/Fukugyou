<template>
  <div>
    <tab />
    <v-container grid-list-md text-xs-center class="all">
      <v-layout row wrap>
        <v-flex :class="[isDesktop ? 'xs8' : 'xs12']" >
          <bread-list :items="breadItems" />
          <big-img-item :items="postData.listData" tag="h1" />
          <pagination :total="total" :page="page" />
          <div class="ad">
            <adsbygoogle
              :ad-slot="'7321120508'"
              :ad-format="'auto'"
              class="adsbygoogle" />
          </div>
        </v-flex>

        <side-menu :items="topNews"/>
      </v-layout>
      <script type="application/ld+json" v-html="ldJson" />
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getEntries } from '~/lib/contentful'
import { dateString } from '~/lib/date'
import { checkPage } from '~/lib/validation'
import ListItem from '~/components/organisms/ListItem.vue'
import BigImgItem from '~/components/organisms/BigImgItem.vue'
import BreadList from '~/components/organisms/BreadList.vue'
import Pagination from '~/components/molecules/Pagination.vue'
import Tab from '~/components/layouts/Tab.vue'
import SideMenu from '~/components/molecules/SideMenu.vue'
import recomendNews from '~/config/recomendNews.json5'
import device from '~/mixins/device'

export default {
  components: {
    ListItem,
    BigImgItem,
    BreadList,
    Pagination,
    Tab,
    SideMenu
  },
  head() {
    return {
      title: `エンジニア向け副複業(副業)情報一覧 ページ${this.page}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `エンジニア向け副複業(副業)情報一覧 ページ${this.page}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `エンジニア向け副複業(副業)情報一覧 ページ${this.page}`
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `エンジニア向け副複業(副業)情報一覧 ページ${this.page}`
        }
      ]
    }
  },
  mixins: [device],
  data: () => ({
    recomendNews: recomendNews,
    breadItems: [
      {
        text: 'ホーム',
        disabled: false,
        url: process.env.constant.sitePathHome
      },
      {
        text: process.env.constant.postList,
        disabled: true,
        url: '/posts'
      }
    ]
  }),
  computed: {
    ldJson() {
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
            name: process.env.constant.postList,
            item:
              '${process.env.constant.url}${process.env.constant.sitePathPosts}'
          }
        ]
      })
    },
    ...mapGetters('news', ['topNews', 'loading'])
  },
  methods: {
    ...mapActions('news', ['getTopNews'])
  },
  async fetch({ store }) {
    // news記事の取得
    await store.dispatch('news/getTopNews')
  },
  // 投稿内容を取得
  async asyncData({ params }) {
    const page = checkPage(params.number)
    const data = await getEntries(process.env.constant.postsPerPage, page)
    return {
      postData: data,
      page: page,
      total: data.listData.total
    }
  }
}
</script>

<style scoped>
h1 {
  padding-top: 20px;
}
.post {
  width: 90%;
  padding-bottom: 10px;
}
/* PC版は横に広がりすぎないようにする */
@media screen and (min-width: 600px) {
  .main {
    width: 60%;
    margin: 0 auto;
  }
}
.ad {
  width: 90%;
  margin: 0 auto;
  margin-bottom: 20px;
}
/* リストページだけ場所を調整 */
.v-breadcrumbs {
  padding: 0px 0px 0px 24px !important;
}
@media screen and (max-width: 959px) {
  .container {
    padding: 0px !important;
  }
  /* リストページだけ場所を調整 */
  .v-breadcrumbs {
    padding: 20px 0px 0px 24px !important;
  }
}
.container.grid-list-md .layout:only-child {
  margin: 0px;
}
.container.grid-list-md .layout:not(:only-child) {
  margin: auto 0px;
}
</style>

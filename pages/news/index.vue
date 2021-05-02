<template>
  <div>
    <tab />
    <v-container grid-list-md text-xs-center class="all">
      <v-layout row wrap>
        <v-flex :class="[isDesktop ? 'xs8' : 'xs12']" >
          <div class="top">
            <bread-list :items="breadItems"/>

            <template v-if="!topData">
              <v-progress-linear :indeterminate="true"/>
            </template>
            <template v-else>
              <card-item :items="topData" tag="h1" />
              <div @click="getNextNews()">
                <button-link class="news-more" text="もっと見る" />
              </div>
            </template>

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
import CardItem from '~/components/organisms/CardItem.vue'
import ListItem from '~/components/organisms/ListItem.vue'
import ButtonLink from '~/components/atoms/Button.vue'
import Subheader from '~/components/atoms/Subheader.vue'
import SideMenu from '~/components/molecules/SideMenu.vue'
import BreadList from '~/components/organisms/BreadList.vue'
import Tab from '~/components/layouts/Tab.vue'
import device from '~/mixins/device'
import recomendNews from '~/config/recomendNews.json5'

export default {
  components: {
    CardItem,
    ListItem,
    ButtonLink,
    Subheader,
    SideMenu,
    BreadList,
    Tab
  },
  mixins: [device],
  async fetch({ store }) {
    // news記事の取得
    // await store.dispatch('news/getTopNews')
    await store.dispatch('newsV2/getTopNewsV2')
  },
  head() {
    return {
      title: process.env.constant.newsList,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            '毎日複業・副業ニュースを更新！日次/月次で複業・副業ニュースをまとめます'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            '毎日複業・副業ニュースを更新！日次/月次で複業・副業ニュースをまとめます'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: process.env.constant.newsList
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
          url: process.env.constant.sitePathHome
        },
        {
          text: process.env.constant.newsList,
          disabled: true,
          url: process.env.constant.sitePathNews
        }
      ]
    },
    ...mapGetters('newsV2', ['topData']),
    ldJson() {
      return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${process.env.constant.url}${
            process.env.constant.sitePathNews
          }`
        },
        headline: process.env.constant.newsList,
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
        }
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
            item: `${process.env.constant.url}${
              process.env.constant.sitePathNews
            }`
          }
        ]
      })
    }
  },
  beforeMount() {
    console.log(this.topData)
  },
  methods: {
    ...mapActions('newsV2', ['getTopNewsV2']),
    getNextNews() {
      console.log('getNextNews')
    }
  }
}
</script>

<style scoped>
/* リストページだけ場所を調整 */
.v-breadcrumbs {
  padding: 0px 0px 0px 24px !important;
}
/* PC版は横に広がりすぎないようにする */
@media screen and (min-width: 1400px) {
  .all {
    width: 70%;
    margin: 0 auto;
  }
}
@media screen and (max-width: 959px) {
  .container {
    padding: 0px !important;
  }
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
.news-more {
  margin-top: -20px;
  padding-bottom: 30px;
}
</style>

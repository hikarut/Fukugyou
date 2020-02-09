<template>
  <div>
    <tab />
    <v-container grid-list-md text-xs-center class="all">
      <v-layout row wrap>
        <v-flex :class="[isDesktop ? 'xs8' : 'xs12']" >
          <div class="top">
            <bread-list :items="breadItems"/>

            <template v-if="loading">
              <v-progress-linear :indeterminate="true"/>
            </template>
            <template v-else>
              <card-item :items="topNews" tag="h1" />
              <button-link :link="topNews.data[0].monthLink" class="news-more" text="もっと見る" />
            </template>

          </div>

        </v-flex>

        <side-menu :items="monthlyList"/>
      </v-layout>
      <script type="application/ld+json" v-html="ldJson" />
      <script type="application/ld+json" v-html="ldJsonBreadcrumb" />
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getEntries } from '~/plugins/contentful'
import { dateString } from '~/lib/date'
import CardItem from '~/components/organisms/CardItem.vue'
import ListItem from '~/components/organisms/ListItem.vue'
import ButtonLink from '~/components/atoms/Button.vue'
import Subheader from '~/components/atoms/Subheader.vue'
import MenuLink from '~/components/molecules/Menu.vue'
import SideMenu from '~/components/molecules/SideMenu.vue'
import BreadList from '~/components/organisms/BreadList.vue'
import Tab from '~/components/layouts/Tab.vue'
import device from '~/mixins/device'
const monthlyList = require('~/config/monthly.json5')

export default {
  components: {
    CardItem,
    ListItem,
    ButtonLink,
    Subheader,
    MenuLink,
    SideMenu,
    BreadList,
    Tab
  },
  mixins: [device],
  async fetch({ store }) {
    // news記事の取得
    await store.dispatch('news/getTopNews')
  },
  head() {
    return {
      title: process.env.constant.newsList
    }
  },
  data: () => ({
    monthlyList: monthlyList
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
          disabled: true,
          url: '/news/'
        }
      ]
    },
    ...mapGetters('news', ['topNews', 'loading']),
    ldJson() {
      return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${process.env.constant.url}/news/`
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
            item: `${process.env.constant.url}/news/`
          }
        ]
      })
    }
  },
  methods: {
    ...mapActions('news', ['getTopNews'])
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
.news-more {
  margin-top: -20px;
  padding-bottom: 30px;
}
/* リストページだけ場所を調整 */
.v-breadcrumbs {
  padding: 20px 0px 20px 24px !important;
}
</style>

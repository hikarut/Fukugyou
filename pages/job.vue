<template>
  <div>
    <tab />
    <v-container grid-list-md text-xs-center class="all">
      <v-layout row wrap>
        <v-flex :class="[isDesktop ? 'xs8' : 'xs12']" >
          <div class="top">
            <bread-list :items="breadItems"/>
            <big-img-item :items="jobTop" tag="h1" />
            <list-item :items="jobSite" />
            <ad-sense-display />
          </div>
        </v-flex>
        <template v-if="isDesktop">
          <side-menu :items="recomendNews"/>
        </template>
      </v-layout>
      <script type="application/ld+json" v-html="ldJson" />
    </v-container>
  </div>
</template>

<script>
import ListItem from '~/components/organisms/ListItem.vue'
import BigImgItem from '~/components/organisms/BigImgItem.vue'
import BreadList from '~/components/organisms/BreadList.vue'
import SideMenu from '~/components/molecules/SideMenu.vue'
import Tab from '~/components/layouts/Tab.vue'
import AdSenseDisplay from '~/components/atoms/AdSenseDisplay.vue'
import device from '~/mixins/device'
import recomendNews from '~/config/recomendNews.json5'
import jobTop from '~/config/jobTop.json5'
import jobSite from '~/config/jobSite.json5'

export default {
  components: {
    ListItem,
    BigImgItem,
    BreadList,
    SideMenu,
    Tab,
    AdSenseDisplay
  },
  mixins: [device],
  head() {
    return {
      title: process.env.constant.job,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'エンジニア向けの複業・副業案件探し情報をまとめます。副業でプログラミングの仕事を始めたい方におすすめなサイトの情報をまとめます。'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'エンジニア向けの複業・副業案件探し情報をまとめます。副業でプログラミングの仕事を始めたい方におすすめなサイトの情報をまとめます。'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: process.env.constant.job
        }
      ]
    }
  },
  data: () => ({
    recomendNews: recomendNews,
    jobTop: jobTop,
    jobSite: jobSite,
    sitePathNews: process.env.constant.sitePathNews,
    sitePathPosts: process.env.constant.sitePathPosts
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
          text: process.env.constant.job,
          disabled: true,
          url: process.env.constant.sitePathJob
        }
      ]
    },
    ldJson() {
      return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${process.env.constant.url}${
            process.env.constant.sitePathJob
          }`
        },
        headline: process.env.constant.job,
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
            name: process.env.constant.job,
            item: `${process.env.constant.url}${
              process.env.constant.sitePathJob
            }`
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
/* リストページだけ場所を調整 */
.v-breadcrumbs {
  padding: 20px 0px 0px 24px !important;
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
}
.container.grid-list-md .layout:only-child {
  margin: 0px;
}
.container.grid-list-md .layout:not(:only-child) {
  margin: auto 0px;
}
</style>

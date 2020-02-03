<template>
  <v-container grid-list-md text-xs-center class="all">
    <v-layout row wrap>
      <v-flex :class="[isDesktop ? 'xs8' : 'xs12']" >
        <div class="top">
          <template v-if="loading">
            <v-progress-linear :indeterminate="true"/>
          </template>
          <template v-else>
            <card-item :items="topNews" tag="h1" />
            <button-link :link="'/news/'" class="news-more" text="もっと見る" />
          </template>

          <big-img-item :items="listData" tag="h2" />
          <button-link link="/posts/page/1/" class="tech-more" text="もっと見る" />

          <subheader text="複業(副業)情報" tag="h2" />
          <menu-link />
        </div>

      </v-flex>

      <template v-if="isDesktop">
        <side-menu :items="recomendNews"/>
      </template>
    </v-layout>
    <script type="application/ld+json" v-html="ldJson" />
  </v-container>
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
import MenuLink from '~/components/molecules/Menu.vue'
import SideMenu from '~/components/molecules/SideMenu.vue'
import device from '~/mixins/device'
const recomendNews = require('~/config/recomendNews.json5')

export default {
  components: {
    CardItem,
    ListItem,
    BigImgItem,
    ButtonLink,
    Subheader,
    MenuLink,
    SideMenu
  },
  mixins: [device],
  head() {
    return {
      link: [
        {
          rel: 'canonical',
          href: process.env.constant.url
        }
      ]
    }
  },
  data: () => ({
    recomendNews: recomendNews
  }),
  // 投稿内容を取得
  asyncData() {
    return getEntries(2)
  },
  async fetch({ store }) {
    // news記事の取得
    await store.dispatch('news/getTopNews')
  },
  computed: {
    ldJson() {
      return JSON.stringify({
        '@context': 'https://schema.org/',
        '@type': 'WebSite',
        name: 'Fukugyou',
        url: process.env.constant.url
      })
    },
    ...mapGetters('news', ['topNews', 'loading'])
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
.tech-more {
  padding-bottom: 30px;
}
</style>

<template>
  <v-container grid-list-md text-xs-center class="all">
    <v-layout row wrap>
      <v-flex :class="[$device.isDesktop ? 'xs8' : 'xs12']" >
        <div class="top">
          <template v-if="loading">
            <v-progress-linear :indeterminate="true"/>
          </template>
          <template v-else>
            <card-item :items="topNews" tag="h1" />
            <button-link :link="topNews.data[0].monthLink" class="news-more" text="もっと見る" />
          </template>

          <big-img-item :items="listData" tag="h2" />
          <button-link link="/posts" class="tech-more" text="もっと見る" />

          <subheader text="複業(副業)情報" tag="h2" />
          <menu-link />
        </div>

      </v-flex>

      <template v-if="$device.isDesktop">
        <v-flex xs4>
          <list-item :items="recomendNews" />
          <div class="ad">
            <adsbygoogle
              :ad-slot="'7321120508'"
              :ad-format="'auto'"
              class="adsbygoogle" />
          </div>
        </v-flex>
      </template>
    </v-layout>
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
const recomendNews = require('~/config/recomendNews.json5')

export default {
  components: {
    CardItem,
    ListItem,
    BigImgItem,
    ButtonLink,
    Subheader,
    MenuLink
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
    ...mapGetters('news', ['topNews', 'loading'])
  },
  methods: {
    ...mapActions('news', ['getTopNews'])
  }
}
</script>

<style scoped>
/* PC版は横に広がりすぎないようにする */
@media screen and (min-width: 600px) {
  /* .top {
    width: 60%;
    margin: 0 auto;
  } */
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
.news-more {
  margin-top: -20px;
  padding-bottom: 30px;
}
.tech-more {
  padding-bottom: 30px;
}
</style>

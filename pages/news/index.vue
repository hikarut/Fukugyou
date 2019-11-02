<template>
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
  </v-container>
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
    BreadList
  },
  mixins: [device],
  async fetch({ store }) {
    // news記事の取得
    await store.dispatch('news/getTopNews')
  },
  data: () => ({
    monthlyList: monthlyList
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
          text: '複業ニュース',
          disabled: true,
          url: '/news'
        }
      ]
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
.news-more {
  margin-top: -20px;
  padding-bottom: 30px;
}
/* リストページだけ場所を調整 */
.v-breadcrumbs {
  padding: 20px 0px 20px 24px !important;
}
</style>

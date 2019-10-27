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
            <card-item :items="monthlyNews" tag="h1" />
          </template>

          <template v-if="loading">
            <v-progress-linear :indeterminate="true"/>
          </template>
          <template v-else>
            <sns-post :url="shareUrl" :text="shareText" :tag="shareTag" />
          </template>

          <paging :date="month" />

        </div>
      </v-flex>

      <side-menu />

    </v-layout>
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

const constant = require('~/config/constant.json')

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
          hid: 'og:url',
          property: 'og:url',
          content: `${constant.url}${this.$route.path}`
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.monthlyNews.header
        }
      ]
    }
  },
  computed: {
    breadItems() {
      return [
        {
          text: 'トップ',
          disabled: false,
          url: '/'
        },
        {
          text: addDateString(this.month),
          disabled: true,
          url: `/news/${this.month}`
        }
      ]
    },
    shareUrl() {
      return `${constant.url}${this.$route.path}`
    },
    shareText() {
      return this.monthlyNews.header
    },
    shareTag() {
      return '複業,エンジニア'
    },
    ...mapGetters('news', ['monthlyNews', 'loading'])
  },
  async mounted() {
    await this.$store.dispatch(
      'news/getMonthlyNews',
      this.$route.params['month']
    )
  },
  methods: {
    ...mapActions('news', ['getMonthlyData'])
  },
  async asyncData({ params, store }) {
    // await store.dispatch('news/getMonthlyNews', params.month)
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
</style>

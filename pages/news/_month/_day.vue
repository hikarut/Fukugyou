<template>
  <div class="main">
    <bread-list :items="breadItems"/>
    <card-item :items="dailyNews"/>
    <list-item :items="recomendNews" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SnsPost from '~/components/molecules/SnsPost.vue'
import BreadList from '~/components/organisms/BreadList.vue'
import ListItem from '~/components/organisms/ListItem.vue'
import CardItem from '~/components/organisms/CardItem.vue'

const recomendNews = require('~/config/recomendNews.json5')

export default {
  components: {
    SnsPost,
    BreadList,
    ListItem,
    CardItem
  },
  validate({ params }) {
    // 日付と月を両方チェック
    return /^\d{8}$/.test(params.day) && /^\d{6}$/.test(params.month)
  },
  head() {
    return {
      title: 'aaaa',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'aaa'
        },
        { hid: 'og:url', property: 'og:url', content: 'aaaa' },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `aaa | aaaa`
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'aaaa'
        },
        {
          hid: 'twitter:image:src',
          property: 'twitter:image:src',
          content: `https://yahoo.co.jp`
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
          text: this.month,
          disabled: false,
          url: `/news/${this.month}`
        },
        {
          text: this.day,
          disabled: true,
          url: '/'
        }
      ]
    },
    ...mapGetters('news', ['dailyNews'])
  },
  beforeMount() {
    console.log('beforeMount')
  },
  methods: {
    ...mapActions('news', ['getDailyNews'])
  },
  async asyncData({ params, store }) {
    console.log(params)
    await store.dispatch('news/getDailyNews', params.day)
    return { month: params.month, day: params.day }
  }
}
</script>

<style scoped>
/* PC版は横に広がりすぎないようにする */
@media screen and (min-width: 600px) {
  .main {
    width: 60%;
    margin: 0 auto;
  }
}
</style>

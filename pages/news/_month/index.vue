<template>
  <v-layout align-center column justify-center>
    <div>month index</div>
    <bread-list :items="breadItems"/>
    <list-item :items="recomendNews" />
  </v-layout>
</template>

<script>
import SnsPost from '~/components/molecules/SnsPost.vue'
import BreadList from '~/components/organisms/BreadList.vue'
import ListItem from '~/components/organisms/ListItem.vue'

const recomendNews = require('~/config/recomendNews.json5')

export default {
  components: {
    SnsPost,
    BreadList,
    ListItem
  },
  validate({ params }) {
    // 数値でなければならない
    return /^\d+$/.test(params.month)
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
    post: [],
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
          text: '201907',
          disabled: false,
          url: '/news/201907'
        },
        {
          text: '20190715',
          disabled: true,
          url: '/'
        }
      ]
    }
  },
  asyncData({ params, store }) {
    console.log(params)
  }
}
</script>

<style scoped>
</style>

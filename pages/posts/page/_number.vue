<template>
  <div>
    <tab />
    <div class="main">
      <bread-list :items="breadItems" />
      <big-img-item :items="postData.listData" tag="h1" />
      <pagination :total="total" :page="page" />
      <div class="ad">
        <adsbygoogle
          :ad-slot="'7321120508'"
          :ad-format="'auto'"
          class="adsbygoogle" />
      </div>
      <script type="application/ld+json" v-html="ldJson" />
    </div>
  </div>
</template>

<script>
import { getEntries } from '~/plugins/contentful'
import { dateString } from '~/lib/date'
import { checkPage } from '~/lib/validation'
import ListItem from '~/components/organisms/ListItem.vue'
import BigImgItem from '~/components/organisms/BigImgItem.vue'
import BreadList from '~/components/organisms/BreadList.vue'
import Pagination from '~/components/molecules/Pagination.vue'
import Tab from '~/components/layouts/Tab.vue'
const constant = require('~/config/constant.json')

export default {
  components: {
    ListItem,
    BigImgItem,
    BreadList,
    Pagination,
    Tab
  },
  data: () => ({
    breadItems: [
      {
        text: 'ホーム',
        disabled: false,
        url: '/'
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
            item: '${process.env.constant.url}/posts/page/1/'
          }
        ]
      })
    }
  },
  // 投稿内容を取得
  async asyncData({ params }) {
    const page = checkPage(params.number)
    const data = await getEntries(constant.postsPerPage, page)
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
/* リストページだけ場所を調整 */
.v-breadcrumbs {
  padding: 20px 0px 0px 24px !important;
}
.ad {
  width: 90%;
  margin: 0 auto;
}
</style>

<template>
  <div class="main">
    <bread-list :items="breadItems" />
    <big-img-item :items="postData.listData" tag="h1" />
    <pagination :total="total" :page="page" />
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
const constant = require('~/config/constant.json')

export default {
  components: {
    ListItem,
    BigImgItem,
    BreadList,
    Pagination
  },
  data: () => ({
    breadItems: [
      {
        text: 'トップ',
        disabled: false,
        url: '/'
      },
      {
        text: '記事一覧',
        disabled: true,
        url: '/posts'
      }
    ]
  }),
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
  padding: 20px 0px 20px 24px !important;
}
</style>

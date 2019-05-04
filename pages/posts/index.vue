<template>
  <div class="main">
    <bread-list :items="breadItems"/>
    <big-img-item :items="listData" />
  </div>
</template>

<script>
import { getEntries } from '~/plugins/contentful'
import { dateString } from '~/plugins/date'
import ListItem from '~/components/organisms/ListItem.vue'
import BigImgItem from '~/components/organisms/BigImgItem.vue'
import BreadList from '~/components/organisms/BreadList.vue'

export default {
  components: {
    ListItem,
    BigImgItem,
    BreadList
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
  asyncData() {
    // TODO:ページング
    return getEntries()
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

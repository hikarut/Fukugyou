<template>
  <div>
    <big-img-item :items="listData" />
  </div>
</template>

<script>
import { getEntries } from '~/plugins/contentful'
import { dateString } from '~/plugins/date'
import ListItem from '~/components/organisms/ListItem.vue'
import BigImgItem from '~/components/organisms/BigImgItem.vue'

export default {
  components: {
    ListItem,
    BigImgItem
  },
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
</style>

<template>
  <div class="list-item-top">
    <bread-list :items="breadItems" />
    <list-item :items="fukugyouWhy" tag="h1" />
    <button-link link="/" class="more" text="トップに戻る" />
  </div>
</template>

<script>
import ListItem from '~/components/organisms/ListItem.vue'
import BreadList from '~/components/organisms/BreadList.vue'
import ButtonLink from '~/components/atoms/Button.vue'

// 手動で拾ってきたニュース
const fukugyouWhy = require('~/config/why.json5')

export default {
  components: {
    ListItem,
    BreadList,
    ButtonLink
  },
  data: () => ({
    breadItems: [
      {
        text: 'ホーム',
        disabled: false,
        url: '/'
      },
      {
        text: fukugyouWhy.header,
        disabled: true,
        url: ''
      }
    ],
    fukugyouWhy: fukugyouWhy
  })
}
</script>

<style scoped>
/* PC版は横に広がりすぎないようにする */
@media screen and (min-width: 600px) {
  .list-item-top {
    width: 60%;
    margin: 0 auto;
  }
}
/* リストページだけ場所を調整 */
.v-breadcrumbs {
  padding: 20px 0px 20px 24px !important;
}
.more {
  padding-bottom: 30px;
}
</style>

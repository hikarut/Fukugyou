<template>
  <div class="top">
    <template v-if="loading">
      <v-progress-linear :indeterminate="true"/>
    </template>
    <template v-else>
      <card-item :items="topNews"/>
      <button-link :link="topNews.data[0].monthLink" class="news-more" text="もっと見る" />
    </template>

    <subheader text="エンジニア向け複業ニュース" />
    <big-img-item :items="listData" />
    <button-link link="/posts" class="tech-more" text="もっと見る" />

    <subheader text="複業情報" />
    <menu-link />

  </div>
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

export default {
  components: {
    CardItem,
    ListItem,
    BigImgItem,
    ButtonLink,
    Subheader,
    MenuLink
  },
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
  .top {
    width: 60%;
    margin: 0 auto;
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

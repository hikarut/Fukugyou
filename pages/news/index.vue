<template>
  <v-container grid-list-md text-xs-center class="all">
    <v-layout row wrap>
      <v-flex :class="[isDesktop ? 'xs8' : 'xs12']" >
        <div class="top">
          <template v-if="loading">
            <v-progress-linear :indeterminate="true"/>
          </template>
          <template v-else>
            <card-item :items="topNews" tag="h1" />
            <button-link :link="topNews.data[0].monthLink" class="news-more" text="もっと見る" />
          </template>

        </div>

      </v-flex>

      <template v-if="isDesktop">
        <side-menu />
      </template>
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
import device from '~/mixins/device'

export default {
  components: {
    CardItem,
    ListItem,
    ButtonLink,
    Subheader,
    MenuLink,
    SideMenu
  },
  mixins: [device],
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
</style>

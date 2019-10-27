<template>
  <v-flex :class="[isDesktop ? 'xs4' : 'xs12']" >
    <list-item :items="recomendNews" />
    <div class="ad">
      <adsbygoogle
        :ad-slot="'7321120508'"
        :ad-format="'auto'"
        class="adsbygoogle" />
    </div>
  </v-flex>
</template>

<script>
import ListItem from '~/components/organisms/ListItem.vue'
import device from '~/mixins/device'
const recomendNews = require('~/config/recomendNews.json5')

export default {
  components: {
    ListItem
  },
  mixins: [device],
  data: () => ({
    recomendNews: recomendNews
  })
}
</script>

<style scoped>
</style>

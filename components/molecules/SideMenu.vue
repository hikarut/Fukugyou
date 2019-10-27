<template>
  <v-flex :class="[$device.isDesktop ? 'xs4' : 'xs12']" >
    <div class="ad">
      <adsbygoogle
        :ad-slot="'7321120508'"
        :ad-format="'auto'"
        class="adsbygoogle" />
    </div>
    <list-item :items="recomendNews" />
  </v-flex>
</template>

<script>
import ListItem from '~/components/organisms/ListItem.vue'

const recomendNews = require('~/config/recomendNews.json5')

export default {
  components: {
    ListItem
  },
  data: () => ({
    recomendNews: recomendNews
  })
}
</script>

<style scoped>
</style>

<template>
  <v-flex :class="[isDesktop ? 'xs4' : 'xs12']" >
    <list-item :items="items" />
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

export default {
  components: {
    ListItem
  },
  mixins: [device],
  props: {
    items: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
.ad {
  width: 90%;
  margin: 0 auto;
  padding-bottom: 20px;
}
</style>

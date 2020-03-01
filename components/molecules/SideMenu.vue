<template>
  <v-flex :class="[isDesktop ? 'xs4' : 'xs12']" >
    <list-item :items="items" />
    <div class="ad">
      <ad-sense-display />
    </div>
  </v-flex>
</template>

<script>
import ListItem from '~/components/organisms/ListItem.vue'
import AdSenseDisplay from '~/components/atoms/AdSenseDisplay.vue'
import device from '~/mixins/device'

export default {
  components: {
    ListItem,
    AdSenseDisplay
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

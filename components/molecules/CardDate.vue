<template>
  <v-card-actions>
    <span v-text="text"/>
    <v-spacer/>
    <!-- <out-clip /> -->
  </v-card-actions>
</template>

<script>
import OutClip from '~/components/atoms/OutClip.vue'

export default {
  components: {
    OutClip
  },
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<template>
  <v-img :src="src" lazy-src="/loading.png" height="200px">
    <template v-slot:placeholder>
      <v-layout
        fill-height
        align-center
        justify-center
      >
        <v-progress-circular indeterminate color="grey lighten-5"/>
      </v-layout>
    </template>
    <v-container fill-height fluid pa-2>
      <v-layout fill-height>
        <v-flex xs12 align-end flexbox>
          <newmark :is-new="isNew"/>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>
</template>

<script>
import OutClip from '~/components/atoms/OutClip.vue'
import Newmark from '~/components/atoms/Newmark.vue'

export default {
  components: {
    OutClip,
    Newmark
  },
  props: {
    src: {
      type: String,
      default: ''
    },
    isNew: {
      type: Boolean,
      default: false
    }
  }
}
</script>
